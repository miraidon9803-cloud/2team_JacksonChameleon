import React, { useState } from "react";
import jacksonProduct from "../data/jacksonproduct.js";
import "../components/scss/Product.scss";
import "../components/scss/filterPopup.scss";
import ShopTop from "../components/ShopTop.jsx";

const ShopSofa = () => {
  // const [selectedCategory, setSelectedCategory] = useState("sofa");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempSortOption, setTempSortOption] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const [selectedSubCate, setSelectedSubCate] = useState("All");

  //  카테고리 자동 추출
  // const categories = [
  //   "All",
  //   ...new Set(jacksonProduct.map((item) => item.product)),
  // ];

  //  가격 문자열을 숫자로 변환하는 함수
  const intPrice = (priceStr) => {
    if (!priceStr) return 0;
    const num = priceStr.replace(/[^0-9]/g, "");
    return Number(num) || 0;
  };

  let data = jacksonProduct;
  data = data.filter((item) => item.product === "lighting")
  console.log(data);

  // 필터링
  if (sortOption === "best") {
    data = [...data].sort((a, b) => {
      return a.brand.localeCompare(b.brand);
    });
  } else if (sortOption === "new") {
    data = [...data].sort((a, b) => {
      const dateA = parseInt(a.date) || 0;
      const dateB = parseInt(b.date) || 0;
      return dateB - dateA;
    });
  } else if (sortOption === "asc") {
    data = [...data].sort(
      (a, b) => intPrice(a.price) - intPrice(b.price)
    );
  } else if (sortOption === "desc") {
    data = [...data].sort(
      (a, b) => intPrice(b.price) - intPrice(a.price)
    );
  }

  //재질 필터링
  if (selectedSubCate !== "All") {
    data = data.filter(
      (item) => item.subcate === selectedSubCate
    );
  }


  //페이징 처리
  //한페이지에 보여질 개수
  const itemPerPage = 21
  //현재 보여지는 페이지를 체크하고 변경하기
  const [currentPage, setCurrentpage] = useState(1);
  //전체 페이지수 계산하기
  const totalPage = Math.ceil(data.length / itemPerPage);

  const start = (currentPage - 1) * itemPerPage
  const currentItem = data.slice(start, start + itemPerPage);

  //페이지 변경
  const handleGoPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPage) return
    console.log(pageNum);
    setCurrentpage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  //버튼 생성하기
  const pagerButton = () => {
    //버열을 저장할 배열
    const buttons = [];
    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <button
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => handleGoPage(i)}>{i}
        </button>
      );
    }
    return buttons;
  }


  return (
    <div className="shop-wrap">
      <ShopTop category="lighting" />
      <div className="inner">
        <div className="product-filter">
          <div className="filter-title">
            <p className='product-sort'>Lighting</p>
            <p className="arrow"><img src="/images/product-icon.png" alt="" /></p>
            <div className="select-material">
              <p onClick={() => { setSelectedSubCate("Table Lamp"); setCurrentpage(1); }}
                className={selectedSubCate === "Table Lamp" ? "active" : ""}
              >Tabler Lamp</p>
              <p onClick={() => { setSelectedSubCate("Floor Lamp"); setCurrentpage(1); }}
                className={selectedSubCate === "Floor Lamp" ? "active" : ""}
              >Floor Lamp</p>
            </div>
          </div>
          <div className="filter">
            <p className="total-product">({data.length}product)</p>
            <p>Filter</p>
            <button onClick={() => setIsFilterOpen(!isFilterOpen)}><img src="/images/filter-icon.png" alt="필터아이콘" /></button>
          </div>
        </div>

        <div className="product-list">
          {currentItem.map((item, index) => (
            <div className="product" key={index}>
              <span className='new'>{item.badges}</span>
              <div className="img-box">
                <p className="default-img"><img src={item.img_url} alt={item.title} /></p>
                <p className='hover-img'><img src={item.img_hover} alt="" /></p>
              </div>
              <div className="text-box">
                <p className="title">{item.title}</p>
                <div className="price-wrap">
                  <div className="price">
                    {item.price_regular && (
                      <span className='pre-price'>{item.price_regular}</span>
                    )}
                    <strong>{item.price}</strong>
                  </div>
                  <p className="sale">{item.sale}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pager-wrap">
          <div className='pager'>
            <button onClick={() => handleGoPage(currentPage - 1)}>
              <img src="/images/pager-left.png" alt="" />
            </button>
            {pagerButton()}
            <button onClick={() => handleGoPage(currentPage + 1)}>
              <img src="/images/pager-right.png" alt="" />
            </button>
          </div>
        </div>
      </div>
   {isFilterOpen && (
               <div className="filter-popup" onClick={() => setIsFilterOpen(false)}>
          <div className="filter-wrap" onClick={(e) => e.stopPropagation()}>
            <div className="filter-title">
              <h3>Filter</h3>
              <p className="close-btn" onClick={() => setIsFilterOpen(false)}><img src="/images/close-icon.png" alt="" /></p>
            </div>

            <div className="sort-wrap">
              <p className="sort-title">정렬</p>
              <div className="btn-wrap">
                <button
                  onClick={() => setTempSortOption("best")}
                  className={tempSortOption === "best" ? "active" : ""}>
                  추천순
                </button>

                <button
                  onClick={() => setTempSortOption("new")}
                  className={tempSortOption === "new" ? "active" : ""}>
                  최신순
                </button>

                <button
                  onClick={() => setTempSortOption("asc")}
                  className={tempSortOption === "asc" ? "active" : ""}>
                  가격 낮은순
                </button>

                <button
                  onClick={() => setTempSortOption("desc")}
                  className={tempSortOption === "desc" ? "active" : ""}>
                  가격 높은순
                </button>
              </div>
            </div>

            <p className='apply-btn'
              onClick={() => {
                setSortOption(tempSortOption);
                setIsFilterOpen(false);
              }}>
              적용하기
            </p>
          </div>
        </div>
            )}
    </div>
  );
};

export default ShopSofa;