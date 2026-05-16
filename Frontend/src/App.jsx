import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Verify from "./pages/verify";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Admin/AdminSales";
import AdminSales from "./pages/Admin/AdminSales";
import AdminDashLayout from "./Layout/AdminDashLayout";
import AddProduct from "./pages/Admin/AddProduct";
import AdminOrder from "./pages/Admin/AdminOrder";
import AdminProduct from "./pages/Admin/AdminProduct";
import AdminUsers from "./pages/Admin/AdminUsers";
import ShowUserOrder from "./pages/Admin/ShowUserOrder";
import UserInfo from "./pages/Admin/UserInfo";
import ProtectedRoute from "./components/ProtectedRoute";
import SinglePages from "./pages/SinglePages";
import Address from "./pages/Address";
import OrderSuccess from "./pages/OrderSuccess";
import ScrollToTop from "./components/ScrollToTop";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/address"
          element={
            <ProtectedRoute>
              <Address  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess  />
            </ProtectedRoute>
          }
        />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<SinglePages />} />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/verify/:token" element={<VerifyEmail />} />


        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="sales" element={<AdminSales />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="admin-products" element={<AdminProduct />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/orders/:userId" element={<ShowUserOrder />} />
          <Route path="users/:id" element={<UserInfo />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
