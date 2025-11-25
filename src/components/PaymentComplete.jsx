import React from "react";
import "./scss/PaymentComplete.scss";
import { useProductStore } from "../store/ProductStore";
import { useNavigate } from "react-router-dom";

const PaymentComplete = ({ onClose }) => {
  const navigate = useNavigate();

  const {
    getFinalPayment,
    getsavePoint,
    orderList,
    processPayment,
    onClearCart,
    resetPaymentState,
    saveOrder,
  } = useProductStore();

  const finalPayment = getFinalPayment();
  const savedPoint = getsavePoint();

  const handleConfirm = () => {
    saveOrder();
    processPayment();
    resetPaymentState();
    onClearCart(); // 장바구니 비우기 (결제 완료 후)
    navigate("/mypage");
  };

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

        {/* ORDER INFO */}
        <div className="text-box">
          <div className="first-box">
            <div className="box">
              <p>주문번호</p>
              <p>20251121-{Math.floor(Math.random() * 90000000 + 10000000)}</p>
            </div>

            <div className="box">
              <p>결제일자</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>

            <div className="box">
              <p>주문상품</p>

              <div className="order-items">
                {orderList.map((i) => (
                  <div className="order-item" key={i.cartId}>
                    <p className="item-title">{i.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PRICE INFO */}
          <div className="first-box">
            <div className="box big-text">
              <p>총 구매 금액</p>
              <p>{finalPayment.toLocaleString("ko-KR")}원</p>
            </div>

            <div className="box">
              <p>적립금</p>
              <p>{savedPoint.toLocaleString("ko-KR")}원</p>
            </div>
          </div>
        </div>

        <button>메인 화면 가기</button>
      </div>
    </div>
  );
};

export default PaymentComplete;
