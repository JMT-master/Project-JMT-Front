import React from 'react'
import "../css/travelForm.css"

const TravelForm = (props) => {
  if(Number.isInteger(props.data)) {
    <article className='travelForm-container'>
        <img className='travelForm-img' alt=''></img>
        <div className='travelForm-etc'>
          <div className='travelForm-title'></div>
          <div className='travelForm-region'></div>
          <button className='travelForm-btn'></button>
        </div>
    </article>
  } else {
    if(props.tableArea) console.log("TravelForm : ", props.data.title);
    return (
      <article className='travelForm-container'>
        <img className='travelForm-img' 
        src={(props.data.repPhoto !== null && props.data.repPhoto !== undefined) ? props.data.repPhoto.photoid.imgpath : ''} alt=''></img>
        <div className='travelForm-etc'>
          <div className='travelForm-title'>{props.data.title}</div>
          <div className='travelForm-region'>{`${props.data.region1cd.label} > ${props.data.region2cd.label}`}</div>
          {
            props.tableArea === 0 ? <button className='travelForm-btn'
            onClick={props.addSchedule}
            value={props.index}
            >일정추가</button> : <span></span>
          }          
        </div>
      </article>
    )
  }

}

export default TravelForm