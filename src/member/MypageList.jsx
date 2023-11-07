import React from "react";
import "../css/myPage.css";
import { useNavigate } from "react-router-dom";
import TravelPdf from "../travelschedule/TravelPdf";

const MypageList = (props) => {
  console.log("props.gubun", props.gubun);
  const nav = useNavigate();
  
  function goToNav(index) {
    const id = props.data.travelId;
    const wishTravelId = props.data.wishTravelId;
    if(index == 0){
      nav(`/travelSchedule/?id=${id}`)
    }else if(index == 1){
      nav(`/travelSchedule/?id=${wishTravelId}`)
    }else{
      nav(`/destination/detail/${props.data.wishApiId}`, {
        state: {
          title: props.data.wishTitle,
          img: props.data.wishImg,
          address: props.data.address,
          phoneno: props.data.phoneno,
          content: props.data.content,
          tag: props.data.content,
        },
      });
    }
  }

  return (
<li className="myPage-Big-Image-li">
    {props.gubun === 0 ? (
      //나의 일정
      <div className="image-container" onClick={() => goToNav(0)}>
        <div className="image-overlay"></div>
        <img className="myPage-Big-Image-li-img" src={props.data.dayImage} alt={props.data.travelTitle}></img>
        <p className="myPage-Big-Image-li-img-hover">{props.data.travelTitle}</p>
      </div>
    ) : props.gubun === 1 ? (
      //찜한 일정
      <div className="image-container" onClick={() => goToNav(1)}>
        <div className="image-overlay"></div>
        <img className="myPage-Big-Image-li-img" src={props.data.wishImg} alt={props.data.wishTitle}></img>
        <p className="myPage-Big-Image-li-img-hover">{props.data.wishTitle}</p>
      </div>
    ) : (
      //찜한 여행지
      <div className="image-container" onClick={() => goToNav(2)}>
        <div className="image-overlay"></div>
        <img className="myPage-Big-Image-li-img" src={props.data.wishImg} alt={props.data.wishTitle}></img>
        <p className="myPage-Big-Image-li-img-hover">{props.data.wishTitle}</p>
      </div>
    )}
    <div>
      <TravelPdf data={props.data} />
    </div>
  </li>
  );
};

export default MypageList;
