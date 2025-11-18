import React, { useState } from "react";
import "./scss/Payment.scss"

const Payment = () => {
  const [open, setOpen] = useState(false); // 드롭다운 열림/닫힘
  const [message, setMessage] = useState(""); // 선택된 값

  const options = [
    "경비실에 맡겨주세요",
    "택배함에 넣어주세요",
    "배송전에 연락주세요",
    "직접 입력하기",
  ];

  return (
    <div className="payment-wrap">
      <div className="inner">
        <h3 className="title">CHECKOUT</h3>

        <div className="content-wrap">
          <div className="payment-title">
            <p>홍길동</p>
            <p>주소</p>
            <p>번호</p>

            {/* 드롭다운 */}
            <div className={`dropdown ${open ? "show" : ""}`}>
              <button className="dropBtn" onClick={() => setOpen(!open)}>
                <input
                  type="text"
                  placeholder="직접 입력하기"
                  value={message}
                  readOnly
                />
              </button>

              {open && (
                <ul className="dropdown-menu">
                  {options.map((opt, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setMessage(opt);
                        setOpen(false);
                      }}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 주문상품 */}
            <div className="order-product">
              <p>주문상품</p>
              <div>상품</div>
              <div>상품</div>

              <p>적립금 사용</p>
              <input
                type="text"
                placeholder="최소 1000포인트 이상 보유시 사용가능"
              />

              <p>쿠폰 사용</p>
              <ul>
                <li>쿠폰</li>
                <li>쿠폰</li>
              </ul>
            </div>

            <p>결제수단</p>
            <div className="pay-kind">
              <p>네이버</p>
              <p>카카오</p>
            </div>
          </div>

          {/* 우측 금액 요약 */}
          <div className="total-wrap">
            <h4>구매 금액</h4>

            <ul>
              <li>
                <span>상품금액</span>
                <span>원</span>
              </li>
              <li>
                <span>할인 금액</span>
                <span>143,000원</span>
              </li>
              <li>
                <span>적립금</span>
                <span>7,672</span>
              </li>
              <li>
                <span>배송비</span>
                <span>무료배송</span>
              </li>
            </ul>

            <div className="total-price">
              <span>총 구매 금액</span>
              <strong>원</strong>
            </div>

            <button className="pay-btn">
              <span>결제하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
