import React from 'react'
import "../css/curator.css"
import { AiOutlineStar } from 'react-icons/ai'
import { call } from '../common/ApiService'

const ImageList = (props) => {

  const wishTdnInsert = () => {
    console.log("ddddd");
    const photo = props.data.repPhoto;
    let dto ={
      wishTitle : props.data.title,
      wishApiId : props.data.contentsid,
      wishImg : photo && photo.photoid.imgpath,
      wishGubun : 'tdn',
      address:props.data.address,
      phoneno:props.data.phoneno,
      content:props.data.introduction,
      tag:props.data.tag
    }
    console.log("dto",dto);
    call("/wish/wishTdnInsert","POST",
    dto
    ).then((response) => {
      console.log("responseWishData : ",response.data);
    })
    .catch((error) => {
      console.log("wishTdnInsertErr",error);
    })
  }

  function wishTpsInsert(){
    console.log("ddddd");
    // const photo = props.data.repPhoto;
    let dto ={
      wishTitle : props.data.travelTitle,
      wishTravelId : props.data.travelId,
      wishImg : props.data.dayImage,
      wishGubun : 'tps',
    }
    console.log("dto",dto);
    call("/wish/wishTpsInsert","POST",
    dto
    ).then((response) => {
      console.log("responseWishData : ",response.data);
    })
    .catch((error) => {
      console.log("wishTdnInsertErr",error);
    })
  }

  console.log('props.data.dayImage : ', props.data.dayImage);

  return (
    <>
      {
        props.data.dayImage === null || props.data.dayImage === undefined ?
          <li key={props.number} className={props.className} style={{ borderRadius: "20px", position: "relative" }}>
              <div style={{ position: "relative" }}>
                <button style={{ position: "absolute", top: "10px", left: "10px", zIndex: '9999' }} className='oBtn sf ra' onClick={() => wishTdnInsert()}><AiOutlineStar /></button>
                {/* <button style={{ position: "absolute", top: "10px", left: "10px", zIndex: '9999' }} className='converse-oBtn sf ra' onClick={() => wishTdnInsert()}><AiOutlineStar /></button> */}
              </div>
              <img src={props.data !== null ? props.data : ""} alt={props.number} style={{ borderRadius: "20px" }}></img>
              <p className='img-tag-hover'>{props.title}</p>
          </li> :
          <li key={props.number} className={props.className} style={{ borderRadius: "20px", position: "relative" }}>
              <div style={{ position: "relative" }}>
                <button style={{ position: "absolute", top: "10px", left: "10px", zIndex: '9999' }} className='oBtn sf ra' onClick={() => { wishTpsInsert() }}><AiOutlineStar /></button>
              </div>
              <img src={props.data.dayImage} alt={props.data.travelTitle} style={{ borderRadius: "20px" }}></img>
              <p className='img-tag-hover'>{props.data.travelTitle}</p>
          </li>
      }
    </>
  );
}

export default ImageList