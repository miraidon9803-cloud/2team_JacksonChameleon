import React from 'react'
import jacksonproduct from '../data/jacksonproduct'

const ShopTopCategoris = [
    "All",
    ...new Set(jacksonproduct.map((item) => item.product)),
];

const ShopTopImg = {
    All: "/images/shop_all_banner.png",
    sofa: '/images/shop_sofa_banner.png',
    table: '/images/shop_table_banner.png',
    chair: '/images/shop_chair_banner.png',
    lighting: "/images/shop_lighting_banner.png",
};

const ShopTopCate = ShopTopCategoris.map((cate)=>({
    name:cate,
    img:ShopTopImg[cate]
}))


export default ShopTopCate