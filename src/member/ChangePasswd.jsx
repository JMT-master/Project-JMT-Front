import React, { useEffect, useRef } from 'react'
import { API_BASE_URL } from '../common/ApiConfig'
import { useState } from 'react'
import { LoadCanvasTemplate } from 'react-simple-captcha';
import Captcha from './Captcha';

const ChangePasswd = () => {
  const [result, setResult] = useState('');
  const inputRef = useRef(null);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    console.log("ChangePasswd???");

  },[inputRef.current]);

  // const getImage = (e) => {
  //   e.preventDefault();
  //   let url = API_BASE_URL+'/changepw/captchaImg';
  //   document.getElementById('captchaImg').setAttribute("src", url);
  // }

  // const captchaValidate = () => {
  //   const url = API_BASE_URL + "/changepw/validate?result=" + result;
  //   fetch(url, {
  //     method : 'POST',
  //     headers: {"Content-Type": "application/json"}
  //   }).then(result => {
  //     console.log('result : ', result);
  //   });

  // }

  // const chnResult = (e) => {
  //   setResult(e.target.value);
  // }

  // const chnImg = () => {
  //   console.log("바뀜?>??");
  // }

  return (
    <div className='container-sm'>
      <div className="row g-3">
        <div className="col-sm"></div>

        <div className="col-sm-4">
          <h2 className='mb-5'>비밀번호 변경</h2>
          <div className="form-floating">
            <input type="password" className="form-control mb-3" id="floatingPassword" placeholder="현재 비밀번호" />
            <label for="floatingPassword">현재 비밀번호</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control mb-3" id="floatingPassword" placeholder="새 비밀번호" />
            <label for="floatingPassword">새 비밀번호</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control mb-5" id="floatingPassword" placeholder="새 비밀번호 확인" />
            <label for="floatingPassword">새 비밀번호 확인</label>
          </div>
          <div className='mb-5'>
            <Captcha setConfirm = {setConfirm} confirm = {confirm}></Captcha>
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-outline-warning btn-lg" type="button">확인</button>
            <button className="btn btn-outline-warning btn-lg" type="button">취소</button>
          </div>


        </div>

        <div className="col-sm"></div>
      </div>
      {/* <img id='captchaImg' title='캡차이미지' src={API_BASE_URL+'/changepw/captchaImg'} onChange={chnImg}></img>
                <button ref={inputRef} onClick={getImage}>새로고침</button>
                <input value={result} onChange={chnResult}></input>
                <button onClick={captchaValidate}>문자 확인</button> */}
                
    </div>
  )
}

export default ChangePasswd