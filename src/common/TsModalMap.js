import React, { useEffect } from 'react';

const TsModalMap = ({ markers }) => {
  useEffect(() => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(33.3764981, 126.5193789),
      zoom: 10,
    };

    const map = new window.naver.maps.Map('map', mapOptions);

    let num = 1;
    const polylinePath = [];
    let prevMarkerPosition = null;
    const createdMarkers = []; // 배열로 생성한 마커를 보관

    markers.forEach((markerInfo) => {
      const markerPosition = new window.naver.maps.LatLng(
        markerInfo.latitude,
        markerInfo.longitude
      );

      const marker = new window.naver.maps.Marker({
        position: markerPosition,
        map: map,
        icon: {
          content: `<img src="https://place-hold.it/25x25/467&text=${num}" style="width: 25px; height: 25px;" />`,
        },
      });

      createdMarkers.push(marker); // 생성한 마커 배열에 추가

      const infowindow = new window.naver.maps.InfoWindow({
        content: `<h4>${markerInfo.title}</h4>`,
      });

      polylinePath.push(markerPosition);
      window.naver.maps.Event.addListener(marker, 'click', () => {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(map, marker);
        }
      });

      if (!Number.isNaN(markerInfo) && markerPosition !== prevMarkerPosition) {
        num++;
        prevMarkerPosition = markerPosition;
      }
    });
    console.log(polylinePath.length);
      if (polylinePath.length > 1) {
        const polyline = new window.naver.maps.Polyline({
          path: polylinePath,
          map: map,
        });
      }
    

  }, [markers]);

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default TsModalMap;