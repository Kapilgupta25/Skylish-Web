"use client";

import { useEffect, useRef } from "react";
import { fabric } from "fabric";

export default function TshirtCanvas({ setCanvas }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 300,
      height: 400,
      backgroundColor: "#ffffff",
    });

    setCanvas(canvas);

    return () => canvas.dispose();
  }, [setCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="border rounded-md"
    />
  );
}
