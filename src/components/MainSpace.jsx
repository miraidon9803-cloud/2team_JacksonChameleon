import React, { useRef, useState } from "react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./scss/MainSpace.scss";

const MainSpace = () => {
  return (
    <div className="SpaceSolution-wrap">
      <div className="inner-wrap">
        <div className="inner">
          <h2>Space Solution</h2>
        </div>
        <Swiper
          effect={"creative"}
          grabCursor={true}
          loop={true}
          speed={1000}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          pagination={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectCreative, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/images/Space1.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/Space2.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/Space3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/Space4.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/Space5.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/Space7.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/Space8.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/Space9.png" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MainSpace;
