import React from 'react'
import '../css/Alarm.scss'
import {call} from "./ApiService";

const NotificationList = ({notifications, setNotifications}) => {
  console.log("=================" + notifications)
  const makeNotificationList = () => {
    const notificationList = [];
    console.log(notifications == undefined)


    if (notifications != undefined && notifications[0] != null) {
      notifications.forEach((notification) => {
        notificationList.push(<Notification notification={notification} setNotifications={setNotifications}/>);
      })
    } else {
      return <div>알람이 없습니다.1</div>
      // notificationList.push(<Notification notification={{content: "알람이 없습니다.", url: null, yn: "y"}}/>)
    }
    console.log("notificationList" + notificationList)
    return notificationList;
  }


  return (<div className='notificationContainer'>
    <div className="notificationBody">
      <div className='notificationHeader' style={{border:"1px black solid"}}>
        새 알림
        {/*  TODO : X버튼 만들기*/}
      </div>
      <div className='notificationContent'>
        {makeNotificationList()}
        {/*  TODO : alarm컴포넌트 구현, xx 글에 xx댓글 ,xx 댓글에 xx답글 달렸습니다 표시, 개별 삭제버튼, 가능하면 등록 시간과 현재 시간 차이 표시*/}
      </div>
      <div className='alarmFooter' style={{border:"1px black solid"}}>
        {/*  TODO : 전체삭제 버튼, 전체 알람 확인으로 변경, 다른 장소 누르면 닫기*/}
      </div>
    </div>
  </div>)
}


const Notification = ({notification, setNotifications}) => {
  const {id, content, url, yn} = notification;
  const goUrl = () => {
    // eslint-disable-next-line no-restricted-globals
    location.href = url;
  }
  const deleteNotify = () => {
    call("/notification", "DELETE", {id: id})
       .then(response => {
         call("/notification", "POST", null)
            .then(response => {
              setNotifications(response);
            })
       })
  }
  return (
     <div>
       <div onClick={goUrl}>{content}</div>
       <button className={"notifyDeleteBtn"} onClick={deleteNotify}>삭제</button>
     </div>)
}
export default NotificationList
