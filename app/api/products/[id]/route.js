import { NextResponse } from "next/server";
import { getProductById, serializeProduct } from "@/lib/models/product";

export async function GET(request, { params }) {
  try {
    const product = await getProductById(params.id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ product: serializeProduct(product) });
  } catch (error) {
    console.error("Product fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product." },
      { status: 500 }
    );
  }
}