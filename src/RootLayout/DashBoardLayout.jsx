import React from "react";
import { FaBoxOpen } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { NavLink, Outlet } from "react-router";

const DashBoardLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-secondary text-primary font-bold">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-outline btn-primary hover:text-secondary"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">BatRox Courier DashBoard</div>
          </nav>
          {/* Page content here */}
          <div className="p-4">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-primary text-secondary font-semibold is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* Home */}
              <li>
                <NavLink
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  <HiHome className="my-1.5 inline-block size-5" />
                  <span className="is-drawer-close:hidden">Homepage</span>
                </NavLink>
              </li>
              {/* my parcels */}
              <li>
                <NavLink
                  to="my-parcels"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Parcels"
                >
                  <FaBoxOpen className="my-1.5 inline-block size-4" />
                  <span className="is-drawer-close:hidden">My Parcels</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
