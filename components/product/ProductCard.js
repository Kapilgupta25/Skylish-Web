import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
        <div className="bg-[#e6efe9] p-6 rounded-lg mb-4">
          <Image
            src={product.image || "/plant.png"}
            alt={product.name}
            width={120}
            height={120}
            className="mx-auto"
          />
        </div>

        <h4 className="font-semibold">{product.name}</h4>
        <p className="text-sm text-gray-500">₹{product.price}</p>
      </div>
    </Link>
  );
}
