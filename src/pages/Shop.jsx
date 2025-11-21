import React from 'react'
import ShopAll from '../components/ShopAll'
import ShopTop from '../components/ShopTop'
import jacksonproduct from '../data/jacksonproduct'
import { useParams } from 'react-router-dom'

const Shop = () => {
  const { category, subcate } = useParams();
  const product = jacksonproduct;

  // const getcategory = [
  //   "All", ...new Set(product.map((item) => item.product))
  // ];

  return (
    <div>
      <ShopTop key={category} category={category || "All"} />
      <ShopAll />
      {/* <ShopAll/> */}
    </div>
  )
}

export default Shop