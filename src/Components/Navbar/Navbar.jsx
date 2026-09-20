import { NavLink, useLocation } from "react-router";
import Swal from "sweetalert2";
import {
  FaHome,
  FaMapMarkedAlt,
  FaBoxOpen,
  FaTachometerAlt,
  FaMotorcycle,
} from "react-icons/fa";
import Logo from "../Logo/Logo";
import useAuth from "../../Hooks/useAuth";

const baseLink =
  "flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200";

// Desktop: sits on the dark (secondary) navbar
const desktopLink = ({ isActive }) =>
  `${baseLink} text-primary hover:bg-primary/20 ${
    isActive ? "bg-primary/25 ring-2 ring-primary font-bold" : "opacity-80"
  }`;

// Mobile dropdown: sits on a light (base-100) background
const mobileLink = ({ isActive }) =>
  `${baseLink} text-secondary hover:bg-secondary/10 ${
    isActive ? "bg-secondary/40 font-bold" : ""
  }`;

const Navbar = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logOut()
      .then(() => {
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

  const renderLinks = (linkClass) => (
    <>
      <li>
        <NavLink to="/" end className={linkClass}>
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className={linkClass}>
          <FaMapMarkedAlt /> Coverage
        </NavLink>
      </li>
      <li>
        <NavLink to="/send-Parcel" className={linkClass}>
          <FaBoxOpen /> Send Parcel
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashBoard" className={linkClass}>
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-secondary shadow-md fixed w-full z-10 top-0">
      <div className="navbar max-w-7xl mx-auto text-primary">
        {/* Left: mobile menu + logo */}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow gap-1"
            >
              {renderLinks(mobileLink)}
              <li className="md:hidden">
                <NavLink to="/beARider" className={mobileLink}>
                  <FaMotorcycle /> Be A Rider?
                </NavLink>
              </li>
            </ul>
          </div>
          <Logo />
        </div>

        {/* Center: desktop links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {renderLinks(desktopLink)}
          </ul>
        </div>

        {/* Right: rider button + auth */}
        <div className="navbar-end">
          <NavLink
            to="/beARider"
            className="btn text-secondary hidden md:inline-flex mr-3 text-lg"
          >
            <FaMotorcycle /> Be a Rider
          </NavLink>

          {user ? (
            <div className="dropdown dropdown-end">
              {/* Avatar trigger */}
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

              {/* Profile menu */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-10 p-3 shadow-xl bg-white text-secondary border-2 border-secondary rounded-box w-56"
              >
                <li className="px-2 py-2 border-b border-primary/40 mb-2 pointer-events-none">
                  <p className="font-semibold text-sm text-secondary truncate">
                    Name: {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-secondary truncate">
                    {user?.email}
                  </p>
                </li>
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
            <NavLink
              state={{ from: location }}
              to="/login"
              className="btn bg-primary text-slate-900 hover:bg-primary/80 border-none font-semibold text-md md:text-lg"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
