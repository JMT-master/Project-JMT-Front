import React, { useRef, useState } from 'react';
import style from '../css/KnowledgeWrite.css'
import { VscSearch } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube } from 'react-icons/ai';
import axios from 'axios';
import { API_BASE_URL } from '../common/ApiConfig';
import { getCookie } from '../common/ApiService';

const KnowledgeWrite = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("관광지");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();

  const fileUpload = (e) => {
    // const files = document.getElementById("knowledgeWrite-file").files;
    const files = e.target.files;

    const uploadFile = e.target.files[0];
    console.log("files : ", files);
    console.log("uploadFile : ", uploadFile);

    if(files.length === 1) {
      let value = e.target.value;
      let result = value.split('\\').reverse()[0];

      document.getElementById('knowledgeWrite-file-text').value = result;
    }
    else 
      document.getElementById('knowledgeWrite-file-text').value = '첨부파일 : ' + files.length + '개';

      setFile(files);
    
  }

  const onChangeCategory = (e) => {
    e.preventDefault();

    setCategory(e.target.value);
  }

  const onChangeTitle = (e) => {
    e.preventDefault();

    setTitle(e.target.value);
  }

  const onChangeContent = (e) => {
    e.preventDefault();

    setContent(e.target.value);
  }

  const onSubmitKnowledge = (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    const data = {
      "category" : category,
      "title" : title,
      "content" : content,
      "view" : "0"
    }

    console.log(file);
    if(file !== undefined && file != null) {
      for(let i = 0; i < file.length; i++) {
        formData.append('file',file[i]);
      }
    }
    

    formData.append('data',new Blob([JSON.stringify(data)], {
      type: "application/json"
    }));

    console.log('formData : ', formData);

    const accessToken = getCookie();

    console.log("accessToken : ",accessToken);

    if(accessToken === undefined) {
      axios({
        method : 'post',
        url : API_BASE_URL + '/knowledgeWrite/send',
        headers : {
          "Content-Type" : "multipart/form-data"
        },
        data : formData
      })
    } else {
      axios({
        method : 'post',
        url : API_BASE_URL + '/knowledgeWrite/send',
        headers : {
          "Content-Type" : "multipart/form-data",
          "Authorization": 'Bearer ' + accessToken
        },
        data : formData
      })
    }
  }

  return (
    <div className='knowledge-content'>
      <div className='knowledge-write-title'>
        <h1>Jhat JPT 지식in</h1>
        <span><AiFillPrinter style={{width:'50px', height:'30px'}}></AiFillPrinter> </span>
        <span><AiFillFilePdf style={{width:'50px', height:'30px'}}></AiFillFilePdf> </span>
        <span> <AiFillYoutube style={{width:'50px', height:'30px'}}></AiFillYoutube> </span>
        <span><AiFillFacebook style={{width:'50px', height:'30px'}}></AiFillFacebook> </span>
      </div>
      <div className='ask'>
        <h3>질문하기</h3>
        <span>제주도 관광 관련하여 궁금한 점을 작성하여 주세요. 관련 분야의 전문 지식인의 답변을 받을 수 있습니다.</span>
      </div>
      <form className='ask-box-form' onSubmit={onSubmitKnowledge}>
        <div className='ask-box'>
          <div className='ask-category'>
            <h3>카테고리 선택</h3>
            <p>질문하실 분야를 선택해주세요</p>
            <select className='category' onChange={onChangeCategory}>
              <option value="관광지">관광지</option>
              <option value="음식">음식</option>
              <option value="축제">축제</option>
            </select>
          </div>
          <div className='ask-textarea'>
            <h4>질문 내용 작성</h4>
            <input type="text" className='ask-textarea-title' 
            placeholder='제목을 작성해주세요'
            onChange={onChangeTitle} />
            <textarea className='ask-textarea-content' cols="80" rows="10"
            onChange={onChangeContent}></textarea>
          </div>
          <div className='file-attach'>
            <input placeholder='첨부파일' id='knowledgeWrite-file-text' readOnly></input>
            <label for='knowledgeWrite-file' className='btn-upload'>파일 업로드</label>
            <input type="file" name='knowledgeWrite-file' id='knowledgeWrite-file'
            accept='.doc, .pdf, image/*'  // doc, pdf, image 파일만 허용
             multiple 
             onChange={fileUpload}
             />          
          </div>
        </div>
        <div className='button-box'>
          <button className='submit-knowledge'>작성완료</button>
          <button className='back-to-knlist'onClick={()=>navigate(-1)}>목록으로 돌아가기</button>
        </div>
      </form>
    </div>
  );
};
export default KnowledgeWrite;