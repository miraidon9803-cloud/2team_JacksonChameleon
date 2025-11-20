import React, { useState } from "react";
import { Noticedata } from "../data/Notice";
import './scss/Notice.scss'
import { Link } from "react-router-dom";

const Notice = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(Noticedata.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = Noticedata.slice(startIndex, startIndex + itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="notice-wrap">
      <div className="inner">
        <h2>NOTICE</h2>
        <div className="notice-list-wrap">

          {currentItems.map((item, index) => {
            const realIndex = startIndex + index;

            return (
              <Link
                to={item.id === 1 ? "/notice/1/special" : `/notice/${item.id}`}
                className="notice-row"
                key={realIndex}
              >
                <div className="notice-title">
                  {realIndex < 3 && <span className="notice-badge">공지</span>}
                  {item.title}
                </div>

                <div className="notice-day">{item.day}</div>
                <div className="notice-view">
                  {item.조회수.replace("조회 ", "")}
                </div>
              </Link>
            );
          })}

          <div className="pagination">   
            <button
              className="nav-btn prev"
              onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
            >
              <img src="/images/arrow-left.png" alt="이전" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="nav-btn next"
              onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}
            >
              <img src="/images/arrow-right.png" alt="다음" />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Notice;
