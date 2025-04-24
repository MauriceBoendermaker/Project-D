import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateLayout: React.FC = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

