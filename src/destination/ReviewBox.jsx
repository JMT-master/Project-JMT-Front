import React, {useEffect, useRef, useState} from 'react'
import {call, getCookie, getLocal, setDateFormat} from "../common/ApiService";
import Swal from "sweetalert2";


const ReviewBox = ({item, modal, setFile, fileUpload, deleteHandler, updateHanlder}) => {
  const regDate = setDateFormat(item.regDate);
  const modDate = setDateFormat(item.modDate);
  const [isUpdate, setIsUpdate] = useState(false);
  let content = item.reviewContent;
  const [sameWriter, setSameWriter] = useState(false)
  const [isAdmin,setIsAdmin] = useState(false);
  useEffect(() => {
    call("/adminchk", "POST", {socialYn:getLocal("social")})
       .then(response =>{
         setIsAdmin(response)
       })
    call("/review/userChk", "Post", {reviewWriter: item.reviewWriter})
       .then(response => {
         setSameWriter(response)
       })
  }, [item]);
  const deleteReview = () => {
    deleteHandler(item.reviewIdx);
  }

  const updateToggle = () => {
    setFile([])
    setIsUpdate(!isUpdate);
  }

  const fileUploadHandler = (e) => {
    let uploadFile = null
    uploadFile = e.target.files[0];
    let value = e.target.value;
    let result = value.split('\\').reverse()[0];
    document.getElementById('review-file-text1').value = result;
    setFile(uploadFile);
  }

  const updateReview = () => {
    Swal.fire({
      icon: 'question',
      title: '수정하시겠습니까?',
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: '확인',
      denyButtonText: '취소',

    }).then(response => {
         if (response.isConfirmed) {
           updateHanlder({
             reviewIdx: item.reviewIdx,
             reviewContent: content,
             reviewContentId: item.reviewContentId
           })
           setIsUpdate(false);
         }
       }
    )
  }
    return (
       <div className='reviewBox'>
         <div className="reviewBox-body">
           <div className='reviewBox-header'>
             <div><span className='reviewWriter'>{item.reviewWriter}</span> | <span className="reviewDate">{regDate}</span></div>

             {/*<div>{"수정일 : " + modDate}</div>*/}
           </div>
           {isUpdate == false ?
              <div className='reviewBox-content'>
                <p>{content}</p>
              </div>
              :
              <div className='reviewBox-content'>
            <textarea onChange={(e) => {
              content = e.target.value
            }} name="update" id="update" cols="70" rows="3">{content}</textarea>
                <div style={{justifySelf: "start"}} className='file-attach-review reviewUpload'>
                  <input placeholder='첨부파일' id='review-file-text1' readOnly></input>
                  <label htmlFor='review-file1' className='btn-upload'>파일 업로드</label>
                  <input className="review-file" type="file" name='review-file' id='review-file1'
                         accept='.jpg, .jpeg, .png'  // image 파일만 허용
                         onChange={fileUploadHandler}
                  />
                  <button className="oBtn" onClick={updateReview}>수정 완료</button>
                </div>

              </div>
           }
         </div>
         <div className='reviewBox-image' style={{display: modal ? "none" : "block"}}>
           {item.reviewImg ? <img className="imgData" id="imgData" src={item.imgData} alt="Image"/> :
              <img className="imgData" id="imgData" src={process.env.PUBLIC_URL + "/images/jejudogorange-thumb.jpg"}
                   alt="Image"/>}
         </div>
         <div className='reviewBox-footer writeBtnBox'
              style={{display: (sameWriter || isAdmin) && !modal  ? "grid" : "none"}}>
           <button className="oBtn marginBottomBtn" onClick={updateToggle}>수정</button>
           <button className="oBtn marginBottomBtn" onClick={deleteReview}>삭제</button>
         </div>
       </div>
    )
  }

  export default ReviewBox