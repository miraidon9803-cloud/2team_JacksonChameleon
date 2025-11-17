import React from 'react';
import "./scss/ShoppingCart.scss";
import { useProductStore } from '../store/ProductStore';

const ShoppingCart = () => {
    const { cartItems, totalPrice } = useProductStore();

    return (
        <div className='shopping-cart-wrap'>
            <div className="inner">
                <h3 className='title'>SHOPPING CART</h3>
                <div className="content-wrap">
                    <div className="cart-list">

                        <div className="choose-del-wrap">
                            <input type="checkbox" />
                            <button>선택삭제</button>
                        </div>

                        {cartItems.length === 0 ? (
                            <p>장바구니가 비어있습니다.</p>
                        ) : (
                            cartItems.map((item, index) => (

                                <div className="item-wrap">
                                    <div className="selected-wrap">
                                        <input type="checkbox" />
                                        <button className='close-btn'><img src="/images/close-icon.png" alt="삭제버튼" /></button>
                                    </div>

                                    <div className="item-box">
                                        <div className="item-img"><img src={item.size.img} alt={item.title} /></div>

                                        <div className="item-info">
                                            <h4 className='item-title'>{item.title}</h4>
                                            <p className='item-option'>{item.sheet.text} / {item.size.sizename} / {item.color.colorname} / {item.add ? item.add.cushion : '선택안함'}
                                            </p>
                                            <button className='btn-option'><span>옵션변경</span></button>
                                        </div>

                                        <div className="count-price-wrap">
                                            <div className="count-wrap">
                                                <button>-</button>
                                                <span>{item.qty}</span>
                                                <button>+</button>
                                            </div>
                                            <p className='price'>
                                                {((item.size?.price || 0) + (item.add?.price || 0)).toLocaleString()}원
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="total-wrap">
                        <h4>구매 금액</h4>

                        <ul>
                            <li><span>상품금액</span><span>{totalPrice.toLocaleString()}원</span></li>
                            <li><span>할인 금액</span><span>143,000원</span></li>
                            <li><span>적립금</span><span>7,672</span></li>
                            <li><span>배송비</span><span>무료배송</span></li>
                        </ul>

                        <div className="total-price">
                            <span>총 구매 금액</span>
                            <strong>{totalPrice.toLocaleString()}원</strong>
                        </div>

                        <button className='pay-btn'><span>결제하기</span></button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ShoppingCart