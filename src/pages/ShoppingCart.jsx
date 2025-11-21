import React, { useEffect, useState } from 'react';
import "./scss/ShoppingCart.scss";
import { useProductStore } from '../store/ProductStore';
import { Link } from 'react-router-dom';
import OptionChange from '../components/OptionChange';

const ShoppingCart = () => {
    const { cartItems, totalPrice, onRemoveCart, onItemPlus, onItemMinus, onCheckCart } = useProductStore();
    const [isAllSelected, setIsAllSelected] = useState(false);


    useEffect(() => {
        if (cartItems.length > 0) {
            const checkedItems = cartItems.filter(item => item.checked);
            setIsAllSelected(checkedItems.length === cartItems.length);
        } else {
            setIsAllSelected(false)
        }
    }, [cartItems]);

    //전체선택
    const handleSelectAll = () => {
        cartItems.forEach(item => {
            if (item.checked !== !isAllSelected) {
                onCheckCart(item.cartId);
            }
        })
    };

    //개별 체크
    const handleSelectItem = (cartId) => {
        onCheckCart(cartId);
    }

    //선택삭제
    const handleDeleteSelected = () => {
        const checkedItems = cartItems.filter(item => item.checked);
        if (checkedItems.length === 0) {
            alert("삭제할 상품을 선택해주세요");
            return;
        }

        checkedItems.forEach(item => {
            onRemoveCart(item);
        });
    };

    //선택된 아이템 배열 구하기 
    const getSelectedItems = () => {
        return cartItems.filter(item => item.checked);
    };

    //한 아이템 가격
    const getItemTotal = (item) => {
        if (!item) return 0;

        const sizePrice = item.size?.price || 0;
        const addPrice = item.add?.price || 0;
        return (sizePrice + addPrice) * item.qty;
    };


    //선택된 총 제품가격
    const getSelectedTotalPrice = () => {
        const selected = getSelectedItems();
        if (selected.length === 0) return 0;

        return selected.reduce((sum, item) => {
            return sum + getItemTotal(item);
        }, 0);
    };

    //할인금액
    const getItemSale = () => {
        const selected = getSelectedItems();
        if (selected.length === 0) return 0;

        return selected.reduce((sum, item) => {
            if (!item.sale) return sum;

            const basePrice = getItemTotal(item)

            const saleRate = item.sale;
            const discount = basePrice * saleRate;

            return sum + discount;
        }, 0);

    }


    return (
        <div className='shopping-cart-wrap'>
            <div className="inner">
                <h3 className='title'>SHOPPING CART</h3>

                <div className="content-wrap">

                    <div className="cart-list">
                        <div className="choose-del-wrap">
                            <input
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={handleSelectAll}
                            />
                            <button onClick={handleDeleteSelected}>선택삭제</button>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="empty-wrap">
                                <p>장바구니가 비어있습니다.</p>
                            </div>
                        ) : (
                            cartItems.map((item, index) => (

                                <div className="item-wrap" key={index}>
                                    <div className="selected-wrap">
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() => handleSelectItem(item.cartId)}
                                        />
                                        <button className='close-btn' onClick={() => onRemoveCart(item)}><img src="/images/close-icon.png" alt="삭제버튼" /></button>
                                    </div>

                                    <div className="item-box">
                                        <div className="item-img"><img src={item.size.img} alt={item.title} /></div>

                                        <div className="item-info">
                                            <h4 className='item-title'>{item.title}</h4>
                                            <p className='item-option'>{item.sheet.text} / {item.size.sizename} / {item.color.colorname} / {item.add ? item.add.cushion : '선택안함'}
                                            </p>
                                                  <button className='btn-option'><span>옵션변경</span></button>
                                             <OptionChange item={item} />
                                        </div>

                                        <div className="count-price-wrap">
                                            <div className="count-wrap">
                                                <button onClick={() => onItemMinus(item)}><img src="/images/minus.png" alt="빼기아이콘" /></button>
                                                <span>{item.qty}</span>
                                                <button onClick={() => onItemPlus(item)}><img src="/images/plus.png" alt="더하기아이콘" /></button>
                                            </div>
                                            <p className='price'>
                                                {getItemTotal(item).toLocaleString()}원
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="total-wrap">
                        <div className="total-content">
                            <h4>구매 금액</h4>
                            <ul>
                                <li><span>상품금액</span><span>{getSelectedTotalPrice().toLocaleString()}원</span></li>
                                <li><span>할인 금액</span><span>{getItemSale().toLocaleString()}</span></li>
                                <li><span>적립금</span><span>{(getSelectedTotalPrice() * 0.001).toLocaleString()}원</span></li>
                                <li><span>배송비</span><span>무료배송</span></li>
                            </ul>

                            <div className="total-price">
                                <span>총 구매 금액</span>
                                <strong>{(getSelectedTotalPrice() - getItemSale()).toLocaleString()}원</strong>
                            </div>

                          <Link to="/payment"><div className='pay-btn'><span>결제하기</span></div></Link>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default ShoppingCart