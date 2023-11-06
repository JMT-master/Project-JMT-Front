import React, {useEffect, useRef, useState} from 'react'
import {call, getCookie, setDateFormat, setDateTimeFormat} from "../common/ApiService";
import {BsTrash} from "react-icons/bs";
import {API_BASE_URL} from "../common/ApiConfig";
import axios from "axios";


const ReviewBox = ({item, modal, setFile, fileUpload, deleteHandler, updateHanlder}) => {
  const regDate = setDateFormat(item.regDate);
  const modDate = setDateFormat(item.modDate);

  const [isUpdate, setIsUpdate] = useState(false);
  let content = item.reviewContent;
  const [sameWriter,setSameWriter] = useState(false)
  useEffect(() => {
    call("/review/userChk", "Post", {reviewWriter : item.reviewWriter})
       .then(response=>{
         setSameWriter(response)
    })
  }, []);
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
    updateHanlder({
      reviewIdx: item.reviewIdx,
      reviewContent: content,
      reviewContentId: item.reviewContentId
    })
    setIsUpdate(false);
  }

  return (
     <div className='reviewBox'>
       <div className='reviewBox-header'>
         <div>{item.reviewWriter}</div>
         <div>{regDate}</div>
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
            }} name="update" id="update" cols="70" rows="5">{content}</textarea>
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
       <div className='reviewBox-image' style={{display : modal ? "none" : "block"}}>
         {item.reviewImg && <img id="imgData" src={item.imgData} alt="Image"/>}
       </div>
       <div className='reviewBox-footer' style={{display : sameWriter && !modal || getCookie("adminChk")=="Y"? "grid" : "none"}}>
         <button className="oBtn marginBottomBtn" onClick={updateToggle}>수정</button>
         <button className="oBtn marginBottomBtn" onClick={deleteReview}>삭제</button>
       </div>
     </div>
  )
}

export default ReviewBox