import React from 'react'
import "./scss/CollectionBanner.scss";

const CollectionBanner = ({ banner, title, subTitle, des }) => {
    return (
        <div className="collection-banner-wrap">
            <div className="img-box"><img src={banner} alt="" /></div>
            <div className="text-box">
                <h3 className='title'>{title}</h3>
                <h4 className='sub-title'>{subTitle}</h4>
                <p className='des'>{des}</p>
            </div>
        </div>
    )
}

export default CollectionBanner