import React, { useEffect, useState } from "react";
import API from "../API";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ADD THIS LINE to define 'role'
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // URL must match your GeneralController: /api/v1/products
        const response = await API.get("/products", {
          params: { page: 1, size: 12, sort: "id", desc: false },
        });

        console.log("Full API Response:", response);

        // Based on your ResponseDto(String message, Object data)
        if (response.data && response.data.data) {
          setProducts(response.data.data);
        }
      } catch (err) {
        console.error("Home fetch error:", err);
        // If backend throws DataNotFoundException, it might come here
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    // 1. Check if user is logged in
    const role = localStorage.getItem("role"); // Or however you store the role

    // 2. Conditional check for Seller
    if (role === "ROLE_SELLER") {
      alert(
        "Sellers cannot add products to the cart. Please log in as a User."
      );
      return;
    }

    try {
      // MATCHING YOUR NEW CONTROLLER PATH: /user/cart/add
      const response = await API.post("/user/cart/add", {
        id: productId,
        quantity: 1,
      });
      alert("Item added to cart!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding to cart");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-xl font-bold">
        Loading ClinkNBuy...
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Featured <span className="text-blue-600">Products</span>
        </h1>

        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-20 bg-white rounded-xl shadow">
            <p className="text-2xl font-semibold text-gray-800">
              No products available yet.
            </p>
            <p className="mt-2 text-gray-500">
              Wait for approval or check backend logs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={product.imageLink || product.image_link}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300?text=No+Image";
                    }}
                  />
                </div>
                <div className="p-5 flex-grow">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                    {product.name}
                  </h2>
                  <p className="text-blue-600 font-black text-2xl">
                    ${product.price}
                  </p>
                  {role !== "ROLE_SELLER" && (
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg font-bold"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
