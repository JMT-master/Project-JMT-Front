import React, { useState } from 'react';
import { styled } from 'styled-components';
import '../css/LoginModal.css'

const LoginModal = ({setModalOpen, id, title, content, writer}) => {
  const [moid, setMoid] = useState(false);
  const [mopwd, setMopwd] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

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
      <div className='modal-container'
      style={{width:'800px' , height:'500px'}}>
        <button className='modal-close' onClick={closeModal}>X</button>
        <input className='moid-name' type="text" placeholder='이름을 입력해주세요' />
        <input className='moid-tel' type="tel" placeholder='전화번호를 입력해주세요' />
        {/* <button className='acmodal-close' onClick={setActiveModal(null)}>뒤로 가기</button> */}
        <div className='moid-submit'><button>아이디 찾기</button></div>
      </div>
    )
  }
  const ModalPwd = () => {
    return (
      <div className='modal-container'
      style={{width:'800px' , height:'500px'}}>
        <button className='modal-close' onClick={closeModal}>X</button>
        <input className='mopwd-id' type="id" placeholder='아이디를 입력해주세요' />
        <input className='mopwd-email' type="email" placeholder='이메일을 입력해주세요' />
        {/* <button className='acmodal-close' onClick={setActiveModal(null)}>뒤로 가기</button> */}
        <div className='mopwd-submit'><button>비밀번호 찾기</button></div>
      </div>
    )
  }
  return (
    <div className='modal-container'>
      <button className='modal-close' onClick={closeModal}>X</button>
      <div className='modal-id'>
        <button style={{styledButton}} onClick={()=>openModalIdPwd('id')}>아이디를 찾으시겠습니까?</button>
      </div>
      <div className='modal-pwd'>
      <button style={{styledButton}} onClick={()=>openModalIdPwd('pwd')}>비밀번호를 찾으시겠습니까?</button>
      </div>
      {activeModal === 'id' && <ModalId />}
      {activeModal === 'pwd' && <ModalPwd />}
    </div>
  );
};

export default LoginModal;