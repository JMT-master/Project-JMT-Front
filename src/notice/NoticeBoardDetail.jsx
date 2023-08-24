import React from 'react';
import style from '../css/NoticeBoardDetail.css'
import { useParams } from 'react-router-dom';

const NoticeBoardDetail = ({data}) => {
  const params = useParams();
  // console.log(params);
  // console.log(parseInt(params.id)-1);
  // console.log(data[params.id-1])
  const detail = data[params.id-1];
  
  return (
    <div className='noticeDetail-content'>
      <div className='noticeDetail-title'>
        <h1>공지사항</h1>
        <span>아이콘 모음집</span>
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
        </div>
    </div>
  );
};

export default NoticeBoardDetail;