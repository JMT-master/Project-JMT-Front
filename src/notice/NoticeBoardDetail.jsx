import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube} from "react-icons/ai";
import {call, getCookie} from "../common/ApiService";
import '../css/NoticeBoardDetail.scss'
import Swal from "sweetalert2";

const NoticeBoardDetail = ({data}) => {
  const navigate = useNavigate();
  const params = useParams();
  const detail = data[params.id - 1];
  const [item, setItem] = useState({});
  const isAdmin = useRef(getCookie("adminChk"));



  useEffect(() => {
    call("/notice/" + params.id, "GET", null)
       .then(response => {
         setItem(response);
       })
  }, [])

  const deleteNotice = () => {
    call("/notice/admin", "DELETE", {idx: item.idx})
       .then(response => {
         if(response === undefined) {
           Swal.fire({
             icon : 'warning',
             title: '삭제 중 에러 발생!',
             showCloseButton: true,
             confirmButtonText: '확인',
           });
           return;
         } else {
           Swal.fire({
             icon : 'info',
             title: '삭제되었습니다!',
             showCloseButton: true,
             confirmButtonText: '확인',
           }).then(
              () => {navigate("/notice")}
           );
         }
       })
  }

  return (
     <div className='noticeDetail-content'>
       <div className='noticeDetail-title'>
         <h1>공지사항</h1>
         <span><AiFillPrinter style={{width: '50px', height: '30px'}}></AiFillPrinter> </span>
         <span><AiFillFilePdf style={{width: '50px', height: '30px'}}></AiFillFilePdf> </span>
         <span> <AiFillYoutube style={{width: '50px', height: '30px'}}></AiFillYoutube> </span>
         <span><AiFillFacebook style={{width: '50px', height: '30px'}}></AiFillFacebook> </span>
       </div>
       <div className='noticeDetail-box'>
         <div className='noticeDetail-img'>
           <img src="../images/notice-icon.png" alt="공지사항 이미지" style={{width: '120px', height: '120px'}}/>
           <p>{item.category}</p>
         </div>
         <div className='noticeDetail-boxTitle'>
           <p className='no'>No. {item.idx}</p>
           <p className='noticeContent'>{item.title}</p>
           <p className='date'>{item.regDate}</p>
         </div>
         <div className='noticeDetail-inside'>
           <textarea cols="30" rows="10" readOnly placeholder='공지사항 내용' value={item.content}></textarea>
         </div>
         <div className="noticeDetail-btnBox">
           <button className='oBtn' style={isAdmin.current == "Y" ? null : {display: "none"}} onClick={() => {
             navigate("/notice/admin/update", {state : {idx : item.idx}})
           }}>수정</button>
           <button className='oBtn' style={isAdmin.current == "Y" ? null : {display: "none"}} onClick={() =>{
             deleteNotice();
           }}>삭제</button>
           <button className='oBtn' onClick={() => navigate("/notice")}>목록으로 가기</button>
         </div>
       </div>
     </div>);
};

export default NoticeBoardDetail;