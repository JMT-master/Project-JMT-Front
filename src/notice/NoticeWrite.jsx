import React, {useState} from 'react';
import {AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube} from 'react-icons/ai';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {call, getCookie} from "../common/ApiService";
import Swal from "sweetalert2";
import axios from "axios";
import {API_BASE_URL} from "../common/ApiConfig";

const NoticeWrite = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const idx = location.state.idx + 1;
  const [category, setCategory] = useState("관광지");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentFiles, setContentFiles] = useState();
  const handleSelect = (e) => {
    setCategory(e.target.value);
  }
  const [file, setFile] = useState([]);
  // const fileUpload = (e) => {
  //   let files = e.target.files;
  //   let uploadFile = e.target.files[0];
  //   console.log("files : ", files);
  //   console.log("uploadFile : ", uploadFile);
  //   let value = e.target.value;
  //   let result = value.split('\\').reverse()[0];
  //   document.getElementById('review-file-text').value = result;
  //   setFile(uploadFile);
  //   console.log("files : " + file)
  // }

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const category = formData.get('category');
  //   const title = formData.get('title');
  //   const content = formData.get('content');
  //
  //   const jsonForm = {
  //     idx: idx,
  //     category: category,
  //     title: title,
  //     content: content
  //   }
  //
  //   call("/notice/admin", "POST", jsonForm)
  //      .then(response => {
  //        if (response === undefined) {
  //          Swal.fire({
  //            icon: 'warning',
  //            title: '작성 중 에러 발생!',
  //            showCloseButton: true,
  //            confirmButtonText: '확인',
  //          });
  //          return;
  //        } else {
  //          Swal.fire({
  //            icon: 'info',
  //            title: '작성되었습니다!',
  //            showCloseButton: true,
  //            confirmButtonText: '확인',
  //          }).then(
  //             () => {
  //               navigate("/notice/" + idx)
  //             }
  //          );
  //        }
  //      })
  // }

  const fileUpload = (e) => {
    // const files = document.getElementById("notice-file").files;
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




  // 지식인 create
  const onSubmitKnowledge = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const form = e.target;

    const data = {
      "category" : form.elements.category.value,
      "title" : form.elements.title.value,
      "content" : form.elements.content.value,
      "view" : "0"
    }

    // if(title === null || title === undefined ||
    //    content === null || content === undefined || title === '' || content === '') {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: '내용',
    //     text: '제목 혹은 내용이 비었습니다.'
    //   });
    //
    //   return;
    // }

    const accessToken = getCookie('ACCESS_TOKEN');

// 작성완료
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
        url : API_BASE_URL + '/notice/admin',
        headers : {
          "Content-Type" : "multipart/form-data",
          "Authorization": 'Bearer ' + accessToken
        },
        data : formData
      }).then(response => {
        if(response.status === 200) {
          navigate("/notice/" + idx);
        }
      });
    // else { // 수정완료
    //   console.log('contentFiles : ',contentFiles);
    //   const sendData = {...data,
    //     num : idx,
    //     files : Array.from(contentFiles).map(data => data.name)
    //   };
    //
    //   console.log('sendData', sendData);
    //
    //   call('/notice', "PUT", sendData);
    // }
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
       <form onSubmit={onSubmitKnowledge} className='ask-box' id="noticeForm">
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
           <div style={{margin:0, padding:0, borderBottom : 'none'}}>
             <label htmlFor='notice-file' className='btn-upload'>파일 업로드</label>
             <input type="file" name='notice-file' id='notice-file'
                    accept='.xlsx, .xls, .doc, .pdf, image/*'  // doc, pdf, image 파일만 허용
                    multiple
                    onChange={fileUpload}
             />
           </div>
         </div>
         <div className='button-box'>
           <button className='submit-knowledge' type='submit'>작성완료</button>
           <button className='back-to-knlist' onClick={() => navigate("/notice")}>목록으로 돌아가기</button>
         </div>
       </form>
     </div>
  );
};

export default NoticeWrite;