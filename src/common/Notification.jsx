import React from 'react'
import '../css/Alarm.scss'
import {call} from "./ApiService";
import {BsTrash} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

const NotificationList = ({notifications, setNotifications, modalOpen}) => {
  const navigate = useNavigate();
  console.log("=================" + notifications)
  const makeNotificationList = () => {
    const notificationList = [];


    if (notifications != undefined && notifications[0] != null) {
      notifications.forEach((notification) => {
        notificationList.push(<Notification notification={notification} setNotifications={setNotifications} navigate={navigate}/>);
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
         </div>
         <div className='notificationContent'>
           {makeNotificationList()}
         </div>
         <div className='notificationFooter'>
           <button className="oBtn marginBottomBtn" onClick={deleteAllNotify}><BsTrash/></button>
         </div>
       </div>
     </div>)
}


const Notification = ({notification, setNotifications, navigate}) => {
  const {id, content, url, yn} = notification;
  // const pattern = /\/knowledgeDetail\/(\d+)/;
  // const match = url.match(pattern);
  // console.log("--------------match : " + match[1])
  const goUrl = (url) => {
    // eslint-disable-next-line no-restricted-globals
    console.log("myurl = " + url)
    navigate(url);
    // window.location.href = url;
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
       <div id="notifyContent" className={yn == "Y" ? "noRead" : "read"} onClick={() => {
         goUrl(url);
       }}>{content}</div>
       <button className={"oBtn notifyDeleteBtn"} onClick={deleteNotify}>X</button>
     </div>)
}
export default NotificationList
