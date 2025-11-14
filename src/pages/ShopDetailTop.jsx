import React, { useEffect, useRef, useState } from 'react'
import './scss/ShopDetailTop.scss'
import ShopDetailSwiper from '../components/ShopDetailSwiper';
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/ProductStore';

const ShopDetailTop = () => {

    // Sheet Type 배열
    const sheet = [
        { title: "H", text: "하드" },
        { title: "M", text: "미디움" },
        { title: "MH", text: "미디움하드" },
        { title: "MS", text: "미디움소프트" }
    ];

    const [selectedSize, setSelectedSize] = useState(null);

    const { id } = useParams();
    const { items, onFetchItems } = useProductStore();
    const [product, setProduct] = useState(null);

    const [openIndex, setOpenIndex] = useState(0);
    const [scrollAble, setScrollAble] = useState({});
    const optionRefs = useRef([]);

    const toggleType = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const handleSelectOption = (index) => {
        if (index < 3) {
            setOpenIndex(index + 1)
        }
    }

    useEffect(() => {
        const newScrollAble = {};
        optionRefs.current.forEach((el, i) => {
            if (!el) return;
            newScrollAble[i] = i === openIndex && el.scrollHeight > el.clientHeight;
        });
        setScrollAble(newScrollAble);
    }, [openIndex]);

    useEffect(() => {
        if (items.length === 0) {
            onFetchItems();
        }
    }, []);

    // id로 상품 찾기
    useEffect(() => {
        const findItem = items.find((item) => Number(item.id) === Number(id));
        setProduct(findItem);
    }, [id, items]);

    if (!product) return <p>로딩중입니다...</p>;

    return (
        <div className='shop-detail-banner'>
            <div className= "inner">
                <div className="detail-banner-wrap">
                    <div className="detail-top">

                        {/* -------- LEFT -------- */}
                        <div className="top-left">
                            <div className="detail-title">
                                <p className="title">{product.title}</p>
                                <p className="price">{product.price} ~</p>
                            </div>

                            <div className="detail-img">
                                <ShopDetailSwiper />
                            </div>
                        </div>

                        {/* -------- RIGHT -------- */}
                        <div className="top-right">
                            <p>Choose Option</p>

                            <div className="option">

                                {/* ===========================
                                    0. SHEET TYPE
                                ============================ */}
                                <div className={`type ${openIndex === 0 ? 'open' : ''}`}>
                                    <div className='title' onClick={() => toggleType(0)}>
                                        <p>Sheet Type</p>
                                        <p><img src="/images/Arrow-down.png" alt="" /></p>
                                    </div>

                                    <div
                                        ref={(el) => optionRefs.current[0] = el}
                                        className={`depth-content-wrap ${scrollAble[0] ? 'has-scroll' : ''}`}
                                        onClick={() => handleSelectOption(0)}
                                    >
                                        {sheet.map((item) => (
                                            <div className="depth-content" key={item.title}>
                                                <p className="ST-title">{item.title}</p>
                                                <p className="ST-sub">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                {/* ===========================
                                    1. SIZE
                                ============================ */}
                                <div className={`type ${openIndex === 1 ? 'open' : ''}`}>
                                    <div className='title' onClick={() => toggleType(1)}>
                                        <p>Size</p>
                                        <p><img src="/images/Arrow-down.png" alt="" /></p>
                                    </div>

                                    <div
                                        ref={(el) => optionRefs.current[1] = el}
                                        className={`depth-content-wrap ${scrollAble[1] ? 'has-scroll' : ''}`}
                                        onClick={() => handleSelectOption(1)}>
                                        {product?.size?.map((s) => (
                                            <div className="depth-content" key={s.id}>
                                                <div className="depth-left">
                                                    <div className="left-img">
                                                        <img src={s.img} alt={s.sizename} />
                                                    </div>
                                                    <div className="left-title">
                                                        <span>{s.sizename}</span>
                                                    </div>
                                                </div>

                                                <div className="depth-right">
                                                    <p>너비: {s.width}</p>
                                                    <p>높이: {s.height}</p>
                                                    <p>깊이: {s.depth}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                {/* ===========================
                                    2. COLOR
                                ============================ */}
                                <div className={`type ${openIndex === 2 ? 'open' : ''}`}>
                                    <div className='title' onClick={() => toggleType(2)}>
                                        <p>Color</p>
                                        <p><img src="/images/Arrow-down.png" alt="" /></p>
                                    </div>

                                    <div
                                        ref={(el) => optionRefs.current[2] = el}
                                        className={`depth-content-wrap ${scrollAble[2] ? 'has-scroll' : ''}`}
                                        onClick={() => handleSelectOption(2)}>
                                        {product?.color?.map((s) => (
                                            <div className="depth-content" key={s.id}>
                                                <div className="content-img"><img src={s.img} alt="" />
                                                    <p className='content-text'>{s.colorname}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                {/* ===========================
                                    3. ADD
                                ============================ */}
                                <div className={`type ${openIndex === 3 ? 'open' : ''}`}>
                                    <div className='title' onClick={() => toggleType(3)}>


                                        <p>Add</p>
                                        <p><img src="/images/Arrow-down.png" alt="" /></p>
                                    </div>

                                    <div
                                        ref={(el) => (optionRefs.current[3] = el)}
                                        className={`depth-content-wrap ${scrollAble[3] ? "has-scroll" : ""}`}
                                        onClick={() => handleSelectOption(3)}
                                    >
                                        {product?.add?.map((s, index) => (
                                            <React.Fragment key={index}>
                                                <div className="depth-content select">
                                                    <div className="content-img">
                                                        <img src={s.img} alt={s.cushion} />
                                                        <p className="content-text">{s.cushion}</p>
                                                    </div>
                                                </div>

                                                <div className="depth-content">
                                                    <div className="content-img">
                                                        <p className="content-text">선택안함</p>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>


                    {/* ===========================
                        Bottom Section
                    ============================ */}
                    <div className="detail-bottom">
                        <div className="bottom-left">

                            <div className="selected-box">
                                <div className="selected-box-top">
                                    <p className="selected-opt">asdfasdfsadfsdfsdfsdfsdfds</p>
                                    <button className="cancel">
                                        <img src="/images/cancel.png" alt="cancel" />
                                        <img src="/images/cancel-hover.png" alt="cancel-hover" />
                                    </button>
                                </div>
                                <div className="selected-box-bottom">
                                    <button><img src="/images/minus.png" alt="minus" /></button>
                                    <span>2</span>
                                    <button><img src="/images/plus.png" alt="plus" /></button>
                                </div>
                            </div>

                        </div>

                        <div className="bottom-right">
                            <div className="total">
                                <p>총 상품금액</p>
                                <p className="price-total">44444444444원</p>
                            </div>

                            <div className="total-btn">
                                <div className="go-cart">장바구니</div>
                                <div className="go-pay">결제하기</div>
                            </div>

                        </div>
                    </div>

                </div >
            </div >
        </div >
    )
}

export default ShopDetailTop
