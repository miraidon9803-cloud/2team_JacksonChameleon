import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./scss/MainStories.scss";

const MainStories = () => {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const stories = [
    { id: 1, img: "/images/mainstory1.png", title: "Colour Edition 2025" },
    {
      id: "eListPrdImage3423_46",
      img: "/images/mainstory2.png",
      title: "1인부터 4인까지",
    },
    {
      id: "eListPrdImage4295_46",
      img: "/images/mainstory3.png",
      title: "With White",
    },
    {
      id: "eListPrdImage4234_46",
      img: "/images/mainstory4.png",
      title: "Happy New Year's My House",
    },
    {
      id: "eListPrdImage3659_46",
      img: "/images/mainstory5.png",
      title: "Clay",
    },
    {
      id: "eListPrdImage3211_46",
      img: "/images/mainstory6.png",
      title: "불편함보다 편리함이 더 큰 미니멀 인테리어",
    },
    {
      id: "eListPrdImage4242_46",
      img: "/images/mainstory7.png",
      title: "하우스 오브 잭슨카멜레온",
    },
    {
      id: "eListPrdImage3738_46",
      img: "/images/mainstory8.png",
      title: "블랙이 끌리는 이유",
    },
  ];

  return (
    <section className="mainstory-wrap">
      <div className="inner-wrap">
        <div className="inner">
          <h2>Stories</h2>

          {/* Custom Navigation Buttons */}
          <div className="story-nav">
            <button className="custom-prev" ref={prevRef} aria-label="Previous">
              <img src="/images/Arrow-left.png" alt="left" />
            </button>
            <button className="custom-next" ref={nextRef} aria-label="Next">
              <img src="/images/Arrow-right.png" alt="right" />
            </button>
          </div>

          <Swiper
            modules={[Pagination, Navigation]}
            className="mySwiper"
            slidesPerView={3}
            spaceBetween={24}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 12 },
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {stories.map((story) => (
              <SwiperSlide key={story.id}>
                <div
                  className="mainstory-cards"
                  onClick={() => {
                    navigate(`/about/story/${story.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div>
                    <img src={story.img} alt={story.title} />
                  </div>
                  <p>{story.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default MainStories;
