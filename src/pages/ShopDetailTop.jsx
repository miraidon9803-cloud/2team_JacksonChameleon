import React, { useEffect, useRef, useState } from 'react';
import './scss/ShopDetailTop.scss';
import ShopDetailSwiper from '../components/ShopDetailSwiper';
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/ProductStore';

const ShopDetailTop = () => {
  const sheetList = [
    { title: "H", text: "하드" },
    { title: "M", text: "미디움" },
    { title: "MH", text: "미디움하드" },
    { title: "MS", text: "미디움소프트" }
  ];

  const { id } = useParams();
  const { items, onFetchItems } = useProductStore();
  const [product, setProduct] = useState(null);

  const [openIndex, setOpenIndex] = useState(0);
  const optionRefs = useRef([]);
  const [scrollAble, setScrollAble] = useState({});


  const [selected, setSelected] = useState({
    sheet: null,
    size: null,
    color: null,
    add: null,
    qty: 1,
  });

  // 옵션 선택 핸들러
  const selectSheet = (item) => {
    setSelected((prev) => ({ ...prev, sheet: item }));
    setOpenIndex(1);
  };

  const selectSize = (item) => {
    setSelected((prev) => ({ ...prev, size: item }));
    setOpenIndex(2);
  };

  const selectColor = (item) => {
    setSelected((prev) => ({ ...prev, color: item }));
    setOpenIndex(3);
  };

  const selectAdd = (item) => {
    if (item === "none") {
      setSelected((prev) => ({ ...prev, add: null }));
    } else {
      setSelected((prev) => ({ ...prev, add: item }));
    }
  };


  // 총 금액 계산
  const getTotalPrice = () => {
    if (!selected.size) return 0;

    let total = selected.size.price * selected.qty;

    if (selected.add) total += selected.add.price * selected.qty;

    return total.toLocaleString() + "원";
  };


  // 선택 옵션 텍스트 만들기
  const getSelectedText = () => {
    const { sheet, size, color, add } = selected;

    let text = [];

    if (sheet) text.push(`Sheet: ${sheet.title}`);
    if (size) text.push(`Size: ${size.sizename}`);
    if (color) text.push(`Color: ${color.colorname}`);
    if (add) text.push(`Add: ${add.cushion}`);

    if (text.length === 0) return "옵션을 선택하세요";

    return text.join(" / ");
  };

  // 옵션 전체 초기화
  const resetSelected = () => {
    setSelected({
      sheet: null,
      size: null,
      color: null,
      add: null,
      qty: 1,
    });
    setOpenIndex(0);
  };

  // 수량 변경
  const increaseQty = () => {
    setSelected((prev) => ({ ...prev, qty: prev.qty + 1 }));
  };

  const decreaseQty = () => {
    setSelected((prev) => ({
      ...prev,
      qty: prev.qty > 1 ? prev.qty - 1 : 1
    }));
  };


  // 상품 데이터 로드
  useEffect(() => {
    if (items.length === 0) onFetchItems();
  }, []);

  useEffect(() => {
    const findItem = items.find((item) => Number(item.id) === Number(id));
    setProduct(findItem);
  }, [id, items]);

  if (!product) return <p>로딩중입니다...</p>;

  return (
    <div className='shop-detail-banner'>
      <div className="inner">
        <div className="detail-banner-wrap">
          <div className="detail-top">

            {/* LEFT */}
            <div className="top-left">
              <div className="detail-title">
                <p className="title">{product.title}</p>
                <p className="price">{product.price}</p>
              </div>

              <div className="detail-img">
                <ShopDetailSwiper />
              </div>
            </div>

            {/* RIGHT */}
            <div className="top-right">
              <p>Choose Option</p>

              <div className="option">

                {/* 0. SHEET */}
                <div className={`type ${openIndex === 0 ? "open" : ""}`}>
                  <div className="title" onClick={() => setOpenIndex(0)}>
                    <p>Sheet Type</p>
                    <p><img src="/images/Arrow-down.png" alt="" /></p>
                  </div>

                  <div className="depth-content-wrap">
                    {sheetList.map((item) => (
                      <div
                        className="depth-content"
                        key={item.title}
                        onClick={() => selectSheet(item)}
                      >
                        <p className="ST-title">{item.title}</p>
                        <p className="ST-sub">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 1. SIZE */}
                <div className={`type ${openIndex === 1 ? "open" : ""}`}>
                  <div className="title" onClick={() => setOpenIndex(1)}>
                    <p>Size</p>
                    <p><img src="/images/Arrow-down.png" alt="" /></p>
                  </div>

                  <div className="depth-content-wrap">
                    {product.size.map((s) => (
                      <div
                        className="depth-content"
                        key={s.id}
                        onClick={() => selectSize(s)}
                      >
                        <div className="depth-left">
                          <img src={s.img} alt={s.sizename} />
                          <span>{s.sizename}</span>
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

                {/* 2. COLOR */}
                <div className={`type ${openIndex === 2 ? "open" : ""}`}>
                  <div className="title" onClick={() => setOpenIndex(2)}>
                    <p>Color</p>
                    <p><img src="/images/Arrow-down.png" alt="" /></p>
                  </div>

                  <div className="depth-content-wrap">
                    {product.color.map((c) => (
                      <div
                        className="depth-content"
                        key={c.id}
                        onClick={() => selectColor(c)}
                      >
                        <img src={c.img} alt={c.colorname} />
                        <p>{c.colorname}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. ADD */}
                <div className={`type ${openIndex === 3 ? "open" : ""}`}>
                  <div className="title" onClick={() => setOpenIndex(3)}>
                    <p>Add</p>
                    <p><img src="/images/Arrow-down.png" alt="" /></p>
                  </div>

                  <div className="depth-content-wrap">
                    {product.add.map((a) => (
                      <React.Fragment key={a.id}>
                        <div
                          className="depth-content"
                          onClick={() => selectAdd(a)}
                        >
                          <img src={a.img} alt={a.cushion} />
                          <p>{a.cushion}</p>
                        </div>

                        <div
                          className="depth-content"
                          onClick={() => selectAdd("none")}
                        >
                          <p>선택안함</p>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="detail-bottom">
            <div className="bottom-left">

              <div className="selected-box">
                <div className="selected-box-top">
                  <p className="selected-opt">{getSelectedText()}</p>

                  <button className="cancel" onClick={resetSelected}>
                    <img src="/images/cancel.png" alt="cancel" />
                  </button>
                </div>

                {selected.size && (
                  <div className="selected-box-bottom">
                    <button onClick={decreaseQty}>
                      <img src="/images/minus.png" alt="minus" />
                    </button>
                    <span>{selected.qty}</span>
                    <button onClick={increaseQty}>
                      <img src="/images/plus.png" alt="plus" />
                    </button>
                  </div>
                )}
              </div>

            </div>

            <div className="bottom-right">
              <div className="total">
                <p>총 상품금액</p>
                <p className="price-total">{getTotalPrice()}</p>
              </div>

              <div className="total-btn">
                <div className="go-cart">장바구니</div>
                <div className="go-pay">결제하기</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ShopDetailTop;
