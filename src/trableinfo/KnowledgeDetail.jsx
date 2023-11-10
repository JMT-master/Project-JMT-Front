import React, { useEffect, useState } from 'react';
import style from '../css/KnowledgeDetail.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import OnModal from '../common/OnModal';
import { AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube, AiOutlineLoading } from 'react-icons/ai';
import AttachFile from '../common/AttachFile';
import { call, getLocal, setDateTimeFormat } from '../common/ApiService';
import axios from 'axios';
import { API_BASE_URL } from '../common/ApiConfig';
import AnswerDetail from '../common/AnswerDetail';
import Swal from 'sweetalert2';
import KnowledgeWrite from './KnowledgeWrite';

const KnowledgeDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [dbData, setDbdata] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const showModal = () => {
    setModalOpen(true);
  }

  useEffect(() => {
    let revData = null;
    setLoading(true);
    call("/knowledgeDetail?id="+params.id+"&socialYn="+getLocal('social'),"POST")
    .then(response => {
      revData = response;
      console.log('revData : ',revData);
      
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
              revData[i] = {...revData[i], data : reader.result, socialYn : getLocal('social')}; 
              if((i+1) === revData.length) setLoading(false);
            }
          });
        })

        setDbdata(revData);
        
      } else {

        setLoading(false);
        setDbdata(revData);
      }      
    })

    window.scrollTo(0,0);
  },[params.id]);

  // knowledge 수정
  function onKnowledgeUpdate() {
    Swal.fire({
      icon : 'question',
      title: '수정하시겠습니까?',
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: '확인',
      denyButtonText: '취소',

    }).then(response => {
      if(response.isConfirmed) {
        navigate('/knowledgeWrite', {
          state : {...dbData},
        });
      } else {
        return;
      }
    });
  }

  // Knowledge 삭제
  function onKnowledgeDelete() {
    Swal.fire({
      icon : 'question',
      title: '삭제하시겠습니까?',
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: '확인',
      denyButtonText: '취소',

    }).then(response => {
      // 확인
      if(response.isConfirmed) {
        dbData[0].socialYn = getLocal('social');
        call("/knowledgeDetail/delete","POST",dbData[0])
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
              () => {navigate("/knowledge")}
            );
          }
        });
      } else {
        return;
      }
    });
    
  }

  // Loading 화면
  if (loading === true) {
    return <div className='loading'><AiOutlineLoading className='loadingIcon'></AiOutlineLoading></div>
  } else {
    return (
      <div className='knowledgeDetail-content'>
        <div className='knowledgeDetail-title'>
          <h1 onClick={() => navigate('/info/knowledge')}>Jhat JPT 지식in</h1>
        </div>
        <p className='knowledgeDetail-title-view'>조회수 {dbData[0].view}</p>
        <div className='knowledgeDetail-box'>
          <div className='knowledgeDetail-img'>
            <img src="../images/qna-icon.png" alt="질문 이미지" style={{ width: '120px', height: '120px' }} />
            <p>{dbData[0].category}</p>
          </div>
          <div className='knowledgeDetail-question'>
            <p className='no'>No . {dbData[0].num}</p>
            <h3>{dbData[0].title}</h3>
            <p className='date'>{setDateTimeFormat(dbData[0].modDate)}</p>
          </div>
          <div className='knowledgeDetail-inside'>
            <textarea cols="30" rows="10" readOnly placeholder='질문 내용이 들어가야합니다.' onClick={(e) => {
              e.preventDefault();
            }} >{dbData[0].content}</textarea>
          </div>
          <div className='knowledgeDetail-answer-btn'>
            {/* <button onClick={showModal} className='back-to-knin'>답변하기</button> */}
            {modalOpen && <OnModal setModalOpen={setModalOpen}></OnModal>}
          </div>
        </div>
        <AttachFile data = {dbData !== null ? dbData : '' }></AttachFile>
        {
          dbData[0].userChk === true ?
          <div className="detail-btnBox">
            <button className='oBtn' onClick={onKnowledgeUpdate}>수정</button>
            <button className='oBtn' onClick={onKnowledgeDelete}>삭제</button>
            <button className='oBtn'  onClick={()=>navigate(-1)}>목록으로 가기</button>
          </div> :
          <div className="detail-btnBox">
            <button className='oBtn'  onClick={()=>navigate(-1)}>목록으로 가기</button>
          </div>
        }
        <AnswerDetail data = {dbData !== null ? dbData[0] : '' }></AnswerDetail>
      </div>
    );
  }
};

export default KnowledgeDetail;