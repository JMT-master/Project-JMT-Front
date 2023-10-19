import React, { useState } from 'react';
import style from '../css/OnModal.css'
import {AiOutlineArrowLeft} from 'react-icons/ai'

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

const OnModal = ({setModalOpen, comp, id, title, content, writer}) => {
  const closeModal = () => {
    setModalOpen(false);
  };
  const [protect, setProtect] = useState(false);
  const component = comp;

  return (
    <div className='modalDiv'>
      {component}
    </div>
  );
};

export default OnModal;