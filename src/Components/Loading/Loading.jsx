import React from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import loadingAnimation from "../../assets/LoadingBouncingball.json";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-28 h-28 flex items-center justify-center">
        <DotLottiePlayer
          src={loadingAnimation}
          autoplay
          loop
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <span className="mt-3 text-xs tracking-widest uppercase font-semibold text-secondary animate-pulse">
        Loading content
      </span>
    </div>
  );
};

export default Loading;
