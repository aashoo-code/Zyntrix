import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

const AdminSales = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesByDate: [],
  });

  const fetchStats = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/order/sales`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        setStats(res.data);
        toast.success("Data fetch Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("error while fetching user details");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* STATS GRID */}
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Users */}
          {/* USERS */}
          <Card
            className="bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-transparent
text-rose-100
border border-rose-400/20
shadow-md hover:shadow-rose-500/20
hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-2xl backdrop-blur-md"
          >
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {stats.totalUsers}
            </CardContent>
          </Card>

          {/* PRODUCTS */}
          <Card
            className="bg-gradient-to-br from-indigo-500/20 via-blue-500/10 to-transparent
text-blue-100
border border-blue-400/20
shadow-md hover:shadow-blue-500/20
hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-2xl backdrop-blur-md"
          >
            <CardHeader>
              <CardTitle>Total Products</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {stats.totalProducts}
            </CardContent>
          </Card>

          {/* ORDERS */}
          <Card
            className="bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent
text-emerald-100
border border-emerald-400/20
shadow-md hover:shadow-emerald-500/20
hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-2xl backdrop-blur-md"
          >
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {stats.totalOrders}
            </CardContent>
          </Card>

          {/* SALES */}
          <Card
            className="bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-transparent
text-yellow-100
border border-yellow-400/20
shadow-md hover:shadow-yellow-500/20
hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-2xl backdrop-blur-md"
          >
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              ₹{" "}
              {stats.totalSales?.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </CardContent>
          </Card>
        </div>

        {/* CHART SECTION */}
        {/* rounded-2xl shadow-lg border border-slate-700 bg-slate-900 */}
        <Card className="rounded-2xl shadow-lg border bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-cyan-200">
              Sales (Last 30 Days)
            </CardTitle>
          </CardHeader>

          {/* ❌ removed bg + blur from here */}
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.sales}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a", // bg change here
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#e2e8f0",
                  }}
                  labelStyle={{ color: "#67E8F9" }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#67E8F9"
                  fill="url(#cyanGradient)"
                  strokeWidth={2}
                />

                <defs>
                  <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#67E8F9" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#67E8F9" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSales;
