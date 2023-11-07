import React from 'react'
import style from '../css/attachFile.css'
import { AiFillFile } from 'react-icons/ai'
import { useState } from 'react';
import AttachFileModal from './AttachFileModal';
import { FaSave } from 'react-icons/fa';
import { useEffect } from 'react';
// import axios from 'axios';
// import { API_BASE_URL } from './ApiConfig';
// import { data } from 'jquery';

const AttachFile = (props) => {
  const attach = props.data;
  const [imgModal, setImgModal] = useState(true);
  const [modalFlag, setModalFlag] = useState(false);
  const [sendData, setSendData] = useState();
  console.log("props : " + JSON.stringify(props))
  console.log("AttacH : " + JSON.stringify(attach))


  const showImgModal = (data) => {
    setImgModal(false);
    setSendData(data);
    setModalFlag(!modalFlag);
  };

  useEffect(() => {
    setImgModal(true);
  },[modalFlag]);
  
  return (
    <div className='attachfile-container'>
      <div className='attachfile-icon-box'>
        <div className='attachfile-icon-info'>
          <AiFillFile style={{width:'50px', height:'30px', color:'#f3a344'}} ></AiFillFile>
          <p className='attachfile-name'>첨부파일</p>
        </div>
        <ul className='attachfile-data-ul'>
          {
            attach !== undefined && attach[0].originalName !== null && attach[0].originalName !== undefined ?
            attach.map((mapData,i) => {
              console.log("mapData.data : " + mapData.data)
              console.log("i : " + i)
              console.log("mapData.originalName : " + mapData.originalName)
              return <li key={i} className='attachfile-data-li'>
                <a href={mapData.data} download={mapData.originalName}><FaSave className='attachfile-save'></FaSave></a>
                <div className='attachfile-data-data' onClick={() => showImgModal(mapData)}>{mapData.originalName}</div>
              </li>
            }): <li></li>
          }
        </ul>
        <div>
          {imgModal && <AttachFileModal imgModal={imgModal} setImgModal={setImgModal} revData={sendData}></AttachFileModal>}
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default AttachFile