import React from "react";
import { NavLink, useLocation } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../Hooks/useAuth";
import { auth } from "../../firebase/firebase.init";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result);
        alert("logout");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/send-Parcel"}>Send Percel</NavLink>
      </li>
      <li className="inline-block md:hidden">
        <NavLink to={"/beARider"}>Be A Rider?</NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-secondary shadow-md">
      <div className="navbar max-w-7xl mx-auto text-primary">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 text-secondary font-bold rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <NavLink to={"/beARider"}>
            <button className="btn text-secondary hidden  md:inline-block mr-3 text-lg">
              Be a Rider
            </button>
          </NavLink>
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline text-md md:text-lg"
            >
              Logout
            </button>
          ) : (
            <NavLink state={location} to={"/login"}>
              <button className="btn btn-outline text-md md:text-lg">
                Login
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
