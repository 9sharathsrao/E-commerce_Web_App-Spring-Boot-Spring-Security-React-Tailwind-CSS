import React, { useEffect, useState } from "react";
import API from "../API";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Adjust this URL to match your @GetMapping for getting all products
        const response = await API.get("/products");
        // In your backend, you likely return a list inside a 'data' field
        setProducts(response.data.data || response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center mt-10">Loading catalog...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition"
        >
          <img
            src={
              product.imageUrl && product.imageUrl.startsWith("http")
                ? product.imageUrl
                : `https://loremflickr.com/320/240/${
                    product.name.split(" ")[0]
                  }`
            }
            alt={product.name}
            className="h-48 w-full object-cover rounded-md mb-4"
          />
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-bold">${product.price}</span>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
