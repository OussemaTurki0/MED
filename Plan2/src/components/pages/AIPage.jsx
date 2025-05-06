import React, { useEffect, useRef } from "react";

function AIPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const source = "アァイイウエオカキクケコサシスセソタチツナニネノハヒフヘホ0123456789";
    const getRndInteger = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const size = 14;
    const columns = Math.floor(canvas.width / size);
    const columnCells = Array(columns)
      .fill(0)
      .map(() => getRndInteger(0, canvas.height));

    ctx.font = `${size}px monospace`;

    const render = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ea6161"; // Red matrix characters

      columnCells.forEach((y, index) => {
        const text = source[getRndInteger(0, source.length - 1)];
        const x = index * size;
        ctx.fillText(text, x, y);
        columnCells[index] =
          y > canvas.height + getRndInteger(0, 10000) ? 0 : y + size;
      });
    };

    const interval = setInterval(render, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative bg-white">
      <canvas id="matrixCanvas" ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}

export default AIPage;
