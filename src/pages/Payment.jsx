import React, { useEffect, useState } from 'react';
import { useProductStore } from '../store/ProductStore';
import './scss/Payment.scss';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Coupon from '../components/Coupon';




const Payment = () => {

  const {
    isReqOpen, setIsReqOpen,
    isCustomInput, setIsCustomInput,
    reqText, setReqText,
    reqOptions,
    selectedMethod, setSelectedMethod,
    selectedMethodBtn, setSelectedMethodBtn,
    simpleOpt, cartItems, onAddOrder, orderList,
    finalPrice, onFinalPrice,
    totalPrice, selectedCoupon
  } = useProductStore();

  const { user } = useAuthStore();
  const discountPrice = selectedCoupon ? selectedCoupon.price : 0;
  const [showCoupon, setShowCoupon] = useState(false);
  const navigate = useNavigate();
  const handleCoupon = () => setShowCoupon(true);
  const handleCloseCoupon = () => setShowCoupon(false);
  const handleConfirm = (e) => {
    // e.preventDefault();
    //장바구니 내용을 주문 내역에 저장
    onAddOrder();
    //장바구니 비우기
    // onClearCart();
    alert("결제가 완료되었습니다");
    //마이페이지로 이동
    navigate("/mypage")
  }
  useEffect(() => {
    onFinalPrice(); // 선택 변경 or 쿠폰 변경 시 실행
  }, [selectedCoupon, cartItems]);

  useEffect(() => {
    onAddOrder()
  }, [])
  return (
    <div className='checkout-wrap'>
      <div className="inner">

        <h3 className='title'>CHECKOUT</h3>
        <div className="content-wrap">


          <div className="left">

            {/* 사용자 정보 */}
            <div className="left-con1 user-info">
              <div className="user-name">
                <p>{user?.email}</p>
                <button>배송지 변경</button>
              </div>
              <div className="address">
                <p>{user?.addnum} {user?.address} {user?.add}</p>
                <p>{user?.phone}</p>
              </div>
            </div>

            {/* 요청사항 */}
            <div className="left-con2 req">
              <p>요청사항</p>

              <div className='req-list-wrap'
                onClick={() => setIsReqOpen()}>
                <div className="req-list">
                  {isCustomInput ? (
                    <input
                      type='text'
                      value={reqText}
                      autoFocus
                      placeholder='요청사항을 입력해 주세요'
                      onChange={(e) => setReqText(e.target.value)}
                      onClick={(e) => e.stopPropagation()} />
                  ) : (
                    <p className='req-selected-text'>
                      {reqText || '요청사항을 선택해 주세요'}
                    </p>
                  )
                  }

                  <p className={`req-arrow ${isReqOpen ? 'active' : ''}`}>
                    <img src="/images/Arrow-down.png" alt="" />
                  </p>
                </div>
              </div>

              {isReqOpen && (
                <div className="req-dropdown">

                  {reqOptions.map((opt) => (
                    <div
                      key={opt.id}
                      className={`req-item ${reqText === opt.label ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCustomInput(false);
                        setReqText(opt.label);
                        setIsReqOpen();
                      }}>
                      {opt.label}
                    </div>
                  ))}

                  <div className="req-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCustomInput(true);
                      setReqText('');
                      setIsReqOpen();
                    }}>
                    요청사항 직접 입력하기
                  </div>
                </div>
              )}
            </div>

            {/* 주문상품 */}
            <div className="left-con3 order">
              <p>주문상품</p>
              {orderList.map((i) => (
                <div className='order-item' key={i.id}>
                  <div className="item-img"><img src={i.size?.img} alt="" /></div>
                  <div className="item-info">
                    <p className="item-title">{i.title}</p>
                    <p className="item-option">{i.sheet?.text} / {i.size?.sizename} / {i.color?.colorname}/ {i.add ? i.add.cushion : '선택안함'}</p>
                    <p className="item-price">{((i.size?.price || 0) + (i.add?.price || 0)).toLocaleString("ko-KR")}원</p>


                  </div>
                </div>
              ))}

            </div>

            {/* 적립금 */}
            <div className="left-con4 acc">
              <p>적립금 사용</p>
              <div className="use-acc">
                <input type="text" placeholder='최소 1000포인트 이상 보유시 사용 가능' />
                <button>사용취소</button>
              </div>
            </div>

            {/* 쿠폰 */}
            <div className="left-con5 cupon">
              <p>쿠폰 사용</p>
              <button onClick={handleCoupon}>쿠폰사용</button>
            </div>

           

            {/* 결제수단 */}
            <div className="left-con6 payment">
              <p>결제수단</p>
              <form>
                {/* 간편결제 */}
                <label>
                  <input type="radio" name='method' value='simple'
                    onChange={() => setSelectedMethod('simple')} />
                  간편결제

                  <div className={`selected-method ${selectedMethod === 'simple' ? 'active' : ''}`}>
                    {simpleOpt.map((btn) => (
                      <button
                        type='button'
                        key={btn.id}
                        className={selectedMethodBtn === btn.id ? 'active' : ''}
                        onClick={() => setSelectedMethodBtn(btn.id)}
                      >
                        <img
                          src={selectedMethodBtn === btn.id ? btn.activeimg : btn.img}
                          alt={btn.label}
                        />
                      </button>
                    ))}
                  </div>
                </label>

                {/* 일반결제 */}
                <label>
                  <input type="radio" name='method' value='general'
                    onChange={() => setSelectedMethod('general')} />
                  일반결제

                  <div className={`selected-method ${selectedMethod === 'general' ? 'active' : ''}`}>
                    {['무통장 입금', '카드결제', '가상계좌', '실시간 입금'].map((btn) => (
                      <button
                        type='button'
                        key={btn}
                        className={selectedMethodBtn === btn ? 'active' : ''}
                        onClick={() => setSelectedMethodBtn(btn)}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </label>
              </form>
            </div>
          </div>


          {/* ------------------- RIGHT ------------------- */}
          <div className="right">
            <div className="total-wrap">
              <div className="total-content">
                <h4>구매 금액</h4>
                <ul>
                  <li><span>상품금액</span><span><p>{totalPrice.toLocaleString("ko-KR")}원</p></span></li>
                  <li><span>할인 금액</span><span>{selectedCoupon
                    ? `-${selectedCoupon.price.toLocaleString("ko-KR")}원`
                    : "0원"}</span></li>
                  <li><span>적립금</span><span></span></li>
                  <li><span>배송비</span><span>무료배송</span></li>
                </ul>

                <div className="total-price">
                  <span>총 구매 금액</span>
                  <strong>{finalPrice.toLocaleString("ko-KR")}원</strong>
                </div>

                <button className='pay-btn'><span>결제하기</span></button>
              </div>
            </div>
          </div>

        </div>
         {showCoupon ? <Coupon
              onClose={handleCloseCoupon} /> : ""}
      </div>
                    
    </div>
  );
};

export default Payment;
