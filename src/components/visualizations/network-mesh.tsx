import { useEffect, useRef } from "react";

const NetworkMesh = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        const width = 480;
        const height = 300;
        canvas.width = width;
        canvas.height = height;

        interface Node {
            x: number;
            y: number;
            dx: number;
            dy: number;
            isAggregator: boolean;
            pulseSize: number;
        }

        const nodes: Node[] = [];

        // Aggregator
        nodes.push({ x: width / 2, y: height / 2, dx: 0, dy: 0, isAggregator: true, pulseSize: 0 });

        // Satellites
        for (let i = 0; i < 8; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5,
                isAggregator: false,
                pulseSize: 0
            });
        }

        let time = 0;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#000000"; // transparent bg handling

            time += 0.05;

            // Connections
            const aggregator = nodes[0];

            nodes.forEach((node, i) => {
                // Update Physics
                if (!node.isAggregator) {
                    node.x += node.dx;
                    node.y += node.dy;

                    // Bounce
                    if (node.x < 0 || node.x > width) node.dx *= -1;
                    if (node.y < 0 || node.y > height) node.dy *= -1;
                } else {
                    // Aggregator Spin Pulse
                    node.pulseSize = 5 + Math.sin(time) * 2;
                }

                // Draw Connection to Aggregator
                if (!node.isAggregator) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(aggregator.x, aggregator.y);

                    // Pulse travel
                    const dist = Math.sqrt((node.x - aggregator.x) ** 2 + (node.y - aggregator.y) ** 2);
                    const opacity = Math.max(0.1, 1 - dist / 200);
                    ctx.strokeStyle = `rgba(138, 43, 226, ${opacity})`; // Violet accent
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    // Active Data Packet
                    const packetProgress = (time + i) % 100 / 100;
                    const px = node.x + (aggregator.x - node.x) * packetProgress;
                    const py = node.y + (aggregator.y - node.y) * packetProgress;

                    ctx.beginPath();
                    ctx.arc(px, py, 2, 0, Math.PI * 2);
                    ctx.fillStyle = "#ffffff";
                    ctx.fill();
                }

                // Draw Node
                ctx.beginPath();
                if (node.isAggregator) {
                    ctx.arc(node.x, node.y, node.pulseSize, 0, Math.PI * 2);
                    ctx.fillStyle = "#8a2be2"; // Violet
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = "#8a2be2";
                } else {
                    ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = "#aaaaaa";
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(animationId);
    }, []);

    return <canvas ref={canvasRef} className="w-full h-auto bg-black/20 rounded-lg" />;
};

export default NetworkMesh;
