import React from "react";
import { NavLink } from "react-router";

const Logo = () => {
  return (
    <div className="text-xl font-bold">
      <NavLink to={"/"}>BatRox Courier</NavLink>
    </div>
  );
};

export default Logo;
