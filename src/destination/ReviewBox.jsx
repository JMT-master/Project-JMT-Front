import React from 'react'
import {call, setDateFormat} from "../common/ApiService";
import {BsTrash} from "react-icons/bs";

const ReviewBox = ({item, deleteHandler}) => {
  const regDate = setDateFormat(item.regDate);
  const modDate = setDateFormat(item.modDate);
  const deleteReview = () =>{
    deleteHandler(item.reviewIdx);
  }

  return (
     <div className='reviewBox'>
       <div className='reviewBox-header'>
         <div>{item.reviewWriter}</div>
         <div>{regDate + " : " + modDate}</div>
       </div>
       <div className='reviewBox-content'>
         <p>{item.reviewContent}</p>
         <img src={item.img} alt=""/>
       </div>
       <div className='reviewBox-footer'>
         <button className="oBtn marginBottomBtn" onClick={deleteReview}><BsTrash/></button>
       </div>
     </div>
  )
}

export default ReviewBox