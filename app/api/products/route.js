import { NextResponse } from "next/server";
import { getProducts, serializeProduct } from "@/lib/models/product";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = parseInt(searchParams.get("skip") || "0");

    const products = await getProducts({ category, limit, skip });
    const serialized = products.map(serializeProduct);

    return NextResponse.json({ products: serialized });
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}