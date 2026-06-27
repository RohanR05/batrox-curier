import React, { use } from "react";
import { EffectFlip, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewsCard from "../ReviewsCard/ReviewsCard";

const Review = ({ reviewData }) => {
  const reviews = use(reviewData);
  console.log(reviews);
  return (
    <div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        slidesPerView={3}
        centeredSlides={true}
        coverflowEffect={{
          rotate: "50",
          stretch: "0",
          depth: "100",
          modifier: "1",
          slideShadows: true,
        }}
        modules={[EffectFlip, Pagination]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewsCard review={review}></ReviewsCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
