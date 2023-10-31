import React, { useEffect, useState } from 'react';
import style from '../css/KnowledgeDetail.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import OnModal from '../common/OnModal';
import { AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube, AiOutlineLoading } from 'react-icons/ai';
import AttachFile from '../common/AttachFile';
import { call } from '../common/ApiService';
import axios from 'axios';
import { API_BASE_URL } from '../common/ApiConfig';
import AnswerDetail from '../common/AnswerDetail';

const KnowledgeDetail = ({ data }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [dbData, setDbdata] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const showModal = () => {
    setModalOpen(true);
  }
  const {state} = useLocation();
  const detail = state;
  // const detail = data[params.id - 1]

  useEffect(() => {
    let revData = null;
    setLoading(true);
    call("/knowledgeDetail?id="+params.id,"POST", detail.data)
    .then(response => {
      revData = response;
      console.log("detail.data ? "+detail.data);
      if(revData !== undefined && revData !== null && revData[0].originalName !== null && revData[0].originalName !== undefined) {
          revData.map((data,i) => {
          axios({
            method: 'POST',
            url: API_BASE_URL + '/knowledgeDetail/viewFile',
            data: data,
            responseType : 'blob',
          }).then(response => {
            const blob = new Blob([response.data]);
      
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              revData[i] = {...revData[i], data : reader.result}; 
              if((i+1) === revData.length) setLoading(false);
            }
          });
        })

        setDbdata(response);
        
      } else {
        setLoading(false);
        setDbdata(response);
      }      
    })

    window.scrollTo(0,0);
  },[]);

  // Loading 화면
  if (loading === true) {
    return <div className='loading'><AiOutlineLoading className='loadingIcon'></AiOutlineLoading></div>
  } else {
    return (
      <div className='knowledgeDetail-content'>
        <div className='knowledgeDetail-title'>
          <h1 onClick={() => navigate('/info/knowledge')}>Jhat JPT 지식in</h1>
          <span><button className='knowledgeDetail-title-btn'>수정</button></span>
          <span><button className='knowledgeDetail-title-btn'>삭제</button></span>
          {/* <span><AiFillPrinter style={{width:'50px', height:'30px'}}></AiFillPrinter> </span> */}
          {/* <span><AiFillFilePdf style={{width:'50px', height:'30px'}}></AiFillFilePdf> </span> */}
          {/* <span> <AiFillYoutube style={{width:'50px', height:'30px'}}></AiFillYoutube> </span> */}
          {/* <span><AiFillFacebook style={{width:'50px', height:'30px'}}></AiFillFacebook> </span> */}
        </div>
        <p className='knowledgeDetail-title-view'>조회수 {detail.data.view}</p>
        <div className='knowledgeDetail-box'>
          <div className='knowledgeDetail-img'>
            <img src="../images/qna-icon.png" alt="질문 이미지" style={{ width: '120px', height: '120px' }} />
            <p>{detail.data.category}</p>
          </div>
          <div className='knowledgeDetail-question'>
            <p className='no'>No . {detail.data.num}</p>
            <h3>{detail.data.title}</h3>
            <p className='date'>{detail.createDate}</p>
          </div>
          <div className='knowledgeDetail-inside'>
            <textarea cols="30" rows="10" readOnly placeholder='질문 내용이 들어가야합니다.' onClick={(e) => {
              e.preventDefault();
            }} >{detail.data.content}</textarea>
          </div>
          <div className='knowledgeDetail-answer-btn'>
            {/* <button onClick={showModal} className='back-to-knin'>답변하기</button> */}
            {modalOpen && <OnModal setModalOpen={setModalOpen}></OnModal>}
          </div>
        </div>
        <AttachFile data = {dbData !== null ? dbData : '' }></AttachFile>
        <AnswerDetail data = {dbData !== null ? dbData[0].num : '' }></AnswerDetail>
        <button className='back-to-knin'  onClick={()=>navigate(-1)}>목록으로 가기</button>
  
      </div>
    );
  }
};

export default KnowledgeDetail;