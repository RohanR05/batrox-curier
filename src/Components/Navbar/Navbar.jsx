import React from "react";
import { NavLink, useLocation } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../Hooks/useAuth";
import { auth } from "../../firebase/firebase.init";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logOut()
      .then((result) => {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        }).fire({
          icon: "info",
          title: "Logged out successfully",
        });
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
      {user && (
        <li>
          <NavLink to={"/dashBoard"}>DashBoard</NavLink>
        </li>
      )}
      <li className="inline-block md:hidden">
        <NavLink to={"/beARider"}>Be A Rider?</NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-secondary shadow-md fixed w-full z-10 top-0">
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
            <div className="dropdown dropdown-end">
              {/* 1. Clickable Avatar Trigger */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-primary hover:border-secondary transition-all"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Profile"
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/mR4qB8X/user-placeholder.png"
                    }
                  />
                </div>
              </div>

              {/* 2. Menu that pops up on click */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-white text-secondary border-3  border-secondary rounded-box w-56"
              >
                {/* User Info Header */}
                <li className="px-2 py-2 border-b border-primary/40 mb-2 pointer-events-none">
                  <p className="font-semibold text-sm text-secondary truncate">
                    Name: {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-secondary truncate">
                    {user?.email}
                  </p>
                </li>

                {/* Logout Button */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm bg-secondary text-white hover:bg-secondary/80 border-none w-full mt-1"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink state={{ from: location }} to="/login">
              <button className="btn bg-primary text-slate-900 hover:bg-primary/80 border-none font-semibold text-md md:text-lg">
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
