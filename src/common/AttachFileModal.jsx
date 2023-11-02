import React, { useState } from 'react'
import { useEffect } from 'react';

const AttachFileModal = ({imgModal,setImgModal,revData}) => {
  const [imgFlag, setImgFlag] = useState(0);

  useEffect(() => {
    const index = revData !== null && revData !== undefined && revData.originalName.lastIndexOf(".");
    const extension =  revData !== null && revData !== undefined && revData.originalName.substring(index+1);

    if(extension === 'jpg' || extension === 'jpeg' || extension === 'png' && extension === 'bmp' || 
    extension === "gif") {
      console.log("들어옴?");
      setImgFlag(1);
    }

    console.log(index, extension);
  },[]);

  console.log(revData);
  console.log(imgFlag)

  return (
    <div>
      {
      imgFlag === 1 ? <img className='attachFileModal-img' src={revData.data}></img> : <></>
      }
    </div>
  )
}

export default AttachFileModal