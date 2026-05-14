import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { BsSearch } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdModeEdit } from "react-icons/md";
import { ImEye } from "react-icons/im";
import { useNavigate } from "react-router-dom";
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/users/all-users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.users);
        toast.success("Users fetched successfully");
      }
      console.log("Users:", res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    getAllUsers();
  }, []);
  console.log(users);

  return (
   <div className="min-h-screen w-full p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
  
  <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">User Management</h2>
  <p className="text-slate-400 text-sm sm:text-base">Manage all users in the system</p>

  {/* Search */}
  <div className="flex items-center relative w-full sm:w-[300px] mt-6">
    <BsSearch className="absolute left-3 text-slate-400" />
    <Input
      className="pl-10 h-11 w-full bg-slate-800 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-cyan-500"
      placeholder="Search users..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  {/* User Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 mt-7">
    {filteredUsers.map((user, idx) => (
      <div
        key={idx}
        className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-cyan-400 shadow-lg hover:shadow-cyan-400/20 transition-all duration-300"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={user?.profilePicture || "/user.jpg"}
            alt="ProfilePic"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-cyan-400 flex-shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <h1 className="text-base sm:text-lg font-semibold text-white truncate">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-slate-400 text-sm truncate">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-4 mt-4">
          <Button
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl text-sm px-3 sm:px-4"
            onClick={() => navigate(`/dashboard/users/${user?._id}`)}
          >
            <MdModeEdit /> Edit
          </Button>
          <Button
            onClick={() => navigate(`/dashboard/users/orders/${user?._id}`)}
            className="bg-slate-700 hover:bg-slate-600 text-white border border-cyan-400 rounded-xl text-sm px-3 sm:px-4"
          >
            <ImEye /> Show Orders
          </Button>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default AdminUsers;
