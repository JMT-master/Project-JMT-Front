import '../css/App.scss';
import moment from 'moment'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Moment from 'react-moment';
import { useInterval } from 'react-use';


const LoginTimer = (props) => {
  console.log('props : ', props);

  const time = props.loginTime && moment(props.loginTime); 
  console.log('time : ', time);
  const [leftTime,setLeftTime] = useState();
  console.log('leftTime : ', leftTime);

  useEffect(() => {
    console.log("들어옴?");
    if(localStorage.getItem("checkTime")) {
      setLeftTime(moment(localStorage.getItem("checkTime")));
    }
    
  },[]);

  // useInterval(() => {
  //   console.log("???????");
  //   console.log('leftTime : ', leftTime);
  //   console.log('leftTime : ', typeof(leftTime));
  //   setLeftTime(leftTime.subtract(1, 'seconds'));
    
  // }, 1000)

  console.log(props.theme);

  return (
    <>
      <a className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`} href='/'>
        <Moment format='HH:mm:ss'>{leftTime}</Moment>
      </a>
      <button type='button' className='oBtn' value='시간연장'>시간연장</button>
    </>
  )
}

export default LoginTimer