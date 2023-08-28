
import React, { useEffect } from 'react';

const TsModalMap = ({ markers }) => {
  console.log("markers : ",markers);
  useEffect(() => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(33.3764981, 126.5193789), // 지도의 초기 중심 좌표
      zoom: 10, // 초기 줌 레벨
    };

    const map = new window.naver.maps.Map('map', mapOptions);

    let num = 1;
    markers.forEach((markerInfo, index) => {
      const markerPosition = [markerInfo.latitude, markerInfo.longitude];      
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(...markerPosition),
        map: map,
        icon: {
          content: `<img src="https://place-hold.it/25x25/467&text=${num}" style="width: 25px; height: 25px;" />`,
        },
      });
      
      const infowindow = new window.naver.maps.InfoWindow({
        content: `<h4>${markerInfo.title}</h4>`,
      });

      window.naver.maps.Event.addListener(marker, 'click', () => {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(map, marker);
        }
      });
      if(!Number.isInteger(markerInfo)) num++;
    });

  }, [markers]);

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default TsModalMap;