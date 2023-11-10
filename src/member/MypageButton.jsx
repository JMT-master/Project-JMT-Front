import React from 'react'
import { call } from '../common/ApiService';
import { selectMyTravelScehdule, selectTravelDes, selectWishTravelScehdule } from './MypageApi';

// 마이페이지의 모든 탭에 있는 데이터를 삭제할 수 있는 공통버튼
const MypageButton = (props) => {

  function allDeleteButton(){
    //나의 일정 삭제
    const dto={
      travelId : props.data.travelId,
    }
    console.log(dto);
    if(props.data.travelId){
      call("/travel/myTpsDelete", "POST",
      dto
      ).then((response) => {
        alert("삭제되었습니다.");
        selectMyTravelScehdule().then(data => props.setMyTravelItem(data));
      })
      .catch((error) => {
        console.log(error);
      })
    }
    //찜한 일정 삭제
    else if(props.data.wishGubun === 'tps'){
      const dto = {
        wishId :props.data.wishId,
        wishTravelId:props.data.wishTravelId
      }
      call("/wish/wishTpsDelete", "POST",
      dto
      ).then((response) => {
        alert("삭제되었습니다.");
        selectWishTravelScehdule().then(data => props.setMyTravelItem(data));
      })
      .catch((error) => {
        console.log(error);
      })
    }
    //찜한 여행지 삭제
    else if(props.data.wishGubun === 'tdn'){
      const dto ={
        wishId : props.data.wishId
      }
      call("/wish/wishTdnDelete", "POST",
      dto
      ).then((response) => {
        alert("삭제되었습니다.");
        selectTravelDes().then(data => props.setMyTravelItem(data));
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }


  return (
    <div>
        <button type="submit" className="oBtn" onClick={() => allDeleteButton()}>삭제</button>
    </div>
  )
}

export default MypageButton