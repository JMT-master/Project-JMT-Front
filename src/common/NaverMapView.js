import { useEffect, useState, useCallback, useRef } from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps, InfoWindow } from 'react-naver-maps'

function NaverMapView(props) {

    const navermaps = useNavermaps();

    //좌표값
    const { lat, lng } = props.gps;
    const center = new navermaps.LatLng(lat, lng);

    //지도 타입 변경용 state와 변수
    const [mapTypeId, setMapTypeId] = useState(navermaps.MapTypeId.NORMAL)
    const buttons = [
        {
            typeId: navermaps.MapTypeId.NORMAL,
            text: '일반지도',
        },
        {
            typeId: navermaps.MapTypeId.TERRAIN,
            text: '지형도',
        },
        {
            typeId: navermaps.MapTypeId.SATELLITE,
            text: '위성지도',
        },
        {
            typeId: navermaps.MapTypeId.HYBRID,
            text: '겹쳐보기',
        },
    ]
    //NaverMap에 뿌려주는 지도 정보
    const [map, setMap] = useState(null)
    //줌 수치
    const zoom = useRef(10);
    //줌 변경시 반영, 다른 항목 이동시 줌 상태 유지를 위해 필요
    const handleZoomChanged = useCallback((val) => {
        console.log({ val })
        zoom.current = val;
    }, [])

    //맵 렌더링시마다 좌표 이동(부드럽게)과 줌 수치 정해줌
    if (map) {
        map.panTo(center)
        map.setZoom(zoom.current, true)
    }


    return (
        <MapDiv style={{ height: '100%', position:'relative' }}>
           { buttons.map((btn) => (
            <button className='oBtn onMapBtn' onClick={(()=>{
                setMapTypeId(btn.typeId)
            })}>{btn.text}</button>
           ))}
            
            <NaverMap
                defaultZoom={zoom.current}
                onZoomChanged={handleZoomChanged}
                animation={2}
                minZoom={10}
                ref={setMap}
                mapTypeId={mapTypeId}
                tileTransition={true}>
                    
                <InfoWindow
                    position={center}
                    zIndex={1}
                    content='asdfasdf'
                ></InfoWindow>
                <Marker
                    style={{ position: 'relative' }}
                    position={center} >
                    {/* <div className='likeModal'></div> */}
                </Marker>
            </NaverMap>
        </MapDiv >
    )
}


export default NaverMapView

