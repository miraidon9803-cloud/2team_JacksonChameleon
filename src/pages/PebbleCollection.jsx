import React from 'react'
import CollectionBanner from '../components/CollectionBanner'
import CollectionList from '../components/CollectionList'

const PebbleCollection = () => {
    return (
        <div className="collection-wrap">
            <CollectionBanner banner="/images/collection-banner-pebble-2.png"
                title="Pebble Collection" subTitle="Extensions and configurations"
                des="Pebble 컬렉션은 조약돌을 모티브한 1:2:3의 비율로 설계되어 무한한 조합이 가능한 모듈형 소파입니다.  
                등받이, 팔걸이 모두 모듈화가 가능하여 지속적인 확장 및 구성을 원하는대로 만들어낼 수 있습니다." brand="Pebble" />
            <div className="inner">
                <CollectionList brand="Pebble" />
            </div>
        </div>
    )
}

export default PebbleCollection