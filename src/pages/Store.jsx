import React, { useState } from 'react'
import { storeData } from '../data/store'
import './scss/Store.scss'


const Store = ({ moveToStore }) => {

  const [activeTab, setActiveTab] = useState('연남');
  const [openIndex, setOpenIndex] = useState(null);


  const getFilteredStores = () => {
    if (activeTab === '연남') {
      return storeData.filter(store =>
        store.title.includes('하우스 오브')
      );
    } else if (activeTab === '판교') {
      return storeData.filter(store =>
        store.title.includes('현대백화점 판교')
      );
    } else if (activeTab === '무브먼트랩') {
      return storeData.filter(store =>
        store.title.includes('무브먼트랩')
      );
    } else {
      return storeData;
    }
  };

  const filteredStores = getFilteredStores();

  const toggleStore = (index) => {
    if (activeTab !== '무브먼트랩') return;
    setOpenIndex(openIndex === index ? null : index);
  };




  return (
    <section className="store-wrap">
      <div className="inner">
        <div className="store-tap-wrap">
          <div className="store-tabs">
            <button
              className={`tab-button ${activeTab === '연남' ? 'active' : ''}`}
              onClick={() => setActiveTab('연남')}
            >
              연남
            </button>
            <button
              className={`tab-button ${activeTab === '판교' ? 'active' : ''}`}
              onClick={() => setActiveTab('판교')}
            >
              판교
            </button>
            <button
              className={`tab-button ${activeTab === '무브먼트랩' ? 'active' : ''}`}
              onClick={() => setActiveTab('무브먼트랩')}
            >
              무브먼트랩
            </button>
          </div>
        </div>

        <div className={`store-list ${activeTab === '무브먼트랩' ? 'scroll-mode' : ''}`} >
          {filteredStores.map((store, index) => (
            <div key={index} className={`store-card ${openIndex === index ? 'open' : ''}`}>
              <div
                className="store-header"
                onClick={() => {
                  toggleStore(index);

                  // ✅ 지도 이동 기능 (lat/lon 있는 경우에만)
                  if (store.lat && store.lon && typeof moveToStore === "function") {
                    moveToStore(store.lat, store.lon);
                  }
                }}
              >
                <div className="story-title-wrap">
                  <h3 className="store-title">{store.title}</h3>
                  <p><img className="store-arrow" src={store.img_up} alt="" /></p>
                </div>

                <p className="store-subtitle">{store.title_sub}</p>
              </div>

              {(activeTab !== '무브먼트랩' || openIndex === index) && (
                <div className="store-content">
                  <div className="store-info">
                    <div className="info-row">
                      <span className="info-label">매장 주소</span>
                      <span className="info-text">{store.매장주소}</span>
                    </div>

                    <div className="info-row">
                      <span className="info-label">전화 번호</span>
                      <span className="info-text">{store.전화번호}</span>
                    </div>

                    <div className="info-row">
                      <span className="info-label">운영 시간</span>
                      <span className="info-text">{store.운영시간}</span>
                    </div>
                  </div>

                  <div className="store-image">
                    <img src={store.img} alt={store.title} />
                  </div>

                  {store.sto_text && (
                    <div className="store-notice">
                      <p>{store.sto_text}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Store