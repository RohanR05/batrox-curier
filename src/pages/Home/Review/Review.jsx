import React, { use } from "react";
import { EffectFlip, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Review = ({ reviewData }) => {
  const reviews = use(reviewData);
  console.log(reviews);
  return (
    <div>
      {" "}
      <>
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
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/abstract-1.jpg" />
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
};

export default Review;
