import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from '../css/QnaBoardDetail.css'
import { AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube } from 'react-icons/ai';

const QnaBoardDetail = ({ data }) => {
  const params = useParams();
  const navigate = useNavigate();
  const detail = data[params.id-1]
  return (
    <div className='qnaDetail-content'>
      <div className='qnaDetail-title'>
        <h1>Q & A</h1>
        <span><AiFillPrinter style={{width:'50px', height:'30px'}}></AiFillPrinter> </span>
        <span><AiFillFilePdf style={{width:'50px', height:'30px'}}></AiFillFilePdf> </span>
        <span> <AiFillYoutube style={{width:'50px', height:'30px'}}></AiFillYoutube> </span>
        <span><AiFillFacebook style={{width:'50px', height:'30px'}}></AiFillFacebook> </span>
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
        <button className='back-to-qna'  onClick={()=>navigate(-1)}>목록으로 가기</button>
      </div>
    </div>
  );
};

export default QnaBoardDetail;