import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube} from "react-icons/ai";
import {call, getCookie, setDateTimeFormat} from "../common/ApiService";
import '../css/NoticeBoardDetail.scss'
import Swal from "sweetalert2";
import AttachFile from "../common/AttachFile";
import axios from "axios";
import {API_BASE_URL} from "../common/ApiConfig";

const NoticeBoardDetail = ({data}) => {
  const navigate = useNavigate();
  const params = useParams();
  const [item, setItem] = useState();
  const isAdmin = useRef(getCookie("adminChk"));



  useEffect(() => {
    let revData = null;
    call("/notice/" + params.id, "GET", null)
       .then(response => {
         revData = response;

         if(revData !== undefined && revData !== null && revData[0].originalName !== null && revData[0].originalName !== undefined) {
           revData.map((data,i) => {
             axios({
               method: 'POST',
               url: API_BASE_URL + '/knowledgeDetail/viewFile',
               data: data,
               responseType : 'blob',
             }).then(responseFile => {
               const blob = new Blob([responseFile.data]);

               const reader = new FileReader();
               reader.readAsDataURL(blob);
               reader.onloadend = () => {
                 revData[i] = {...revData[i], data : reader.result};
               }
             });
           })


           setItem(revData);
           console.log("item : " + item)

         } else {

           setItem(revData);
         }
       })
    window.scrollTo(0,0);
  },[params.id]);

  const updateHandler = () =>{
    Swal.fire({
      icon : 'question',
      title: '수정하시겠습니까?',
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: '확인',
      denyButtonText: '취소',
    }).then(response =>{
      if(response.isConfirmed){
        navigate("/notice/admin/write",{
          state: {...item}
        });
      }
    })
  }

  const deleteNotice = () => {
    call("/notice/admin", "DELETE", {idx: item[0].idx})
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
           <p>{item&&item[0].category}</p>
         </div>
         <div className='noticeDetail-boxTitle'>
           <p className='no'>No. {item&&item[0].idx}</p>
           <p className='noticeContent'>{item&&item[0].title}</p>
           <p className='date'>{setDateTimeFormat(item&&item[0].regDate)}</p>
         </div>
         <div className='noticeDetail-inside'>
           <textarea cols="30" rows="10" readOnly placeholder='공지사항 내용' value={item&&item[0].content}></textarea>
         </div>
         <div className="noticeDetail-btnBox">
           <button className='oBtn' style={isAdmin.current == "Y" ? null : {display: "none"}} onClick={() => {
             updateHandler();
           }}>수정</button>
           <button className='oBtn' style={isAdmin.current == "Y" ? null : {display: "none"}} onClick={() =>{
             deleteNotice();
           }}>삭제</button>
           <button className='oBtn' onClick={() => navigate("/notice")}>목록으로 가기</button>
         </div>
         <AttachFile data={item}></AttachFile>
       </div>
     </div>);
};

export default NoticeBoardDetail;