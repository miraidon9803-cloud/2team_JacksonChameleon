import React from 'react'
import CollectionBanner from '../components/CollectionBanner'
import CollectionList from '../components/CollectionList'

const PlatoCollection = () => {
    return (
        <div className="collection-wrap">
            <CollectionBanner banner="/images/collection-banner-plato-5.png"
                title="Plato Collection" subTitle="Simplicity and detail"
                des="Plato 컬렉션은 프레임이 차지하는 비율을 최소화하고 디테일한 엣지의 완성도를 높여 상판의 형태와 간결함이 돋보이도록 디자인되었습니다.
                간결하면서도 미니멀한 디자인은 어느 가구와도 매치하기 좋습니다." brand="Plato" />
            <div className="inner">
                <CollectionList brand="Plato" />
            </div>
        </div>
    )
}

export default PlatoCollection