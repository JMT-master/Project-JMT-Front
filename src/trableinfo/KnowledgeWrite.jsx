import React, { useEffect, useRef, useState } from 'react';
import style from '../css/KnowledgeWrite.css'
import { VscSearch } from 'react-icons/vsc';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube } from 'react-icons/ai';
import axios from 'axios';
import { API_BASE_URL } from '../common/ApiConfig';
import { call, getCookie } from '../common/ApiService'; 
import Swal from 'sweetalert2';
import { TiDeleteOutline } from 'react-icons/ti';

const KnowledgeWrite = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("관광지");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentFiles, setContentFiles] = useState();

  const location = useLocation();
  const revData = location.state;

  // 수정버튼 클릭시 Data 삽입
  useEffect(() => {
    if(revData !== null) {
      setCategory(revData[0].category);
      setTitle(revData[0].title);
      setContent(revData[0].content);
      revData[0].originalName === null ? setContentFiles() :
      setContentFiles(Object.values(revData).map(value => {
        let file = new File([value.data],value.originalName);
        return file;
      }));
    }
  },[]);

  // 첨부파일 변경
  const fileUpload = (e) => {
    // const files = document.getElementById("knowledgeWrite-file").files;
    const files = e.target.files;

    if(files.length > 5) {
      Swal.fire({
        icon: 'warning',
        title: '파일',
        text: '파일 최대 갯수는 5개 입니다.'
      });
    } else {
      setContentFiles(files);
    }
  }

  console.log('revData : ',revData);
  
  // 지식인 create
  const onSubmitKnowledge = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    const data = {
      "category" : category,
      "title" : title,
      "content" : content,
      "view" : "0"
    }

    if(title === null || title === undefined ||
      content === null || content === undefined || title === '' || content === '') {
      Swal.fire({
        icon: 'warning',
        title: '내용',
        text: '제목 혹은 내용이 비었습니다.'
      });

      return;
    }

    const accessToken = getCookie('ACCESS_TOKEN');

    if(revData === null) { // 작성완료
      if(contentFiles !== undefined && contentFiles != null) {
        for(let i = 0; i < contentFiles.length; i++) {
          formData.append('file',contentFiles[i]);
        }
      }
      
      formData.append('data',new Blob([JSON.stringify(data)], {
        type: "application/json"
      }));
  
      axios({
        method : 'post',
        url : API_BASE_URL + '/knowledgeWrite/send',
        headers : {
          "Content-Type" : "multipart/form-data",
          "Authorization": 'Bearer ' + accessToken
        },
        data : formData
      }).then(response => {
        if(response.status === 200) {
          window.location.href="/knowledge";
        }
      });
    } else { // 수정완료
      console.log('contentFiles : ',contentFiles);
      const sendData = {...data, 
        num : revData[0].num,
        files : Array.from(contentFiles).map(data => data.name)
      };

      console.log('sendData', sendData);

      call('/knowledgeWrite/update', "POST", sendData);
      // if(contentFiles !== undefined && contentFiles != null) {
      //   for(let i = 0; i < contentFiles.length; i++) {
      //     formData.append('file',contentFiles[i]);
      //   }
      // }
      
      // formData.append('data',new Blob([JSON.stringify(data)], {
      //   type: "application/json"
      // }));
  
      // axios({
      //   method : 'post',
      //   url : API_BASE_URL + '/knowledgeWrite/send',
      //   headers : {
      //     "Content-Type" : "multipart/form-data",
      //     "Authorization": 'Bearer ' + accessToken
      //   },
      //   data : formData
      // }).then(response => {
      //   if(response.status === 200) {
      //     window.location.href="/knowledge";
      //   }
      // });
    }
  }

  // 
  const onDeleteItem = (e) => {
    e.preventDefault();

    setContentFiles(Array.from(contentFiles)
    .filter(data => data.name !== e.target.value)
    .map(value => value));    
  }

  // category Change
  const onChangeCategory = (e) => {
    e.preventDefault();

    setCategory(e.target.value);
  }

  // title Change
  const onChangeTitle = (e) => {
    e.preventDefault();

    setTitle(e.target.value);
  }

  // content Change
  const onChangeContent = (e) => {
    e.preventDefault();

    setContent(e.target.value);
  }

  // 목록으로 돌아가기
  const onClickList = (e) => {
    e.preventDefault();
    window.location.href = "/knowledge";
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
            <select className='category' onChange={onChangeCategory} value={category}>
              <option value="관광지">관광지</option>
              <option value="음식">음식</option>
              <option value="축제">축제</option>
            </select>
          </div>
          <div className='ask-textarea'>
            <h4>질문 내용 작성</h4>
            <input type="text" className='ask-textarea-title' 
            placeholder='제목을 작성해주세요'
            onChange={onChangeTitle}
            value={title} />
            <textarea className='ask-textarea-content' cols="80" rows="10"
            onChange={onChangeContent} value={content}></textarea>
          </div>
          <div className='file-attach'>
            {
              revData === null ? 
              <div style={{margin:0, padding:0, borderBottom : 'none'}}>
                <label for='knowledgeWrite-file' className='btn-upload'>파일 업로드</label>
                <input type="file" name='knowledgeWrite-file' id='knowledgeWrite-file'
                accept='.xlsx, .xls, .doc, .pdf, image/*'  // doc, pdf, image 파일만 허용
                multiple 
                onChange={fileUpload}
                />
              </div> :
              <></>
            }
            <div className='file-attach-container' style={{margin:0, padding:0, borderBottom : 'none'}}>
            {
              contentFiles !== null && contentFiles !== undefined ?
              Array.from(contentFiles).map(file => {
                  return (
                  <div style={{margin:0, padding:0, borderBottom : 'none', display : 'flex'}}>
                    <input placeholder='첨부파일' className='file-attach-text'
                     id='knowledgeWrite-file-text'
                     value={file.name}
                     style={{width : '200px'}}
                      readOnly>
                      </input>
                      {
                       revData === null ? <></> :
                        <button className='oBtn' value={file.name} onClick={onDeleteItem}
                        style={{width : '70px', height : '30px', textAlign : 'center'}}>삭 제</button>
                      }
                      
                  </div>
                    );
                }) :
                <></>
             }            
             </div>
          </div>
        </div>
        <div className='button-box'>
          {
            revData === null ? <button className='submit-knowledge'>작성완료</button>
                             : <button className='submit-knowledge'>수정완료</button>
          }
          
          <button className='back-to-knlist'onClick={onClickList}>목록으로 돌아가기</button>
        </div>
      </form>
    </div>
  );
};
export default KnowledgeWrite;