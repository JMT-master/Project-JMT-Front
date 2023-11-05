import React, {useEffect, useRef, useState} from 'react'
import {call, getCookie, setDateFormat, setDateTimeFormat} from "../common/ApiService";
import {BsTrash} from "react-icons/bs";
import {API_BASE_URL} from "../common/ApiConfig";
import axios from "axios";


const ReviewBox = ({item,modal, deleteHandler, updateHanlder}) => {
  const regDate = setDateFormat(item.regDate);
  const modDate = setDateFormat(item.modDate);

  const [isUpdate, setIsUpdate] = useState(false);
  let content = item.reviewContent;
  const [image, setImage] = useState(null)
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
    setIsUpdate(true);
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
         <div>{"작성일 : " + regDate}</div>
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
            <button onClick={updateReview}>수정 완료</button>
          </div>
       }
       <div className='reviewBox-image' style={{display : modal ? "none" : "block"}}>
         {item.reviewImg && <img src={item.imgData} alt="Image"/>}
       </div>
       <div className='reviewBox-footer' style={{display : sameWriter || !modal ? "grid" : "none"}}>
         <button className="oBtn marginBottomBtn" onClick={updateToggle}>수정</button>
         <button className="oBtn marginBottomBtn" onClick={deleteReview}>삭제</button>
       </div>
     </div>
  )
}

export default ReviewBox