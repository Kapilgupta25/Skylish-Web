"use client";

import { fabric } from "fabric";

export default function ImageUpload({ canvas }) {
  const handleUpload = (e) => {
    if (!canvas) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      fabric.Image.fromURL(reader.result, (img) => {
        img.scaleToWidth(150);
        canvas.add(img);
        canvas.setActiveObject(img);
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
    />
  );
}
