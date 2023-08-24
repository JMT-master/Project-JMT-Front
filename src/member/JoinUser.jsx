import React, { useState } from 'react';
import '../css/JoinUser.css';
const JoinUser = () => {

  function onSubmitHandler() {

  }
  function onEmailHandler() {

  }
  function onNameHandler() {

  }
  function onPasswordHandler() {

  }
  function onConfirmPasswordHandler() {

  }
  return (
    <div className='join-container'>
      <form onSubmit={onSubmitHandler}>
        <div className='join-item'>
          <div>
            <input className ="item-input" type='email' value={""} placeholder="이메일을 입력하세요" onChange={onEmailHandler} />
          </div>
          <div>
            <input className ="item-input" type='text' value={""} placeholder="이름을 입력하세요" onChange={onNameHandler} />
          </div>
          <div>
            <input className ="item-input" type='password' value={""} placeholder="비밀번호를 입력하세요" onChange={onPasswordHandler} />
          </div>
          <div>
            <input className ="item-input" type='password' value={""} placeholder="비밀번호를 다시 입력하세요"onChange={onConfirmPasswordHandler} />
          </div>
          <button formAction='' className="item-button">가입하기</button>
        </div>
      </form>
    </div>
  );
}
export default JoinUser;