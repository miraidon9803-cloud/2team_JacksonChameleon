import React, { useEffect, useState } from "react";
import "./scss/MainCategory.scss";
import { useNavigate } from "react-router-dom";

const MainCategory = () => {
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

  const start = 1400; // 애니메이션 시작 지점
  const end = 1950; // 애니메이션 끝 지점

  const getOffset = (base) => {
    if (scrollY <= start) return base; // 시작 전: 기본 margin-top 유지
    if (scrollY >= end) return 0; // 끝난 후: 0으로 고정

    const progress = (scrollY - start) / (end - start); // 0 ~ 1
    return base * (1 - progress); // 선형 보간
  };

  const navigate = useNavigate();
  const handleGoChair = () => {
    navigate("/shop/chair/");
    window.scrollTo(0, 0);
  };

  const handleGoSofa = () => {
    navigate("/shop/sofa/");
    window.scrollTo(0, 0);
  };

  const handleGoTable = () => {
    navigate("/shop/table/");
    window.scrollTo(0, 0);
  };

  const handleGoLighting = () => {
    navigate("/shop/lighting/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="main-category-wrap">
      <div className="inner-wrap">
        <div className="inner">
          <h2>Category</h2>
          <div className="categoty-wrap">
            <div
              onClick={handleGoChair}
              className="chair"
              style={{ marginTop: `${getOffset(600)}px` }}
            >
              <p>Chair</p>
              <div>
                <img src="/images/chair-cete.png" alt="chair" />
              </div>
            </div>
            <div
              onClick={handleGoSofa}
              className="sofa"
              style={{ marginTop: `${getOffset(250)}px` }}
            >
              <p>Sofa</p>
              <div>
                <img src="/images/sofa-cate.png" alt="sofa" />
              </div>
            </div>
            <div
              onClick={handleGoTable}
              className="table"
              style={{ marginTop: `${getOffset(400)}px` }}
            >
              <p>Table</p>
              <div>
                <img src="/images/table-cate.png" alt="table" />
              </div>
            </div>
            <div onClick={handleGoLighting} className="light">
              <p>Light</p>
              <div>
                <img src="/images/light-cate.png" alt="light" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCategory;
