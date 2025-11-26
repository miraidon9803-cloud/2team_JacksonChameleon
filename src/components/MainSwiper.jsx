import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import MainSwiperBanner from "../components/MainSwiperBanner";
import MainSwiperBannerLamp from "./MainSwiperBannerLamp";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./scss/MainSwiper.scss";
import MainSwiperBannerChair from "./MainSwiperBannerChair";

// import 'animate.css';
// import WOW from 'wowjs';

const MainSwiper = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // useEffect(() => {
  //   // WOW.js 초기화
  //   new WOW.WOW({
  //     boxClass: "wow", // 애니메이션 적용할 기본 클래스
  //     animateClass: "animate__animated", // Animate.css의 필수 클래스
  //     offset: 0, // 화면에 얼마나 들어와야 실행될지 (px)
  //     mobile: true, // 모바일에서도 작동할지 여부
  //     live: true, // 동적으로 추가된 요소도 감시할지
  //   }).init();
  // }, []);

  return (
    <div className="inner main-swiper-wrap">
      <p className="main-swiper-title">Bestseller</p>
      <Swiper
        autoplay={{
          delay: 3500,
        }}
        loop={true}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper1"
      >
        <SwiperSlide>
          <MainSwiperBannerLamp />
        </SwiperSlide>
        <SwiperSlide>
          <MainSwiperBanner
            title="BUMPY SOFA"
            subTitle="Bumpy Collection"
            frontImg="/images/main-best-bumpy-front.png"
            backImg="/images/main-best-bumpy-back.png"
            productId={28}
          />
        </SwiperSlide>
        <SwiperSlide>
          <MainSwiperBanner
            title="PEBBLE SOFA"
            subTitle="Pebble Collection"
            frontImg="/images/main-best-pebble-front.png"
            backImg="/images/main-best-pebble-back.png"
            productId={4}
          />
        </SwiperSlide>
        <SwiperSlide>
          <MainSwiperBanner
            title="OTIUM SOFA"
            subTitle="Otium Collection"
            frontImg="/images/main-best-otium-front.png"
            backImg="/images/main-best-otium-back.png"
            productId={96}
          />
        </SwiperSlide>
        <SwiperSlide>
          <MainSwiperBannerChair />
        </SwiperSlide>
      </Swiper>

      <Swiper
        autoplay={{
          delay: 3500,
        }}
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img src="/images/main-swiper-1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/main-swiper-2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/main-swiper-3.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/main-swiper-4.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/main-swiper-5.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainSwiper;
