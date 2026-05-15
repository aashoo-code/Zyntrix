import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaOpencart, FaBars, FaTimes } from "react-icons/fa";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/Redux/userSlice";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);
  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        localStorage.removeItem("accessToken");
        dispatch(setUser(null));
        toast.success(res.data.message);

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isHomePage
      ? scrolled
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 shadow-lg border-b border-slate-700"
        : "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
      : "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 shadow-lg border-b border-slate-700"
  }`}
>
  <div className="mx-auto flex justify-between items-center py-4 px-4 md:px-10">

    {/* Logo */}
    <div>
      <span
        className="text-2xl md:text-3xl font-bold tracking-widest font-serif
        bg-gradient-to-r from-cyan-400 to-pink-500
        bg-clip-text text-transparent"
      >
        Zyntrix
      </span>
    </div>

    {/* Desktop Menu */}
    <div className="hidden md:flex gap-10 items-center">
      <Link
        className="font-medium text-slate-300 hover:text-cyan-400 transition"
        to="/"
      >
        Home
      </Link>

      <Link
        className="font-medium text-slate-300 hover:text-cyan-400 transition"
        to="/product"
      >
        Products
      </Link>

      {user && (
        <Link
          className="font-medium text-slate-300 hover:text-cyan-400 transition"
          to={`/profile/${user._id}`}
        >
          Hello,{" "}
          <span className="font-bold text-cyan-400">
            {user.firstName}!
          </span>
        </Link>
      )}

      {admin && (
        <Link
          className="font-medium text-cyan-400 hover:text-cyan-300 transition"
          to="/dashboard/sales"
        >
          <span className="font-bold">Dashboard</span>
        </Link>
      )}

      {/* Cart */}
      <Link
        to="/cart"
        className="relative text-slate-300 hover:text-cyan-400 transition"
      >
        <FaOpencart className="text-2xl" />
        <span className="absolute -top-3 -right-4 bg-cyan-500 text-slate-900 font-bold rounded-full px-2 text-xs border-2 border-slate-900">
          {cart?.items?.length || 0}
        </span>
      </Link>

      {/* Auth */}
      {user ? (
        <Button
          onClick={logoutHandler}
          className="bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-6 py-2 rounded-xl transition"
        >
          Logout
        </Button>
      ) : (
        <Button
          onClick={() => navigate("/login")}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-xl transition"
        >
          Login
        </Button>
      )}
    </div>

    {/* Mobile Section (UNCHANGED STRUCTURE) */}
    <div className="md:hidden flex items-center gap-5">
      <Link to="/cart" className="relative">
        <FaOpencart className="text-2xl text-cyan-400" />
        <span className="absolute -top-3 -right-4 bg-cyan-500 text-slate-900 font-bold rounded-full px-2.5 text-xs border-2 border-slate-900">
          {cart?.items?.length || 0}
        </span>
      </Link>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-cyan-400"
      >
        {menuOpen ? (
          <FaTimes className="text-2xl" />
        ) : (
          <FaBars className="text-2xl" />
        )}
      </button>
    </div>
  </div>

  {/* Mobile Menu (Same Logic, Better Theme) */}
  {menuOpen && (
    <div className="md:hidden flex flex-col gap-5 px-6 py-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700">
      <Link
        to="/"
        onClick={() => setMenuOpen(false)}
        className="text-slate-300 hover:text-cyan-400 transition"
      >
        Home
      </Link>

      <Link
        to="/product"
        onClick={() => setMenuOpen(false)}
        className="text-slate-300 hover:text-cyan-400 transition"
      >
        Products
      </Link>

      {user && (
        <Link
          to={`/profile/${user._id}`}
          onClick={() => setMenuOpen(false)}
          className="text-slate-300 hover:text-cyan-400 transition"
        >
          Hello, <span className="text-cyan-400 font-semibold">
            {user.firstName}!
          </span>
        </Link>
      )}

      {admin && (
        <Link
          to="/dashboard/sales"
          onClick={() => setMenuOpen(false)}
          className="text-cyan-400 font-semibold"
        >
          Dashboard
        </Link>
      )}

      {user ? (
        <Button
          onClick={() => {
            logoutHandler();
            setMenuOpen(false);
          }}
          className="w-full bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition"
        >
          Logout
        </Button>
      ) : (
        <Button
          onClick={() => {
            navigate("/login");
            setMenuOpen(false);
          }}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition"
        >
          Login
        </Button>
      )}
    </div>
  )}
</nav>
  );
};

export default Navbar;