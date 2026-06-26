import React, { use } from "react";

const Review = ({ reviewData }) => {
  const reviews = use(reviewData);
  console.log(reviews);
  return <div>Reviews</div>;
};

export default Review;
