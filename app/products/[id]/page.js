import { getProductById, serializeProduct } from "@/lib/models/product";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/product/AddToCartButton";
import WishlistButton from "@/components/product/WishlistButton";

export default async function ProductDetailPage({ params }) {
  const raw = await getProductById(params.id);

  if (!raw) notFound();

  const product = serializeProduct(raw);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">

        {/* Image */}
        <div className="bg-[#e6efe9] rounded-2xl p-10 flex items-center justify-center">
          <Image
            src={product.images?.[0] || "/plant.png"}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold text-[#123c2a] mb-3">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-[#e07a3f] mb-4">
            ₹{product.price}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <p className="font-medium mb-2">Select Size</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:border-[#123c2a] transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <AddToCartButton product={product} />
            <WishlistButton productId={product._id} />
          </div>
        </div>
      </div>
    </div>
  );
}