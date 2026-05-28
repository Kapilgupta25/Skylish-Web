"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export default function WishlistButton({ productId }) {
  const [wished, setWished] = useState(false);

  async function handleWishlist() {
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    if (res.ok) setWished((prev) => !prev);
  }

  return (
    <button
      onClick={handleWishlist}
      className="border border-gray-300 px-4 py-3 rounded-xl hover:border-red-400 transition"
    >
      <Heart
        size={20}
        className={wished ? "fill-red-500 text-red-500" : "text-gray-500"}
      />
    </button>
  );
}