// CartOptionPopup.jsx
import React, { useState } from "react";
import "./scss/CartOptionPopup.scss";
import { products } from "../data/JacksonDetail";
import { useProductStore } from "../store/ProductStore";

const CartOptionPopup = ({ item, onClose }) => {
  const { onOptionChange } = useProductStore();

  const sheetOptions = [
    { title: "H", text: "하드" },
    { title: "M", text: "미디움" },
    { title: "MH", text: "미디움하드" },
    { title: "MS", text: "미디움소프트" },
  ];

  if (!item) return null;

  const originProduct = products.find((p) => p.id === item.id);
  if (!originProduct) return null;

  const sizeOptions = originProduct.size || [];
  const colorOptions = originProduct.color || [];
  const addOptions = originProduct.add || [];

  // 현재 선택 상태 (처음엔 장바구니에 담겨 있는 값 기준)
  const [selectedSheet, setSelectedSheet] = useState(item.sheet || null);
  const [selectedSize, setSelectedSize] = useState(item.size || null);
  const [selectedColor, setSelectedColor] = useState(item.color || null);
  const [selectedAdd, setSelectedAdd] = useState(item.add || null);

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (type) => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  };

  const handleApply = () => {
    onOptionChange(
      item.cartId,
      selectedSheet,
      selectedColor,
      selectedSize,
      selectedAdd
    );
    if (onClose) onClose();
  };

  console.log("sheetOptions:", sheetOptions);
  console.log("openDropdown:", openDropdown);

  return (
    <div className="option-popup-bg">
      <div className="option-popup-wrap">
        <div className="option-popup-inner">
          <div className="top">
            <h2>옵션 변경</h2>
            <button type="button" onClick={onClose} className="close-btn">
              <img src="/images/close-grey.svg" alt="close" />
            </button>
          </div>

          <div className="option-list">
            {/* Sheet Type */}
            <div className="option">
              <p>Sheet Type</p>
              <div className="choice-list">
                <div className="choice" onClick={() => toggleDropdown("sheet")}>
                  <p>{selectedSheet?.text || "선택하세요"}</p>
                  <div>
                    <img src="/images/Arrow-down-grey.svg" alt="arrow" />
                  </div>
                </div>
                <div
                  className={`another ${
                    openDropdown === "sheet" ? "open" : ""
                  }`}
                >
                  {sheetOptions.map((s) => (
                    <p
                      key={s.id}
                      onClick={() => {
                        setSelectedSheet(s);
                        setOpenDropdown(null);
                      }}
                    >
                      {s.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Size */}
            <div className="option">
              <p>Size</p>
              <div className="choice-list">
                <div className="choice" onClick={() => toggleDropdown("size")}>
                  <p>{selectedSize?.sizename || "선택하세요"}</p>
                  <div>
                    <img src="/images/Arrow-down-grey.svg" alt="arrow" />
                  </div>
                </div>
                <div
                  className={`another ${openDropdown === "size" ? "open" : ""}`}
                >
                  {sizeOptions.map((s) => (
                    <p
                      key={s.id}
                      onClick={() => {
                        setSelectedSize(s);
                        setOpenDropdown(null);
                      }}
                    >
                      {s.sizename}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Color */}
            <div className="option">
              <p>Color</p>
              <div className="choice-list">
                <div className="choice" onClick={() => toggleDropdown("color")}>
                  <p>{selectedColor?.colorname || "선택하세요"}</p>
                  <div>
                    <img src="/images/Arrow-down-grey.svg" alt="arrow" />
                  </div>
                </div>
                <div
                  className={`another ${
                    openDropdown === "color" ? "open" : ""
                  }`}
                >
                  {colorOptions.map((c) => (
                    <p
                      key={c.id}
                      onClick={() => {
                        setSelectedColor(c);
                        setOpenDropdown(null);
                      }}
                    >
                      {c.colorname}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Add */}
            <div className="option">
              <p>Add</p>
              <div className="choice-list">
                <div className="choice" onClick={() => toggleDropdown("add")}>
                  <p>{selectedAdd?.cushion || "선택안함"}</p>
                  <div>
                    <img src="/images/Arrow-down-grey.svg" alt="arrow" />
                  </div>
                </div>
                <div
                  className={`another ${openDropdown === "add" ? "open" : ""}`}
                >
                  {addOptions.map((a) => (
                    <p
                      key={a.id}
                      onClick={() => {
                        setSelectedAdd(a);
                        setOpenDropdown(null);
                      }}
                    >
                      {a.cushion}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="btn">
          <button type="button" onClick={handleApply}>
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOptionPopup;
