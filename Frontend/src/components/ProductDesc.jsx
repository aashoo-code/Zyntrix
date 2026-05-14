import React from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCart } from "@/Redux/productSlice";

const ProductDesc = ({ product }) => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const addCart = async (productId) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("Product added in cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
   <div className="flex flex-col gap-4">

  <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
    {product.productName}
  </h2>

  <p className="text-slate-300 text-sm md:text-base">
    {product.category} | {product.brand}
  </p>

  <p className="text-3xl font-bold text-cyan-400">
    ₹ {Number(product.productPrice).toLocaleString("en-IN")}
  </p>

  <p
    className="text-slate-400 font-light leading-relaxed
    line-clamp-9 text-sm md:text-base"
  >
    {product.productDescription}
  </p>

  <div className="flex gap-3 items-center w-full max-w-[300px]">

    <p className="text-white font-semibold whitespace-nowrap">
      Quantity :
    </p>

    <Input
      type="number"
      className="w-20 bg-slate-900 border border-slate-700
      text-white focus-visible:ring-cyan-400"
      defaultValue={1}
    />

  </div>

  <div className="flex flex-col sm:flex-row gap-4 mt-4">

    <button
      onClick={() => addCart(product._id)}
      className="w-full sm:w-auto
      bg-gradient-to-r from-slate-800 to-slate-900
      border border-slate-700
      hover:border-cyan-400
      text-white py-3 px-6 rounded-xl
      transition-all duration-300 cursor-pointer"
    >
      Add to Cart
    </button>

    <button
      className="w-full sm:w-auto
      bg-cyan-500 hover:bg-cyan-400
      text-slate-900 font-semibold
      py-3 px-6 rounded-xl
      transition-all duration-300 cursor-pointer"
    >
      Buy Now
    </button>

  </div>

</div>
  );
};

export default ProductDesc;
