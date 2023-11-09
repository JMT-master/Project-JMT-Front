import '../css/App.scss';
import moment from 'moment'
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import Moment from 'react-moment';
import { useInterval } from 'react-use';
import { call, deleteCookie, getCookie, getLocal } from '../common/ApiService';
import Swal from 'sweetalert2';
import { loginTimeUpdate } from './MemberFuc';


const LoginTimer = (props) => {
  const [leftTimes, setLeftTimes] = useState(moment().hour(0).minute(0).second(0));
  const [loginId, setLoginId] = useState();
  const intervalRef = useRef(); // useRef를 사용하여 interval을 저장

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 인터벌을 시작
    intervalRef.current = setInterval(() => {
      let minutes = moment(props.chkTime).diff(moment(), 'minutes');
      let seconds = (moment(props.chkTime).diff(moment(), 'seconds')) % 60;

      let times = moment().hour(0).minute(minutes).second(seconds);
      setLeftTimes(times);
      if (minutes <= 0 && seconds <= 0) {
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
        clearInterval(intervalRef.current);
      }
    };
  }, [props.chkTime]);

  useEffect(() => {
    if(getCookie('ACCESS_TOKEN') !== undefined && getCookie('ACCESS_TOKEN') !== null) {
      call('/login/info?socialYn=' + getLocal('social'),'GET')
      .then(response => setLoginId(response.data[0]));
    }
  }, [getCookie('ACCESS_TOKEN')]);

  function loginExtension() {
    loginTimeUpdate();
  }

  return (
    <>
      <a href='#' className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`} style={{cursor : 'default'}}>{loginId}</a>
      <a href='#' className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`} style={{cursor : 'default'}}>
        <Moment format='HH:mm:ss'>{leftTimes}</Moment>
      </a>
      <button type='button' className='oBtn' value='시간연장' onClick={loginExtension}>시간연장</button>
    </>
  )
}

export default LoginTimer