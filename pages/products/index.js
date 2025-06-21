import Link from "next/link";
import { useEffect, useState } from "react";
import { FiTrash2, FiEye } from "react-icons/fi";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    setFiltered(
      products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  if (loading) return <p className="text-center mt-20 animate-pulse">Loading products...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">🛍️ Our Products</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full sm:max-w-sm p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          href="/products/add-product"
          className="text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          ➕ Add Product
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map(({ id, name, price, image }) => (
          <div
            key={id}
            className="bg-white shadow rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition duration-300"
          >
            <div className="w-full aspect-[1/1] bg-gray-100 overflow-hidden">
              <img
                src={image || "/images.jpeg"}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>


            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
                <p className="text-gray-600 mt-1 font-medium">₹{price}</p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <Link
                  href={`/products/${id}`}
                  className="flex items-center gap-2 text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition"
                >
                  <FiEye /> View
                </Link>

                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (confirm("Delete this product?")) {
                      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
                      if (res.ok) {
                        setProducts((prev) => prev.filter((p) => p.id !== id));
                        console.log("Product Deleted")
                      } else {
                        alert("Delete failed");
                      }
                    }
                  }}
                  className="flex items-center gap-2 text-sm bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
