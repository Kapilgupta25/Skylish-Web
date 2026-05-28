"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import Loader from "@/components/common/Loader";

const CATEGORIES = ["All", "T-Shirts", "Hoodies", "Custom"];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const url = activeCategory === "All"
        ? "/api/products"
        : `/api/products?category=${activeCategory}`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products || []);
      setLoading(false);
    }
    fetchProducts();
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#123c2a] mb-6">Our Collection</h1>

      {/* Category Filter */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              activeCategory === cat
                ? "bg-[#123c2a] text-white border-[#123c2a]"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#123c2a]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center py-20">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}