import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local (same as Next.js uses)
config({ path: resolve(process.cwd(), ".env.local") });

import { getDatabase } from "../lib/mongodb.js";

const products = [
  {
    name: "Classic White Tee",
    description: "Soft cotton classic fit t-shirt.",
    price: 499,
    category: "T-Shirts",
    images: ["/t_shirt1.jpeg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 50,
    customizable: true,
    createdAt: new Date(),
  },
  {
    name: "Black Graphic Tee",
    description: "Bold graphic print on premium cotton.",
    price: 599,
    category: "T-Shirts",
    images: ["/t_shirt3.jpeg"],
    sizes: ["S", "M", "L", "XL"],
    stock: 30,
    customizable: false,
    createdAt: new Date(),
  },
  {
    name: "Custom Design Tee",
    description: "Upload your design on this cozy t-shirt.",
    price: 1299,
    category: "T-Shirts",
    images: ["/t_shirt2.webp"],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 20,
    customizable: true,
    createdAt: new Date(),
  },
];

async function seed() {
  const db = await getDatabase();
  await db.collection("products").insertMany(products);
  console.log("✅ Products seeded!");
  process.exit(0);
}

seed().catch(console.error);