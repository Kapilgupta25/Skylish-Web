"use client";

import Button from "../common/Button";
import { fabric } from "fabric";

export default function TextControls({ canvas }) {
  const addText = () => {
    if (!canvas) return;

    const text = new fabric.Textbox("Your Text", {
      left: 50,
      top: 50,
      fill: "#000",
      fontSize: 20,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
  };

  return (
    <Button onClick={addText}>
      Add Text
    </Button>
  );
}
