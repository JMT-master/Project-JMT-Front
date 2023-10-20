import React, { useState } from 'react';
import { VscAccount } from 'react-icons/vsc';
import style from '../css/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import OnModal from '../common/OnModal';
import LoginModal from './LoginModal';
import { signin } from '../common/ApiService';

const Login = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [id,setId] = useState("");
  const [pwd,setPwd] = useState("");

  const showModal = () => {
    setModalOpen(true);
  }

  const saveId = (e) => {
    setId(e.target.value);
  }

  const savePwd = (e) => {
    setPwd(e.target.value);
  }

  const [checkLogin, setCheckLogin] = useState(true);
  const logBtn = () => {
    let loginDto = {
      userid : id,
      password : pwd
    };

    const {userid, email, acessToken, refreshToken} = signin(loginDto);
    console.log("로그인 시 날아오는 데이터" + userid, email, acessToken, refreshToken);


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
          <Link to='/'><img src="../images/kakao-icon.png" alt="" /></Link>
          <Link to='/'><img src="../images/google-icon.png" alt="" /></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;