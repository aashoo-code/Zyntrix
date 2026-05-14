import React from "react";
import { NavLink } from "react-router-dom";
import { TbLayoutBoardFilled } from "react-icons/tb";
import { LuPackagePlus } from "react-icons/lu";
import { LuPackageSearch } from "react-icons/lu";
import { HiUsers } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
const Sidebar = () => {
  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white border-r border-gray-800 rounded p-10 md:block w-full h-full">
      <div className="text-center px-3 space-y-8">
        <NavLink
          to="/dashboard/sales"
          className={({ isActive }) =>
            `text-xl flex items-center gap-3 cursor-pointer p-3 py-5 rounded-2xl w-full font-bold transition-all duration-300
   border
   ${
     isActive
       ? "bg-gradient-to-r from-slate-800 to-slate-900 border-cyan-400 border-2"
       : "bg-transparent border-slate-700 hover:border-cyan-400 hover:bg-slate-800"
   }`
          }
        >
          <span className="font-black ">
            <TbLayoutBoardFilled />
          </span>{" "}
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/dashboard/add-product"
          className={({ isActive }) =>
            `text-xl flex items-center gap-3 cursor-pointer p-3 py-5 rounded-2xl w-full font-bold transition-all duration-300
   border
   ${
     isActive
       ? "bg-gradient-to-r from-slate-800 to-slate-900 border-cyan-400 border-2"
       : "bg-transparent border-slate-700 hover:border-cyan-400 hover:bg-slate-800"
   }`
          }
        >
          <span className="font-black ">
            <LuPackagePlus />
          </span>{" "}
          <span>Add Product</span>
        </NavLink>

        <NavLink
          to="/dashboard/admin-products"
          className={({ isActive }) =>
            `text-xl flex items-center gap-3 cursor-pointer p-3 py-5 rounded-2xl w-full font-bold transition-all duration-300
   border
   ${
     isActive
       ? "bg-gradient-to-r from-slate-800 to-slate-900 border-cyan-400 border-2"
       : "bg-transparent border-slate-700 hover:border-cyan-400 hover:bg-slate-800"
   }`
          }
        >
          <span className="font-black ">
            <LuPackageSearch />
          </span>{" "}
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `text-xl flex items-center gap-3 cursor-pointer p-3 py-5 rounded-2xl w-full font-bold transition-all duration-300
   border
   ${
     isActive
       ? "bg-gradient-to-r from-slate-800 to-slate-900 border-cyan-400 border-2"
       : "bg-transparent border-slate-700 hover:border-cyan-400 hover:bg-slate-800"
   }`
          }
        >
          <span className="font-black ">
            <HiUsers />
          </span>{" "}
          <span>users</span>
        </NavLink>

        <NavLink
          to="/dashboard/orders"
          className={({ isActive }) =>
            `text-xl flex items-center gap-3 cursor-pointer p-3 py-5 rounded-2xl w-full font-bold transition-all duration-300
   border
   ${
     isActive
       ? "bg-gradient-to-r from-slate-800 to-slate-900 border-cyan-400 border-2"
       : "bg-transparent border-slate-700 hover:border-cyan-400 hover:bg-slate-800"
   }`
          }
        >
          <span className="font-black ">
            <FaRegEdit />
          </span>{" "}
          <span>Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
