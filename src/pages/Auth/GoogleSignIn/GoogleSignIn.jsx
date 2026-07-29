import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const GoogleSignIn = () => {
  const { googleSignInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const from =
    location.state?.from?.pathname || location.state?.pathname || "/";

  // Reusable Toast helper
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      const res = await googleSignInUser();

      const userInfo = {
        email: res.user?.email,
        name: res.user?.displayName,
        photoURL: res.user?.photoURL,
      };

      // 1. Save user to database FIRST
      await axiosSecure.post("/users", userInfo);

      // 2. Show success toast
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });

      // 3. Navigate only AFTER database saving completes
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: error.message || "Failed to sign in",
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="btn bg-secondary text-primary hover:shadow-xl w-full"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
