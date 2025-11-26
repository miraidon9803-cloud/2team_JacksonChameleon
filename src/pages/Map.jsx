import React, { useEffect, useRef, useState } from "react";
import "./scss/Map.scss";
import Store from "./Store";

const Map = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  // 지도 초기화 함수 (실제 지도/마커 설정 부분)
  const initMap = () => {
    const { kakao } = window;

    if (!mapRef.current) return;

    const mapOption = {
      center: new kakao.maps.LatLng(37.5668, 126.9277),
      level: 3,
    };

    const createdMap = new kakao.maps.Map(mapRef.current, mapOption);
    setMap(createdMap);

    const markerImage = new kakao.maps.MarkerImage(
      "/images/mark.png",
      new kakao.maps.Size(37, 60),
      { offset: new kakao.maps.Point(24, 48) }
    );

    const createdMarker = new kakao.maps.Marker({
      map: createdMap,
      position: createdMap.getCenter(),
      image: markerImage,
    });

    setMarker(createdMarker);

    // 레이아웃 재계산
    setTimeout(() => {
      createdMap.relayout();
    }, 50);

    // 타일 로딩 후 중심점 좌측으로 약간 이동
    kakao.maps.event.addListener(createdMap, "tilesloaded", function () {
      const projection = createdMap.getProjection();
      const point = projection.pointFromCoords(createdMarker.getPosition());
      const movedPoint = new kakao.maps.Point(point.x - 150, point.y);
      const movedPos = projection.coordsFromPoint(movedPoint);
      createdMap.setCenter(movedPos);
    });
  };

  useEffect(() => {
    // 이미 kakao 로드된 경우 (다른 컴포넌트 등)
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(initMap);
      return;
    }

    // 처음 로드할 때: 스크립트 동적 추가
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=81d6be584cd0dd8d48c24cbae3bba076&autoload=false&libraries=services";
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(initMap);
    };
    document.head.appendChild(script);
  }, []);

  const moveToStore = (lat, lon) => {
    if (!map || !marker) return;
    const { kakao } = window;

    const newPos = new kakao.maps.LatLng(lat, lon);
    marker.setPosition(newPos);

    const projection = map.getProjection();
    const point = projection.pointFromCoords(newPos);

    const movedPoint = new kakao.maps.Point(point.x - 150, point.y);
    const movedPos = projection.coordsFromPoint(movedPoint);

    map.panTo(movedPos);
  };

  return (
    <div className="map-page">
      <div className="inner">
        <div className="map-bg" ref={mapRef}></div>

        <div className="map-content">
          <Store moveToStore={moveToStore} />
        </div>
      </div>
    </div>
  );
};

export default Map;
