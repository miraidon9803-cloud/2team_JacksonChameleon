import React, { useState } from 'react'
import './scss/Checkout.scss'

const Checkout = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedMethodBtn, setSelectedMethodBtn] = useState(null);


  return (
    <div className='checkout-wrap'>
      <div className="inner">
        <h3 className='title'>CHECKOUT</h3>
        <div className="content-wrap">

          <div className="left">

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

            <div className="left-con2 req">
              <p>요청사항</p>
              <div className="req-list">직접 입력하기</div>
            </div>

            <div className="left-con3 order">
              <p>주문상품</p>

              <div>

              </div>
            </div>

            <div className="left-con4 acc">
              <p>적립금 사용</p>
              <div className="use-acc">
                <input type="text" placeholder='최소 1000포인트 이상 보유시 사용 가능' />
                <button>사용취소</button>
              </div>
            </div>

            <div className="left-con5 cupon">
              <p>쿠폰 사용</p>
              <button>쿠폰사용</button>
            </div>

            <div className="left-con6 payment">
              <p>결제수단</p>
              <form>
                <label>
                  <input type="radio" name='method' value='simple' onChange={() => setSelectedMethod('simple')} />
                  간편결제
                  <div className={`selected-method ${selectedMethod === 'simple' ? 'active' : ''}`}>
                    {['네이버', '카카오', '삼성', '토스'].map((btn) => (
                      <button
                        type='button'
                        key={btn}
                        className={selectedMethodBtn === btn ? 'active' : ''}
                        onClick={() => setSelectedMethodBtn(btn)}>{btn}</button>
                    ))}
                    {/* <button>네이버</button>
                    <button>카카오</button>
                    <button>삼성</button>
                    <button>토스</button> */}
                  </div>
                </label>
                <label>
                  <input type="radio" name='method' value='general' onChange={() => setSelectedMethod('general')} />
                  일반결제
                  <div className={`selected-method ${selectedMethod === 'general' ? 'active' : ''}`}>
                    {['무통장 입금', '카드결제', '가상계좌', '실시간 입금'].map((btn) => (
                      <button
                        type='button'
                        key={btn}
                        className={selectedMethodBtn === btn ? 'active' : ''}
                        onClick={() => setSelectedMethodBtn(btn)}>{btn}</button>
                    ))}
                    {/* <button>무통장 입금</button>
                    <button>카드결제</button>
                    <button>가상계좌</button>
                    <button>실시간 입금</button> */}
                  </div>
                </label>
              </form>
            </div>

          </div>
          <div className="right"></div>
        </div>
      </div>

    </div>
  )
}

export default Checkout