import React from 'react'
import "./scss/Main.scss";
import MainSwiper from '../components/MainSwiper';


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

    </main>
  )
}

export default Main