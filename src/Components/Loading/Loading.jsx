import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-base-100">
      <span className="loading loading-spinner loading-lg text-secondary"></span>

      <h2 className="text-xl font-semibold text-secondary">Loading...</h2>

      <p className="text-sm text-black">
        Please wait while we load your content.
      </p>
    </div>
  );
};

export default Loading;
