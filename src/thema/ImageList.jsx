import React from 'react'
import "../css/curator.css"
import { AiOutlineStar } from 'react-icons/ai'

const ImageList = (props) => {

  function wishTdnInsert(){

  }
  return (
    
    
    <li key={props.number} className={props.className} style={ {borderRadius: "20px", position: "relative"} }>
      <div style={{ position: "relative" }}>
        <button  style={{ position: "absolute", top: "10px", left: "10px", zIndex:'9999' }} className='oBtn sf ra' onClick={()=>{wishTdnInsert()}}><AiOutlineStar/></button>
      </div>
      <img src={props.data !== null ? props.data : ""} alt={props.number} style={{borderRadius : "20px"}}></img>
      <p className='img-tag-hover'>{props.title}</p>
    </li>
    
    // <li key={props.number} className={props.className} style={{ borderRadius: "20px", position: "relative" }}>
    //   <div className="image-container" style={{ position: "relative" }}>
    //     <button
    //       style={{ position: "absolute", top: "10px", left: "10px" }}
    //       className='oBtn sf ra'
    //       onClick={() => { wishTdnInsert() }}
    //     >
    //       <AiOutlineStar />
    //     </button>
    //     <img src={props.data !== null ? props.data : ""} alt={props.number} style={{ borderRadius: "20px" }} />
    //     <p className='img-tag-hover'>{props.title}</p>
    //   </div>
    // </li>
  );
}

export default ImageList