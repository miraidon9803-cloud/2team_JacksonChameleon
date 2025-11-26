import React from "react";
import { useProductStore } from "../store/ProductStore";
import "./scss/Coupon.scss";

const Coupon = ({ onClose }) => {
  const { coupons, cancelCoupon, openCoupon, onSelectopenCoupon, applyCoupon } =
    useProductStore();
  console.log("coupons:", coupons);

  return (
    <div className="coupon-wrap">
      <div className="inner">
        <div className="coupon-title">
          <h3>쿠폰사용</h3>
          <p className="coupon-close" onClick={onClose}>
            <img src="/images/close-grey.svg" alt="" />
          </p>
        </div>

        <ul className="coupon-list">
          {coupons.map((c) => (
            <li
              key={c.id}
              className={`coupon-item ${
                openCoupon?.id === c.id ? "active" : ""
              }`}
            >
              <label>
                <input
                  className="coupons"
                  type="radio"
                  name="coupon"
                  checked={openCoupon?.id === c.id}
                  onChange={() => onSelectopenCoupon(c)}
                />

                <div className="coupon-right">
                  <div className="coupon-title1">
                    <div className="coupon-text1">
                      <div className="coupon-text2">
                        <p className="disprice">
                          {c.price.toLocaleString("ko-KR")}원 할인
                        </p>
                        <p className="coupon-text">{c.text}</p>
                      </div>
                      <p className="coupon-date">2026년 1월 31일까지</p>
                    </div>
                  </div>
                  <p className="coupon-true">사용가능</p>
                </div>
              </label>
            </li>
          ))}
        </ul>

        <div className="coupon-btn-wrap">
          <button
            className="close-btn"
            onClick={() => {
              cancelCoupon();
              onClose();
            }}
          >
            적용취소
          </button>

          <button
            onClick={() => {
              applyCoupon();
              onClose();
            }}
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
