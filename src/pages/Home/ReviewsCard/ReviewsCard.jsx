import React from "react";

const ReviewsCard = ({ review }) => {
  const {
    userName,
    user_email,
    ratings,
    review: reviewText,
    user_photoURL,
    date,
  } = review;

  return (
    <div className="bg-secondary rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <img
          src={user_photoURL}
          alt={userName}
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h3 className="text-lg font-bold text-primary">{userName}</h3>
          <p className="text-sm text-primary-500">{user_email}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-primary text-lg">⭐</span>
        <span className="font-semibold">{ratings}/5</span>
      </div>

      {/* Review */}
      <p className="mt-4 font-semibold text-info  leading-relaxed">
        "{reviewText}"
      </p>

      {/* Date */}
      <div className="mt-5 text-right text-sm text-primary">
        {new Date(date).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ReviewsCard;