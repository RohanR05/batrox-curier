import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl bg-primary">
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
