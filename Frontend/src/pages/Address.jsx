import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaAnglesLeft } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import {
  addAddress,
  deleteAddress,
  setCart,
  setSelectedAddress,
} from "@/Redux/productSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Address = () => {
  const [formData, setFormData] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const { cart, addresses, selectedAddress } = useSelector(
    (store) => store.product,
  );
  const [showForm, setShowForm] = useState(
    addresses?.length > 0 ? false : true,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(addAddress(formData));
    setShowForm(false);
  };

  const subtotal = cart.totalPrice;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = parseFloat((subtotal * 0.05).toFixed(2));
  const total = subtotal + shipping + tax;

  const handlePayment = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/order/create-order`,
        {
          products: cart?.items?.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          tax,
          shipping,
          amount: total,
          currency: "INR",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (!data.success) return toast.error("Something went Wrong");
      console.log("Razorpay Data", data);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "Zyntrix",
        description: "Order Payment",
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/order/verify-payment`,
              response,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );
            if (verifyRes.data.success) {
              toast.success("Payment Successful !!!");
              dispatch(setCart({ items: [], totalPrice: 0 }));
              navigate("/order-success");
            } else {
              toast.error("Payment Verification Failed !");
            }
          } catch (error) {
            toast.error("Payment Failed ! Try again later");
            console.error("Payment Failed", error);
          }
        },
        modal: {
          ondismiss: async function () {
            // Handle user closing the popup
            await axios.post(
              `${import.meta.env.VITE_API_URL}/api/order/verify-payment`,
              {
                razorpay_order_id: data.order.id,
                paymentFailed: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );
            toast.error("Payment Canceled or Failed !");
          },
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
theme: { color: "#22d3ee" },      };
      const rzp = new window.Razorpay(options);

      // Listen for payment Failures
      rzp.on("Payment.failed", async function () {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/order/verify-payment`,
          {
            razorpay_order_id: data.order.id,
            paymentFailed: true,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        toast.error("Payment Failed. Please Try Again!");
      });
      rzp.open();
    } catch (error) {
      toast.error("Something went Wrong, while processing your payment");
      console.error(error);
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
  <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10">
    <div className="flex items-center gap-4 mb-8">
          <Button
            className="bg-slate-900 text-white hover:scale-105 transition border border-slate-700"
            onClick={() => navigate(-1)}
          >
            <FaAnglesLeft />
          </Button>
          <h1 className="text-2xl font-bold text-slate-100">Orders</h1>
        </div>
    <div className="flex items-center gap-4 mb-8">
          <Button
            className="bg-slate-900 text-white hover:scale-105 transition border border-slate-700"
            onClick={() => navigate(-1)}
          >
            <FaAnglesLeft />
          </Button>
          <h1 className="text-2xl font-bold text-slate-100">Back</h1>
        </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-6 lg:gap-20 mt-6 sm:mt-10 max-w-7xl mx-auto">

      {/* Left — Address Form */}
      <div className="space-y-4 p-4 sm:p-6 bg-slate-800/60 border-2 border-cyan-400 rounded-2xl shadow-lg">
        {showForm ? (
          <>
            <div className="space-y-2">
              <Label className="text-slate-300">Full Name</Label>
              <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe"
                className="bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="123-456-7890"
                className="bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Email</Label>
              <Input id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com"
                className="bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St"
                className="bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="New York"
                  className="bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">State</Label>
                <Input id="state" name="state" value={formData.state} onChange={handleChange} placeholder="NY"
                  className="bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-cyan-500" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Pincode</Label>
              <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="10001"
                className="bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-cyan-500" />
            </div>
            <Button onClick={handleSave} type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl">
              Save and Continue
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-cyan-300">Saved Address</h2>
            {addresses.map((addr, idx) => (
              <div
                onClick={() => dispatch(setSelectedAddress(idx))}
                key={idx}
                className={`border-2 p-4 rounded-xl cursor-pointer relative transition-all duration-200 ${
                  selectedAddress === idx
                    ? "border-cyan-400 bg-cyan-400/10"
                    : "border-slate-600 hover:border-slate-500"
                }`}
              >
                <p className="font-medium text-white">{addr.fullName}</p>
                <p className="text-slate-300">{addr.email}</p>
                <p className="text-slate-300">{addr.phone}</p>
                <p className="text-slate-300 pr-12">
                  {addr.address}, {addr.city}, {addr.state}, {addr.pincode}
                </p>
                <button
                  onClick={() => dispatch(deleteAddress(idx))}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
            <Button variant="outline" onClick={() => setShowForm(true)}
              className="w-full border-2 border-cyan-400 text-cyan-300 bg-transparent hover:bg-cyan-400/10 rounded-xl">
              + Add New Address
            </Button>
            <Button onClick={handlePayment} disabled={selectedAddress === null}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl disabled:opacity-50">
              Proceed To Checkout
            </Button>
          </div>
        )}
      </div>

      {/* Right — Order Summary */}
      <div className="w-full">
        <Card className="w-full bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-cyan-400 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-300">Subtotal {cart?.items.length} items</span>
              <span className="text-cyan-400 font-medium">₹ {subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Shipping</span>
              <span className="text-cyan-400 font-medium">₹ {shipping}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Tax {cart.items.length} items</span>
              <span className="text-cyan-400 font-medium">₹ {tax}</span>
            </div>
            <Separator className="bg-slate-700" />
            <div className="flex justify-between font-bold text-lg">
              <span className="text-white">Total {cart.items.length} items</span>
              <span className="text-cyan-400">₹ {total.toLocaleString("en-IN")}</span>
            </div>
            <div className="mt-4 space-y-2 border-t border-slate-700 pt-4">
              <p className="text-sm text-slate-400">Free shipping on orders over <span className="text-cyan-400">₹599</span>.</p>
              <p className="text-sm text-slate-400">Need help? <span className="text-cyan-400 cursor-pointer hover:underline">Contact our support team</span>.</p>
              <p className="text-sm text-slate-400">Returns accepted within <span className="text-cyan-400">30 days</span>.</p>
              <p className="text-sm text-slate-400">Secure checkout with <span className="text-cyan-400">SSL encryption</span>.</p>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  </div>
</div>
  );
};

export default Address;
