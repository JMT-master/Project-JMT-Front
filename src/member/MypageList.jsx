import React from 'react'
import '../css/myPage.css'

const MypageList = (props) => {
  return (
    <li className='myPage-Big-Image-li'>
      {/* <img className='myPage-Big-Image-li-img' src={props.data.repPhoto !== null ? props.data.repPhoto.photoid.imgpath : ""} alt={props.data.title}></img> */}
      <img className='myPage-Big-Image-li-img' src={props.data.dayImage} alt={props.data.travelTitle}></img>
      <p className='myPage-Big-Image-li-img-hover'>{props.data.travelTitle}</p>
    </li>
  )
}

export default MypageList