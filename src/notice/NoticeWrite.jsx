import React from 'react';
import { useState } from 'react';
import { AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube } from 'react-icons/ai';
import { VscSearch } from 'react-icons/vsc';
import { useNavigate, useParams } from 'react-router-dom';

const NoticeWrite = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [category, setCategory] = useState("");
    const handleSelect = (e) => {
      setCategory(e.target.value);
    }
    return (
        <div className='notice-content'>
        <div className='notice-write-title'>
          <h1>공지사항</h1>
          <span><AiFillPrinter style={{width:'50px', height:'30px'}}></AiFillPrinter> </span>
          <span><AiFillFilePdf style={{width:'50px', height:'30px'}}></AiFillFilePdf> </span>
          <span> <AiFillYoutube style={{width:'50px', height:'30px'}}></AiFillYoutube> </span>
          <span><AiFillFacebook style={{width:'50px', height:'30px'}}></AiFillFacebook> </span>
        </div>
        <div className='ask'>
          <h3>작성하기</h3>
          <span>원하는 분류에 맞게 글을 입력하여 주세요</span>
        </div>
        <form className='ask-box'>
          <div className='ask-category'>
            <h3>카테고리 선택</h3>
            <p>분야를 선택해주세요</p>
            
            <select className='category' onChange={handleSelect}>
              <option value="관광지">관광지</option>
              <option value="음식">음식</option>
              <option value="축제">축제</option>
            </select>
          </div>
          <div className='location-search'>
            <h4>장소 검색</h4>
            <input type="text" />
            <button><VscSearch /></button>
          </div>
          <div className='ask-textarea'>
            <h4>내용 작성</h4>
            <input type="text" placeholder='제목을 작성해주세요' />
            <textarea cols="80" rows="10"></textarea>
          </div>
          <div className='file-attach'>
            <label for='file'>
              <div className='btn-upload'>파일 업로드 하기</div>
            </label>
            <input type="file" name='file' id='file' multiple/>
          </div>
        </form>
        <div className='button-box'>
          <button className='submit-knowledge' type='submit'>작성완료</button>
          <button className='back-to-knlist'onClick={()=>navigate(-1)}>목록으로 돌아가기</button>
        </div>
      </div>
    );
};

export default NoticeWrite;