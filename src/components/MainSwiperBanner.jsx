import React from 'react'
import "./scss/MainSwiperBanner.scss";
import 'animate.css';


const MainSwiperBanner = ({ title, subTitle, frontImg, backImg }) => {
    return (
        <section className="main-swiper">
            <div className="text-box">
                <p className='animate__animated animate__fadeInDown'>{subTitle}</p>
                <h2 className='animate__animated animate__fadeInDown'>{title}</h2>
                <button className='animate__animated animate__fadeInDown'>SHOP NOW</button>
            </div>

            <div className="img-box">
                <img className='front wow animate__fadeInBottomLeft' data-wow-delay="1s" src={frontImg} alt="앞제품이미지" />
                <img className='back' src={backImg} alt="뒤제품이미지" />
            </div>
        </section>
    )
}

export default MainSwiperBanner