import React, { useState } from "react";
import "./scss/Main.scss";
import MainSwiper from "../components/MainSwiper";
import MainSection3 from "../components/MainSection3";
import MainCategory from "../components/MainCategory";
import MainStories from "../components/MainStories";
import MainSofa from "../components/MainSofa";
import MainSpace from "../components/MainSpace";

const Main = () => {
  const [isVisibleMainpopup, setIsVisibleMainpopup] = useState(true);

  const handleClosePopup = () => {
    setIsVisibleMainpopup(false);
  };

  return (
    <main>
      <section className="main-video-wrap">
        <video src="/video/chairVideo.mov" muted autoPlay loop playsInline />

        <div className="main-title">
          <p>Round B Lounge Chair</p>
          <p>
            Round B chair complete with the silhouette itself <br />
            It has a high-quality silhouette in a simpler form by minimizing the
            processing range of wood.
          </p>
        </div>

        {isVisibleMainpopup && (
          <div className="main-popup">
            <p>
              다양한 커스텀이 가능한 잭슨파멜레온을 만나보세요
              <span onClick={handleClosePopup}>
                <img src="./images/cancel.png" alt="" />
              </span>
            </p>
          </div>
        )}
      </section>
      <MainSwiper />
      <MainSection3 />
      <MainCategory />
      <MainSofa />
      <MainSpace />
      <MainStories />
    </main>
  );
};

export default Main;
