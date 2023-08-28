import { useEffect, useState, useRef } from 'react';

function NaverMapView(props) {
    console.log('props: ', props);
    const { lat, lng, title, img } = props.gps;
    const {nav} = props.nav;
    const center = new window.naver.maps.LatLng(lat, lng);

    const [map, setMap] = useState(null);
    const zoom = useRef(10);
    const [marker, setMarker] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);
    const [mapTypeId, setMapTypeId] = useState(window.naver.maps.MapTypeId.NORMAL);

    // const buttons = [
    //     {
    //         typeId: window.naver.maps.MapTypeId.NORMAL,
    //         text: '일반지도',
    //     },
    //     {
    //         typeId: window.naver.maps.MapTypeId.TERRAIN,
    //         text: '지형도',
    //     },
    //     {
    //         typeId: window.naver.maps.MapTypeId.SATELLITE,
    //         text: '위성지도',
    //     },
    //     {
    //         typeId: window.naver.maps.MapTypeId.HYBRID,
    //         text: '겹쳐보기',
    //     },
    // ];

    let contentStr = [
        '<div class="iw_inner">',
        '   <h3>' + title + '</h3>',
        '       <img src='+ img +' width="55" height="55" alt="서울시청" class="thumb" /><br>',
        ' <button>상세정보</button>',
        '</div>'
    ].join('');

    let newInfoWindow = new window.naver.maps.InfoWindow({
        content: contentStr,
        pixelOffset: new window.naver.maps.Point(0, -30)
    });




    useEffect(() => {
        if (!map) {
            const newMap = new window.naver.maps.Map('map', {
                center: center,
                zoom: zoom.current,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: window.naver.maps.MapTypeControlStyle.BUTTON,
                    position: window.naver.maps.Position.TOP_RIGHT,
                },
            });

            setMap(newMap);

            window.naver.maps.Event.addListener(newMap, 'zoom_changed', () => {
                handleZoomChanged(newMap.getZoom());
            });

            const newMarker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(lat, lng),
                map: newMap,
            });

            setMarker(newMarker);

            console.log('nomap')
            setInfoWindow(new window.naver.maps.InfoWindow({
                content: '',
                pixelOffset: new window.naver.maps.Point(0, -30)
            }));

        } else {
            marker.setPosition(new window.naver.maps.LatLng(lat, lng));
            map.panTo(new window.naver.maps.LatLng(lat, lng));

            window.naver.maps.Event.addListener(map, 'center_changed', () => {
                newInfoWindow.open(map, marker);
            });

            infoWindow.setPosition(new window.naver.maps.LatLng(lat, lng));
        }
    }, [map, marker, mapTypeId, lat, lng, title]);

    // const onNav = () => {
    //     navigate(`/destination/detail/${spot.contentsid}`, {
    //       state: {
    //         title: spot.title,
    //         img: photo.photoid.imgpath,
    //         tag: spot.tag,
    //         address: spot.address,
    //         phoneno: spot.phoneno,
    //         content: spot.introduction,
    //       }
    //     })
    //   }

    const handleZoomChanged = (newZoom) => {
        zoom.current = newZoom;
    };


    return (
        <div id="map" style={{ width: '100%', height: '100%' }}>
            {/* <div style={{ height: '100%', position: 'relative' }}>
                {buttons.map((btn) => (
                    <button
                        key={btn.typeId}
                        className='oBtn onMapBtn'
                        onClick={() => {
                            setMapTypeId(btn.typeId);
                        }}>
                        {btn.text}
                    </button>
                ))}
            </div> */}
        </div>
    );
}

export default NaverMapView;
