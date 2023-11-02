import React, { useEffect, useState } from 'react';
import { VscAccount } from 'react-icons/vsc';
import style from '../css/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import OnModal from '../common/OnModal';
import LoginModal from './LoginModal';
import {call, getCookie, sseSource} from '../common/ApiService';
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
                         +clientUri+'&response_type=code';

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
          loginState : loginState
        };
    
        signin(loginDto,id,idSave);
      }
    }    
  }

  const logBtn = () => {
    const loginDto = {
      email : id,
      password : pwd,
      loginState : loginState
    };

    signin(loginDto,id,idSave);

  }

  const openKakaoLogin = () => {
    // window.open(KakaoLoginAPI,'_self');
    window.location.href = KakaoLoginAPI;
  }

  return (
    <div className='login-content'>
      <div className='login-title'>
        <h1>로그인</h1>
        <p style={{ fontSize: 'large' }}>로그인하시면 다양한 기능을 사용할 수 있습니다.</p>
      </div>
      <div className='login-active'>
        <div className='img'><img src="../images/JMT.jpg" alt="jmt아이콘" 
        style={{ marginTop: '50px', }} /></div>
        <div className='id-pw'>
          <p ><input type="id" className='id' placeholder='아이디를 입력해주세요' value={id} onChange={saveId} onKeyDown={keyDownLogin} /></p>
          <p ><input type="password" className='pw' placeholder='비밀번호를 입력해주세요' onChange={savePwd} onKeyDown={keyDownLogin} /></p>
        </div>
        {/* <p className='id-save'>아이디 저장<input type="checkbox" onChange={onChangeIdSave} /></p> */}
        <div className='form-check' style={{width : '120px'}}>          
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
            onChange={onChangeIdSave} />
            <label class="form-check-label id-save" for="flexCheckDefault" style={{width:'120px', textAlign : 'start'}}>
              아이디 저장
            </label>
        </div>
        <div className='form-check'>
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked = {loginState}
            onChange={onChangeLoginState} />
            <label class="form-check-label" for="flexCheckDefault" style={{width:'130px', textAlign : 'start'}}>
              로그인 상태 유지
            </label>
        </div>
        <p className='login-btn' onClick={logBtn}>로그인</p>
        <p className='membership' onClick={()=>navigate('/joinUser')}><button>회원가입</button></p>
        <p className='memberCheck'><button onClick={showModal}>아이디/비밀번호찾기</button>
          {modalOpen && <LoginModal setModalOpen={setModalOpen}></LoginModal>}
        </p>
        <div className='sns-login'>
          <button className='sns-login-kakao' onClick={openKakaoLogin}><img src="../images/kakao-icon.png" alt="" /></button>
          <Link to='/'><img src="../images/google-icon.png" alt="" /></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;