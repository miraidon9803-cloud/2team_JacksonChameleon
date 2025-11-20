import React from 'react';
import { useProductStore } from '../store/ProductStore';
import './scss/Payment.scss';


const Payment = () => {

  const {
    isReqOpen, setIsReqOpen,
    isCustomInput, setIsCustomInput,
    reqText, setReqText,
    reqOptions,
    selectedMethod, setSelectedMethod,
    selectedMethodBtn, setSelectedMethodBtn,
    simpleOpt
  } = useProductStore();

  return (
    <div className='checkout-wrap'>
      <div className="inner">
        <h3 className='title'>CHECKOUT</h3>
        <div className="content-wrap">


          <div className="left">

            {/* 사용자 정보 */}
            <div className="left-con1 user-info">
              <div className="user-name">
                <p>홍길동</p>
                <button>배송지 변경</button>
              </div>
              <div className="address">
                <p>서울시 고양이구 냥냥동 야옹대로 29길 110, 406동 708호</p>
                <p>010-1234-5678</p>
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

              {[1, 2, 3, 4].map((i) => (
                <div className='order-item' key={i}>
                  <div className="item-img"><img src="/images/sofa-1.png" alt="" /></div>
                  <div className="item-info">
                    <p className="item-title">asdfsadf</p>
                    <p className="item-option">asdfsadf</p>
                    <p className="item-price">asdfsadf</p>
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
              <button>쿠폰사용</button>
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
                  <li><span>상품금액</span><span>0000원</span></li>
                  <li><span>할인 금액</span><span>143,000원</span></li>
                  <li><span>적립금</span><span>7,672</span></li>
                  <li><span>배송비</span><span>무료배송</span></li>
                </ul>

                <div className="total-price">
                  <span>총 구매 금액</span>
                  <strong>000원</strong>
                </div>

                <button className='pay-btn'><span>결제하기</span></button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Payment;
