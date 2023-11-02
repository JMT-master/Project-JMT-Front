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


const LoginTimer = (props) => {
  const [leftTimes, setLeftTimes] = useState(moment().hour(0).minute(0).second(0));
  const intervalRef = useRef(); // useRef를 사용하여 interval을 저장

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 인터벌을 시작
    intervalRef.current = setInterval(() => {
      let minutes = moment(props.chkTime).diff(moment(), 'minutes');
      let seconds = (moment(props.chkTime).diff(moment(), 'seconds')) % 60;

      let times = moment().hour(0).minute(minutes).second(seconds);
      setLeftTimes(times);
      if (!localStorage.getItem("loginTime") || seconds < 0) {
        setLeftTimes(moment().hour(0).minute(0).second(0));
        localStorage.removeItem("loginTime");
        deleteCookie('ACCESS_TOKEN');
        clearInterval(intervalRef.current); // interval을 강제로 종료
      }
    }, 1000);

    // 컴포넌트가 언마운트될 때 인터벌을 정리
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        Swal.fire({
          icon: 'info',
          title: '로그아웃',
          text: '로그아웃 시간이 만료하였습니다.'
        }).then(() =>
          window.location.href("/")
        );
      }
    };
  }, [props.chkTime]);

  function loginExtension() {

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