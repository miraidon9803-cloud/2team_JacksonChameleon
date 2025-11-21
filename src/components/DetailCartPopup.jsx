import React from 'react'
import "./scss/DetailCartPopup.scss";

const DetailCartPopup = () => {
    return (
        <div className="cart-popup-wrap fade-in">
            <div className="cart-popup">
                <p><img src="/images/detail-cart-icon.png" alt="" /></p>
                <p className='text'>장바구니에 상품을 담았습니다</p>
            </div>
        </div>
    )
}

export default DetailCartPopup