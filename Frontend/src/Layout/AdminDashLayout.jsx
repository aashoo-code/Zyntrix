import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CgMenuGridR } from "react-icons/cg";
const AdminDashLayout = () => { 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="h-screen flex flex-col overflow-hidden">
    
    {/* Hamburger button — fixed, navbar ke upar, sirf mobile pe */}

    <Navbar />
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="lg:hidden fixed top-3 right-25 z-[999] text-cyan-400 mb-20 lg:mb-0 p-2 rounded-lg bg-transparent border border-slate-700 hover:bg-slate-700"
    >
      <CgMenuGridR className="w-5 h-5" />
    </button>

    <div className="flex flex-1 pt-16 overflow-hidden">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static top-16 left-0 h-[calc(100vh-4rem)] z-30
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-[calc(100vh-4rem)] transition-all duration-300">
        <Outlet />
      </div>

    </div>
  </div>
  );
};

export default AdminDashLayout;