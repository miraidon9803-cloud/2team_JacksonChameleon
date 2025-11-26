import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/ProductStore";
import "./scss/Payment.scss";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Coupon from "../components/Coupon";
import PaymentDelivery from "../components/PaymentDelivery";
import PaymentComplete from "../components/PaymentComplete";

const Payment = () => {
  /* ------------------ STORE ------------------ */
  const {
    // 요청사항
    isReqOpen,
    toggleReqOpen,
    isCustomInput,
    setIsCustomInput,
    reqText,
    setReqText,
    reqOptions,

    // 결제 계산
    getSelectedTotalPrice,
    getItemSalePrice,
    getCouponDiscount,
    getFinalPayment,
    getsavePoint,

    // 포인트
    usedPoint,
    setUsedPoint,
    resetUsedPoint,
    validatePoint,
    myPoint,

    // 결제수단
    selectedMethod,
    setSelectedMethod,
    selectedMethodBtn,
    setSelectedMethodBtn,
    simpleOpt,

    // 주문
    onAddOrder,
    orderList,

    //단독결제
    checkoutItems,
    saveOrder,
    processPayment,
    resetPaymentState,
    onClearCart,

    hyphenphone,
  } = useProductStore();

  const { user } = useAuthStore();
  const [showCoupon, setShowCoupon] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [inputPoint, setInputPoint] = useState("");

  const selectedTotal = getSelectedTotalPrice(); // 상품 금액 총합
  const saleTotal = getItemSalePrice(); // 즉시할인
  const couponDiscount = getCouponDiscount(); // 쿠폰 할인
  const finalPayment = getFinalPayment(); // 최종 결제 금액
  const savePoint = getsavePoint(); // 예상 적립금

  const handlePointOpen = () => {
    const valid = validatePoint(inputPoint);
    if (valid === 0) {
      setInputPoint("");
      setUsedPoint(0);
      return;
    }
    setInputPoint(valid.toString());
    setUsedPoint(valid);
  };
  const handleConfirm = () => {
    onAddOrder(); // 주문상품 저장 → orderList 업데이트
    saveOrder(); // Firestore 저장 (optional)
    processPayment(); // 결제 처리
    if (checkoutItems.length === 0) {
      onClearCart(); // 장바구니 결제일 때만 비움
    }
    resetPaymentState(); // 결제 화면 UI 상태 초기화 (orderList 초기화 금지)
    setShowComplete(true); // 완료 팝업 표시
  };

  const { resetCheckoutItems } = useProductStore();

  useEffect(() => {
    onAddOrder(); // 장바구니 결제일 때 orderList 저장
  }, []);

  useEffect(() => {
    // 페이지 나갈 때 checkoutItems 초기화
    return () => resetCheckoutItems();
  }, []);

  return (
    <div className="checkout-wrap">
      <div className="inner">
        <h3 className="title">CHECKOUT</h3>

        <div className="content-wrap">
          {/* ------------------ LEFT ------------------ */}
          <div className="left">
            {/* 사용자 정보 */}
            <div className="left-con1 user-info">
              <div className="user-name">
                <p>{user?.name}</p>
                <button onClick={() => setShowDelivery(true)}>
                  배송지 변경
                </button>
              </div>
              <div className="address">
                <p>
                  {user?.address} {user?.add}
                </p>
                <p>{hyphenphone(user?.phone)}</p>
              </div>
            </div>

            {/* 요청사항 */}
            <div className="left-con2 req">
              <p>요청사항</p>

              <div className="req-list-wrap" onClick={toggleReqOpen}>
                <div className="req-list">
                  {isCustomInput ? (
                    <input
                      type="text"
                      value={reqText}
                      autoFocus
                      placeholder="요청사항을 입력해 주세요"
                      onChange={(e) => setReqText(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <p className="req-selected-text">
                      {reqText || "요청사항을 선택해 주세요"}
                    </p>
                  )}

                  <p className={`req-arrow ${isReqOpen ? "active" : ""}`}>
                    <img src="/images/Arrow-down.png" alt="" />
                  </p>
                </div>
              </div>

              {isReqOpen && (
                <div className="req-dropdown">
                  {reqOptions.map((opt) => (
                    <div
                      key={opt.id}
                      className={`req-item ${
                        reqText === opt.label ? "selected" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCustomInput(false);
                        setReqText(opt.label);
                        toggleReqOpen();
                      }}
                    >
                      {opt.label}
                    </div>
                  ))}

                  <div
                    className="req-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCustomInput(true);
                      setReqText("");
                      toggleReqOpen();
                    }}
                  >
                    요청사항 직접 입력하기
                  </div>
                </div>
              )}
            </div>

            {/* 주문상품 */}
            <div className="left-con3 order">
              <p>주문상품</p>

              {orderList.map((i) => (
                <div className="order-item" key={i.cartId}>
                  <div className="item-img">
                    <img src={i.size?.img} alt="" />
                  </div>

                  <div className="item-info">
                    <p className="item-title">{i.title}</p>
                    <p className="item-option">
                      {i.sheet?.text} / {i.size?.sizename} /{" "}
                      {i.color?.colorname} / {i.add?.cushion || "선택안함"}
                    </p>
                    <p className="item-price">
                      {(
                        (i.size?.price || 0) + (i.add?.price || 0)
                      ).toLocaleString("ko-KR")}
                      원
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 적립금 */}
            <div className="left-con4 acc">
              <p>적립금 사용</p>

              <div className="use-acc">
                <input
                  type="text"
                  placeholder="최소 1000 포인트 이상 사용 가능"
                  value={inputPoint}
                  onChange={(e) => {
                    let raw = e.target.value.replace(/[^0-9]/g, "");
                    setInputPoint(raw);
                  }}
                  onBlur={handlePointOpen}
                />

                <button
                  onClick={() => {
                    resetUsedPoint();
                    setInputPoint("");
                  }}
                >
                  사용취소
                </button>
              </div>
              <p>보유적립금: {myPoint.toLocaleString("ko-KR")}원</p>
            </div>

            {/* 쿠폰 */}
            <div className="left-con5 cupon">
              <p>쿠폰 사용</p>
              <button onClick={() => setShowCoupon(true)}>쿠폰사용</button>
            </div>

            {/* 결제수단 */}
            <div className="left-con6 payment">
              <p>결제수단</p>

              <form>
                {/* 간편결제 */}
                <label>
                  <input
                    type="radio"
                    name="method"
                    value="simple"
                    onChange={() => setSelectedMethod("simple")}
                  />
                  간편결제
                  <div
                    className={`selected-method ${
                      selectedMethod === "simple" ? "active" : ""
                    }`}
                  >
                    {simpleOpt.map((btn) => (
                      <button
                        type="button"
                        key={btn.id}
                        className={selectedMethodBtn === btn.id ? "active" : ""}
                        onClick={() => setSelectedMethodBtn(btn.id)}
                      >
                        <img
                          src={
                            selectedMethodBtn === btn.id
                              ? btn.activeimg
                              : btn.img
                          }
                          alt={btn.label}
                        />
                      </button>
                    ))}
                  </div>
                </label>

                {/* 일반결제 */}
                <label>
                  <input
                    type="radio"
                    name="method"
                    value="general"
                    onChange={() => setSelectedMethod("general")}
                  />
                  일반결제
                  <div
                    className={`selected-method ${
                      selectedMethod === "general" ? "active" : ""
                    }`}
                  >
                    {["무통장 입금", "카드결제", "가상계좌", "실시간 입금"].map(
                      (btn) => (
                        <button
                          type="button"
                          key={btn}
                          className={selectedMethodBtn === btn ? "active" : ""}
                          onClick={() => setSelectedMethodBtn(btn)}
                        >
                          {btn}
                        </button>
                      )
                    )}
                  </div>
                </label>
              </form>
            </div>
          </div>

          {/* ------------------ RIGHT ------------------ */}
          <div className="right">
            <div className="total-wrap">
              <div className="total-content">
                <h4>구매 금액</h4>

                <ul>
                  <li>
                    <span>상품금액</span>
                    <span>{selectedTotal.toLocaleString("ko-KR")}원</span>
                  </li>

                  <li>
                    <span>즉시할인</span>
                    <span>{saleTotal.toLocaleString("ko-KR")}원</span>
                  </li>

                  <li>
                    <span>쿠폰할인</span>
                    <span>{couponDiscount.toLocaleString("ko-KR")}원</span>
                  </li>

                  <li>
                    <span>적립금 사용</span>
                    <span>{usedPoint.toLocaleString("ko-KR")}원</span>
                  </li>

                  <li>
                    <span>배송비</span>
                    <span>무료배송</span>
                  </li>
                </ul>

                <h4>적립혜택</h4>
                <div className="cash">
                  <p>적립금</p>
                  <p>{savePoint.toLocaleString("ko-KR")}원</p>
                </div>

                <div className="total-price">
                  <span>총 결제 금액</span>
                  <strong>{finalPayment.toLocaleString("ko-KR")}원</strong>
                </div>
                <button
                  className="pay-btn"
                  onClick={() => {
                    handleConfirm(); // 결제 처리
                  }}
                >
                  결제하기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 팝업들 */}
        {showCoupon && <Coupon onClose={() => setShowCoupon(false)} />}
        {showDelivery && (
          <PaymentDelivery onClose={() => setShowDelivery(false)} />
        )}
        {showComplete && (
          <PaymentComplete onClose={() => setShowComplete(false)} />
        )}

        {(showCoupon || showDelivery || showComplete) && (
          <div className="popup-overlay"></div>
        )}
      </div>
    </div>
  );
};

export default Payment;
