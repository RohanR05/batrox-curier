import React from "react";
import { NavLink } from "react-router";

const Logo = () => {
  return (
    <div className="text-xl font-bold">
      <NavLink to={"/"}>
        Bat<strong className="text-black">Rox</strong>
      </NavLink>
    </div>
  );
};

export default Logo;
