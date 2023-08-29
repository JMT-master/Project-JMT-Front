import React from 'react'
import '../css/myPage.css'

const MypageList = (props) => {
  return (
    <li className='myPage-Big-Image-li'>
      <img className='myPage-Big-Image-li-img' src={props.data.repPhoto !== null ? props.data.repPhoto.photoid.imgpath : ""} alt={props.data.title}></img>
      <p className='myPage-Big-Image-li-img-hover'>{props.data.title}</p>
    </li>
  )
}

export default MypageList