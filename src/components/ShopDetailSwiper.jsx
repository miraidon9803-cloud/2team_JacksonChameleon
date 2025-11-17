// import React, { useRef, useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { Autoplay, Navigation } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import './scss/ShopDetailSwiper.scss'
// import { useProductStore } from '../store/ProductStore'

// import arrowLeft from './images/Arrow-left.png'
// import arrowRight from './images/Arrow-right.png'

// const ShopDetailSwiper = () => {
//   const prevRef = useRef(null)
//   const nextRef = useRef(null)
//   const { id } = useParams()

//   const { items, onFetchItems } = useProductStore()
//   const [product, setProduct] = useState(null)

//   // 상품 불러오기
//   useEffect(() => {
//     if (items.length === 0) {
//       onFetchItems()
//     }
//   }, [items,onFetchItems])

//   useEffect(() => {
//     const findItem = items.find((item) => item.id === Number(id))
//     setProduct(findItem)
//   }, [items, id])


//   return (
//     <div className="swiper-wrap">

//       <button ref={prevRef} className="custom-prev">
//         <img src={arrowLeft} alt="prev" />
//       </button>

//       <Swiper
//         modules={[Navigation, Autoplay]}
//         navigation={{
//           prevEl: prevRef.current,
//           nextEl: nextRef.current,
//         }}

//         onBeforeInit={(swiper) => {
//           swiper.params.navigation.prevEl = prevRef.current
//           swiper.params.navigation.nextEl = nextRef.current
//         }}

//         autoplay={{ delay: 2000 }}
//         loop
//         slidesPerView={1}
//         className="mySwiper"
//       >
//         {product?.size?.map((s) => (
//           <SwiperSlide key={s.id}>
//             <img src={s.img} alt={s.sizename} />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <button ref={nextRef} className="custom-next">
//         <img src={arrowRight} alt="next" />
//       </button>

//     </div>
//   )
// }

// export default ShopDetailSwiper

// import React, { useRef, useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { Autoplay, Navigation } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import './scss/ShopDetailSwiper.scss'
// import { useProductStore } from '../store/ProductStore'

// import arrowLeft from './images/Arrow-left.png'
// import arrowRight from './images/Arrow-right.png'

// const ShopDetailSwiper = () => {
//   const prevRef = useRef(null)
//   const nextRef = useRef(null)
//   const { id } = useParams()

//   const { items, onFetchItems } = useProductStore()
//   const [product, setProduct] = useState(null)

//   // 상품 불러오기
//   useEffect(() => {
//     if (items.length === 0) {
//       onFetchItems()
//     }
//   }, [items, onFetchItems])

//   useEffect(() => {
//     const findItem = items.find((item) => item.id === Number(id))
//     setProduct(findItem)
//   }, [items, id])

//   const onSwiper = (swiper) => {
//     if (prevRef.current && nextRef.current) {
//       swiper.params.navigation.prevEl = prevRef.current
//       swiper.params.navigation.nextEl = nextRef.current
//       swiper.navigation.update() // navigation을 수동으로 업데이트
//     }
//   }

//   return (
//     <div className="swiper-wrap">

//       {/* Left Arrow Button */}
//       <button ref={prevRef} className="custom-prev">
//         <img src={arrowLeft} alt="prev" />
//       </button>

//       {/* Swiper Component */}
//       <Swiper
//         modules={[Navigation, Autoplay]}
//         navigation={{
//           prevEl: prevRef.current,
//           nextEl: nextRef.current,
//         }}
//         onBeforeInit={(swiper) => {
//           swiper.params.navigation.prevEl = prevRef.current
//           swiper.params.navigation.nextEl = nextRef.current
//         }}
//         autoplay={{ delay: 2000 }}
//         loop
//         slidesPerView={1}
//         className="mySwiper"
//       >
//         {product?.size?.map((s) => (
//           <SwiperSlide key={s.id}>
//             <img src={s.img} alt={s.sizename} />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Right Arrow Button */}
//       <button ref={nextRef} className="custom-next">
//         <img src={arrowRight} alt="next" />
//       </button>

//     </div>
//   )
// }

// export default ShopDetailSwiper

import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import './scss/ShopDetailSwiper.scss'
import { useProductStore } from '../store/ProductStore'

import arrowLeft from './images/Arrow-left.png'
import arrowRight from './images/Arrow-right.png'

const ShopDetailSwiper = () => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const { id } = useParams()

  const { items, onFetchItems } = useProductStore()
  const [product, setProduct] = useState(null)

  // 상품 불러오기
  useEffect(() => {
    if (items.length === 0) {
      onFetchItems()
    }
  }, [items, onFetchItems])

  useEffect(() => {
    const findItem = items.find((item) => item.id === Number(id))
    setProduct(findItem)
  }, [items, id])

  // Swiper 인스턴스를 받은 후 navigation 버튼의 참조가 설정되도록 처리
  const onSwiper = (swiper) => {
    if (prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current
      swiper.params.navigation.nextEl = nextRef.current
      swiper.navigation.update() // navigation을 수동으로 업데이트
    }
  }

  return (
    <div className="swiper-wrap">
      {/* Left Arrow Button */}
      <button ref={prevRef} className="custom-prev">
        <img src={arrowLeft} alt="prev" />
      </button>

      {/* Swiper Component */}
      <Swiper
        modules={[Navigation, Autoplay]}
        onSwiper={onSwiper}
        autoplay={{ delay: 2000 }}
        loop
        slidesPerView={1}
        className="mySwiper"
      >
        {product?.size?.map((s) => (
          <SwiperSlide key={s.id}>
            <img src={s.img} alt={s.sizename} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Arrow Button */}
      <button ref={nextRef} className="custom-next">
        <img src={arrowRight} alt="next" />
      </button>
    </div>
  )
}

export default ShopDetailSwiper
