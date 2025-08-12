import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    // Not logged in — redirect to login
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    // Logged in but not admin — redirect or show unauthorized
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default AdminRoute;
