import React from "react";
import { useNavigate } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";
import { Button } from "./ui/button";
const OrderCard = ({ userOrder }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-4 md:px-6 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            className="bg-slate-900 text-white hover:scale-105 transition border border-slate-700"
            onClick={() => navigate(-1)}
          >
            <FaAnglesLeft />
          </Button>
          <h1 className="text-2xl font-bold text-slate-100">Orders</h1>
        </div>
        {userOrder?.length === 0 ? (
          <p className="text-slate-400 text-lg text-center py-10">
            No Orders yet !
          </p>
        ) : (
          <div className="space-y-6">
            {userOrder?.map((order) => (
              <div
                key={order?._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
                  <h2 className="text-lg font-semibold text-slate-400">
                    Order Id:{" "}
                    <span className="text-gray-600">{order?._id}</span>
                  </h2>
                  <p className="text-sm text-slate-400 font-semibold">
                    Amount:{" "}
                    <span className="font-bold">
                      {order?.currency}{" "}
                      {Number(order?.amount || 0).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                </div>
                {/* User Info */}
                <div className="flex justify-between items-center ">
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-normal text-cyan-400 text-base">
                        User :{" "}
                      </span>{" "}
                      <span className="text-cyan-100">
                        {order.user?.firstName || "Unknown"}{" "}
                        {order.user?.lastName}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-normal text-cyan-400 text-base">
                        Email :
                      </span>{" "}
                      <span className="text-cyan-100">
                        {order.user?.email || "N/A"}
                      </span>
                    </p>
                  </div>
                  <span
                    className={`${order.status === "Paid" ? "bg-green-500" : order.status === "Failed" ? "bg-red-500" : "bg-orange-300"} text-white px-2 py-1 rounded-lg`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Products */}
                <div>
                  <ul className="space-y-2">
                    {order.products.map((product, idx) => (
                      <li
                        key={idx}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-transparent border border-gray-700 px-4 sm:px-10 py-3 rounded-lg gap-3 sm:gap-0"
                      >
                        <img
                          onClick={() =>
                            navigate(`/product/${product?.productId?._id}`)
                          }
                          className="w-14 h-14 sm:w-16 sm:h-16 cursor-pointer rounded-lg object-cover"
                          src={product.productId?.productImg?.[0].url}
                          alt="productImg"
                        />
                        <span className="w-full sm:w-[300px] line-clamp-2 text-cyan-100 text-sm sm:text-base">
                          {product.productId?.productName}
                        </span>
                        <span className="text-cyan-100 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                          {product?.productId?._id}
                        </span>
                        <span className="text-base sm:text-xl font-medium text-cyan-300">
                          ₹{" "}
                          {Number(
                            product.productId?.productPrice || 0,
                          ).toLocaleString("en-IN")}{" "}
                          x {product.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
