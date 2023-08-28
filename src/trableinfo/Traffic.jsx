import React, { useEffect,useRef } from 'react';
import { useState } from 'react';

const Traffic = () => {
    return (
        <div className='traffic-container'>
            <div className='traffic-title'>
                <h1>교통 혼잡도</h1>
                <p style={{marginTop:'10px'}}>현재 제주도 교통 상황을 나타내는 정보입니다. 효과적인 여행 일정을 수립하기 위해 참고하세요 </p>
                <br/>
                <p style={{marginBottom:'10px'}}>지도에 원하는 위치를 클릭하시거나 마우스 휠 을 사용하여 좀 더 효과적으로 사용할 수 있습니다</p>
            </div>
            <div>
                <TarffcicMap></TarffcicMap>
            </div>
        </div>
    );
};

function TarffcicMap() {
    const infoWindowRef = useRef(null);
    const [gps,setGps] = useState(33.4996213, 126.5311884);
    let lat,lag = gps;
    useEffect(() => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(33.4996213, 126.5311884),
            zoom: 10,
        };

        const map = new window.naver.maps.Map('naver-map', mapOptions);

        // Traffic Layer 추가
        const trafficLayer = new window.naver.maps.TrafficLayer();
        trafficLayer.setMap(map);

        // 클릭한 위치에 마커 표시 및 InfoWindow 생성
        const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(37.5665, 126.9780),
            map: map,
        });
         // InfoWindow 생성
         const infoWindow = new window.naver.maps.InfoWindow({
            content: '<div style="padding:10px;">내가 선택한 위치</div>',
        });
        window.naver.maps.Event.addListener(marker, 'click', () => {
            infoWindow.open(map, marker); // 마커 클릭 시 InfoWindow 열기
        });
        // 지도 클릭 이벤트 처리
        window.naver.maps.Event.addListener(map, 'click', (e) => {
            const clickedLatLng = e.coord;
            marker.setPosition(clickedLatLng);
            infoWindow.close(); // 다른 위치 클릭 시 기존 InfoWindow 닫기
            infoWindow.open(map, marker); // 클릭한 위치에 InfoWindow 열기

            const newZoomLevel = 14;
            map.setZoom(newZoomLevel);
            map.setCenter(clickedLatLng);
        });
        
        // InfoWindow 참조를 ref에 저장
        infoWindowRef.current = infoWindow;

    }, []);

    return <div id="naver-map" style={{ width: '100%', height: '700px' }} />;
}

export default Traffic;