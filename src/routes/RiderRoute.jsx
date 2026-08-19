import React from "react";
import useAuth from "../Hooks/useAuth";
import UseRole from "../Hooks/UseRole";
import Loading from "../Components/Loading/Loading";
import Forbidden from "../Components/Forbidden/Forbidden";

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = UseRole();

  if (loading || isLoading) {
    return <Loading></Loading>;
  }
  if (role !== "rider") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default RiderRoute;
