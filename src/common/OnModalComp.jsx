import React, { useState } from 'react';
import style from '../css/OnModal.css'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useLocation } from 'react-router-dom';


const CheckBox = ({children, disabled, checked, onChange}) => {
  const {pathname} = useLocation();
  if(pathname.includes("/chat/room")) {
    return <div></div>;
  }
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
  const {pathname} = useLocation();
  const closeModal = () => {
    setModalOpen(false);
  };
  const [protect, setProtect] = useState(false);
  const component = comp;

  if(pathname.includes("/chat/room")) {
    return <div></div>;
  }
  return (
    <div className='modalDiv'>
      {component}
    </div>
  );
};

export default OnModal;