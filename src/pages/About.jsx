import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "animate.css";
import "./scss/Aboutbrand.scss";

const About = () => {
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

  // 💡 스크롤 0~500px → 비율 0~1
  const start = 100; // 모션 시작 시점
  const end = 500; // 모션 끝 시점 (start + 500)
  const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);

  return (
    <div className="about-wrap">
      <div className="inner-wrap">
        <div className="inner">
          <div className="about-btn">
            <Link>
              {" "}
              <p className="active">Brand</p>
            </Link>
            <p>
              <Link to="/about/story">Stories</Link>
            </p>
          </div>
          <div className="brand-text-box">
            <h2>Who is JACKSON CHAMELEON?</h2>
            <p>일상 속 새로운 조화를 디자인하다</p>
          </div>
          <div className="visual-section">
            <div className="overflow-wrap">
              <div
                className="overflow-mask"
                style={{
                  transform: `translate3d(${progress * 612}px, ${
                    progress * 350
                  }px, 0)`,
                }}
              >
                <div
                  className="img-holder"
                  style={{
                    transform: `translate3d(-${progress * 612}px, 0, 0)`,
                  }}
                >
                  <img src="/images/brandMain.png" alt="brand" />
                </div>
              </div>
            </div>

            <div
              className="text-box first-text"
              style={{
                transform: `translate3d(${progress * 612}px, ${
                  progress * 350
                }px, 0)`,
                opacity: 1 - progress,
              }}
            >
              <h3 className="animate__animated animate__fadeInDown">
                DESIGNING <br /> NEW HARMONY
              </h3>
              <p className="sub-title animate__animated animate__fadeInDown">
                잭슨카멜레온은 일상 속 새로운 조화를 만들어 나가는 가구
                브랜드입니다. 익숙함은 편안함을 주고 독특함은 흥미를 자극합니다.
                각각의 제품에 스민 미학적 요소와 흥미로운 디테일, 고유성을 통해
                잭슨카멜레온의 가구는 공간에 개성과 더불어 신선함을 부여하고,
                나아가 일상 속 즐거움을 선사합니다.
              </p>
              <p className="sub-en animate__animated animate__fadeInDown">
                Jackson Chameleon is a furniture brand that creates new harmony
                in everyday life. Familiarity brings comfort, and uniqueness
                stimulates interest. With aesthetics, interesting details and
                originality infused in each furniture, Jackson Chameleon's
                furnitures provide individuality as well as a sense of
                fresh-ness to the space that gives pleasure to daily life.
              </p>
            </div>
            <div
              className="text-box second-text"
              style={{
                transform: `translate3d(-${(1 - progress) * 612}px, ${
                  progress * 350
                }px, 0)`,
                opacity: progress,
              }}
            >
              <h3>
                QUALITY <br /> AESTHETIC <br /> SATISFACTION
              </h3>
              <p>
                잭슨카멜레온은 전문성과 혁신성을 바탕으로, 뛰어난 품질과
                디자인이 조화롭게 균형을 이루는 가구와 제품을 제안합니다. 잭
                슨카멜레온은 고객과 시대의 요구, 가치에 맞는 솔루션을 모색하며
                동시대적 미학을 추구합니다. 무심코 지나치는 일상적 요소에 준
                작은 디자인적 전환이 예상치 못한 즐거움과 인상적인 경험이
                되어,이를 통한 만족감이 사용자의 일상을 통해 새로운 가능성과
                이야기들로 확장되기를 바랍니다.
              </p>
              <p className="sub-en">
                Based on expertise and innovation, Jackson Chameleon proposes
                furniture and products that balance outstanding quality and
                design in harmony. We pursue contemporary aesthetics, seeking
                solutions that fit the needs and values of our customers and the
                times. We hope that the small design twists given to casual
                elements of everyday life will become an unexpected pleasure and
                impressive experience, and that the satisfaction will expand
                into new possibilities and stories through the user's daily
                life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
