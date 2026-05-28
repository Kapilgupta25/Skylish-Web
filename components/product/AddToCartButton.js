"use client";

import { useState } from "react";

export default function AddToCartButton({ product }) {
  const [added, setAdded] = useState(false);

  async function handleAddToCart() {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product._id,
        quantity: 1,
      }),
    });

    if (res.ok) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 bg-[#123c2a] text-white py-3 rounded-xl font-medium hover:bg-[#0e2f22] transition"
    >
      {added ? "✓ Added!" : "Add to Cart"}
    </button>
  );
}