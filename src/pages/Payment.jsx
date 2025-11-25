import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/ProductStore";
import "./scss/Payment.scss";
import { useAuthStore } from "../store/authStore";
import Coupon from "../components/Coupon";
import PaymentDelivery from "../components/PaymentDelivery";
import PaymentComplete from "../components/PaymentComplete";

const Payment = () => {
  const navigate = useNavigate();
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

    // 계산 로직 (orderList 기준으로 수정됨)
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

    // 주문 리스트
    onAddOrder,
    orderList,
    directOrderList,
    resetDirectOrder,
    setOrderList,
    saveOrder,
    processPayment,
    resetPaymentState,
    onClearCart,
  } = useProductStore();

  const { user } = useAuthStore();

  /* ------------------ LOCAL STATE ------------------ */
  const [showCoupon, setShowCoupon] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [inputPoint, setInputPoint] = useState("");

  // 가격 state
  const [selectedTotal, setSelectedTotal] = useState(0);
  const [saleTotal, setSaleTotal] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [finalPayment, setFinalPayment] = useState(0);
  const [savePoint, setSavePoint] = useState(0);

  /* ------------------ Payment 진입 시 주문 리스트 세팅 ------------------ */
  useEffect(() => {
    console.log("💡 Payment 진입 directOrderList:", directOrderList);

    if (directOrderList && directOrderList.length > 0) {
      setOrderList(directOrderList); // 바로결제
      resetDirectOrder();
    } else {
      onAddOrder(); // 장바구니 결제
    }
  }, []);

  /* ------------------ 가격 자동 재계산 ------------------ */
  useEffect(() => {
    setSelectedTotal(getSelectedTotalPrice());
    setSaleTotal(getItemSalePrice());
    setCouponDiscount(getCouponDiscount());
    setFinalPayment(getFinalPayment());
    setSavePoint(getsavePoint());
  }, [orderList, usedPoint, selectedMethod, selectedMethodBtn]);

  /* ------------------ 포인트 입력 ------------------ */
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
    saveOrder();
    processPayment();
    resetPaymentState();

    if (directOrderList.length === 0) {
      onClearCart();
    }

    navigate("/mypage");
  };

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
                  {user?.addnum} {user?.address} {user?.add}
                </p>
                <p>{user?.phone}</p>
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
                <p>보유적립금: {myPoint.toLocaleString("ko-KR")}원</p>

                <button
                  onClick={() => {
                    resetUsedPoint();
                    setInputPoint("");
                  }}
                >
                  사용취소
                </button>
              </div>
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
                    <span>적립금사용</span>
                    <span>{usedPoint.toLocaleString("ko-KR")}원</span>
                  </li>

                  <li>
                    <span>배송비</span>
                    <span>무료배송</span>
                  </li>
                </ul>

                <h4>적립혜택</h4>
                <p>예상적립금 {savePoint.toLocaleString("ko-KR")}원</p>

                <div className="total-price">
                  <span>총 결제 금액</span>
                  <strong>{finalPayment.toLocaleString("ko-KR")}원</strong>
                </div>

                <button
                  className="pay-btn"
                  onClick={() => {
                    if (directOrderList.length === 0) {
                      onClearCart();
                    }

                    setShowComplete(true);
                  }}
                >
                  <span>결제하기</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 팝업 */}
        {showCoupon && <Coupon onClose={() => setShowCoupon(false)} />}
        {showDelivery && (
          <PaymentDelivery onClose={() => setShowDelivery(false)} />
        )}
        {showComplete && (
          <PaymentComplete
            onConfirm={handleConfirm}
            onClose={() => setShowComplete(false)}
          />
        )}

        {(showCoupon || showDelivery || showComplete) && (
          <div className="popup-overlay"></div>
        )}
      </div>
    </div>
  );
};

export default Payment;
