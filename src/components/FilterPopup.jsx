import React from 'react'
import "./scss/filterPopup.scss";

const FilterPopup = () => {
    return (
        <div className="filter-wrap">
            <div className="filter-title">
                <h3>Filter</h3>
                <p className="close-btn"><img src="/images/close-icon.png" alt="" /></p>
            </div>
            <div className="sort-wrap">
                <p className="sort-title">정렬</p>
                <div className="btn-wrap">
                    <button>추천순</button>
                    <button>최신순</button>
                    <button>가격 낮은순</button>
                    <button>가격 높은순</button>
                </div>
            </div>
            <div className="collection-wrap">
                <p className="collection-title">컬렉션</p>
                <div className="btn-wrap">
                    <button>Ink</button>
                    <button>Pebble</button>
                    <button>Clay</button>
                    <button>Round</button>
                    <button>Plato</button>
                </div>
            </div>
            <p className='apply-btn'>적용하기</p>
        </div>
    )
}

export default FilterPopup