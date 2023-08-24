import React from 'react';
import style from '../css/KnowledgeWrite.css'
import { VscSearch } from 'react-icons/vsc';
// import { VscSearch } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';


const KnowledgeWrite = () => {
  const navigate = useNavigate();
  return (
    <div className='knowledge-content'>
      <div className='knowledge-write-title'>
        <h1>Jhat JPT 지식in</h1>
        <span>오른쪽 아이콘</span>
      </div>
      <div className='ask'>
        <h3>질문하기</h3>
        <span>제주도 관광 관련하여 궁금한 점을 작성하여 주세요. 관련 분야의 전문 지식인의 답변을 받을 수 있습니다.</span>
      </div>
      <div className='ask-box'>
        <div className='ask-category'>
          <h3>카테고리 선택</h3>
          <p>질문하실 분야를 선택해주세요</p>
          <select className='category'>
            <option value="관광지">관광지</option>
            <option value="음식">음식</option>
            <option value="축제">축제</option>
          </select>
        </div>
        <div className='location-search'>
          <h4>장소 검색 </h4>
          <input type="text" />
          <button><VscSearch /></button>
        </div>
        <div className='ask-textarea'>
          <h4>질문 내용 작성</h4>
          <input type="text" placeholder='제목을 작성해주세요' />
          <textarea cols="80" rows="10"></textarea>
        </div>
        <div className='file-attach'>
          <h4>파일 첨부</h4>
          <input type="file"/>
        </div>
      </div>
      <div className='button-box'>
        <button className='submit-knowledge'>작성완료</button>
        <button className='back-to-knlist'onClick={()=>navigate(-1)}>목록으로 돌아가기</button>
      </div>
    </div>
  );
};

export default KnowledgeWrite;