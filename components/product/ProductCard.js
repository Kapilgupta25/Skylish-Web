import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer">
        <div className="bg-[#e6efe9] p-6 rounded-lg mb-4">
          <Image
            src={product.images?.[0] || "/plant.png"}
            alt={product.name}
            width={120}
            height={120}
            className="mx-auto object-contain"
          />
        </div>
        <h4 className="font-semibold text-gray-800">{product.name}</h4>
        <p className="text-sm text-[#e07a3f] font-medium mt-1">
          ₹{product.price}
        </p>
        {product.stock === 0 && (
          <p className="text-xs text-red-500 mt-1">Out of Stock</p>
        )}
      </div>
    </Link>
  );
}
