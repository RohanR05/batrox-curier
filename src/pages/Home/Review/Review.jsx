import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import ReviewsCard from "../ReviewsCard/ReviewsCard";

const Review = ({ reviewData }) => {
  const reviews = use(reviewData);

  return (
    <div className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Customer Reviews</h2>
        <p className="mt-2 text-primary max-w-xl mx-auto">
          Discover why thousands of customers trust 3 Curier for fast, secure,
          and reliable deliveries.
        </p>
      </div>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id || review.id}>
            <ReviewsCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
