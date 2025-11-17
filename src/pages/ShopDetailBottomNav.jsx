import React from 'react'
import './scss/ShopDetailBottomNav.scss'

const ShopDetailBottomNav = ({activeTap, setActiveTap}) => {
        console.log('setActiveTab:', setActiveTap);

  const tabs = [
        { name: "제품소개" },
        { name: "사이즈" },
        { name: "리뷰" },
        { name: "서비스안내" },
    ];

    const handleTapClick = (index) => {
        if (setActiveTap) setActiveTap(index);
    };

    return (
        <div className="detail-btn-wrap">
            <div className="inner">
                <div className="detail-bottom-btn">
                    {tabs.map((tab, i) => (
                        <button
                            key={tab.name}
                            className={activeTap === i ? "active" : ""}
                            onClick={() => handleTapClick(i)}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShopDetailBottomNav