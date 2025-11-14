import React from 'react'
import CollectionBanner from '../components/CollectionBanner'
import CollectionList from '../components/CollectionList'

const InkCollection = () => {
  return (
    <div className="collection-wrap">
      <CollectionBanner banner="/images/collection-banner-ink-1.png"
        title="Ink Collection" subTitle="Streamlined silhouette"
        des="Ink 컬렉션은 물방울, 조약돌과 같은 자연의 아름다움에서 모티브를 얻어 유기적 형태로 디자인된 부드럽게 흐르는 유선형의 실루엣을 제시합니다. 
        부담스럽지 않은 심플 곡선의 라인으로 완성되어 공간에 자연스럽게 어우러집니다." brand="Ink"
      />
      <div className="inner">
        <CollectionList brand="Ink" />
      </div>
    </div>
  )
}

export default InkCollection