import React from 'react';
import style from '../css/NoticeBoardDetail.css'
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube } from "react-icons/ai";

const NoticeBoardDetail = ({data}) => {
  const navigate = useNavigate();
  const params = useParams();
  const detail = data[params.id-1];
  
  return (
    <div className='noticeDetail-content'>
      <div className='noticeDetail-title'>
        <h1>공지사항</h1>
        <span><AiFillPrinter></AiFillPrinter> </span>
        <span><AiFillFilePdf></AiFillFilePdf> </span>
        <span> <AiFillYoutube></AiFillYoutube> </span>
        <span><AiFillFacebook></AiFillFacebook> </span>
      </div>
        <div className='noticeDetail-box'>
          <div className='noticeDetail-img'>
            <img src="../images/notice-icon.png" alt="공지사항 이미지" style={{width:'120px', height:'120px'}} />
            <p>{detail.category}</p>
          </div>
          <div className='noticeDetail-boxTitle'>
            <p className='no'>No . {detail.no}</p>
            <h3>{detail.title}</h3>
            <p className='date'>{detail.createDate}</p>
          </div>
          <div className='noticeDetail-inside'>
            <textarea cols="30" rows="10" readOnly placeholder='공지사항 내용' value={detail.content}></textarea>
          </div>
          <button className='back-to-notice'  onClick={()=>navigate(-1)}>목록으로 가기</button>
        </div>
    </div>
  );
};

export default NoticeBoardDetail;