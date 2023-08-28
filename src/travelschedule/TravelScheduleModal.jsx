import React, { useState } from 'react'
import '../css/OnModal.css'
import NaverMapView from '../common/NaverMapView';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import TsModalMap from '../common/TsModalMap'
const TravelScheduleModal = ({mapModalsend,setMapModalsend,markers}) => {
  const closeMap = () => {
    console.log("클릭");
    setMapModalsend(mapModalsend);
  };


  return (
    <div className='modal-Map-container'>
      <AiOutlineCloseCircle className='modal-Map-close' onClick={closeMap}>X</AiOutlineCloseCircle>
      <div className='modal-Map-show'>
        <TsModalMap markers={markers}></TsModalMap>
      </div>
    </div>
  )
}

export default TravelScheduleModal