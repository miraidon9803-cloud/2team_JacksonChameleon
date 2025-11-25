import React, { useEffect, useState } from "react";
import "./scss/ShoppingCart.scss";
import { useProductStore } from "../store/ProductStore";
// import OptionChange from "../components/OptionChange";
import CartOptionPopup from "../components/CartOptionPopup";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const {
    cartItems,
    totalPrice,
    onRemoveCart,
    onItemPlus,
    onItemMinus,
    onCheckCart,
    getItemTotal,
    getSelectedTotalPrice,
    getItemSalePrice,
    getsavePoint,
    resetCheckoutItems,
  } = useProductStore();

  const selectedTotal = getSelectedTotalPrice();
  const saleTotal = getItemSalePrice();
  const savePoint = getsavePoint();
  const finalTotal = selectedTotal - saleTotal;

  const [isAllSelected, setIsAllSelected] = useState(false);
  const [optionItem, setOptionItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length > 0) {
      const checkedItems = cartItems.filter((item) => item.checked);
      setIsAllSelected(checkedItems.length === cartItems.length);
      console.log(totalPrice);
    } else {
      setIsAllSelected(false);
    }
  }, [cartItems]);

  //전체선택
  const handleSelectAll = () => {
    cartItems.forEach((item) => {
      if (item.checked !== !isAllSelected) {
        onCheckCart(item.cartId);
      }
    });
  };

  //개별 체크
  const handleSelectItem = (cartId) => {
    onCheckCart(cartId);
  };

  //선택삭제
  const handleDeleteSelected = () => {
    const checkedItems = cartItems?.filter((item) => item.checked);
    if (checkedItems.length === 0) {
      alert("삭제할 상품을 선택해주세요");
      return;
    }

    checkedItems.forEach((item) => {
      onRemoveCart(item);
    });
  };

  return (
    <div className="shopping-cart-wrap">
      <div className="inner">
        <h3 className="title">SHOPPING CART</h3>

        <div className="content-wrap">
          <div className="cart-list">
            <div className="choose-del-wrap">
              <label className="check-box">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="real"
                />
                <span className="fake">
                  <img
                    className="icon"
                    src="/images/check.png"
                    alt="checkicon"
                  />
                </span>
              </label>
              <button onClick={handleDeleteSelected}>선택삭제</button>
            </div>

            {cartItems.length === 0 ? (
              <div className="empty-wrap">
                <p>장바구니가 비어있습니다.</p>
              </div>
            ) : (
              <div className="item-list">
                {cartItems.map((item, index) => (
                  <div className="item-wrap" key={index}>
                    <div className="selected-wrap">
                      <label className="check-box">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleSelectItem(item.cartId)}
                          className="real"
                        />
                        <span className="fake">
                          <img
                            className="icon"
                            src="/images/check.png"
                            alt="checkicon"
                          />
                        </span>
                      </label>
                      <button
                        className="close-btn"
                        onClick={() => onRemoveCart(item)}
                      >
                        <img src="/images/close-icon.png" alt="삭제버튼" />
                      </button>
                    </div>

                    <div className="item-box">
                      <div className="item-img">
                        <img src={item?.size?.img} alt={item.title} />
                      </div>
                      <div className="item-text">
                        <div className="item-info">
                          <h4 className="item-title">{item.title}</h4>
                          <p className="item-option">
                            {item.sheet?.text || "시트 없음"} /
                            {item.size?.sizename || "사이즈 없음"} /
                            {item.color?.colorname || "컬러 없음"}
                          </p>

                          <button
                            className="btn-option"
                            onClick={() => setOptionItem(item)}
                          >
                            <span>옵션변경</span>
                          </button>

                          {optionItem && (
                            <CartOptionPopup
                              item={optionItem}
                              onClose={() => setOptionItem(null)}
                            />
                          )}
                        </div>

                        <div className="count-wrap">
                          <button onClick={() => onItemMinus(item)}>
                            <img src="/images/minus.png" alt="빼기아이콘" />
                          </button>
                          <span>{item.qty}</span>
                          <button onClick={() => onItemPlus(item)}>
                            <img src="/images/plus.png" alt="더하기아이콘" />
                          </button>
                        </div>
                        <p className="price">
                          {getItemTotal(item).toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="total">
            <div className="total-wrap">
              <div className="total-content">
                <h4>구매 금액</h4>
                <ul>
                  <li>
                    <span>상품금액</span>
                    <span>{selectedTotal.toLocaleString()}원</span>
                  </li>
                  <li>
                    <span>할인 금액</span>
                    <span>{saleTotal.toLocaleString()}</span>
                  </li>
                  <li>
                    <span>적립금</span>
                    <span>{savePoint.toLocaleString()}원</span>
                  </li>
                  <li>
                    <span>배송비</span>
                    <span>무료배송</span>
                  </li>
                </ul>

                <div className="total-price">
                  <span>총 구매 금액</span>
                  <strong>{finalTotal.toLocaleString()}원</strong>
                </div>

                <button
                  className="pay-btn"
                  onClick={() => {
                    resetCheckoutItems();
                    navigate("/payment");
                  }}
                >
                  <span>결제하기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
