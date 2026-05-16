import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const OrderSuccess = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 overflow-hidden relative">
  
  {/* Glow Effects */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/20 blur-3xl rounded-full"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

  <div className="relative z-10 max-w-md w-full text-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-10">
    
    {/* Success Icon */}
    <div className="flex justify-center">
      <div className="p-5 rounded-full bg-green-500/10 border border-green-500/20 shadow-lg shadow-green-500/10">
        <FiCheckCircle className="h-20 w-20 text-green-400" />
      </div>
    </div>

    {/* Title */}
    <h1 className="text-3xl font-bold mt-6 bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
      Payment Successful 🎉
    </h1>

    {/* Message */}
    <p className="text-slate-300 mt-4 leading-relaxed">
      Thank You for your Purchase! Your Order has been Placed Successfully.
    </p>

    {/* Buttons */}
    <div className="mt-8 flex flex-col gap-4">
      
      <button
        onClick={() => navigate("/product")}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 cursor-pointer"
      >
        Continue Shopping
      </button>

      <button
        onClick={() => navigate(`/profile/${user._id}?tab=order`)}
        className="w-full py-3 rounded-xl border border-slate-600 bg-slate-800/50 text-slate-200 font-semibold hover:bg-slate-700/60 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      >
        View My Orders
      </button>
    </div>

    {/* Footer */}
    <p className="mt-8 text-xs tracking-widest text-slate-500">
      PAYMENT • SUCCESS
    </p>
  </div>
</div>
  );
};

export default OrderSuccess;
