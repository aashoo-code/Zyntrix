import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { TbLoader3 } from "react-icons/tb";
import sendVerifyEmail from "@/utils/sendVerifyEmail.js";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Handle form submission logic here
    console.log(formData);
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
<<<<<<< HEAD
      sendVerify
=======
      sendVerifyEmail(formData.email, formData.firstName, res.data.token);

>>>>>>> a951190ae16d4cb4935ac4aab6eedb9d1f6f417b
      if (res.data.success) {
        navigate("/verify");
        toast.success(res.data.message);
      }
      console.log("Response from server:", res.data);
    } catch (error) {
      console.log("Error during sign up:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during sign up.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-dvh px-4 py-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
  
  <Card
    className="w-full max-w-md
    bg-gradient-to-br from-slate-800 to-slate-900
    border border-cyan-400/60
    rounded-2xl
    shadow-2xl
    backdrop-blur-sm"
  >
    
    <CardHeader className="p-5 sm:p-6 space-y-2">
      <CardTitle className="text-cyan-400 text-xl sm:text-2xl font-bold leading-tight">
        Sign Up for Your Account
      </CardTitle>

      <CardDescription className="text-slate-400 text-sm sm:text-base">
        Enter your information to create your account
      </CardDescription>
    </CardHeader>

    <CardContent className="px-5 sm:px-6 pb-2">
      <div className="flex flex-col gap-4">

        {/* First + Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="grid gap-2">
            <Label htmlFor="firstName" className="text-slate-300">
              First Name
            </Label>

            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-slate-900
              border border-cyan-400/70
              text-white
              placeholder:text-slate-500
              rounded-xl
              focus-visible:ring-2
              focus-visible:ring-cyan-500"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lastName" className="text-slate-300">
              Last Name
            </Label>

            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-slate-900
              border border-cyan-400/70
              text-white
              placeholder:text-slate-500
              rounded-xl
              focus-visible:ring-2
              focus-visible:ring-cyan-500"
            />
          </div>
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-slate-300">
            Email
          </Label>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-slate-900
            border border-cyan-400/70
            text-white
            placeholder:text-slate-500
            rounded-xl
            focus-visible:ring-2
            focus-visible:ring-cyan-500"
          />
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-slate-300">
            Password
          </Label>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-slate-900
              border border-cyan-400/70
              text-white
              placeholder:text-slate-500
              rounded-xl
              pr-10
              focus-visible:ring-2
              focus-visible:ring-cyan-500"
            />

            {showPass ? (
              <VscEyeClosed
                onClick={() => setShowPass(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                w-5 h-5
                text-cyan-400 hover:text-cyan-300
                cursor-pointer"
              />
            ) : (
              <VscEye
                onClick={() => setShowPass(true)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                w-5 h-5
                text-cyan-400 hover:text-cyan-300
                cursor-pointer"
              />
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword" className="text-slate-300">
            Confirm Password
          </Label>

          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPass2 ? "text" : "password"}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="bg-slate-900
              border border-cyan-400/70
              text-white
              placeholder:text-slate-500
              rounded-xl
              pr-10
              focus-visible:ring-2
              focus-visible:ring-cyan-500"
            />

            {showPass2 ? (
              <VscEyeClosed
                onClick={() => setShowPass2(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                w-5 h-5
                text-cyan-400 hover:text-cyan-300
                cursor-pointer"
              />
            ) : (
              <VscEye
                onClick={() => setShowPass2(true)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                w-5 h-5
                text-cyan-400 hover:text-cyan-300
                cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </CardContent>

    <CardFooter className="flex flex-col gap-4 p-5 sm:p-6 pt-4 border-none bg-transparent">
      
      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full
        bg-cyan-500
        hover:bg-cyan-400
        text-slate-900
        font-semibold
        rounded-xl
        transition-all duration-300
        hover:scale-[0.98]
        active:scale-95
        cursor-pointer"
      >
        {loading ? (
          <>
            <TbLoader3 className="animate-spin mr-2" />
            Signing Up...
          </>
        ) : (
          "Sign Up"
        )}
      </Button>

      <p className="text-sm text-center text-slate-400">
        Already have an account?{" "}
        <Link
          className="text-cyan-400 hover:text-cyan-300 hover:underline"
          to="/login"
        >
          Log in
        </Link>
      </p>
    </CardFooter>
  </Card>
</div>
  );
};

export default SignUp;
