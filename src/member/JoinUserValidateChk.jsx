import React from 'react';
import '../css/JoinUser.css';
import {useParams} from 'react-router-dom'
import { emailValidateCheck } from './MemberFuc';
import { AiOutlineLoading } from 'react-icons/ai';

const JoinUserValidateChk = () => {
  const {email} = useParams();

  // emailValidateCheck(param);

  console.log('param : ',email);
  localStorage.setItem("emailValidate", email);
  window.close();

  return (
    <div>
      <div className='loading'><AiOutlineLoading className='loadingIcon'></AiOutlineLoading></div>
    </div>
  );
}
export default JoinUserValidateChk;