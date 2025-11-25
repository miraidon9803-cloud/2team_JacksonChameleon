import React from "react";
import { useProductStore } from "../store/ProductStore";
import "./scss/OrderDetail.scss";
import { useAuthStore } from "../store/authStore";
import OrderCard from "../components/OrderCard";

const OrderDetail = () => {
  const orders = useProductStore((state) => state.orders);
  const { user } = useAuthStore();
  const {hyphenphone} = useProductStore ();

  if (orders.length === 0) {
    return (
      <div className="order-detail-wrap">
        <div className="inner">
          <h2>주문내역이 없습니다.</h2>
        </div>
      </div>
    );
  }

  // 제일 최근 주문 가져오기
  // const latestOrder = orders[orders.length - 1];

  // 핸드폰 하이픈 추가
  // const hyphenphone = (value) => {
  //   if (!value) return "";
  //   const num = String(value).replace(/\D/g, "");
  //   if (num.length < 4) return num;
  //   if (num.length < 7) return num.replace(/(\d{3})(\d{1,3})/, "$1-$2");
  //   return num.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  // };

  return (
    <div className="order-detail-wrap">
      <div className="inner">
        {/* 상단 */}
        <div className="order-top">
          <p className="title">최근 주문 내역</p>
          <p>취소/교환/반품 신청은 주문완료일 기준 7일까지 가능합니다.</p>
        </div>

        {orders
        .slice()
        .reverse()
        .map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            user={user}
            hyphenphone={hyphenphone}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
