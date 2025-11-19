import React from 'react'
import { useProductStore } from '../store/ProductStore';
import "./scss/OrderDetail.scss";

const OrderDetail = () => {
    const { cartItems, totalPrice } = useProductStore();

    const getItemTotal = (item) => {
        const sizePrice = item.size?.price || 0;
        const addPrice = item.add?.price || 0;
        return (sizePrice + addPrice) * item.qty;
    };

    return (
        <div className="order-detail-wrap">
            <div className="inner">
                <div className="order-top">
                    <p className="title">최근 주문 내역</p>
                    <p>취소/교환/반품 신청은 주문완료일 기준 7일까지 가능합니다.</p>
                </div>
                <div className="order-bottom">
                    <div className="order-bottom-left">
                        <div className="order-date-wrap">
                            <p className="order-date">2025-11-20 ({cartItems.length}건)</p>
                            <p>주문번호 20251120-12345678</p>
                        </div>
                        {cartItems.length === 0 ? (
                            <div className="empty-wrap">
                                <p> 주문내역이 없습니다.</p>
                            </div>
                        ) : (
                            cartItems.map((item, index) => (

                                <div className="item-wrap" key={index}>
                                    <p className='order'>배송중</p>

                                    <div className="item-box">
                                        <div className="item-img"><img src={item.size.img} alt={item.title} /></div>

                                        <div className="item-info">
                                            <h4 className='item-title'>{item.title}</h4>
                                            <p className='item-option'>{item.sheet.text} / {item.size.sizename} / {item.color.colorname} / {item.add ? item.add.cushion : '선택안함'} / {item.qty}
                                            </p>
                                            <p className="item-price">1,222,000원</p>
                                            <button className='btn-return'><span>반품신청</span></button>
                                            <button className='btn-change'><span>교환신청</span></button>
                                        </div>


                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="order-bottom-right">
                        <div className="content-wrap">
                            <h4>주문 상세</h4>
                            <div className="user-info">
                                <h5 className="name">홍길동</h5>
                                <p className="address">서울시</p>
                                <p>010-1234-5678</p>
                            </div>
                            <div className="pay-info">
                                <h5>결제 정보</h5>
                                <ul>
                                    <li><span>상품금액</span><span>{totalPrice.toLocaleString()}원</span></li>
                                    <li><span>할인 금액</span><span>143,000원</span></li>
                                    <li><span>적립금</span><span>7,672</span></li>
                                    <li><span>배송비</span><span>무료배송</span></li>
                                    <li><span>결제 수단</span><span>삼성페이</span></li>
                                </ul>
                            </div>
                            <div className="total-price">
                                <span>총 구매 금액</span>
                                <strong>{totalPrice.toLocaleString()}원</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail