import React, { useEffect, useState } from 'react';
import { VscAccount } from 'react-icons/vsc';
import style from '../css/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import OnModal from '../common/OnModal';
import LoginModal from './LoginModal';
import {call, getCookie} from '../common/ApiService';
import { signin } from './MemberFuc';
import Swal from 'sweetalert2';

const Login = (props) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const {setNotifications} = props;
  const [id,setId] = useState("");
  const [pwd,setPwd] = useState("");
  const [idSave, setIdSave] = useState(false);
  const [loginState, setLoginState] = useState(true);
  const clientId = '1921d336e78e0f12cb65133fb93aeab0';
  const clientUri = 'http://localhost:3000/login/auth';
  const KakaoLoginAPI = 'https://kauth.kakao.com/oauth/authorize?client_id='+clientId+'&redirect_uri='
                         +clientUri+'&response_type=code&prompt=login';

  useEffect(() => {
    const idCookie = getCookie('save_id');
    console.log('idCookie : ',idCookie);
    if(idCookie !== null || idCookie !== undefined) {
      setId(idCookie);
    }
  }, []);

  const showModal = () => {
    setModalOpen(true);
  }

  const saveId = (e) => {
    setId(e.target.value);
  }

  const savePwd = (e) => {
    setPwd(e.target.value);
  }

  const onChangeIdSave = () => {
    setIdSave(!idSave);
  }

  const onChangeLoginState = () => {
    setLoginState(!loginState);
  }

  const keyDownLogin = (e) => {
    if(e.key === 'Enter') {
      if(id !== null && pwd !== null && id !== '' && pwd !== '') {
        const loginDto = {
          email : id,
          password : pwd,
          loginState : loginState,
          socialYn : "N"
        };
    
        signin(loginDto,id,idSave);
      }
    }    
  }

  const logBtn = () => {
    const loginDto = {
      email : id,
      password : pwd,
      loginState : loginState,
      socialYn : "N"
    };

    signin(loginDto,id,idSave);

  }

  const openKakaoLogin = () => {
    // window.open(KakaoLoginAPI,'_self');
    console.log("여기?");
    window.location.reload(true);
    window.location.href =  KakaoLoginAPI;
  }

  return (
    <div className='container' id='login-container'>
      <div className='row g-3'>
        <div className='col-sm'></div>
        <div className='col-sm-4'>
          <div className='text-center mb-5'>
            {/* <p style={{ fontSize: '45px' }}>Login</p> */}
            <p id='loginTitle'>Jeju Made Travel</p>
          </div>
          <div class="input-group mb-3">
            <input type="id" className="form-control id" aria-label="Large"
              placeholder='아이디를 입력해주세요'
              value={id} onChange={saveId} onKeyDown={keyDownLogin}
              aria-describedby="inputGroup-sizing-default" />
          </div>
          <div class="input-group mb-2">
            <input type="password" className="form-control pw" aria-label="Large"
              onChange={savePwd} onKeyDown={keyDownLogin}
              placeholder='비밀번호를 입력해주세요'
              aria-describedby="inputGroup-sizing-default" />
          </div>
          <div className='mb-3'>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" onChange={onChangeIdSave} />
              <label class="form-check-label" for="inlineCheckbox1">아이디 저장</label>
            </div><div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" onChange={onChangeLoginState} checked={loginState} />
              <label class="form-check-label" for="inlineCheckbox1">로그인 상태 유지</label>
            </div>
          </div>
          <div className='mb-2'>
            <div class="d-grid gap-2">
              <button type="button" className="btn btn-outline-warning" onClick={logBtn}>로그인</button>
              <button type="button" className="btn btn-outline-warning" onClick={() => navigate('/joinUser')}>회원가입</button>
            </div>

            <div className=''>
              <button type="button" className="btn btn-outline-warning btn-sm" onClick={showModal}>아이디/비밀번호 찾기</button>
              {modalOpen && <LoginModal setModalOpen={setModalOpen}></LoginModal>}
              <button type="button" className="btn" onClick={openKakaoLogin}><img src="../images/kakao_login_small.png" alt="" /></button>
            </div>            
          </div>
        </div>
        <div className='col-sm'></div>
      </div>
    </div>
  );
};

export default Login;