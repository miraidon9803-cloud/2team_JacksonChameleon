import React, { useEffect, useState } from 'react'
import "./scss/MainSection3.scss";



const MainSection3 = () => {
    const [scrollY, setScrollY] = useState(0);


    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const textTrigger = 1000;
    const imgTrigger = 1300;

    const showTextAnim = scrollY >= textTrigger; 
    const showImage = scrollY >= imgTrigger;     

    return (

        <div className='texteffect-wrap'>
            <div className="inner-wrap">
                <div className="inner">

                    {showTextAnim && (
                        <div className={`text-wrap ${showImage ? 'is-active' : ''}`}>
                            <div className="top-text animate__animated animate__fadeInDown">
                                <div className='grey'>It's a</div>
                                <div className='grey2'>new</div>
                                <div><img src="/images/main-text2.png" alt="1" /></div>
                                <div className='black'>harmony </div>
                            </div>

                            <div className="bottom-text animate__animated animate__fadeInDown">
                                <div className='grey'>in your</div>
                                <div><img src="/images/main-text3.png" alt="2" /></div>
                                <div className='black'>comfortable</div>
                                <div><img src="/images/main-text1.png" alt="3" /></div>
                                <div className='grey2'>daily</div>
                                <div className='black'>life</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MainSection3