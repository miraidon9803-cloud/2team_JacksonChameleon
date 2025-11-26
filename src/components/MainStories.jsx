import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./scss/MainStories.scss";

import { Navigation, Pagination } from "swiper/modules";

const MainStories = () => {
  return (
    <section className="mainstory-wrap">
      <div className="inner-wrap">
        <div className="inner">
          <h2>Stories</h2>

          <Swiper
            slidesPerView={3}
            spaceBetween={24}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <div className="swiper-button-prev custom-prev">
              <img src="/images/Arrow-left.png" alt="left" />
            </div>
            <div className="swiper-button-next custom-next">
              <img src="/images/Arrow-right.png" alt="right" />
            </div>
            <SwiperSlide>
              <div className="mainstory-cards">
                <div>
                  <img src="/images/mainstory1.png" alt="" />
                </div>
                <p>Colour Edition 2025</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="mainstory-cards">
                <div>
                  <img src="/images/mainstory2.png" alt="" />
                </div>
                <p>1인부터 4인까지</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="mainstory-cards">
                <div>
                  <img src="/images/mainstory3.png" alt="" />
                </div>
                <p>With White</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="mainstory-cards">
                <div>
                  <img src="/images/mainstory4.png" alt="" />
                </div>
                <p>Happy New Year's My House</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="mainstory-cards">
                <div>
                  <img src="/images/mainstory5.png" alt="" />
                </div>
                <p>Clay</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="mainstory-cards">
                <div>
                  <img src="/images/mainstory6.png" alt="" />
                </div>
                <p>불편함보다 편리함이 더 큰 미니멀 인테리어</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="mainstory-cards">
                <div>
                  <img src="/images/mainstory7.png" alt="" />
                </div>
                <p>하우스 오브 잭슨카멜레온</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="mainstory-cards">
                <div>
                  <img src="/images/mainstory8.png" alt="" />
                </div>
                <p>블랙이 끌리는 이유</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default MainStories;
