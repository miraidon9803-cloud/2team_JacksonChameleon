import React from 'react'
import CollectionBanner from '../components/CollectionBanner'
import CollectionList from '../components/CollectionList'

const ClayCollection = () => {
    return (
        <div className="collection-wrap">
            <CollectionBanner banner="/images/collection-banner-clay-3.png"
                title="Clay Collection" subTitle="Concise and modern"
                des="Clay 컬렉션은 모던한 느낌의 간결한 박스 형태와 넉넉하고 자연스러운 디테일이 특징인 모듈형 소파입니다. 
                2가지 타입의 시트, 팔걸이, 등받이 총 6개의 모듈로 무한한 확장이 가능합니다." brand="Clay"/>
            <div className="inner">
                <CollectionList brand="Clay" />
            </div>
        </div>
    )
}

export default ClayCollection