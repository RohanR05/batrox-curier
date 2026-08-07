import React from "react";
import UseRole from "../Hooks/UseRole";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = UseRole();
  const { user, loading } = useAuth();

  if (isLoading || loading) {
    return <Loading></Loading>;
  }
  if (role !== "admin") {
    return;
  }
  return children;
};

export default AdminRoute;
