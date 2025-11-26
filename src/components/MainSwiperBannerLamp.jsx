import React from "react";
import "./scss/MainSwiperBannerLamp.scss";
import "animate.css";
import { useNavigate } from "react-router-dom";

const MainSwiperBannerLamp = () => {
  const navigate = useNavigate();
  const handleGoCone = () => {
    navigate("./shop/product/76");
  };
  return (
    <section className="main-swiper">
      <div className="text-box">
        <p className="animate__animated animate__fadeInDown">Cone Collection</p>
        <h2 className="animate__animated animate__fadeInDown">CONE LAMP</h2>
        <button
          onClick={handleGoCone}
          className="animate__animated animate__fadeInDown"
        >
          SHOP NOW
        </button>
      </div>

      <div className="img-box">
        <img
          className=" left animate__animated animate__fadeInBottomLeft"
          src="/images/main-best-lamp-left.png"
          alt="제품이미지"
        />
        <img
          className="right animate__animated animate__fadeInTopRight"
          src=" /images/main-best-lamp-right.png"
          alt="제품이미지"
        />
      </div>
    </section>
  );
};

export default MainSwiperBannerLamp;
