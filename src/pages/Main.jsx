import React from 'react'
import "./scss/Main.scss";
import MainSwiper from '../components/MainSwiper';
import MainSection3 from '../components/MainSection3';
import MainCategory from '../components/MainCategory';
import MainStories from '../components/MainStories';
import MainSofa from '../components/MainSofa';


const Main = () => {
  return (
    <main>
      <section className="main-video-wrap">
        <video src="/video/chairVideo.mov"
          muted
          autoPlay
          loop
          playsInline />
      </section>
      <MainSwiper />
      <MainSection3/>
      <MainCategory/>
      <MainSofa/>
      <MainStories/>


    </main>
  )
}

export default Main