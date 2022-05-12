import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function privateRoute(props) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  let dataUser = localStorage.getItem("dataUser");

  dataUser = JSON.parse(dataUser);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (props.isAdmin && dataUser.role !== "admin") {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
