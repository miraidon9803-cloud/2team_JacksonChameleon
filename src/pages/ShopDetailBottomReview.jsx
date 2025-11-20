import React, { useEffect, useRef, useState } from 'react'
import './scss/ShopDetailBottomReview.scss'
import { useParams } from 'react-router-dom'
import { useProductStore } from '../store/ProductStore'

const ShopDetailBottomReview = () => {

  const total = [
    { title: "디자인", score: 100 },
    { title: "제품 품질", score: 90 },
    { title: "제품 기능", score: 90 },
    { title: "제품 만족도", score: 80 }
  ]

  const { id } = useParams();
  const { items, onFetchItems } = useProductStore();

  const [product, setProduct] = useState(null);
  const [openList, setOpenList] = useState([]);
  const [overflowList, setOverflowList] = useState([]);

  const boxRefs = useRef([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (items.length === 0) onFetchItems();
  }, [items]);

  useEffect(() => {
    const findItem = items.find((item) => Number(item.id) === Number(id));
    setProduct(findItem);

    if (findItem?.review) {
      setOpenList(Array(findItem.review.length).fill(false));
      setOverflowList(Array(findItem.review.length).fill(false));
    }
  }, [items, id]);

  const reviewList = product?.review ?? [];

  useEffect(() => {
    reviewList.forEach((_, idx) => {
      const el = boxRefs.current[idx];
      if (!el) return;
      overflowList[idx] = el.scrollHeight > 246;
    });
    setOverflowList([...overflowList]);
  }, [product]);


  const animateItem = (idx, open) => {
    const item = itemRefs.current[idx];
    const box = boxRefs.current[idx];

    if (!item || !box) return;

    const itemStart = item.offsetHeight;
    const boxStart = box.offsetHeight;

    const boxFull = box.scrollHeight;

    item.style.height = itemStart + 'px';
    box.style.height = boxStart + 'px';

    requestAnimationFrame(() => {
      if (open) {
        item.style.height = itemStart + (boxFull - boxStart) + 40 + 'px';
        box.style.height = boxFull + 'px';
      } else {
        item.style.height = '320px';
        box.style.height = '246px';
      }
    });
  };


  const toggleReview = (idx) => {
    const newOpen = [...openList];
    newOpen[idx] = !newOpen[idx];

    animateItem(idx, newOpen[idx]);
    setOpenList(newOpen);
  };


  if (!product || !product.review) return null;



  return (
    <div className='bottom-review-wrap'>
      <div className="inner">

        <div className="total-wrap">
          <div className="total-top">
            <p>리뷰<span>{reviewList.length}</span></p>
            <button><img src="/images/review.png" alt="" />리뷰작성</button>
          </div>

          <div className="total">
            <div className="total-left"><img src="/images/star.png" alt="" />4.9</div>
            <div className="total-right">
              {total.map((item) => (
                <div key={item.title}>
                  <p>{item.title}</p>
                  <div style={{ "--percent": `${item.score}%` }}></div>
                  <p>{item.score}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="review-wrap">
          <div className="review-top"></div>
          <div className="review">
            {reviewList.map((rev, index) => (
              <div
                className="rev-item"
                key={rev.id}
                ref={(el) => (itemRefs.current[index] = el)}
              >
                <div className="rev-text">
                  <div className="text-left">
                    <div className="text-left-name">
                      <p>{rev.name}</p>
                      <p>{rev.star}</p>
                    </div>
                    <p className='text-left-date'>{rev.date}</p>
                  </div>

                  <div className="text-right">
                    <div
                      className="rev-box"
                      ref={(el) => (boxRefs.current[index] = el)}
                      style={{ height: openList[index] ? "auto" : "246px" }}
                    >
                      <pre>{rev.text}</pre>
                    </div>

                    {overflowList[index] && (
                      <button className='rev-more' onClick={() => toggleReview(index)}>
                        <span>{openList[index] ? '접기' : '더보기'}</span>
                        <span className='more'>
                          <img
                            src="/images/Arrow-down.png"
                            alt="더보기"
                            className={openList[index] ? 'rotate' : ''}
                          />
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {rev.img && (
                  <div className="rev-img">
                    <img src={rev.img} alt={rev.name} />
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopDetailBottomReview;