import React, { useState } from "react";
import API from "../API";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [address, setAddress] = useState({
    houseNo: "",
    landmark: "",
    street: "",
    area: "",
    city: "",
    pincode: "",
  });
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  // Animation Component
  const SuccessOverlay = () => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
        <svg
          className="w-16 h-16 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <h2 className="mt-6 text-3xl font-bold text-gray-800 tracking-tight">
        Payment Successful!
      </h2>
      <p className="mt-2 text-gray-500 font-medium">
        Redirecting to your orders...
      </p>
    </div>
  );

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // 1. Create Order in Backend
      const { data } = await API.post("/user/order", address);
      const orderData = data.data;

      // 2. Razorpay Options
      const options = {
        key: "rzp_test_S9hIra1lWrM3gm",
        amount: orderData.totalCost * 100,
        currency: "INR",
        name: "ClinkNBuy",
        description: "Purchase Payment",
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            // 3. Confirm Payment in Backend
            await API.post(
              `/user/payment?razorpay_payment_id=${response.razorpay_payment_id}&razorpay_order_id=${response.razorpay_order_id}`
            );

            // 4. Trigger Success Animation
            setIsSuccess(true);

            // 5. Wait 3 seconds then redirect
            setTimeout(() => {
              navigate("/orders");
            }, 3000);
          } catch (err) {
            alert(
              "Payment verification failed on server, but payment was successful. Please contact support."
            );
          }
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(
        "Error creating order: " + (err.response?.data?.message || "Try again")
      );
    }
  };

  // If payment is successful, show the animation instead of the form
  if (isSuccess) return <SuccessOverlay />;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10 mb-20">
      <h2 className="text-3xl font-bold mb-6">Delivery Address</h2>
      <form onSubmit={handlePayment} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="House/Flat No"
          required
          className="p-3 border rounded"
          onChange={(e) => setAddress({ ...address, houseNo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Landmark"
          className="p-3 border rounded"
          onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
        />
        <input
          type="text"
          placeholder="Street"
          required
          className="p-3 border rounded col-span-2"
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
        />
        <input
          type="text"
          placeholder="Area"
          required
          className="p-3 border rounded"
          onChange={(e) => setAddress({ ...address, area: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          required
          className="p-3 border rounded"
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
        <input
          type="number"
          placeholder="Pincode"
          required
          className="p-3 border rounded col-span-2"
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition mt-4 shadow-lg"
        >
          Proceed to Pay
        </button>
      </form>
    </div>
  );
};

export default Checkout;
