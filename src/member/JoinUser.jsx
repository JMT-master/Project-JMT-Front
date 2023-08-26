import React, { useState } from 'react';
import '../css/JoinUser.css';
import DaumPostcode from 'react-daum-postcode';
import Post from './Post';
import { useNavigate } from 'react-router';
const JoinUser = () => {
  const [enroll_company, setEnroll_company] = useState({
    address:'',
  });
  const navigate = useNavigate();
  const [pwdPop, setPwdPop] = useState('');
  const [popup, setPopup] = useState(false);
  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]:e.target.value,
    })
  }
  const handleComplete = (data) => {
    setPopup(!popup);
  }
  const checkPwd = (e) => {
    const pwdVal = document.getElementById('LoginPwd').value;
    console.log(e.target.value === pwdVal);
    if(e.target.value === pwdVal){
      return setPwdPop('비밀번호가 일치합니다');
    }else {
      return setPwdPop('비밀번호가 일치하지 않습니다.');
    }
  }

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
      <form >
        <div className='item-title'>
          <h2>JMT로의 회원가입을 통해<br /> 더 다양한 서비스를 만나보세요</h2>
        </div>
        <div className='join-item'>
          <div className='user-item-tb'>
            <table>
              <colgroup>
                <col width='20%' />
                <col width='*' />
              </colgroup>
              <tbody className='cursor'>
                <tr>
                  <th><strong>아이디</strong></th>
                  <td>
                    <div className='brd'><input type="id" id='LoginId' name='LoginId'
                      maxLength='12' className='brd-ipt' required /> </div>
                    <div className='brd-txt'><span id='LoginIdMsg'>영문 또는 숫자로 4자~12자로 입력해주세요.</span></div>
                  </td>
                </tr>
                <tr>
                  <th><strong>비밀번호</strong></th>
                  <td>
                    <div className='brd'><input type="password" id='LoginPwd' name='LoginPwd'
                      maxLength='12' className='brd-ipt' /></div>
                    <div className='brd-txt'><span id='LoginIdMsg'>영문, 숫자 혼합하여 8자~15자로 입력해주세요.</span></div>
                  </td>
                </tr>
                <tr>
                  <th><strong>비밀번호 확인</strong></th>
                  <td>
                    <div className='brd'><input type="password" id='LoginId' name='LoginId'
                      maxLength='12' className='brd-ipt' onChange={checkPwd} /> </div>
                    <div className='brd-txt'><span className={pwdPop === '비밀번호가 일치합니다' ? 'successPwd' : 'failPwd'} >{pwdPop}</span></div>
                  </td>
                </tr>
                <tr>
                  <th><strong>집 주소</strong></th>
                  <td>
                    <div className='brd'><input type="text"  id='LoginAddress' name='LoginAddress'
                      maxLength='12' className={popup ? 'brd-ipt' : 'input-hidden'}
                      onChange={handleInput} value={enroll_company.zonecode} /></div>
                    <div className='brd'><input type="text"  id='LoginAddress' name='LoginAddress'
                      maxLength='12' className='brd-ipt'
                      onChange={handleInput} value={enroll_company.address} /></div>
                    <div className='brd'><input type="text"  id='LoginAddress' name='LoginAddress'
                      maxLength='12' className={popup ? 'brd-ipt' : 'input-hidden'}
                      onChange={handleInput} placeholder='상세주소를 입력해주세요'/></div>
                    <div className='brd-txt'><span id='LoginIdMsg'></span></div>
                    <div className='phone-chk'><button className='phone-btn' onClick={handleComplete} ><span>집 주소 검색하기</span></button></div>
                    <div>{popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}</div>
                  </td>
                </tr>
                <tr>
                  <th><strong>휴대폰 번호</strong></th>
                  <td>
                    <div className='brd'><input type="tell" id='LoginId' name='LoginId'
                      maxLength='12' className='brd-ipt' /> </div>
                    <div className='brd-txt'><span id='LoginIdMsg'></span></div>
                    <div className='phone-chk'><button className='phone-btn'><span>핸드폰 인증하기</span></button></div>
                  </td>
                </tr>
                <tr className='brd-email'>
                  <th><strong>이메일 주소</strong></th>
                  <td>
                    <div className='brd'><input type="text" id='LoginId' name='LoginId'
                      maxLength='12' className='brd-ipt-email' /> </div>
                    <div className='brd-txt'><span id='LoginIdMsg'></span></div>
                    <button className='email-check-btn'>중복확인</button>
                    <div className='email-check-txt'>
                      <span>이메일 도용 피해 방지를 위해 메일 인증을 받아주세요</span>
                      <button className='commit-email-btn'><span>메일 인증받기</span></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='joinUser-txt'>
            <p>고객님의 정보를 모두 입력하시면 회원 가입이 완료됩니다.
              <br />입력된 정보는 개인정보취급방침에 의해 안전하게 보호받습니다.
            </p>
          </div>
          <div className='joinUser-btn'>
            <ul className='type2'>
              <li className='lt'><button><span>가입완료</span></button></li>
              <li className='rt' onClick={()=>navigate(-1)} ><button><span>취소</span></button></li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}
export default JoinUser;