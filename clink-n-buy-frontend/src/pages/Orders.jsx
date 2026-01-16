import React, { useEffect, useState } from "react";
import API from "../API";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Matches your UserController: @GetMapping("/orders")
        const response = await API.get("/user/orders");
        if (response.data && response.data.data) {
          setOrders(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const downloadInvoice = (order) => {
    const printContent = `
        <html>
            <head>
                <title>Invoice - ${order.orderId}</title>
                <style>
                    body { font-family: sans-serif; padding: 40px; }
                    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #eee; padding-bottom: 20px; }
                    .details { margin-top: 20px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #eee; padding: 12px; text-align: left; }
                    .total { text-align: right; font-size: 20px; font-weight: bold; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>ClinkNBuy Invoice</h1>
                    <p>Order Date: ${new Date().toLocaleDateString()}</p>
                </div>
                <div class="details">
                    <p><strong>Order ID:</strong> ${order.orderId}</p>
                    <p><strong>Payment Status:</strong> ${
                      order.paymentStatus
                    }</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items
                          .map(
                            (item) => `
                            <tr>
                                <td>${item.product.name}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.product.price}</td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
                <div class="total">Total Paid: $${order.totalCost}</div>
            </body>
        </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading)
    return <div className="text-center mt-20">Loading your history...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 mb-20">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">
        My Purchase History
      </h1>

      {orders.length === 0 ? (
        <div className="bg-gray-50 p-10 rounded-xl text-center border-2 border-dashed">
          <p className="text-gray-500 text-lg">
            You haven't placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border rounded-xl shadow-sm overflow-hidden"
            >
              <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">
                    Order ID
                  </p>
                  <p className="font-mono text-sm text-blue-600">
                    {order.orderId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase font-bold">
                    Status
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${
                      order.paymentStatus === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-400">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-700">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t flex justify-between items-center">
                  <p className="font-bold text-gray-600 uppercase tracking-widest text-sm">
                    Total Paid
                  </p>
                  <p className="text-2xl font-black text-gray-900">
                    ${order.totalCost.toFixed(2)}
                  </p>
                  <button 
                    onClick={() => downloadInvoice(order)}
                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-200 transition"
                >
                    📄 Download Invoice
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
