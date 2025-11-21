import React from 'react'
import ShopTop from '../components/ShopTop'
import ProductList from '../components/ProductList'
import { useParams } from 'react-router-dom'

const Shop = () => {
  const { category, subcate } = useParams();

  return (
    <div>
      <ShopTop key={category} category={category || "All"} />
      <ProductList />
    </div>
  )
}

export default Shop