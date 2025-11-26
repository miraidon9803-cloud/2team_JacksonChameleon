import React from "react";
import "./scss/PaymentComplete.scss";
import { useProductStore } from "../store/ProductStore";
import { useNavigate } from "react-router-dom";

const PaymentComplete = ({ onClose }) => {
  const navigate = useNavigate();
  const gohandleMaintop = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  // 주문 스냅샷(가장 최근 주문)
  const { orders } = useProductStore();
  const lastOrder = orders[orders.length - 1]; // 마지막 주문 정보

  if (!lastOrder) {
    return (
      <div className="PaymentComplete-wrap">
        <div className="wrap">
          <p>주문 정보가 없습니다.</p>
          <button onClick={() => navigate("/")}>메인 화면 가기</button>
        </div>
      </div>
    );
  }

  // 스냅샷 데이터
  const orderItems = lastOrder.items;
  const finalPayment = lastOrder.finalPayment;
  const savedPoint = lastOrder.savePoint;

  return (
    <div className="PaymentComplete-wrap">
      <div className="wrap">
        {/* TOP AREA */}
        <div className="top">
          <div onClick={onClose} className="close">
            <img src="/images/close-grey.svg" alt="close" />
          </div>

          <div className="img-box">
            <div className="line">
              <img src="/images/complete1.png" alt="complete1" />
            </div>
            <div className="ani">
              <img src="/images/complete2.png" alt="complete2" />
            </div>
          </div>

          <h2>주문이 완료되었습니다</h2>
          <p>Thank you for purchasing our product</p>
        </div>

        {/* 주문 정보 */}
        <div className="text-box">
          <div className="first-box">
            <div className="box">
              <p>주문번호</p>
              <p>{lastOrder.orderId}</p>
            </div>

            <div className="box">
              <p>결제일자</p>
              <p>{lastOrder.orderDate}</p>
            </div>

            <div className="box">
              <p>주문상품</p>
              <div className="order-items">
                {orderItems.length === 1 ? (
                  <p className="item-title">{orderItems[0].title}</p>
                ) : (
                  <p className="item-title">
                    {orderItems[0].title} 외 {orderItems.length - 1}건
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 가격 요약 */}
          <div className="first-box">
            <div className="box big-text">
              <p>총 결제 금액</p>
              <p>{finalPayment.toLocaleString("ko-KR")}원</p>
            </div>

            <div className="box">
              <p>적립금</p>
              <p>{savedPoint.toLocaleString("ko-KR")}원</p>
            </div>
          </div>
        </div>

        <button onClick={gohandleMaintop}>메인 화면 가기</button>
      </div>
    </div>
  );
};

export default PaymentComplete;
