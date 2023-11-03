import '../css/App.scss';
import moment from 'moment'
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import Moment from 'react-moment';
import { useInterval } from 'react-use';
import { deleteCookie } from '../common/ApiService';
import Swal from 'sweetalert2';
import { loginTimeUpdate } from './MemberFuc';


const LoginTimer = (props) => {
  const [leftTimes, setLeftTimes] = useState(moment().hour(0).minute(0).second(0));
  const intervalRef = useRef(); // useRef를 사용하여 interval을 저장

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 인터벌을 시작
    intervalRef.current = setInterval(() => {
      let minutes = moment(props.chkTime).diff(moment(), 'minutes');
      let seconds = (moment(props.chkTime).diff(moment(), 'seconds')) % 60;
      // console.log("props.chkTime : ", props.chkTime);

      let times = moment().hour(0).minute(minutes).second(seconds);
      setLeftTimes(times);
      if (minutes <= 0 && seconds <= 0) {
        console.log("들어옴?");
        console.log("비교 시간 : ", props.chkTime);
        console.log("현재 시간 : ", moment());
        console.log("seconds : ", seconds);
        console.log("minutes : ", minutes);
        clearInterval(intervalRef.current); // interval을 강제로 종료
        Swal.fire({
          icon : 'question',
          title: '로그아웃 되었습니다.',
          showCloseButton: true,
          confirmButtonText: '확인',
        }).then(() => {
          setLeftTimes(moment().hour(0).minute(0).second(0));
          if(sessionStorage.getItem('loginState') === false){
            sessionStorage.removeItem('loginTime');
          } else {
            localStorage.removeItem("loginTime");
          }
          
          deleteCookie('ACCESS_TOKEN');
          // navigate 사용시 시간이 0시0분0초로 남아있음
          window.location.href = '/';
        });
      }
    }, 1000);

    // 컴포넌트가 언마운트될 때 인터벌을 정리
    return () => {
      if (intervalRef.current) {
        console.log('intervalRef.current : ',intervalRef.current);
        clearInterval(intervalRef.current);
      }
    };
  }, [props.chkTime]);

  function loginExtension() {
    loginTimeUpdate();
  }

  return (
    <>
      <a className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`} style={{cursor : 'default'}}>
        <Moment format='HH:mm:ss'>{leftTimes}</Moment>
      </a>
      <button type='button' className='oBtn' value='시간연장' onClick={loginExtension}>시간연장</button>
    </>
  )
}

export default LoginTimer