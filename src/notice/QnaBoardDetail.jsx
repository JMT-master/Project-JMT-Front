import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from '../css/QnaBoardDetail.css'
import { AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube } from 'react-icons/ai';
import { call, getCookie, setDateFormat } from './../common/ApiService';

const QnaBoardDetail = () => {
  const [item, setItem] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const qnaColNum = params.id;
  const isAdmin = useRef(getCookie("adminChk"));

  useEffect(() => {
    // qnaColNum을 사용하여 API를 호출하고 데이터를 가져옵니다.
    call("/qna/"+qnaColNum, "GET", null)
      .then((response) => 
      setItem(response)
      );
    // console.log("item {} : ", item);
  }, [qnaColNum]); // qnaColNum이 변경될 때마다 useEffect가 실행됩니다.

  return (
    <div className='qnaDetail-content'>
      <div className='qnaDetail-title'>
        <h1>Q & A</h1>
        <span><AiFillPrinter style={{width:'50px', height:'30px'}}></AiFillPrinter> </span>
        <span><AiFillFilePdf style={{width:'50px', height:'30px'}}></AiFillFilePdf> </span>
        <span> <AiFillYoutube style={{width:'50px', height:'30px'}}></AiFillYoutube> </span>
        <span><AiFillFacebook style={{width:'50px', height:'30px'}}></AiFillFacebook> </span>
      </div>
      {item &&
      <div className='qnaDetail-box'>
        <div className='qnaDetail-img'> 
          <img src="../images/qna-icon.png" alt="qna이미지" />
          <p>{item.qnaCategory}</p>
        </div>
        <div className='qnaDetail-boxTitle'>
          <p className='no'>{qnaColNum}</p>
          <h3>{item.qnaTitle}</h3>
          <p className='date'>{setDateFormat(item.modDate)}</p>
        </div>
        <div className='qnaDetail-inside'>
          <textarea cols="30" rows="10" readOnly placeholder='qna 내용' value={item.qnaContent}></textarea>
        </div>
        <button className='oBtn'  
        style={isAdmin.current == "Y" ? null : {display: "none"}}
        onClick={() => navigate("/qna/admin/"+qnaColNum)} >수정하기</button>
        <button className='oBtn'  onClick={()=>navigate("/qna")}>목록으로 가기</button>
      </div>
      }
    </div>
  );
};

export default QnaBoardDetail;