import React, { useEffect, useState } from 'react'
import './scss/ShopTop.scss'
import { Link, useLocation, useParams } from 'react-router-dom'
import ShopTopCate from './ShopTopCate'



const ShopTop = ({ category }) => {
    // const { category } = useParams();
    // const location = useLocation();


    const getCurrentCate = () => category ? category : 'All';

    const [selectedCate, setselectedCate] = useState(getCurrentCate());

    useEffect(() => {
        setselectedCate(getCurrentCate());
    }, [category]);

    const currentCate = ShopTopCate.find(cate => cate.name === selectedCate);

    // const safeCate = currentCate || ShopTopCate.find(cate => cate.name === 'All');

    //첫글자만 대문자
    const firstUpper = (txt) => {
        return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    }


    return (

        <div className='shop-banner'>

            <div className="inner">
                <div className="img-box">
                    <img
                        src={currentCate.img}
                        alt={currentCate.name} />
                </div>

                <div className="text-box">
                    <p className='shop-title'>{selectedCate === 'All' ? 'Shop' : firstUpper(selectedCate)}</p>

                    <div className="shop-cate">
                        <ul>
                            {ShopTopCate.map((cate, id) => (
                                <li key={id} className={selectedCate === cate.name ? "active" : ""} >
                                    <Link to={cate.name === 'All' ? '/shop' : `/shop/${cate.name}`} >
                                        {firstUpper((cate.name))}

                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ShopTop