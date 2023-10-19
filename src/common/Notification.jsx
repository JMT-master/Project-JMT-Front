import React from 'react'
import '../css/Alarm.scss'

const AlarmList = () => {
  return (
     <div className='alarmContainer'>
       <div className="alarmBody">
         <div className='alarmHeader'>
           새 알림
           {/*  TODO : X버튼 만들기*/}
         </div>
         <div className='alarmContent'>
           {/*  TODO : alarm컴포넌트 구현, xx 글에 xx댓글 ,xx 댓글에 xx답글 달렸습니다 표시, 개별 삭제버튼, 가능하면 등록 시간과 현재 시간 차이 표시*/}
         </div>
         <div className='alarmFooter'>
           {/*  TODO : 전체삭제 버튼, 전체 알람 확인으로 변경, 다른 장소 누르면 닫기*/}
         </div>
       </div>
     </div>
  )
}
export default AlarmList
