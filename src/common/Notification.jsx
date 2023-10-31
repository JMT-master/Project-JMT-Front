import React from 'react'
import '../css/Alarm.scss'
import {call} from "./ApiService";
import {BsTrash} from "react-icons/bs";

const NotificationList = ({notifications, setNotifications, modalOpen}) => {
  console.log("=================" + notifications)
  const makeNotificationList = () => {
    const notificationList = [];


    if (notifications != undefined && notifications[0] != null) {
      notifications.forEach((notification) => {
        notificationList.push(<Notification notification={notification} setNotifications={setNotifications}/>);
        notificationList.push(<hr/>);
      })
    } else {
      return <div className="notNotify">알림이 없습니다.</div>
      // notificationList.push(<Notification notification={{content: "알람이 없습니다.", url: null, yn: "y"}}/>)
    }
    return notificationList;
  }

  const deleteAllNotify = () => {
    call("/notification/all", "DELETE", null)
       .then(response => {
         setNotifications(response);
       })
  }


  return (
     <div className={modalOpen ? 'notificationContainer' : "notificationContainerHide"}>
       <div className="notificationBody">
         <div className='notificationHeader'>
           <h4>알림</h4>
           {/*  TODO : X버튼 만들기*/}
         </div>
         <div className='notificationContent'>
           {makeNotificationList()}
           {/*  TODO : alarm컴포넌트 구현, xx 글에 xx댓글 ,xx 댓글에 xx답글 달렸습니다 표시, 개별 삭제버튼, 가능하면 등록 시간과 현재 시간 차이 표시*/}
         </div>
         <div className='notificationFooter'>
           <button className={"oBtn"} onClick={deleteAllNotify}><BsTrash/></button>
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

  const readNotify = () => {
    call("/notification/isRead", "PUT", {
      id: id,
      content: content,
      url: url
    })
       .then(response => {
         setNotifications(response);
       })
  }

  // document.querySelector("#notifyContent").addEventListener("click", ()=>{
  //   read
  //   goUrl();
  //
  // })

  return (
     <div onClick={readNotify} className="notificationOne">
       <div id="notifyContent" className={yn == "y" ? "noRead" : "read"} onClick={() => {

         goUrl()
       }}>{content}</div>
       <button className={"oBtn notifyDeleteBtn"} onClick={deleteNotify}>X</button>
     </div>)
}
export default NotificationList
