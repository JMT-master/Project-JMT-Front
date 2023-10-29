import React from 'react';
import {useState} from 'react';
import {AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube} from 'react-icons/ai';
import {VscSearch} from 'react-icons/vsc';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {call} from "../common/ApiService";

const NoticeWrite = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const idx = location.state.idx + 1;
  const [category, setCategory] = useState("");
  const handleSelect = (e) => {
    setCategory(e.target.value);
  }


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const category = formData.get('category');
    const title = formData.get('title');
    const content = formData.get('content');

    const jsonForm = {
      idx : idx,
      category: category,
      title : title,
      content :content
    }

    call("/notice/write", "POST", jsonForm)
       .then(reponse => {
         navigate("/notice/" + idx)
       })

  }

  return (
     <div className='notice-content'>

       <div className='notice-write-title'>
         <h1>공지사항</h1>
         <span><AiFillPrinter style={{width: '50px', height: '30px'}}></AiFillPrinter> </span>
         <span><AiFillFilePdf style={{width: '50px', height: '30px'}}></AiFillFilePdf> </span>
         <span><AiFillYoutube style={{width: '50px', height: '30px'}}></AiFillYoutube> </span>
         <span><AiFillFacebook style={{width: '50px', height: '30px'}}></AiFillFacebook> </span>
       </div>
       <div className='ask'>
         <h3>작성하기</h3>
         <span>원하는 분류에 맞게 글을 입력하여 주세요</span>
       </div>
       <form onSubmit={handleFormSubmit} className='ask-box' id="noticeForm">
         <input type="hidden" name="idx" value={idx}/>
         <div className='ask-category'>
           <h3>카테고리 선택</h3>
           <p>분야를 선택해주세요</p>
           <select name="category" className='category'>
             <option value="관광지">관광지</option>
             <option value="음식">음식</option>
             <option value="축제">축제</option>
           </select>
         </div>
         <div className='ask-textarea'>
           <h4>내용 작성</h4>
           <input type="text" name="title" placeholder='제목을 작성해주세요'/>
           <textarea cols="80" rows="10" name="content"></textarea>
         </div>
         <div className='file-attach'>
           <label for='file'>
             <div className='btn-upload'>파일 업로드 하기</div>
           </label>
           <input type="file" name='file' id='file' multiple/>
         </div>
         <div className='button-box'>
           <button className='submit-knowledge' type='submit'>작성완료</button>
           <button className='back-to-knlist' onClick={() => navigate(-1)}>목록으로 돌아가기</button>
         </div>
       </form>

     </div>
  );
};

export default NoticeWrite;