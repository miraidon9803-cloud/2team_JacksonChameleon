import React from 'react'
import "./scss/OrderCard.scss";

const OrderCard = ({ order, user, hyphenphone }) => {
    return (
        <div className="order-bottom">
            <div className="order-bottom-left">
                <div className="order-date-wrap">
                    <p className="order-date">
                        {order.orderDate} ({order.items.length}건)
                    </p>
                    <p>주문번호 {order.orderId}</p>
                </div>

                {order.items.map((item) => (
                    <div className="item-wrap" key={item.cartId}>
                        <p className="order">배송중</p>

                        <div className="item-box">
                            <div className="item-img">
                                <img src={item.size?.img} alt={item.title} />
                            </div>

                            <div className="item-info">
                                <h4 className="item-title">{item.title}</h4>

                                <p className="item-option">
                                    {item.sheet?.text} / {item.size?.sizename} /{" "}
                                    {item.color?.colorname} /{" "}
                                    {item.add?.cushion || "선택안함"} / {item.qty}개
                                </p>

                                <p className="item-price">
                                    {(
                                        item.size.price + (item.add?.price ?? 0)
                                    ).toLocaleString("ko-KR")}
                                    원
                                </p>

                                <button className="btn-return">
                                    <span>반품신청</span>
                                </button>
                                <button className="btn-change">
                                    <span>교환신청</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 오른쪽 결제 정보 */}
            <div className="order-bottom-right">
                <div className="content-wrap">
                    <h4>주문 상세</h4>

                    <div className="user-info">
                        <h4>{user.name}</h4>
                        <p>
                            {user.address} {user.add}
                        </p>
                        <p>
                            <p>{hyphenphone(user?.phone)}</p>
                        </p>
                    </div>

                    <div className="pay-info">
                        <h5>결제 정보</h5>
                        <ul>
                            <li>
                                <span>상품금액</span>
                                <span>{order.productPrice.toLocaleString()}원</span>
                            </li>

                            <li>
                                <span>할인 금액</span>
                                <span>
                                    {(
                                        order.salePrice + order.couponDiscount
                                    ).toLocaleString()}
                                    원
                                </span>
                            </li>

                            <li>
                                <span>적립금</span>
                                <span>{order.savePoint.toLocaleString()}원</span>
                            </li>

                            <li>
                                <span>배송비</span>
                                <span>무료배송</span>
                            </li>

                            <li>
                                <span>결제수단</span>
                                <span>{order.paymentMethod}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="total-price">
                        <span>총 구매 금액</span>
                        <strong>{order.finalPayment.toLocaleString()}원</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCard