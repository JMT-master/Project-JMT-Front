import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from '../css/QnaBoardDetail.css'
import { AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube } from 'react-icons/ai';
import { call, getCookie, setDateFormat } from './../common/ApiService';
import axios from 'axios';
import { API_BASE_URL } from '../common/ApiConfig';
import AttachFile from '../common/AttachFile';
import Swal from 'sweetalert2';

const QnaBoardDetail = () => {
  const [item, setItem] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const qnaColNum = params.id;
  const isAdmin = useRef(getCookie("adminChk"));

  useEffect(() => {
    // qnaColNum을 사용하여 API를 호출하고 데이터를 가져옵니다.
    let details = null;
    call("/qna/" + qnaColNum, "GET", null)
      .then((response) => {
        details = response;
        if (details !== undefined && details !== null &&
          details[0] && details[0].originalName !== null &&
          details[0].originalName !== undefined) {
          details.map((data, i) => {
            axios({
              method: 'POST',
              url: API_BASE_URL + "/qna/viewFile",
              data: data,
              responseType: 'blob',
            }).then(responseFile => {
              const blob = new Blob([responseFile.data]);
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                details[i] = { ...details[i], data: reader.result };
              }
            })
          })
          setItem(details);
        } else {
          setItem(details);
        }
      });
  }, []); // qnaColNum이 변경될 때마다 useEffect가 실행됩니다.

  const onQnAUpdate = () =>{
    Swal.fire({
      icon : 'question',
      title: '수정하시겠습니까?',
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: '확인',
      denyButtonText: '취소',

    }).then(response => {
      if(response.isConfirmed) {
        navigate("/qna/admin/" + qnaColNum)
      } else {
        return;
      }
    });
  }

  return (
    <div className='qnaDetail-content'>
      <div className='qnaDetail-title'>
        <h1>Q & A</h1>
        <span><AiFillPrinter style={{ width: '50px', height: '30px' }}></AiFillPrinter> </span>
        <span><AiFillFilePdf style={{ width: '50px', height: '30px' }}></AiFillFilePdf> </span>
        <span> <AiFillYoutube style={{ width: '50px', height: '30px' }}></AiFillYoutube> </span>
        <span><AiFillFacebook style={{ width: '50px', height: '30px' }}></AiFillFacebook> </span>
      </div>
      {item &&
        <div className='qnaDetail-box'>
          <div className='qnaDetail-img'>
            <img src="../images/qna-icon.png" alt="qna이미지" />
            <p>{item[0] ? item[0].qnaCategory : item.qnaCategory}</p>
          </div>
          <div className='qnaDetail-boxTitle'>
            <p className='no'>{qnaColNum}</p>
            <h3>{item[0] ? item[0].qnaTitle : item.qnaTitle}</h3>
            <p className='date'>{setDateFormat(item[0] ? item[0].modDate : item.modDate)}</p>
          </div>
          <div className='qnaDetail-inside'>
            <textarea cols="30" rows="10" readOnly placeholder='qna 내용' value={item[0] ? item[0].qnaContent : item.qnaContent}></textarea>
          </div>
        </div>
      }
      {item && item.length > 0 ? (
        <AttachFile data={item}></AttachFile>
      ) : (
        <p>파일이 없습니다.</p>
      )}
      <div className="detail-btnBox">
      <button className='oBtn'
        style={isAdmin.current == "Y" ? null : { display: "none" }}
        onClick={onQnAUpdate} >수정하기</button>
      <button className='oBtn' onClick={() => navigate("/qna")}>목록으로 가기</button>
      </div>
    </div>
  );
};

export default QnaBoardDetail;