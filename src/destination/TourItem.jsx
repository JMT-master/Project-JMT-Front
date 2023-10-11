import React from 'react'
import {MdOutlineFindInPage} from 'react-icons/md'

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

  return (
    <li className={`${pageType}-itemGrid`} onClick={()=>{
      // onNav();
      onSetGps();
      }}>
      <div className={`${pageType}-itemGrid-img`}>
        <img src={photo.photoid.thumbnailpath} alt={photo.descseo} width={'200px'} height={'100px'} />
      </div>
      <div className={`${pageType}-itemGrid-content`}>
        <h3><span>{spot.title}</span><button className='oBtn sf ra' onClick={()=>{onNav()}}><MdOutlineFindInPage/></button></h3>
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