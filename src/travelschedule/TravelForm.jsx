import React from 'react'
import "../css/travelForm.css"

const TravelForm = (props) => {
  return (
    <article className='travelForm-container'>
      <img className='travelForm-img' 
      src={props.data.repPhoto !== null ? props.data.repPhoto.photoid.imgpath : ''} alt=''></img>
      <div className='travelForm-etc'>
        <div className='travelForm-title'>{props.data.title}</div>
        <div className='travelForm-region'>{`${props.data.region1cd.label} > ${props.data.region2cd.label}`}</div>
        <button className='travelForm-btn'>일정추가</button>
      </div>
    </article>
  )
}

export default TravelForm