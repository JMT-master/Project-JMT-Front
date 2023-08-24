import React, { useState } from 'react';
import style from '../css/KnowledgeDetail.css'
import { useNavigate, useParams } from 'react-router-dom';
import OnModal from '../common/OnModal';

const KnowledgeDetail = ({ data }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  }
  console.log(params);
  const detail = data[params.id - 1]

  return (
    <div className='knowledgeDetail-content'>
      <div className='knowledgeDetail-title'>
        <h1 onClick={() => navigate('/info/knowledge')}>Jhat JPT 지식in</h1>
        <span>아이콘 모음집</span>
      </div>
      <div className='knowledgeDetail-box'>
        <div className='knowledgeDetail-img'>
          <img src="../images/qna-icon.png" alt="질문 이미지" style={{ width: '120px', height: '120px' }} />
          <p>{detail.category}</p>
        </div>
        <div className='knowledgeDetail-question'>
          <p className='no'>No . {detail.no}</p>
          <h3>{detail.title}</h3>
          <p className='date'>{detail.createDate}</p>
        </div>
        <div className='knowledgeDetail-inside'>
          <textarea cols="30" rows="10" readOnly placeholder='질문 내용이 들어가야합니다.' onClick={(e) => {
            e.preventDefault();
          }} >{detail.content}</textarea>
        </div>
        <div className='knowledgeDetail-answer-btn'>
          <button onClick={showModal}>답변하기</button>
          {modalOpen && <OnModal setModalOpen={setModalOpen}></OnModal>}
        </div>
      </div>
      <div className='knowledgeDetail-answer-box'>
        <p>답변자랑 작성일자</p>
        <textarea cols="30" rows="10" readOnly>답변 내용이 들어가야함</textarea>
      </div>

    </div>
  );
};

export default KnowledgeDetail;