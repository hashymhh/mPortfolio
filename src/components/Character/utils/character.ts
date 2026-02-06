import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;

            // Optimize compilation: don't let it hang the whole app
            try {
              await Promise.race([
                renderer.compileAsync(character, camera, scene),
                new Promise((resolve) => setTimeout(resolve, 3000)) // 3s timeout for shader compilation
              ]);
            } catch (e) {
              console.warn("Shader compilation timed out or failed, proceeding anyway", e);
            }

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // Texture optimization
                if (mesh.material) {
                  if (Array.isArray(mesh.material)) {
                    mesh.material.forEach((material) => {
                      const textured = material as THREE.MeshStandardMaterial;
                      if (textured.map) {
                        textured.map.anisotropy =
                          renderer.capabilities.getMaxAnisotropy();
                      }
                    });
                  } else {
                    const textured = mesh.material as THREE.MeshStandardMaterial;
                    if (textured.map) {
                      textured.map.anisotropy =
                        renderer.capabilities.getMaxAnisotropy();
                    }
                  }
                }
              }
            });

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();

            const footR = character.getObjectByName("footR");
            const footL = character.getObjectByName("footL");
            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;

            dracoLoader.dispose();
            URL.revokeObjectURL(blobUrl); // Clean up memory
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
