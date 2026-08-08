import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import forbiddenAnimation from "../../assets/404Blink.json"; // Adjust path to assets as needed

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary/20 p-6 text-center">
      {/* Lottie Animation Wrapper */}
      <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <DotLottiePlayer
          src={forbiddenAnimation}
          autoplay
          loop
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Error Message */}
      <span className="text-xs font-bold tracking-widest uppercase text-secondary/80 mt-2">
        Error 403
      </span>
      <h1 className="text-3xl md:text-4xl font-extrabold text-secondary mt-1">
        Access Forbidden
      </h1>
      <p className="text-sm text-gray-600 max-w-md mt-2 leading-relaxed">
        You don’t have authorization to view this page. If you believe this is a mistake, contact your administrator.
      </p>

      {/* Navigation Options */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-white px-5 min-h-10 h-10 text-xs font-semibold uppercase tracking-wider rounded-lg"
        >
          Go Back
        </button>

        <Link
          to="/"
          className="btn bg-secondary text-white hover:bg-secondary/90 border-none px-5 min-h-10 h-10 text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;