import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import {
  Card,
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
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/userSlice";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // data: JSON.stringify(formData)
        },
      );
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(res.data.user));
        localStorage.setItem("accessToken", res.data.accessToken);
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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-sm bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-cyan-400 rounded-2xl shadow-xl">
        <CardHeader className="p-5 sm:p-6">
          <CardTitle className="text-cyan-400 text-xl font-bold">
            Login to Your Account
          </CardTitle>
          <CardDescription className="text-slate-400">
            Enter Your E-Mail and Password to Log in to Your Account.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-5 sm:px-6">
          <div className="flex flex-col gap-3">
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
                className="bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-cyan-500 py-5"
              />
            </div>

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
                  className="bg-slate-900 border-2 border-cyan-400 text-white py-5 placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-cyan-500 pr-10"
                  required
                />
                {showPass ? (
                  <VscEyeClosed
                    onClick={() => setShowPass(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  />
                ) : (
                  <VscEye
                    onClick={() => setShowPass(true)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-4 bg-transparent border-none px-5 sm:px-6 pb-6">
          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all hover:scale-95 cursor-pointer"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <TbLoader3 className="animate-spin text-slate-900" />
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </Button>
          <p className="text-sm text-slate-400 text-center">
            Don't have an Account?{" "}
            <Link className="text-cyan-400 hover:underline" to="/sign-up">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;