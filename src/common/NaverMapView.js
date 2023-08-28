import { 
    Container as MapDiv,
    NaverMap,
    Marker
  } from 'react-naver-maps';



function NaverMapView(props) {

    // const {lat,lng} = props.data;
    //'bg.ol.ts.ctt.lko'

    return (
        <MapDiv style={{height: "100%", width: "100%"}}>
            <NaverMap>
                <Marker defaultPosition={{ lat: 37.5666103, lng: 126.9783882 }} />
            </NaverMap>
        </MapDiv>
    )
}


export default NaverMapView

