import React from 'react';
import '../css/JoinUser.css';
import { useParams } from 'react-router';
import { emailValidateCheck } from './MemberFuc';

const JoinUserValidateChk = () => {
  const param = useParams();

  emailValidateCheck(param);

  return (
    <div>

    </div>
  );
}
export default JoinUserValidateChk;