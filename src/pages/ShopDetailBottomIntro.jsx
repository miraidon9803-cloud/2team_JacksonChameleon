import React from 'react'
import './scss/ShopDetailBottomintro.scss'


const ShopDetailBottomIntro = ({ product }) => {
  if (!product) return null;

  return (
    <div className='bottom-intro-wrap'>
      <div className="inner">

        <div className="intro">
          {product.intro.map((el, idx) => (
            <img key={idx} src={el.img} alt={`intro-${idx}`} />
          ))}
          {product.protext.map((el, idx)=> (
            <img key={idx} src={el.img} alt='protext'/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopDetailBottomIntro