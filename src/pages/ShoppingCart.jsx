import React, { useEffect, useState } from 'react';
import "./scss/ShoppingCart.scss";
import { useProductStore } from '../store/ProductStore';

const ShoppingCart = () => {
    const { cartItems, totalPrice, onRemoveCart, onItemPlus, onItemMinus } = useProductStore();

    const [selectedItems, setSelectedItems] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

    useEffect(() => {
        if (cartItems.length > 0) {
            setIsAllSelected(selectedItems.length === cartItems.length);
        } else {
            setIsAllSelected(false)
        }
    }, [selectedItems, cartItems]);

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems);
        }
    };

    const handleSelectItem = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selected => selected !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    }

    const handleDeleteSelected = () => {
        if (selectedItems.length === 0) {
            alert("삭제할 상품을 선택해주세요");
            return;
        }
        selectedItems.forEach(item => {
            onRemoveCart(item);
        });
        setSelectedItems([]);
    }

    const getItemTotal = (item) => {
        const sizePrice = item.size?.price || 0;
        const addPrice = item.add?.price || 0;
        return (sizePrice + addPrice) * item.qty;
    };

    return (
        <div className='shopping-cart-wrap'>
            <div className="inner">
                <h3 className='title'>SHOPPING CART</h3>

                <div className="content-wrap">

                    <div className="cart-list">
                        <div className="choose-del-wrap">
                            <label className="check-box">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={handleSelectAll}
                                    className='real'
                                />
                                <span className='fake'><img className='icon' src="/images/check.png" alt="checkicon" /></span>
                            </label>
                            <button onClick={handleDeleteSelected}>선택삭제</button>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="empty-wrap">
                                <p>장바구니가 비어있습니다.</p>
                            </div>
                        ) : (
                            <div className="item-list">
                                {
                                    cartItems.map((item, index) => (

                                        <div className="item-wrap" key={index}>
                                            <div className="selected-wrap">
                                                <label className="check-box">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.includes(item)}
                                                        onChange={() => handleSelectItem(item)}
                                                        className='real'
                                                    />
                                                    <span className='fake'><img className='icon' src="/images/check.png" alt="checkicon" /></span>

                                                </label>
                                                <button className='close-btn' onClick={() => onRemoveCart(item)}><img src="/images/close-icon.png" alt="삭제버튼" /></button>
                                            </div>

                                            <div className="item-box">
                                                <div className="item-img"><img src={item.size.img} alt={item.title} /></div>

                                                <div className="item-sel">
                                                    <div className="item-info">
                                                        <h4 className='item-title'>{item.title}</h4>
                                                        <p className='item-option'>{item.sheet.text} / {item.size.sizename} / {item.color.colorname} / {item.add ? item.add.cushion : '선택안함'}
                                                        </p>
                                                        <button className='btn-option'><span>옵션변경</span></button>
                                                    </div>


                                                    <div className="count-wrap">
                                                        <button onClick={() => onItemMinus(item)}><img src="/images/minus.png" alt="빼기아이콘" /></button>
                                                        <span>{item.qty}</span>
                                                        <button onClick={() => onItemPlus(item)}><img src="/images/plus.png" alt="더하기아이콘" /></button>
                                                    </div>
                                                    <p className='price'>
                                                        {/* {totalPrice.toLocaleString()}원 */}
                                                        {getItemTotal(item).toLocaleString()}원

                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                        }
                    </div>

                    <div className="total">
                        <div className="total-wrap">
                            <div className="total-content">
                                <h4>구매 금액</h4>
                                <ul>
                                    <li><span>상품금액</span><span>{totalPrice.toLocaleString()}원</span></li>
                                    <li><span>할인 금액</span><span>143,000원</span></li>
                                    <li><span>적립금</span><span>7,672</span></li>
                                    <li><span>배송비</span><span>무료배송</span></li>
                                </ul>

                                <div className="total-price">
                                    <span>총 구매 금액</span>
                                    <strong>{totalPrice.toLocaleString()}원</strong>
                                </div>

                                <button className='pay-btn'><span>결제하기</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ShoppingCart