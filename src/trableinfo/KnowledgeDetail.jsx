import React, { useEffect, useState } from 'react';
import style from '../css/KnowledgeDetail.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import OnModal from '../common/OnModal';
import { AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube } from 'react-icons/ai';
import AttachFile from '../common/AttachFile';
import { call } from '../common/ApiService';

const KnowledgeDetail = ({ data }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [dbData, setDbdata] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  }
  const {state} = useLocation();
  const detail = state;
  // const detail = data[params.id - 1]
  console.log('detail : ',detail);

  useEffect(() => {
    call("/knowledgeDetail?id="+params.id,"POST",detail.data)
    .then(response => {
      setDbdata(response);
    });
  },[]);


  return (
    <div className='knowledgeDetail-content'>
      <div className='knowledgeDetail-title'>
        <h1 onClick={() => navigate('/info/knowledge')}>Jhat JPT 지식in</h1>
        <span><AiFillPrinter style={{width:'50px', height:'30px'}}></AiFillPrinter> </span>
        <span><AiFillFilePdf style={{width:'50px', height:'30px'}}></AiFillFilePdf> </span>
        <span> <AiFillYoutube style={{width:'50px', height:'30px'}}></AiFillYoutube> </span>
        <span><AiFillFacebook style={{width:'50px', height:'30px'}}></AiFillFacebook> </span>
      </div>
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
          <button className='back-to-knin'  onClick={()=>navigate(-1)}>목록으로 가기</button>
          <button onClick={showModal}>답변하기</button>
          {modalOpen && <OnModal setModalOpen={setModalOpen}></OnModal>}
        </div>
      </div>
      <AttachFile data = {dbData !== null ? dbData : '' }></AttachFile>
      <div className='knowledgeDetail-answer-box'>
        <p>답변자랑 작성일자</p>
        <textarea cols="30" rows="10" readOnly>답변 내용이 들어가야함</textarea>
      </div>

    </div>
  );
};

export default KnowledgeDetail;