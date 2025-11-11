import React from 'react';
import "./scss/ShoppingCart.scss";

const ShoppingCart = () => {
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



                        <div className="item-wrap">
                            <div className="selected-wrap">
                                <input type="checkbox" />
                                <button className='close-btn'><img src="/images/close-icon.png" alt="삭제버튼" /></button>
                            </div>

                            <div className="item-box">
                                <div className="item-img"><img src="/images/Pebble-Sofa-Fabric.png" alt="" /></div>

                                <div className="item-info">
                                    <h4 className='item-title'>Flare Table</h4>
                                    <p className='item-option'>소파 3인 / 샌드스톤01 / 오스터 / 선택안함</p>
                                    <button className='btn-option'><span>옵션변경</span></button>
                                </div>

                                <div className="count-price-wrap">
                                    <div className="count-wrap">
                                        <button>-</button>
                                        <span>1</span>
                                        <button>+</button>
                                    </div>
                                    <p className='price'>6,400,000원</p>
                                </div>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="selected-wrap">
                                <input type="checkbox" />
                                <button className='close-btn'><img src="/images/close-icon.png" alt="삭제버튼" /></button>
                            </div>

                            <div className="item-box">
                                <div className="item-img"><img src="/images/Pebble-Sofa-Fabric.png" alt="" /></div>

                                <div className="item-info">
                                    <h4 className='item-title'>Flare Table</h4>
                                    <p className='item-option'>소파 3인 / 샌드스톤01 / 오스터 / 선택안함</p>
                                    <button className='btn-option'><span>옵션변경</span></button>
                                </div>

                                <div className="count-price-wrap">
                                    <div className="count-wrap">
                                        <button>-</button>
                                        <span>1</span>
                                        <button>+</button>
                                    </div>
                                    <p className='price'>6,400,000원</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="total-wrap">
                        <h4>구매 금액</h4>

                        <ul>
                            <li><span>상품금액</span><span>7,672,000원</span></li>
                            <li><span>할인 금액</span><span>143,000원</span></li>
                            <li><span>적립금</span><span>7,672</span></li>
                            <li><span>배송비</span><span>무료배송</span></li>
                        </ul>

                        <div className="total-price">
                            <span>총 구매 금액</span>
                            <strong>7,538,000원</strong>
                        </div>

                        <button className='pay-btn'><span>결제하기</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart