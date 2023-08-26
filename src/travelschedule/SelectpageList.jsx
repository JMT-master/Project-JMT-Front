import React from 'react'
import '../css/schedule.css'

const SelectpageList = (props) => {
  return (
    <li className='selectImage-li'>
      <img className='selectImage-li-img' src={props.data.repPhoto !== null ? props.data.repPhoto.photoid.imgpath : ""} alt={props.data.title}></img>
      <p className='selectImage-li-img-hover'>{props.data.title}</p>
    </li>
  )
}

export default SelectpageList