import React, { useState } from 'react';
import style from '../css/OnModal.css'

const CheckBox = ({children, disabled, checked, onChange}) => {
  return(
    <label>
      <input type="checkbox"
      disabled={disabled} checked={checked} 
      onChange={({target:{checked}})=>{onChange(checked)}} />
      {children}
    </label>
  )
}

const OnModal = ({setModalOpen, id, title, content, writer}) => {
  const closeModal = () => {
    setModalOpen(false);
  };
  const [protect, setProtect] = useState(false);

  return (
    <div className='modal-container'>
      <button className='modal-close' onClick={closeModal}>X</button>
        <div className='answer-writer'>
          <p className='name'>답변 작성자 이름</p>
        </div>
        <div className='answer-content'>
          <textarea cols="60" rows="20" className='answer-inside' placeholder='답변을 작성해주세요'></textarea>
        </div>
        <div className='answer-protect'>
          <p><CheckBox checked={protect} onChange={setProtect}></CheckBox>(필수)정보 제공 동의</p>
          <p><input type="button" value="작성완료" className='answer-submit' disabled={!protect} /></p>
        </div>
    </div>
  );
};

export default OnModal;