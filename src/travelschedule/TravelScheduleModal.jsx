import React from 'react'
import '../css/OnModal.css'
import NaverMapView from '../common/NaverMapView';
import {AiOutlineCloseCircle} from 'react-icons/ai'

const TravelScheduleModal = ({mapModalsend,setMapModalsend}) => {
  const closeMap = () => {
    console.log("클릭");
    setMapModalsend(mapModalsend);
  };

  return (
    <div className='modal-Map-container'>
      <AiOutlineCloseCircle className='modal-Map-close' onClick={closeMap}>X</AiOutlineCloseCircle>
      <div className='modal-Map-show'>
        {/* <NaverMapView></NaverMapView> */}
      </div>
    </div>
  )
}

export default TravelScheduleModal