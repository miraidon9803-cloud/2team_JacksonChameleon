import React from 'react'
import './scss/ShopDetailBottomSize.scss'

const ShopDetailBottomSize = ({ product }) => {
  if (!product) return null;

  return (
    <div className='bottom-size-wrap'>
      <div className="inner">
        <div className="content-wrap">
          <div className="size-title">
            <p className="title-main">사이즈</p>
            <p className="title-sub">여러개의 모듈러 폼을 선택하여 다양한 조합이 가능합니다.</p>
          </div>
          <div className="size">
            {product.sizeImg.map((el, idx) => (
              <img key={idx} src={el.img} alt={`intro-${idx}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopDetailBottomSize