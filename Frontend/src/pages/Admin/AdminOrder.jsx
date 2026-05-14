import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  console.log("Orders", orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_URL}/api/order/all`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (data.success) setOrders(data.orders);
      } catch (error) {
        console.error("❌ Failed to fetch admin Order", error);
        toast.error("Failed to fetch Admin Order");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading all Orders</div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 md:p-8">
  <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6">
    Admin - All Orders
  </h1>

  {orders.length === 0 ? (
    <p className="text-slate-400">No Orders Found!</p>
  ) : (
    <>
      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-cyan-400 shadow-xl">
        <table className="w-full text-left text-sm text-white">
          <thead className="bg-slate-800/70">
            <tr>
              <th className="px-4 py-3 border-b border-cyan-400 text-cyan-300">Order ID</th>
              <th className="px-4 py-3 border-b border-cyan-400 text-cyan-300">User</th>
              <th className="px-4 py-3 border-b border-cyan-400 text-cyan-300">Products</th>
              <th className="px-4 py-3 border-b border-cyan-400 text-cyan-300">Amount</th>
              <th className="px-4 py-3 border-b border-cyan-400 text-cyan-300">Status</th>
              <th className="px-4 py-3 border-b border-cyan-400 text-cyan-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-slate-800/50 transition">
                <td className="px-4 py-3 border-b border-slate-700">{order._id}</td>
                <td className="px-4 py-3 border-b border-slate-700">
                  {order.user?.name}
                  <br />
                  <span className="text-xs text-gray-400">
                    {order.user?.email}
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-slate-700">
                  <div className="flex flex-wrap gap-2">
                    {order.products.map((p, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-800 border border-cyan-400/40 px-3 py-1 rounded-lg text-sm"
                      >
                        {p.productName}
                        <span className="text-cyan-400 ml-2 font-semibold">
                          × {p.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 border-b border-slate-700 font-semibold text-cyan-400">
                  ₹{order.amount.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 border-b border-slate-700">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Paid"
                        ? "bg-green-500/20 text-green-400"
                        : order.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-slate-700 text-slate-300">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-slate-800 border border-cyan-400/40 rounded-xl p-4 shadow-lg"
          >
            <p className="text-xs text-slate-400 break-all">
              {order._id}
            </p>

            <p className="mt-2 font-semibold text-white">
              {order.user?.name}
            </p>
            <p className="text-sm text-slate-400">
              {order.user?.email}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {order.products.map((p, idx) => (
                <span
                  key={idx}
                  className="bg-slate-900 border border-cyan-400/40 px-2 py-1 rounded text-xs"
                >
                  {p.productName} × {p.quantity}
                </span>
              ))}
            </div>

            <div className="mt-3 flex justify-between items-center">
              <span className="text-cyan-400 font-semibold">
                ₹{order.amount.toLocaleString("en-IN")}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === "Paid"
                    ? "bg-green-500/20 text-green-400"
                    : order.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              {new Date(order.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
        ))}
      </div>
    </>
  )}
</div>
  );
};

export default AdminOrder;
