import React from "react";
import "./scss/MainSwiperBannerChair.scss";
import "animate.css";
import { useNavigate } from "react-router-dom";

const MainSwiperBannerChair = () => {
  const navigate = useNavigate();
  const goHandleNote = () => {
    navigate("/shop/product/24");
  };
  return (
    <section className="main-swiper-chair">
      <div className="text-box">
        <p className="animate__animated animate__fadeInDown">Note Collection</p>
        <h2 className="animate__animated animate__fadeInDown">LOTE CHAIR</h2>
        <button
          onClick={goHandleNote}
          className="animate__animated animate__fadeInDown"
        >
          SHOP NOW
        </button>
      </div>

      <div className="img-box">
        <img
          className=" left animate__animated animate__fadeInBottomLeft"
          src="/images/main-best-chair-left.png"
          alt="제품이미지"
        />
        <img
          className="right animate__animated animate__fadeInTopRight"
          src=" /images/main-best-chair-right.png"
          alt="제품이미지"
        />
      </div>
    </section>
  );
};

export default MainSwiperBannerChair;
