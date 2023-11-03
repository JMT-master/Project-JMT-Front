import React, {useState} from 'react'
import {setDateFormat} from "../common/ApiService";
import {BsTrash} from "react-icons/bs";

const ReviewBox = ({item, deleteHandler, updateHanlder}) => {
  const regDate = setDateFormat(item.regDate);
  const modDate = setDateFormat(item.modDate);
  const [isUpdate, setIsUpdate] = useState(false);
  let content = item.reviewContent;
  const deleteReview = () => {
    deleteHandler(item.reviewIdx);
  }

  const updateToggle = () => {
    setIsUpdate(true);
  }

  const updateReview = () => {
    updateHanlder({
      reviewIdx : item.reviewIdx,
      reviewContent: content,
      reviewContentId : item.reviewContentId
    })
    setIsUpdate(false);
  }

  return (
     <div className='reviewBox'>
       <div className='reviewBox-header'>
         <div>{item.reviewWriter}</div>
         <div>{regDate + " : " + modDate}</div>
       </div>
       {isUpdate == false ?
          <div className='reviewBox-content'>
            <p>{content}</p>
            <img src={item.img} alt=""/>
          </div>
          :
          <div className='reviewBox-content'>
            <textarea onChange={(e) => {
              content = e.target.value
            }} name="update" id="update" cols="70" rows="5">{content}</textarea>
            <button onClick={updateReview}>수정 완료</button>
          </div>
       }
       <div className='reviewBox-footer'>
         <button className="oBtn marginBottomBtn" onClick={updateToggle}>수정</button>
         <button className="oBtn marginBottomBtn" onClick={deleteReview}><BsTrash/></button>
       </div>
     </div>
  )
}

export default ReviewBox