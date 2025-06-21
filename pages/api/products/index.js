// export let products = [
//     { id: 1, name: "T-shirt", price: 399, image: "/Anime-Characters-Black-T-Shirt.jpeg" },
//     { id: 2, name: "Shoes", price: 999, image: "/270cca0b-412f-4b4e-ab38-c01204e7ea72_800x800.jpeg.a.jpg" },
//     { id: 3, name: "Backpack", price: 799, image: "/81lK3a55UOL.jpg" },
//     { id: 4, name: "Jacket", price: 1199, image: "/jacket.jpeg" },
//     { id: 5, name: "Earings", price: 299, image: "/images.jpeg" },
//     { id: 6, name: "Men's Jeans", price: 1150, image: "/jeans-images.jpeg" },
//     { id: 7, name: "Women's Top", price: 750, image: "/a5b97fa9f891cffc7335842be36ac85d.jpg" },
//     { id: 8, name: "Perfume", price: 999, image: "/perfume.jpeg" },
// ];

import { addProduct , getProducts } from "@/pages/lib/data";

export default function handler(req, res) {
  const { method, body } = req;

  if (method === "GET") {
    return res.status(200).json(getProducts());
  }

  if (method === "POST") {
    const { name, price, image } = body;
    if (!name || !price || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = {
      id: Date.now(), // or products.length + 1
      name,
      price: Number(price),
      image,
    };
    addProduct(newProduct);
    return res.status(201).json(newProduct);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
