// pages/api/products/[id].js

import { getProductById , deleteProduct } from "@/pages/lib/data";

export default function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  const productId = parseInt(id);
  const product = getProductById(productId);

  if (method === "GET") {
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  }

  if (method === "DELETE") {
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    deleteProduct(productId);
    console.log("product deleted");
    return res.status(200).json({ message: "Product deleted" });
  }

  res.setHeader("Allow", ["GET", "DELETE"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
