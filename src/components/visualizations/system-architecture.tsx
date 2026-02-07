import { useEffect, useRef } from "react";

const SystemArchitecture = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        const width = 540;
        const height = 260;
        canvas.width = width;
        canvas.height = height;

        type Layer = "Frontend" | "API" | "Database";
        const layers: { name: Layer; y: number; color: string }[] = [
            { name: "Frontend", y: 40, color: "#61dafb" }, // React Blue
            { name: "API", y: 130, color: "#4caf50" }, // Node Green
            { name: "Database", y: 220, color: "#ff9800" } // DB Orange
        ];

        interface Packet {
            x: number;
            y: number;
            targetY: number;
            speed: number;
            type: "Req" | "Res";
            color: string;
            progress: number;
        }

        let packets: Packet[] = [];
        let time = 0;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            time++;

            // Draw Layers
            layers.forEach((layer) => {
                ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
                ctx.fillRect(width / 2 - 100, layer.y - 15, 200, 30);

                ctx.strokeStyle = layer.color;
                ctx.lineWidth = 2;
                ctx.strokeRect(width / 2 - 100, layer.y - 15, 200, 30);

                ctx.fillStyle = "#ffffff";
                ctx.font = "14px monospace";
                ctx.textAlign = "center";
                ctx.fillText(layer.name, width / 2, layer.y + 5);
            });

            // Vertical Connections
            ctx.beginPath();
            ctx.moveTo(width / 2, layers[0].y + 15); // Frontend Bottom
            ctx.lineTo(width / 2, layers[2].y - 15); // DB Top
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Spawn Packets
            if (time % 60 === 0) {
                // Request: Frontend -> API
                packets.push({ x: width / 2, y: layers[0].y + 15, targetY: layers[1].y - 15, speed: 2, type: "Req", color: "#ffffff", progress: 0 });
            }

            // Update & Draw Packets
            for (let i = packets.length - 1; i >= 0; i--) {
                const p = packets[i];

                if (p.type === "Req") {
                    p.y += p.speed;
                    // Hitting API Layer
                    if (p.y >= layers[1].y - 15 && p.y <= layers[1].y + 15) {
                        // Pass through (logic simulation)
                    }
                    // Hitting DB Layer
                    if (p.y >= layers[2].y - 15) {
                        // Transform to Response
                        p.type = "Res";
                        p.color = "#4caf50"; // Success
                    }
                } else {
                    p.y -= p.speed;
                    // Back to Frontend
                    if (p.y <= layers[0].y + 15) {
                        packets.splice(i, 1);
                        continue;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(animationId);
    }, []);

    return <canvas ref={canvasRef} className="w-full h-auto bg-black/20 rounded-lg" />;
};

export default SystemArchitecture;
