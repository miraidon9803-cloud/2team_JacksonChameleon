import React, { useEffect, useRef, useState } from "react";
import "./scss/Map.scss"; 
import Store from "../pages/Store";

const Map = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const { kakao } = window;

    const mapOption = {
      center: new kakao.maps.LatLng(37.5668, 126.9277),
      level: 3,
    };

    const createdMap = new kakao.maps.Map(mapRef.current, mapOption);
    setMap(createdMap);

    const markerImage = new kakao.maps.MarkerImage(
      "/img/mark.png",
      new kakao.maps.Size(37, 60),
      { offset: new kakao.maps.Point(24, 48) }
    );

    const createdMarker = new kakao.maps.Marker({
      map: createdMap,
      position: createdMap.getCenter(),
      image: markerImage
    });

    setMarker(createdMarker);

    setTimeout(() => {
      createdMap.relayout();
    }, 50);

    kakao.maps.event.addListener(createdMap, 'tilesloaded', function () {
      const projection = createdMap.getProjection();
      const point = projection.pointFromCoords(createdMarker.getPosition());
      const movedPoint = new kakao.maps.Point(point.x - 150, point.y);
      const movedPos = projection.coordsFromPoint(movedPoint);
      createdMap.setCenter(movedPos);
    });

  }, []);

  const moveToStore = (lat, lng) => {
    if (!map || !marker) return;
    const { kakao } = window;

    const newPos = new kakao.maps.LatLng(lat, lng);
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