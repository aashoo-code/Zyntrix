import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillTrash3Fill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { FaOpencart } from "react-icons/fa6";
import axios from "axios";
import { setCart } from "@/Redux/productSlice";
import { toast } from "sonner";
const Cart = () => {
  const { cart } = useSelector((state) => state.product);
  const subTotal = cart?.totalPrice;
  const shipping = subTotal > 599 ? 0 : 10; // Free shipping for orders above ₹50
  const tax = subTotal * 0.05; // Assuming 18% GST
  const total = subTotal + shipping + tax;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API = `${import.meta.env.VITE_API_URL}/api/cart`;
  const accessToken = localStorage.getItem("accessToken");

  const loadCart = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        {
          productId,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { productId },
      });
      if (res.data.success) {
        console.log("Item removed from cart", res.data.cart);
        dispatch(setCart(res.data.cart));
        toast.success("Item removed from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  useEffect(() => {
    loadCart();
  }, [dispatch]);

  return (

<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
  <Navbar />
  <div className="pt-20">
    {cart?.items?.length > 0 ? (
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-7">
          Shopping Cart
        </h1>

        {/* Main Layout — stack on mobile, side-by-side on lg */}
        <div className="flex flex-col lg:flex-row gap-7">

          {/* Cart Items */}
          <div className="flex flex-col gap-5 flex-1">
            {cart?.items.map((product, index) => (
              <Card
                key={index}
                className="p-4 sm:p-5 bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-cyan-400 rounded-2xl shadow-lg hover:shadow-cyan-400/20 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between sm:pr-7">

                  {/* Image + Name + Price */}
                  <div className="flex items-center gap-3 w-full sm:w-[350px]">
                    <img
                      src={product?.productId?.productImg?.[0]?.url || "/ZyntrixLogo.png"}
                      alt="cart"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-2xl flex-shrink-0"
                    />
                    <div className="flex-1 sm:w-[280px] px-2 sm:px-5">
                      <h2 className="text-white font-semibold line-clamp-2 text-sm sm:text-base">
                        {product?.productId?.productName}
                      </h2>
                      <p className="text-cyan-400 font-medium text-sm sm:text-base">
                        Price (Each): ₹{" "}
                        {product?.productId?.productPrice?.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Quantity + Total + Remove */}
                  <div className="flex items-center justify-between sm:justify-end sm:gap-6 w-full sm:w-auto">

                    {/* Qty Buttons */}
                    <div className="flex items-center gap-3">
                      <Button
                        className="h-8 w-8 bg-slate-800 border-2 border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-500 hover:text-slate-900 transition-all"
                        onClick={() => handleUpdateQuantity(product?.productId?._id, "decrease")}
                      >
                        -
                      </Button>
                      <span className="text-slate-200">{product?.quantity || 1}</span>
                      <Button
                        className="h-8 w-8 bg-slate-800 border-2 border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-500 hover:text-slate-900 transition-all"
                        onClick={() => handleUpdateQuantity(product?.productId?._id, "increase")}
                      >
                        +
                      </Button>
                    </div>

                    {/* Total Price */}
                    <p className="text-base sm:text-lg font-bold text-cyan-400">
                      ₹{" "}
                      {(product?.productId?.productPrice * product?.quantity)?.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>

                    {/* Remove Button */}
                    <p
                      className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 rounded-xl text-red-400 bg-red-500/10 border border-red-500/30 cursor-pointer font-medium text-sm hover:bg-red-500/20 hover:text-red-300 hover:scale-105 transition-all duration-200"
                      onClick={() => handleRemove(product?.productId?._id)}
                    >
                      <BsFillTrash3Fill className="text-base" />
                      <span className="hidden xs:inline">Remove</span>
                    </p>
                  </div>

                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <Card className="w-full p-6 bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-cyan-400 rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Subtotal ({cart?.items?.length} items)</span>
                    <span className="text-cyan-400 font-medium">
                      ₹ {cart?.totalPrice?.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Shipping</span>
                    <span className="text-cyan-400 font-medium">
                      ₹ {shipping?.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Tax</span>
                    <span className="text-cyan-400 font-medium">
                      ₹ {tax?.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <Separator className="bg-slate-700" />
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-white">Total</span>
                    <span className="text-cyan-400">
                      ₹ {total?.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    placeholder="ENTER PROMO CODE"
                    className="bg-slate-900 border-2 border-cyan-400 py-7 text-white text-lg uppercase placeholder:text-slate-500 placeholder:text-lg rounded-xl"
                  />
                  <Button className="bg-cyan-500 hover:bg-cyan-400 px-6 py-7 text-slate-900 font-semibold rounded-xl">
                    Apply
                  </Button>
                </div>

                <Button
                  onClick={() => navigate("/address")}
                  className="w-full bg-cyan-500 py-4 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl"
                >
                  Proceed to Checkout
                </Button>

                <Button className="w-full bg-slate-800 py-4 border-2 border-cyan-400 text-cyan-300 hover:bg-slate-700 rounded-xl">
                  <Link to="/product">Continue Shopping</Link>
                </Button>

                <div className="mt-6 space-y-3 border-t border-slate-700 pt-4">
                  <p className="text-sm text-slate-400">Free shipping on orders over <span className="text-cyan-400 font-medium">₹ 599</span>.</p>
                  <p className="text-sm text-slate-400">Need help? <span className="text-cyan-400 hover:underline cursor-pointer">Contact our support team</span>.</p>
                  <p className="text-sm text-slate-400">Returns accepted within <span className="text-cyan-400 font-medium">30 days</span>.</p>
                  <p className="text-sm text-slate-400">Secure checkout with <span className="text-cyan-400 font-medium">SSL encryption</span>.</p>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    ) : (
      <div className="p-6 text-center justify-center min-h-[60vh] flex flex-col items-center gap-3">
        <div className="bg-slate-800 p-6 rounded-full border-2 border-cyan-400">
          <FaOpencart className="w-16 h-16 text-cyan-400" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-white text-2xl font-bold">Your cart is empty</p>
          <p className="text-slate-400">Looks like you haven't added anything to your cart yet.</p>
          <Button
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl cursor-pointer"
            onClick={() => navigate("/product")}
          >
            Start Shopping
          </Button>
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default Cart;
