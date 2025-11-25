import React from 'react'
import jacksonproduct from '../data/jacksonproduct'
import "./scss/CollectionList.scss"
import { useNavigate } from "react-router-dom"; 


const CollectionList = ({ brand }) => {
    const navigate = useNavigate();  

   
    const filteredProducts = brand
        ? jacksonproduct.filter(item =>
            item.brand?.toLowerCase() === brand.toLowerCase()
        )
        : jacksonproduct

    return (
        <div className="collection-product-wrap">
            <div className="inner">
                
                <div className="product-list">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                            <div 
                                className="product" 
                                key={item.id}

                                onClick={() => navigate(`/shop/product/${item.id}`)}
                            >
                                <span className='new'>{item.badges}</span>

                                <div className="img-box">
                                    <p className="default-img">
                                        <img src={item.img_url} alt={item.title} />
                                    </p>
                                    <p className='hover-img'>
                                        <img src={item.img_hover} alt={item.title} />
                                    </p>
                                </div>

                                <div className="text-box">
                                    <p className="title">{item.title}</p>
                                    <div className="price-wrap">
                                        <div className="price">
                                            {item.price_regular && (
                                                <span className='pre-price'>{item.price_regular}</span>
                                            )}
                                            <strong>{item.price}</strong>
                                        </div>
                                        <p className="sale">{item.sale}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-products">해당 브랜드의 제품이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CollectionList
