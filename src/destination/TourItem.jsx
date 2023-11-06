import React from 'react'
import { AiOutlineStar } from 'react-icons/ai';
import {MdOutlineFindInPage} from 'react-icons/md'
import { call } from '../common/ApiService';

const TourItem = ({ spot, pageType, nav, setGps }) => {
  const photo = spot.repPhoto;
  const onSetGps = () =>{
    setGps({
      lat : spot.latitude,
      lng : spot.longitude,
      contentsid: spot.contentsid,
      title: spot.title,
      img: photo.photoid.imgpath,
      tag: spot.tag,
      address: spot.address,
      phoneno: spot.phoneno,
      content: spot.introduction,
    })
  }

  const onNav = () => {
    nav(`/destination/detail/${spot.contentsid}`, {
      state: {
        title: spot.title,
        img: photo.photoid.imgpath,
        tag: spot.tag,
        address: spot.address,
        phoneno: spot.phoneno,
        content: spot.introduction,
      }
    })
  }

  const wishTdnInsert = () => {
    const photo = spot.repPhoto;
    let dto ={
      wishTitle : spot.title,
      wishApiId : spot.contentsid,
      wishImg : photo.photoid.imgpath,
      wishGubun : 'tdn',
      address:spot.address,
      phoneno:spot.phoneno,
      content:spot.introduction,
      tag:spot.tag
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

  return (
    <li className={`${pageType}-itemGrid`} onClick={()=>{
      // onNav();
      if(pageType !=='grid'){onSetGps()}
      }}>
      <div className={`${pageType}-itemGrid-img`}>
        <img src={photo.photoid.thumbnailpath} alt={photo.descseo} width={'200px'} height={'100px'} />
      </div>
      <div className={`${pageType}-itemGrid-content`}>
        <h3>
          <span>{spot.title}</span>
          <button className='oBtn sf ra' onClick={()=>{onNav()}}><MdOutlineFindInPage/></button>
          <button className='oBtn sf ra' onClick={()=>{wishTdnInsert()}}><AiOutlineStar/></button>
        </h3>
        <div className={`${pageType}-itemGrid-contentText`}>
          <p className='sf'>{spot.region1cd.label} > {spot.region2cd.label}</p>
          <p className={`${pageType}-itemGrid-contentText-tag sf`}>{spot.tag.replace(/, /gi, ',').split(',').map(tag => ('#' + tag + ' '))}</p>
          <p className={`${pageType}-itemGrid-contentText-text`}>{spot.introduction}</p>
        </div>

      </div>
    </li>
  )
}

export default TourItem