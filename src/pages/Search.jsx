import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import jacksonProduct from "../data/jacksonproduct.js";
import "./scss/Search.scss";
import "../components/scss/filterPopup.scss";

const Search = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const word = params.get("word") || "";
  const [searchText, setSearchText] = useState(word);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchText(word);
    setCurrentPage(1); // 검색어 바뀌면 페이지도 1페이지로
  }, [word]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?word=${searchText}`);
  };

  // 상태 정의
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempSortOption, setTempSortOption] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const [selectedSubCate, setSelectedSubCate] = useState("All");

  // 카테고리 자동 추출
  const categories = [
    "All",
    ...new Set(jacksonProduct.map((item) => item.product)),
  ];

  // 가격 숫자 변환
  const intPrice = (priceStr) => {
    if (!priceStr) return 0;
    const num = priceStr.replace(/[^0-9]/g, "");
    return Number(num) || 0;
  };

  // 검색 결과 필터링
  let data = jacksonProduct;
  const lowerWord = word.toLowerCase();

  data = data.filter((item) => {
    const title = (item.title || "").toLowerCase();
    return title.includes(lowerWord);
  });

  // 정렬 필터링
  if (sortOption === "best") {
    data = [...data].sort((a, b) => a.brand.localeCompare(b.brand));
  } else if (sortOption === "new") {
    data = [...data].sort((a, b) => parseInt(b.date) - parseInt(a.date));
  } else if (sortOption === "asc") {
    data = [...data].sort((a, b) => intPrice(a.price) - intPrice(b.price));
  } else if (sortOption === "desc") {
    data = [...data].sort((a, b) => intPrice(b.price) - intPrice(a.price));
  }

  // 재질 필터링 (원한다면 활성화)
  if (selectedSubCate !== "All") {
    data = data.filter((item) => item.subcate === selectedSubCate);
  }

  // 페이지네이션
  const itemPerPage = 21;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(data.length / itemPerPage);

  const start = (currentPage - 1) * itemPerPage;
  const currentItem = data.slice(start, start + itemPerPage);

  const handleGoPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPage) return;
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pagerButton = () => {
    const buttons = [];
    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <button
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => handleGoPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="search-wrap">
      <div className="inner">
        <h2 className="search-title">Search</h2>

        <div className="search-box">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="검색어를 입력하세요"
            />
            <button type="submit">
              <img src="/images/search-grey.svg" alt="search" />
            </button>
          </form>
        </div>

        <div className="product-filter">
          <div className="filter-title">
            <p className="product-sort">검색 결과</p>
          </div>

          <div className="filter">
            <p className="total-product">({data.length} product)</p>
            <p>Filter</p>
            <button onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <img src="/images/filter-icon.png" alt="필터아이콘" />
            </button>
          </div>
        </div>

        <div className="product-list">
          {currentItem.map((item) => (
            <Link to={`/shop/${item.id}`} className="product" key={item.id}>
              <span className="new">{item.badges}</span>
              <div className="img-box">
                <p className="default-img">
                  <img src={item.img_url} alt={item.title} />
                </p>
                <p className="hover-img">
                  <img src={item.img_hover} alt="" />
                </p>
              </div>
              <div className="text-box">
                <p className="title">{item.title}</p>
                <div className="price-wrap">
                  <div className="price">
                    {item.price_regular && (
                      <span className="pre-price">{item.price_regular}</span>
                    )}
                    <strong>{item.price}</strong>
                  </div>
                  <p className="sale">{item.sale}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="pager-wrap">
          <div className="pager">
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
              <p className="close-btn" onClick={() => setIsFilterOpen(false)}>
                <img src="/images/close-icon.png" alt="" />
              </p>
            </div>

            <div className="sort-wrap">
              <p className="sort-title">정렬</p>
              <div className="btn-wrap">
                <button
                  onClick={() => setTempSortOption("best")}
                  className={tempSortOption === "best" ? "active" : ""}
                >
                  추천순
                </button>

                <button
                  onClick={() => setTempSortOption("new")}
                  className={tempSortOption === "new" ? "active" : ""}
                >
                  최신순
                </button>

                <button
                  onClick={() => setTempSortOption("asc")}
                  className={tempSortOption === "asc" ? "active" : ""}
                >
                  가격 낮은순
                </button>

                <button
                  onClick={() => setTempSortOption("desc")}
                  className={tempSortOption === "desc" ? "active" : ""}
                >
                  가격 높은순
                </button>
              </div>
            </div>

            <p
              className="apply-btn"
              onClick={() => {
                setSortOption(tempSortOption);
                setIsFilterOpen(false);
              }}
            >
              적용하기
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
