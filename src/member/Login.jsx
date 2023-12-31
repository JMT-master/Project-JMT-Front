import React, { useState } from 'react';
import { VscAccount } from 'react-icons/vsc';
import style from '../css/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import OnModal from '../common/OnModal';
import LoginModal from './LoginModal';
import {call, sseSource} from '../common/ApiService';
import { signin } from './MemberFuc';

const Login = (props) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const {setNotifications} = props;
  const [id,setId] = useState("");
  const [pwd,setPwd] = useState("");
  const clientId = '1921d336e78e0f12cb65133fb93aeab0';
  const clientUri = 'http://localhost:3000/login/auth';
  const KakaoLoginAPI = 'https://kauth.kakao.com/oauth/authorize?client_id='+clientId+'&redirect_uri='
                         +clientUri+'&response_type=code';

  const showModal = () => {
    setModalOpen(true);
  }

  const saveId = (e) => {
    setId(e.target.value);
  }

  const savePwd = (e) => {
    setPwd(e.target.value);
  }

  const logBtn = () => {
    const loginDto = {
      userid : id,
      password : pwd
    };

    signin(loginDto);

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
          <p ><input type="id" className='id' placeholder='아이디를 입력해주세요' onChange={saveId} /></p>
          <p ><input type="password" className='pw' placeholder='비밀번호를 입력해주세요' onChange={savePwd} /></p>
        </div>
        <p className='id-save'>아이디 저장 <input type="checkbox" /></p>
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