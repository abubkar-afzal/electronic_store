import React, { useState } from "react";

const initialOrders = [
  {
    id: 1,
    customer: "Ali Raza",
    email: "ali@example.com",
    phone: "+923001234567",
    address: "123 Main St, Lahore",
    items: [
      { name: "FaPhone", qty: 2, price: 70 },
      { name: "Tablet", qty: 1, price: 120 },
    ],
    status: "Pending",
    date: "2025-06-30",
  },
  {
    id: 2,
    customer: "Sara Khan",
    email: "sara@example.com",
    phone: "+923004567890",
    address: "456 Market Rd, Karachi",
    items: [
      { name: "Headphones", qty: 1, price: 30 },
    ],
    status: "Shipped",
    date: "2025-06-29",
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-6">Orders Received</div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.customer}</td>
                <td className="p-2 border">{order.email}</td>
                <td className="p-2 border">{order.phone}</td>
                <td className="p-2 border">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-2 border">{order.date}</td>
                <td className="p-2 border">
                  <button
                    className="text-blue-600 underline cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-[350px] max-w-full">
            <div className="text-xl font-bold mb-2">Order #{selectedOrder.id}</div>
            <div className="mb-2"><b>Customer:</b> {selectedOrder.customer}</div>
            <div className="mb-2"><b>Email:</b> {selectedOrder.email}</div>
            <div className="mb-2"><b>Phone:</b> {selectedOrder.phone}</div>
            <div className="mb-2"><b>Address:</b> {selectedOrder.address}</div>
            <div className="mb-2"><b>Status:</b> {selectedOrder.status}</div>
            <div className="mb-2"><b>Date:</b> {selectedOrder.date}</div>
            <div className="mb-2"><b>Items:</b></div>
            <ul className="mb-4">
              {selectedOrder.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} x{item.qty} (${item.price} each)
                </li>
              ))}
            </ul>
            <button
              className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white rounded"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;