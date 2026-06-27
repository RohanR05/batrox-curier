import React, { Suspense } from "react";
import Banner from "./Banner/Banner";
import Review from "./Review/Review";

const Home = () => {
  const reviewData = fetch("/reviews.json").then((res) => res.json());

  return (
    <div className="mx-2 md:mx-auto">
      <Banner></Banner>
      <Suspense fallback={<p>Loading Reviews</p>}>
        <Review reviewData={reviewData}></Review>
      </Suspense>
    </div>
  );
};

export default Home;
