import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);

        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading product details...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => router.back()}
      >
        ← Back to Products
      </button>
      <div className="flex flex-col md:flex-row gap-6">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 object-contain bg-gray-50" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-800 mb-6">Price: ₹{product.price}</p>
          <p>
            {/* You can add more details like description here if available */}
            This is a beautiful product named {product.name}.
          </p>
        </div>
      </div>
    </div>
  );
}
