import React from 'react'
import "./scss/CollectionBanner.scss";
import jacksonproduct from '../data/jacksonproduct'
import { Link } from 'react-router-dom'

const CollectionBanner = ({ banner, title, subTitle, des, brand }) => {

    const filteredProducts = brand
        ? jacksonproduct.filter(item =>
            item.brand?.toLowerCase() === brand.toLowerCase()
        )
        : jacksonproduct

    const collections = ["Ink", "Pebble", "Clay", "Round", "Plato"];

    return (
        <div className="collection-banner-wrap">
            <div className="img-box"><img src={banner} alt="컬렉션배너이미지" /></div>
            <div className="header-text-wrap">
                <div className="header-text-box">
                    <p>Collections</p>
                    <div className="collection-menu">
                        {collections.map((collection) => (
                            <Link
                                key={collection}
                                to={`/collections/${collection}`}
                            >
                                <p className={brand?.toLowerCase() === collection.toLowerCase() ? 'active' : ''}>
                                    <span>{collection}</span>
                                </p>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
            <div className="text-box">
                <h3 className='title'>{title}</h3>
                <h4 className='sub-title'>{subTitle}</h4>
                <p className='des'>{des}</p>
            </div>
        </div>
    )
}

export default CollectionBanner