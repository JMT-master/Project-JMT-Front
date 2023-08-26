import React from 'react'
import "../css/curator.css"

const ImageList = (props) => {
  return (
    <li key={props.number} className={props.className} 
    style={{borderRadius : "20px"}}>
      <img src={props.data !== null ? props.data : ""} alt={props.number} style={{borderRadius : "20px"}}></img>
      <p className='img-tag-hover'>{props.title}</p>
    </li>
  )
}

export default ImageList