import React from 'react'
import CollectionBanner from '../components/CollectionBanner'
import CollectionList from '../components/CollectionList'

const RoundCollection = () => {
    return (
        <div className="collection-wrap">
            <CollectionBanner banner="/images/collection-banner-round-4.png"
                title="Round Collection" subTitle="Moderation and balance"
                des="Round 컬렉션은 불필요한 디테일을 뺀 간결한 실루엣과 부드럽게 라운딩 처리된 디자인이 특징입니다. 
                직선적이지만 부드럽고 섬세한 디테일이 돋보이는 디자인으로, 심플하면서도 견고한 구조를 자랑합니다." brand="Round" />
            <div className="inner">
                <CollectionList brand="Round" />
            </div>
        </div>
    )
}

export default RoundCollection