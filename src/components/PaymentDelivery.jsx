import React from 'react'
import './scss/PaymentDelivery.scss'

const PaymentDelivery = ({ onClose }) => {
    return (
        <div className='delivery-popup-wrap'>
            <div className="delivery-inner">
                <div className="top">
                    <h2>배송지 변경</h2>
                    <div onClick={() => onClose()}><img src="/images/close-grey.svg" alt="close" /></div>
                </div>
                <div className="input-list">

                    <div className="input">
                        <p>이름</p>
                        <input type="text" placeholder="이름" />
                    </div>

                    <div className="input">
                        <p>휴대폰번호</p>
                        <input type="text" placeholder="휴대폰번호" />
                    </div>

                    <div className="input-wrap">
                        <div className="input">
                            <p>주소</p>
                            <div className="addnum-box">
                                <input type="text" placeholder='우편번호' />
                                <button >주소찾기</button>
                            </div>
                            <input type="text" placeholder='기본주소' />
                            <input type="text" placeholder='상세주소' />
                        </div>
                    </div>

                </div>

            </div>
            <div className="btn">
                <button>적용하기</button>
            </div>
        </div>
    )
}

export default PaymentDelivery