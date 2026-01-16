import React, { useEffect, useState } from "react";
import API from "../API";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await API.get("/user/cart");
      if (response.data && response.data.data) {
        setCartItems(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleRemove = async (productId) => {
    try {
      // MATCHING YOUR NEW CONTROLLER PATH: /user/cart/remove
      await API.delete("/user/cart/remove", {
        data: { id: productId, quantity: 1 },
      });
      fetchCart();
    } catch (err) {
      alert("Could not remove item");
    }
  };

  if (loading)
    return <div className="text-center mt-20">Loading your cart...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">Your cart is empty.</p>
          <Link
            to="/"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            Go back to shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.imageLink}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{item.product.name}</h3>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item.product.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove 1
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-between items-center bg-gray-50 p-6 rounded-xl">
            <div>
              <p className="text-gray-600">Total Amount:</p>
              <p className="text-3xl font-black text-blue-600">
                ${calculateTotal()}
              </p>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-blue-600 text-white px-10 py-3 rounded-full font-bold hover:bg-blue-700 transition"
            >
              Checkout Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
