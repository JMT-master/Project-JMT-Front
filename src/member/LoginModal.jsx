import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import '../css/LoginModal.css'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { call } from '../common/ApiService';
import axios from 'axios';
import { API_BASE_URL } from '../common/ApiConfig';

const LoginModal = ({ setModalOpen, id, title, content, writer }) => {
  const [moid, setMoid] = useState(false);
  const [mopwd, setMopwd] = useState(false);
  const [activeModal, setActiveModal] = useState("id");

  const closeModal = () => {
    setModalOpen(false);
  };
  const styledButton = styled.button`
    font-size: 1rem;
    line-height:1.5;
    padding:10px;
  `;
  const openModalIdPwd = (value) => {
    setActiveModal(value);
    // setModalOpen(false);
  }

  const ModalId = () => {
    const [username, setUserName] = useState();
    const [phone, setPhone] = useState();
    const [userId, setUserId] = useState();

    const findUserId = (e) => {
      e.preventDefault();
      const idFindDto = {
        username: username,
        phone: phone
      };
      axios({
        method: "POST",
        url: API_BASE_URL + "/findUserId",
        headers: {
          "Content-Type": "application/json",
        },
        data: idFindDto
      })
        .then((response) => {
          console.log("response : " + response.data);
          setUserId(response.data);
        })
    }
    const onChangeUserName = (e) => {
      setUserName(e.target.value);
    }
    const onChangePhone = (e) => {
      setPhone(e.target.value);
    }
    return (
      <div className='modal-container-click'>
        <input className='moid-name' type="text" value={username} onChange={onChangeUserName}
          placeholder='이름을 입력해주세요' />
        <input className='moid-tel' type="tel" value={phone} onChange={onChangePhone}
          placeholder='전화번호를 입력해주세요' />
        <input 
        className='moid-result' type='text' id='userId' 
        value={userId === undefined ? "" : "아이디 : "+userId}
        readOnly></input>
        <button className='moid-submit' onClick={findUserId}>아이디 찾기</button>
      </div>
    )
  }
  const ModalPwd = () => {
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();

    const onChangeUserName = (e) => {
      setUserName(e.target.value);
    }
    const onChangeEmail = (e) => {
      setEmail(e.target.value);
    }
    const sendEmailCode = (e) => {
      e.preventDefault();
      const sendEmailDto = {
        username: username,
        email: email
      };
      axios({
        method: "POST",
        url: API_BASE_URL + "/sendEmailCode",
        headers: {
          "Content-Type": "application/json",
        },
        data: sendEmailDto
      })
        .then((response) => {
          console.log("response : " + response.data);
        })
    }
    return (
      <div className='modal-container-click'
        style={{ width: '400px', height: '400px' }}>
        <input className='mopwd-id' type="id" value={username} onChange={onChangeUserName} placeholder='이름을 입력해주세요' />
        <input className='moid-tel' type="id" value={email} onChange={onChangeEmail} placeholder='아이디를 입력해주세요' />
        <button className='mopwd-submit' onClick={sendEmailCode}>인증번호 전송</button>
      </div>
    )
  }
  return (
    <div className='modal-container'>
      <AiOutlineArrowLeft className='modal-close' onClick={closeModal}>X</AiOutlineArrowLeft>
      <h2 className='modal-title'>아이디 / 비밀번호 찾기</h2>
      <div className='modal-btn'>
        <div>
          <button className={`modal-btn-id ${activeModal === 'id' ? 'modal-btn-click' : ''}`} style={{ styledButton }} onClick={() => openModalIdPwd('id')}>아이디 찾기</button>
        </div>
        <div>
          <button className={`modal-btn-pwd ${activeModal === 'pwd' ? 'modal-btn-click' : ''}`} style={{ styledButton }} onClick={() => openModalIdPwd('pwd')}>비밀번호 찾기</button>
        </div>
      </div>
      <div className='modal-container-etc'></div>
      {activeModal === 'id' && <ModalId />}
      {activeModal === 'pwd' && <ModalPwd />}
    </div>
  );
};

export default LoginModal;