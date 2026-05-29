import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({ user }) => {
  // Agar user logged in nahi hai ya uska role admin nahi hai, toh redirect karo
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Agar admin hai, toh child components ko render hone do
  return <Outlet />;
};

export default AdminRoute;