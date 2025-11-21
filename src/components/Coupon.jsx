import React from 'react'
import { useProductStore } from '../store/ProductStore'
import "./scss/Coupon.scss"

const Coupon = ({ onClose }) => {
  const { coupons, onSelectCoupon, selectedCoupon } = useProductStore();
  console.log("coupons:", coupons);

  return (
    <div className='coupon-wrap'>
      <div className="inner">
        <div className="coupon-title">
        <h3>쿠폰사용</h3>
        <button onClick={onClose}>x</button>
        </div>

        <ul className="coupon-list">
          {coupons.map((c) => (
            <li key={c.id} className="coupon-item">
              <label>
                <input
                  className='coupons'
                  type="radio"
                  name="coupon"
                  checked={selectedCoupon?.id === c.id}
                  onChange={() => onSelectCoupon(c)}
                />
                <div className="coupon-right">
                  <p>{c.price.toLocaleString("ko-KR")}원 할인</p>
                  <p>{c.text}</p>
                  <p>2026년 1월 31일까지</p>
                </div>
                <p>{c.status}</p>
              </label>
            </li>
          ))}
        </ul>

        <p>적용하기</p>
      </div>
    </div>
  )
}

export default Coupon;
