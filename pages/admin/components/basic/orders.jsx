import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import StatusDropdown from "./dropdown";
import Image from "next/image";
import { MoonLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  console.log(selectedOrder);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/getallorders");
        const json = await res.json();
        if (json.success) setOrders(json.rows);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch("/api/updateorderstatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: id, status: newStatus }),
      });
      const result = await res.json();

      if (result.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Status Update successfully!");
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating status");
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <>
      <Toaster />

      <div className="p-6">
        <div className="text-2xl font-bold mb-6">Orders Received</div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-center">
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
                <tr key={order.id} className="hover:bg-gray-50 bg-gray-200">
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.name}</td>
                  <td className="p-2 border">{order.email}</td>
                  <td className="p-2 border">{order.phone}</td>
                  <td className="p-2 border ">
                    <StatusDropdown
                      currentStatus={order.status}
                      onChange={(newStatus) =>
                        handleStatusChange(order.id, newStatus)
                      }
                    />
                  </td>
                  <td className="p-2 border">{formatDate(order.created_at)}</td>
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
                    <div className=" inset-0  flex items-center justify-center col-span-5 bg-opacity-80 z-999">
                      <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
                        <MoonLoader size={30} color="#7002ff" />
                        Loading...
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <AnimatePresence>
          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200"
            >
              <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
                <div className="text-2xl font-bold mb-4">
                  Order #{selectedOrder.id}
                </div>
                <div className="grid grid-cols-1  gap-4 text-[16px]">
                  <div>
                    <b>Customer:</b> {selectedOrder.name}
                  </div>
                  <div>
                    <b>Email:</b> {selectedOrder.email}
                  </div>
                  <div>
                    <b>Phone:</b> {selectedOrder.phone}
                  </div>
                  <div>
                    <b>Address:</b> {selectedOrder.address}
                  </div>
                  <div>
                    <b>Status:</b> {selectedOrder.status}
                  </div>
                  <div>
                    <b>Post Code:</b> {selectedOrder.postcode}
                  </div>
                  <div>
                    <b>Date:</b> {formatDate(selectedOrder.created_at)}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-lg font-semibold mb-2">Items:</div>
                  <ul className="space-y-4">
                    {(selectedOrder?.order_items ?? []).map((item, idx) => (
                      <li
                        key={idx}
                        className="grid grid-cols-2 items-start gap-4 border l:px-[3rem] p-3 rounded-md"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={1020}
                          height={1020}
                          className="w-30 h-30 object-cover rounded-md border col-span-2"
                        />
                        <div className="flex-1 col-start-3 ">
                          <div className="font-bold text-[17px]">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {item.specification}
                          </div>
                          <div className="text-sm flex items-center">
                            Color:{" "}
                            <div
                              className="rounded-full w-[1.2rem] h-[1.2rem] mx-1"
                              style={{ backgroundColor: item.color }}
                            ></div>
                          </div>
                          <div className="text-sm">
                            Quantity: <b>{item.quantity}</b>
                          </div>
                          <div className="text-sm">
                            Price:{" "}
                            <b className="text-[var(---price)]">
                              ${item.price}
                            </b>
                          </div>
                          {item.onsale && (
                            <span className="bg-[var(---salelabel)] text-white text-xs px-2 py-0.5 rounded inline-block mt-1">
                              On Sale
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center mt-6">
                  <button
                    className="hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[1px] hover:border-[var(---btncolor)] duration-[1s] px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white rounded"
                    onClick={() => setSelectedOrder(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Orders;
