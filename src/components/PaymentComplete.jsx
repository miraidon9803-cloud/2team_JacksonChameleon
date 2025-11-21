import React from 'react'
import './scss/PaymentComplete.scss';
import { useProductStore } from '../store/ProductStore';
import { useNavigate } from 'react-router-dom';

const PaymentComplete = () => {

    const navigate = useNavigate();

    const { 
        updateMyPoint,   
        onAddOrder,     
        usedPoint,        
        getsavePoint     
    } = useProductStore();


    const handleConfirm = () => {
        const used = usedPoint;
        const saved = getsavePoint();
        updateMyPoint(used, saved);
        onAddOrder();
        navigate("/mypage");
    };

    return (
        <div className='PaymentComplete-wrap'>
            <div className="wrap">

                <div className="top">
                    <div className="close">
                        <img src="/images/close-grey.svg" alt="close" />
                    </div>

                    <div className="img-box">
                        <div className='line'>
                            <img src="/images/complete1.png" alt="complete1" />
                        </div>
                        <div className='ani'>
                            <img src="/images/complete2.png" alt="complete2" />
                        </div>
                    </div>

                    <h2>주문이 완료되었습니다</h2>
                    <p>Thank you for purchasing our product</p>
                </div>

                <div className="text-box">
                    <div className="first-box">
                        <div className="box">
                            <p>주문번호</p>
                            <p>20251121-12345678</p>
                        </div>
                        <div className="box">
                            <p>결제일자</p>
                            <p>{new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="box">
                            <p>주문상품</p>
                            <p></p>
                        </div>
                    </div>

                    <div className="first-box">
                        <div className="box big-text">
                            <p>총 구매 금액</p>
                            <p></p>
                        </div>
                        <div className="box">
                            <p>적립금</p>
                            <p>{getsavePoint().toLocaleString("ko-KR")}원</p>
                        </div>
                    </div>

                </div>
            </div>

            <button onClick={handleConfirm}>메인 화면 가기</button>

        </div>
    );
}

export default PaymentComplete;
