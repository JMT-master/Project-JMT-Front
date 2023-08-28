import { useEffect, useState, useRef } from 'react';
import { MdOutlineFindInPage } from 'react-icons/md';
import { renderToString } from 'react-dom/server';
// import '../css/button.scss';

function NaverMapView({ gps, onNav }) {
    const { lat, lng, title, img } = gps;
    console.log('gps: ', gps);

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
        '<div class="iw_outter">',
        '   <h2>' + title + '</h2>',
        '       <img src=' + img + ' width="55" height="55" alt='+title+' class="thumb"/><br>',
        '<button id="infoWinBtn" class="oBtn iwBtn">' + renderToString(<MdOutlineFindInPage />) + '</button>',
        '</div>'
    ].join('');

    let newInfoWindow = new window.naver.maps.InfoWindow({
        content: contentStr,
        pixelOffset: new window.naver.maps.Point(0, -10),
        maxWidth: 200,
        borderWidth: 0,
        backgroundColor: 'transparent',
        anchorSize: (0, 0)
    });



    useEffect(() => {
        let centerChangedListener = null;
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
                position: center,
                map: newMap,
            });

            setMarker(newMarker);


            setInfoWindow(new window.naver.maps.InfoWindow({
                content: '',
                pixelOffset: new window.naver.maps.Point(0, -30)
            }));

        } else {
            marker.setPosition(center);
            setTimeout(() => {
                // map.panTo(center);
                map.setCenter(center, false);
            }, 1);

            if (centerChangedListener) {
                window.naver.maps.Event.removeListener(centerChangedListener);
            }

            centerChangedListener = window.naver.maps.Event.addListener(map, 'center_changed', () => {
                newInfoWindow.open(map, marker);
                const infoBtn = document.getElementById('infoWinBtn');
                if (infoBtn) {
                    infoBtn.addEventListener('click', onNav);
                    
                }
            });
            infoWindow.setPosition(center);
        }

    }, [lat, lng]);


    // useEffect(() => {
    //     if (map) {
    //         map.panTo(center);
    //     }
    // }, [center, map]);

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
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
    );
}

export default NaverMapView;
