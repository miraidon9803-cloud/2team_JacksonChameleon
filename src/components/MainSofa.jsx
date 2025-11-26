import React, { useEffect, useState } from "react";
import "./scss/MainSofa.scss";

const lerp = (from, to, t) => from + (to - from) * t;

const initialOffsets = {
  sofa1: { x: -350, y: 0 },
  sofa2: { x: -300, y: -400 },
  sofa3: { x: 200, y: -300 },
  sofa4: { x: 100, y: -100 },
  sofa5: { x: -320, y: 260 },
  sofa6: { x: 250, y: 50 },
};

const MainSofa = () => {
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

  const start = 2300;
  const end = 2700;
  const rawProgress = (scrollY - start) / (end - start);
  const progress = Math.min(Math.max(rawProgress, 0), 1);
  const opacity = progress < 0.5 ? progress * 2 : 1;
  const textTrigger = scrollY >= 2600;

  return (
    <div className="main-sofa-wrap">
      <div className="inner-wrap">
        <div className="inner">
          <div className="sofa-wrap">
            <div
              className="sofa1"
              style={{
                transform: `translate(${lerp(
                  initialOffsets.sofa1.x,
                  0,
                  progress
                )}px, ${lerp(initialOffsets.sofa1.y, 0, progress)}px)`,
                opacity: progress < 0.5 ? progress * 2 : 1,
              }}
            >
              <img src="/images/sofa-1.png" alt="1" />
            </div>
            <div
              className="sofa2"
              style={{
                transform: `translate(${lerp(
                  initialOffsets.sofa2.x,
                  0,
                  progress
                )}px, ${lerp(initialOffsets.sofa2.y, 0, progress)}px)`,
                opacity: progress < 0.5 ? progress * 2 : 1,
              }}
            >
              <img src="/images/sofa-2.png" alt="2" />
            </div>
            <div
              className="sofa3"
              style={{
                transform: `translate(${lerp(
                  initialOffsets.sofa3.x,
                  0,
                  progress
                )}px, ${lerp(initialOffsets.sofa3.y, 0, progress)}px)`,
                opacity: progress < 0.5 ? progress * 2 : 1,
              }}
            >
              <img src="/images/sofa-3.png" alt="3" />
            </div>
            <div
              className="sofa4"
              style={{
                transform: `translate(${lerp(
                  initialOffsets.sofa4.x,
                  0,
                  progress
                )}px, ${lerp(initialOffsets.sofa4.y, 0, progress)}px)`,
                opacity: progress < 0.5 ? progress * 2 : 1,
              }}
            >
              <img src="/images/sofa-4.png" alt="4" />
            </div>
            <div
              className="sofa5"
              style={{
                transform: `translate(${lerp(
                  initialOffsets.sofa5.x,
                  0,
                  progress
                )}px, ${lerp(initialOffsets.sofa5.y, 0, progress)}px)`,
                opacity: progress < 0.5 ? progress * 2 : 1,
              }}
            >
              <img src="/images/sofa-5.png" alt="5" />
            </div>
            <div
              className="sofa6"
              style={{
                transform: `translate(${lerp(
                  initialOffsets.sofa6.x,
                  0,
                  progress
                )}px, ${lerp(initialOffsets.sofa6.y, 0, progress)}px)`,
                opacity: progress < 0.5 ? progress * 2 : 1,
              }}
            >
              <img src="/images/sofa-6.png" alt="6" />
            </div>
          </div>
          <div
            className="text-wrap"
            style={{
              opacity: textTrigger ? 1 : 0,
              transition: "opacity 0.3s ease-out",
            }}
          >
            <div className="text-box">
              <h2
                className={
                  textTrigger ? "animate__animated animate__fadeInDown" : ""
                }
              >
                Identity
              </h2>
              <h3
                className={
                  textTrigger ? "animate__animated animate__fadeInDown" : ""
                }
              >
                MODULE SOFA
              </h3>
              <p
                className={
                  textTrigger ? "animate__animated animate__fadeInDown" : ""
                }
              >
                사용자가 원하는대로 자유로운 모듈 구성이 가능합니다. 등받이,
                팔걸이, 시트 모두 하나의 유닛으로 확장, 분리가 가능하여 구성의
                제약이 없는 것이 특징입니다.{" "}
              </p>
            </div>
            {/* <button
              className={
                textTrigger ? "animate__animated animate__fadeInDown" : ""
              }
            >
              {" "}
              SHOP NOW
            </button> */}
          </div>
          <div className="effect-box">
            <div
              className="ellipse"
              style={{
                width: textTrigger ? "1100px" : "0px",
                height: textTrigger ? "40px" : "10px",
                filter: textTrigger ? "blur(20px)" : "blur(10px)",
                opacity: textTrigger ? 0.5 : 0,
                transition: "all 0.4s ease-out",
              }}
            ></div>
            <div className="hidden-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSofa;
