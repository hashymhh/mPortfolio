import { useEffect, useRef } from "react";

const DependencyGraph = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        const width = 600;
        const height = 360;

        // Set canvas internal resolution
        canvas.width = width;
        canvas.height = height;

        // Simulation State
        type Phase = "Idle" | "Attack" | "Detecting" | "Mitigated" | "Reset";
        let phase: Phase = "Idle";
        let phaseTimer = 0;

        // Nodes
        interface Node {
            x: number;
            y: number;
            label: string;
            status: "normal" | "compromised" | "protected";
            ringScale: number;
        }

        const nodes: Node[] = [
            { x: 100, y: 180, label: "Supply", status: "normal", ringScale: 0 },
            { x: 250, y: 100, label: "Build", status: "normal", ringScale: 0 },
            { x: 250, y: 260, label: "Test", status: "normal", ringScale: 0 },
            { x: 400, y: 180, label: "Deploy", status: "normal", ringScale: 0 },
            { x: 520, y: 180, label: "Prod", status: "normal", ringScale: 0 },
        ];

        // Edges
        const edges = [
            [0, 1],
            [0, 2],
            [1, 3],
            [2, 3],
            [3, 4],
        ];

        // Pulses
        interface Pulse {
            edgeIndex: number;
            progress: number;
            speed: number;
            color: string;
        }
        let pulses: Pulse[] = [];

        const draw = () => {
            // Clear
            ctx.clearRect(0, 0, width, height);

            // Logic Update
            phaseTimer++;

            // Phase Logic
            if (phase === "Idle") {
                if (phaseTimer > 100) {
                    phase = "Attack";
                    phaseTimer = 0;
                    // Spawn attack pulse
                    pulses.push({ edgeIndex: 0, progress: 0, speed: 0.02, color: "#ff4444" }); // Red for attack
                }
            } else if (phase === "Attack") {
                if (phaseTimer > 150) {
                    phase = "Detecting";
                    phaseTimer = 0;
                    nodes[1].status = "compromised";
                    nodes[3].status = "compromised";
                }
            } else if (phase === "Detecting") {
                if (phaseTimer > 100) {
                    phase = "Mitigated";
                    phaseTimer = 0;
                    // Spawn defense pulses
                    pulses.push({ edgeIndex: 2, progress: 0, speed: 0.03, color: "#44ff44" });
                    pulses.push({ edgeIndex: 3, progress: 0, speed: 0.03, color: "#44ff44" });
                }
            } else if (phase === "Mitigated") {
                nodes[1].status = "protected";
                nodes[3].status = "protected";
                if (phaseTimer > 150) {
                    phase = "Reset";
                    phaseTimer = 0;
                }
            } else if (phase === "Reset") {
                nodes.forEach(n => n.status = "normal");
                if (phaseTimer > 50) {
                    phase = "Idle";
                    phaseTimer = 0;
                }
            }

            // Draw Edges
            edges.forEach((edge) => {
                const start = nodes[edge[0]];
                const end = nodes[edge[1]];

                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(end.x, end.y);
                ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            // Update and Draw Pulses
            for (let i = pulses.length - 1; i >= 0; i--) {
                const p = pulses[i];
                p.progress += p.speed;

                const edge = edges[p.edgeIndex];
                const start = nodes[edge[0]];
                const end = nodes[edge[1]];

                const px = start.x + (end.x - start.x) * p.progress;
                const py = start.y + (end.y - start.y) * p.progress;

                // Draw Pulse Head
                ctx.beginPath();
                ctx.arc(px, py, 4, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Draw Glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Cascade Attack Logic
                if (p.progress >= 1 && phase === "Attack") {
                    // If accumulated at a node, maybe spawn next pulses
                    if (p.edgeIndex === 0) { // reached build
                        pulses.push({ edgeIndex: 2, progress: 0, speed: 0.02, color: "#ff4444" });
                    }
                }

                if (p.progress >= 1) {
                    pulses.splice(i, 1);
                }
            }

            // Draw Nodes
            nodes.forEach((node) => {
                // Status Colors
                let color = "#aaaaaa";
                let glow = "rgba(255,255,255,0)";

                if (node.status === "compromised") {
                    color = "#ff4444";
                    glow = "rgba(255, 68, 68, 0.5)";
                    node.ringScale = 1 + Math.sin(phaseTimer * 0.1) * 0.2;
                } else if (node.status === "protected") {
                    color = "#44ff44";
                    glow = "rgba(68, 255, 68, 0.5)";
                    node.ringScale = 1;
                } else {
                    node.ringScale = 1;
                }

                // Draw Ring
                if (node.status !== "normal") {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 15 * node.ringScale, 0, Math.PI * 2);
                    ctx.strokeStyle = glow;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }

                // Draw Core
                ctx.beginPath();
                ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();

                // Draw Label
                ctx.fillStyle = "#ffffff";
                ctx.font = "12px monospace";
                ctx.textAlign = "center";
                ctx.fillText(node.label, node.x, node.y + 20);
            });

            // Phase Label
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.font = "14px monospace";
            ctx.textAlign = "left";
            ctx.fillText(`STATUS: ${phase.toUpperCase()}`, 20, 30);

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(animationId);
    }, []);

    return <canvas ref={canvasRef} className="w-full h-auto bg-black/20 rounded-lg" />;
};

export default DependencyGraph;
