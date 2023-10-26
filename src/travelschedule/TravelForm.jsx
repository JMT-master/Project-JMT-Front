import React from 'react'
import "../css/travelForm.css"

const TravelForm = (props) => {
  if(props.data.dayImage === undefined || props.data.dayImage === null) {
    <article className='travelForm-container'>
        <img className='travelForm-img' alt=''></img>
        <div className='travelForm-etc'>
          <div className='travelForm-title'></div>
          <div className='travelForm-region'></div>
          <button className='travelForm-btn'></button>
        </div>
    </article>
  } else {
    return (
      <article className='travelForm-container'>
        <img className='travelForm-img' 
        src={(props.data.dayImage !== null && props.data.dayImage !== undefined) ? props.data.dayImage : ''} alt=''></img>
        <div className='travelForm-etc'>
          <div className='travelForm-title'>{props.data.dayTitle}</div>
          <div className='travelForm-region'>{`${props.data.dayRegion1} > ${props.data.dayRegion2}`}</div>
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