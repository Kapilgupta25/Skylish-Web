import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getProducts({ category, limit = 20, skip = 0 } = {}) {
  const db = await getDatabase();
  const query = category ? { category } : {};
  return db.collection("products")
    .find(query)
    .skip(skip)
    .limit(limit)
    .toArray();
}

export async function getProductById(id) {
  const db = await getDatabase();
  return db.collection("products")
    .findOne({ _id: new ObjectId(id) });
}

export async function serializeProduct(product) {
  return {
    ...product,
    _id: product._id.toString(),
  };
}