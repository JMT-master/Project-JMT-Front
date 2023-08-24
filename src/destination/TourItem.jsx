import React from 'react'

const TourItem = ({spot,pageType,navigate}) => {
  const photo = spot.repPhoto;
  
  const onNav = () =>{
    navigate(`/destination/detail/${spot.contentsid}`,{
      state : {
        title : spot.title,
        img : photo.photoid.imgpath,
        tag : spot.tag,
        address : spot.address,
        phoneno : spot.phoneno,
        content : spot.introduction,
      }
    })
  }

  return (
    <li className={`${pageType}-itemGrid`} onClick={onNav}>
      <div className={`${pageType}-itemGrid-img`}>
        <img src={photo.photoid.thumbnailpath} alt={photo.descseo} width={'200px'} height={'100px'}/>
      </div>
      <div className={`${pageType}-itemGrid-content`}>
        <h4>{spot.title}</h4>
        <p>{spot.region1cd.label} > {spot.region2cd.label}</p>
        <p>{spot.tag.replace(/, /gi, ',').split(',').map(tag => ('#' + tag + ' '))}</p>
      </div>
    </li>
  )
}

export default TourItem