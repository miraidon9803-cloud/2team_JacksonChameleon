import React from "react";
import { useProductStore } from "../store/ProductStore";
import "./scss/OrderDetail.scss";
import { useAuthStore } from "../store/authStore";

const OrderDetail = () => {
  const orders = useProductStore((state) => state.orders);
  const { user } = useAuthStore();

  if (orders.length === 0) {
    return (
      <div className="order-detail-wrap">
        <div className="inner">
          <h2>주문내역이 없습니다.</h2>
        </div>
      </div>
    );
  }

  // 가장 최근 주문
  const latestOrder = orders[orders.length - 1];

  // 핸드폰 하이픈 추가
  const hyphenphone = (value) => {
    if (!value) return "";
    const num = String(value).replace(/\D/g, "");
    if (num.length < 4) return num;
    if (num.length < 7) return num.replace(/(\d{3})(\d{1,3})/, "$1-$2");
    return num.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  };

  return (
    <div className="order-detail-wrap">
      <div className="inner">
        {/* 상단 */}
        <div className="order-top">
          <p className="title">최근 주문 내역</p>
          <p>취소/교환/반품 신청은 주문완료일 기준 7일까지 가능합니다.</p>
        </div>

        <div className="order-bottom">
          {/* 왼쪽 주문 상품 영역 */}
          <div className="order-bottom-left">
            <div className="order-date-wrap">
              <p className="order-date">
                {latestOrder.orderDate} ({latestOrder.items.length}건)
              </p>
              <p>주문번호 {latestOrder.orderId}</p>
            </div>

            {latestOrder.items.map((item) => (
              <div className="item-wrap" key={item?.cartId}>
                <p className="order">배송중</p>

                <div className="item-box">
                  <div className="item-img">
                    <img src={item.size?.img} alt={item?.title} />
                  </div>

                  <div className="item-info">
                    <h4 className="item-title">{item?.title}</h4>

                    <div className="item-option">
                      {item.sheet?.text} / {item.size?.sizename} /{" "}
                      {item.color?.colorname} /{" "}
                      {item.add?.cushion || "선택안함"} / {item.qty}개
                    </div>

                    <div className="item-price">
                      {(
                        (item.size?.price ?? 0) + (item.add?.price ?? 0)
                      ).toLocaleString("ko-KR")}
                      원
                    </div>

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

              {/* user-info 내 p 제거 */}
              <div className="user-info">
                <h4>{user?.name}</h4>

                <div>
                  {user?.address || ""} {user?.add || ""}
                </div>

                <div>{hyphenphone(user?.phone)}</div>
              </div>

              <div className="pay-info">
                <h5>결제 정보</h5>
                <ul>
                  <li>
                    <span>상품금액</span>
                    <span>{latestOrder.productPrice.toLocaleString()}원</span>
                  </li>

                  <li>
                    <span>할인 금액</span>
                    <span>
                      {(
                        latestOrder.salePrice + latestOrder.couponDiscount
                      ).toLocaleString()}
                      원
                    </span>
                  </li>

                  <li>
                    <span>적립금</span>
                    <span>{latestOrder.savePoint.toLocaleString()}원</span>
                  </li>

                  <li>
                    <span>배송비</span>
                    <span>무료배송</span>
                  </li>

                  <li>
                    <span>결제수단</span>
                    <span>{latestOrder.paymentMethod}</span>
                  </li>
                </ul>
              </div>

              <div className="total-price">
                <span>총 구매 금액</span>
                <strong>{latestOrder.finalPayment.toLocaleString()}원</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
