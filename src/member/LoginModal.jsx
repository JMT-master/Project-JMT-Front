import React, { useState } from 'react';
import { styled } from 'styled-components';
import '../css/LoginModal.css'
import {AiOutlineArrowLeft} from 'react-icons/ai'

const LoginModal = ({setModalOpen, id, title, content, writer}) => {
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
    return (
      <div className='modal-container-click'>
        <input className='moid-name' type="text" placeholder='이름을 입력해주세요' />
        <input className='moid-tel' type="tel" placeholder='전화번호를 입력해주세요' />
        <input className='moid-result' type='text' value='abcd' readOnly></input>
        <button className='moid-submit'>아이디 찾기</button>
      </div>
    )
  }
  const ModalPwd = () => {
    return (
      <div className='modal-container-click'
      style={{width:'400px' , height:'400px'}}>
        <input className='mopwd-id' type="id" placeholder='아이디를 입력해주세요' />
        <input className='moid-tel' type="id" placeholder='이메일 인증' />
        <button className='mopwd-submit'>인증번호 전송</button>
      </div>
    )
  }
  return (
    <div className='modal-container'>
      <AiOutlineArrowLeft className='modal-close' onClick={closeModal}>X</AiOutlineArrowLeft>
      <h2 className='modal-title'>아이디 / 비밀번호 찾기</h2>
      <div className='modal-btn'>
        <div>
          <button className={`modal-btn-id ${activeModal === 'id' ? 'modal-btn-click' : ''}`} style={{styledButton}} onClick={()=>openModalIdPwd('id')}>아이디 찾기</button>
        </div>
        <div>
        <button  className={`modal-btn-pwd ${activeModal === 'pwd' ? 'modal-btn-click' : ''}`} style={{styledButton}} onClick={()=>openModalIdPwd('pwd')}>비밀번호 찾기</button>
        </div>
      </div>
      <div className='modal-container-etc'></div>
      {activeModal === 'id' && <ModalId />}
      {activeModal === 'pwd' && <ModalPwd />}
    </div>
  );
};

export default LoginModal;