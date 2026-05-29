// src/components/AdminProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // Maan rha hoon aapke paas useAuth hook hai

const AdminProtectedRoute = () => {
  const { user, loading } = useAuth(); // AuthContext se user aur loading nikaalein

  // Agar abhi data backend se aa rha hai, toh loading screen dikhayein
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading Admin Panel...</div>;
  }

  // Agar user logged in nahi hai, YA uska role 'admin' nahi hai, toh use bhaga do (e.g., signin ya dashboard par)
  if (!user || user.role !== "admin") {
    return <Navigate to="/signin" replace />;
  }

  // Agar user admin hai, toh saare child pages (dashboard, create framework) khulne do
  return <Outlet />;
};

export default AdminProtectedRoute;