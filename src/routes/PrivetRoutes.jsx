import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router";

const PrivetRoutes = (children) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <p>Loading</p>;
  }
  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};

export default PrivetRoutes;
