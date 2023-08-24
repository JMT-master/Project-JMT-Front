import React from 'react';
import { useParams } from 'react-router-dom';
import style from '../css/QnaBoardDetail.css'

const QnaBoardDetail = ({ data }) => {
  const params = useParams();
  const detail = data[params.id-1]
  return (
    <div className='qnaDetail-content'>
      <div className='qnaDetail-title'>
        <h1>Q & A</h1>
        <span>아이콘 모음집</span>
      </div>
      <div className='qnaDetail-box'>
        <div className='qnaDetail-img'>
          <img src="../images/qna-icon.png" alt="qna이미지" />
          <p>{detail.category}</p>
        </div>
        <div className='qnaDetail-boxTitle'>
          <p className='no'>No . {detail.no}</p>
          <h3>{detail.title}</h3>
          <p className='date'>{detail.createDate}</p>
        </div>
        <div className='qnaDetail-inside'>
          <textarea cols="30" rows="10" readOnly placeholder='qna 내용' value={detail.content}></textarea>
        </div>
      </div>
    </div>
  );
};

export default QnaBoardDetail;