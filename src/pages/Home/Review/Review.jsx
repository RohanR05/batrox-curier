import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import ReviewsCard from "../ReviewsCard/ReviewsCard";

const Review = ({ reviewData }) => {
  const reviews = use(reviewData);

  return (
    <div className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl text-secondary font-bold">
          Customer Reviews
        </h2>
        <p className="mt-2 max-w-xl mx-auto">
          Discover why thousands of customers trust 3 Curier for fast, secure,
          and reliable deliveries.
        </p>
      </div>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        spaceBetween={30}
        speed={800}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.1,
          },
          640: {
            slidesPerView: 1.6,
          },
          1024: {
            slidesPerView: 2.5,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 180,
          modifier: 1.9,
          scale: 0.9,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper py-10"
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
