import React, { useEffect, useState } from "react";
import "./scss/ShopDetailTop.scss";
import ShopDetailSwiper from "../components/ShopDetailSwiper";
import { useParams } from "react-router-dom";
import { useProductStore } from "../store/ProductStore";
import ShopDetailBottomNav from "./ShopDetailBottomNav";
import ShopDetailBottomIntro from "./ShopDetailBottomIntro";
import ShopDetailBottomSize from "./ShopDetailBottomSize";
import ShopDetailBottomService from "./ShopDetailBottomService";
import ShopDetailBottomReview from "./ShopDetailBottomReview";
import DetailCartPopup from "../components/DetailCartPopup";
import { useNavigate } from "react-router-dom";

const ShopDetailTop = () => {
  const navigate = useNavigate();

  const sheetList = [
    { title: "H", text: "하드" },
    { title: "M", text: "미디움" },
    { title: "MH", text: "미디움하드" },
    { title: "MS", text: "미디움소프트" },
    { title: "S", text: "소프트" },
  ];

  const { id } = useParams();
  const { items, onFetchItems, onAddToCart, setCheckoutItems } =
    useProductStore();

  const [product, setProduct] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);
  const [selectedList, setSelectedList] = useState([]);

  const [activeTap, setActiveTap] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const ItemPrice = (sel) => {
    let total = 0;
    if (sel.size?.price) total += sel.size.price;
    if (sel.add) total += sel.add.price;
    return (total * sel.qty).toLocaleString() + "원";
  };

  // 상품 데이터 로드
  useEffect(() => {
    if (items.length === 0) onFetchItems();
  }, []);

  useEffect(() => {
    console.log("params id:", id);
    console.log(
      "items ids:",
      items.map((i) => i.id)
    );
    const findItem = items.find((item) => Number(item.id) === Number(id));
    console.log("findItem:", findItem);
    setProduct(findItem);
  }, [id, items]);

  if (!product) return <p>로딩중입니다...</p>;

  //소파인지 여부
  const isSofa =
    product.title.includes("Sofa") && !product.title.includes("Table");

  // Sheet 선택 → 세트 추가
  const selectSheet = (item) => {
    setSelectedList((prev) => [
      ...prev,
      { sheet: item, size: null, color: null, add: null, qty: 1 },
    ]);
    setOpenIndex(1);
  };

  // Size 선택
  const selectSize = (item) => {
    setSelectedList((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        size: item,
      };
      return updated;
    });
    setOpenIndex(2);
  };

  // Color 선택
  const selectColor = (item) => {
    setSelectedList((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        color: item,
      };
      return updated;
    });
    setOpenIndex(3);
  };

  // Add 선택
  const selectAdd = (item) => {
    setSelectedList((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        add: item === "none" ? null : item,
      };
      return updated;
    });
  };

  // 수량 증가/감소
  const increaseQty = (idx) => {
    setSelectedList((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, qty: s.qty + 1 } : s))
    );
  };

  const decreaseQty = (idx) => {
    setSelectedList((prev) =>
      prev.map((s, i) =>
        i === idx ? { ...s, qty: s.qty > 1 ? s.qty - 1 : 1 } : s
      )
    );
  };

  // 세트 삭제
  const handleRemove = (idx) => {
    setSelectedList((prev) => prev.filter((_, i) => i !== idx));
  };

  // 옵션 텍스트 만들기
  const getSelectedText = (sel) => {
    const { sheet, size, color, add } = sel;
    const t = [];
    if (sheet) t.push(`Sheet: ${sheet.title}`);
    if (size) t.push(`Size: ${size.sizename}`);
    if (color) t.push(`Color: ${color.colorname}`);
    if (add) t.push(`Add: ${add.cushion}`);
    return t.length ? t.join(" / ") : "옵션을 선택중입니다...";
  };

  // 총 금액 계산
  const getTotalPrice = () => {
    const total = selectedList.reduce((acc, s) => {
      let t = s.size?.price ? s.size.price * s.qty : 0;
      if (s.add) t += s.add.price * s.qty;
      return acc + t;
    }, 0);
    return total.toLocaleString() + "원";
  };

  // 장바구니 담기
  const handleAddToCart = () => {
    for (let sel of selectedList) {
      if (!sel.sheet || !sel.size || !sel.color || !sel.add) {
        alert("모든 옵션을 선택해주세요!");
        return;
      }
    }
    selectedList.forEach((sel) => {
      onAddToCart({ ...product, ...sel });
    });

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="shop-detail-banner">
      {showPopup && <DetailCartPopup />}

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
                {/* SHEET */}
                {isSofa && (
                  <div className={`type ${openIndex === 0 ? "open" : ""} opt1`}>
                    <div className="title" onClick={() => setOpenIndex(0)}>
                      <p>Sheet Type</p>
                      <p>
                        <img src="/images/Arrow-down.png" alt="" />
                      </p>
                    </div>
                    <div className="depth-content-wrap">
                      {sheetList.map((item) => (
                        <div
                          className="depth-content"
                          key={item?.title}
                          onClick={() => selectSheet(item)}
                        >
                          <p className="ST-title">{item?.title}</p>
                          <p className="ST-sub">{item?.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SIZE */}
                {isSofa && (
                  <div className={`type ${openIndex === 1 ? "open" : ""} opt2`}>
                    <div className="title" onClick={() => setOpenIndex(1)}>
                      <p>Size</p>
                      <p>
                        <img src="/images/Arrow-down.png" alt="" />
                      </p>
                    </div>
                    <div className="depth-content-wrap">
                      {product.size.map((s) => (
                        <div
                          className="depth-content"
                          key={s?.id}
                          onClick={() => selectSize(s)}
                        >
                          <div className="depth-left">
                            <div className="left-img">
                              <img src={s?.img} alt={s?.sizename} />
                            </div>
                            <div className="left-title">
                              <span>{s?.sizename}</span>
                            </div>
                          </div>

                          <div className="depth-right">
                            <p>너비: {s?.width}</p>
                            <p>높이: {s?.height}</p>
                            <p>깊이: {s?.depth}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* COLOR */}
                <div className={`type ${openIndex === 2 ? "open" : ""} opt3`}>
                  <div className="title" onClick={() => setOpenIndex(2)}>
                    <p>Color</p>
                    <p>
                      <img src="/images/Arrow-down.png" alt="" />
                    </p>
                  </div>
                  <div className="depth-content-wrap">
                    {product.color.map((c) => (
                      <div
                        className="depth-content"
                        key={c?.id}
                        onClick={() => selectColor(c)}
                      >
                        <div className="content-dept">
                          <div className="content-img">
                            <img src={c?.img} alt={c?.colorname} />
                            <p className="content-text">{c?.colorname}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ADD */}
                {isSofa && product.add && product.add.length > 0 && (
                  <div className={`type ${openIndex === 3 ? "open" : ""} opt4`}>
                    <div className="title" onClick={() => setOpenIndex(3)}>
                      <p>Add</p>
                      <p>
                        <img src="/images/Arrow-down.png" alt="" />
                      </p>
                    </div>

                    <div className="depth-content-wrap">
                      {product.add.map((a) => (
                        <div
                          className="depth-content"
                          key={a.id}
                          onClick={() => selectAdd(a)}
                        >
                          {a?.img && <img src={a?.img} alt={a?.cushion} />}
                          <p>{a?.cushion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 선택 옵션 박스 & 총금액 */}
          <div className="detail-bottom">
            <div className="bottom-left">
              {selectedList.length === 0 ? (
                <p className="empty">옵션을 선택해주세요.</p>
              ) : (
                selectedList.map((sel, idx) => (
                  <div className="selected-box" key={idx}>
                    <div className="selected-box-top">
                      <p className="selected-opt">{getSelectedText(sel)}</p>

                      <button
                        className="cancel"
                        onClick={() => handleRemove(idx)}
                      >
                        <img src="/images/cancel.png" alt="cancel" />
                        <img
                          src="/images/cancel-hover.png"
                          alt="cancel-hover"
                        />
                      </button>
                    </div>

                    <div className="selected-box-bottom">
                      <p className="price-total">{ItemPrice(sel)}</p>

                      <div className="button-wrap">
                        <button onClick={() => decreaseQty(idx)}>
                          <img src="/images/minus.png" alt="minus" />
                          <img
                            src="/images/minus-hover.png"
                            alt="minus-hover"
                          />
                        </button>

                        <span>{sel.qty}</span>

                        <button onClick={() => increaseQty(idx)}>
                          <img src="/images/plus.png" alt="plus" />
                          <img src="/images/plus-hover.png" alt="plus-hover" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bottom-right">
              <div className="total">
                <p>총 상품금액</p>
                <p className="price-total">{getTotalPrice()}</p>
              </div>

              <div className="total-btn">
                <div className="go-cart" onClick={handleAddToCart}>
                  장바구니
                </div>
                <div
                  className="go-pay"
                  onClick={() => {
                    for (let sel of selectedList) {
                      if (!sel.sheet || !sel.size || !sel.color || !sel.add) {
                        alert("모든 옵션을 선택해주세요!");
                        return;
                      }
                    }

                    setCheckoutItems(
                      selectedList.map((sel) => ({
                        ...product,
                        ...sel,
                      }))
                    );

                    navigate("/payment");
                  }}
                >
                  결제하기
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 상세 탭 영역 */}
        <div className="detail-bottom">
          <ShopDetailBottomNav
            activeTap={activeTap}
            setActiveTap={setActiveTap}
          />

          {activeTap === 0 && <ShopDetailBottomIntro product={product} />}
          {activeTap === 1 && <ShopDetailBottomSize product={product} />}
          {activeTap === 2 && <ShopDetailBottomReview product={product} />}
          {activeTap === 3 && <ShopDetailBottomService product={product} />}
        </div>
      </div>
    </div>
  );
};

export default ShopDetailTop;
