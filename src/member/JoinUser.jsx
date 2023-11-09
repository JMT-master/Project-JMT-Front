import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react'
import '../css/JoinUser.css';
import Post from './Post';
import { useNavigate } from 'react-router';
import { call, getLocal } from '../common/ApiService';
import Swal from 'sweetalert2';
import { emailValidate, joinUser, userChk } from './MemberFuc';
import { useLocation } from 'react-router-dom';


const JoinUser = (props) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [pwdPop, setPwdPop] = useState('');
  const [popup, setPopup] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [emailVali, setEmailVali] = useState(false);
  const isUpdate = props.isUpdate;

  const [member, setMember] = useState({
    email : '',
    username : '',
    password : '',
    passwordChk : '',
    zipcode : '',
    address : '',
    addressDetail : '',
    phone : '',
    adminYn : 'N',
    socialYn : 'N'
  })

  useEffect(() => {
    console.log("들어옴???");
    if(isUpdate){
      call("/member/update?socialYn="+getLocal('social'), "GET")
      .then((response) => {
        console.log('response : ',response);
          if(response !== undefined && response !== null) setMember(response);
      })
    }
  }, []);

  //updateHandler
  const updateHandler = () => {
    call("/member/update", "POST", member)
    .then((response) => {
      console.log("response : "+response.error);

      if(response.error !== 'success') {
        Swal.fire({
          icon : 'warning',
          title: response.error,
          showCloseButton: true,
          confirmButtonText: '확인',        
        });
      } else {
        Swal.fire({
          icon : 'info',
          title: '수정되었습니다!',
          showCloseButton: true,
          confirmButtonText: '확인',        
        });
      }      
    });
  }

  const handleComplete = (e) => {
    e.preventDefault();
    setPopup(!popup);
  }

  // 가입 완료
  function onSubmitHandler(e) {
    const text   = {
      email : '이메일',
      username : '이름',
      password : '비밀번호',
      passwordChk : '비밀번호 확인 ',
      zipcode : '우편번호',
      address : '집주소',
      addressDetail : '상세 주소',
      phone : '휴대폰 번호'
    }
    let nullFlag = 0, nullValue = '';

    // null값 처리
    for(let data in member) {
      let validateDate = member[data].replaceAll(' ', '');
      if( validateDate.length === 0) {
        if(data !== 'addressDetail' && nullFlag === 0) {
          nullValue = text[data];
          nullFlag = 1;
          break;
        }
      }
    }

    if(duplicate === false) {
      Swal.fire({
        icon: 'warning',
        title: '회원가입',
        text: '중복확인 하십시오.'
      })
      return;
    }

    if(nullFlag === 1) {
      Swal.fire({
        icon: 'warning',
        title: '회원가입',
        text: nullValue + '를 체크하시오.'
      })
      return;
    }

    if(member.password !== member.passwordChk) {
      Swal.fire({
        icon: 'warning',
        title: '회원가입',
        text: '비밀번호가 같지 않습니다.'
      })
      return;
    }

    if(localStorage.getItem("emailValidate") === member.email) {
      localStorage.removeItem('emailValidate');
    } else {
      Swal.fire({
        icon: 'warning',
        title: '회원가입',
        text: '메일인증을 하십시오.'
      })
      return;
    }

    joinUser(member);
  }

  // 이메일 중복 확인
  function dupliEmail(e) {
    e.preventDefault();

    const chkUser = {
      email : member.email,
      socialYn : 'N'
    };

    userChk(chkUser, setDuplicate)
  }

  // 메일 인증 받기
  function onEmailHandler(e) {
    e.preventDefault();
    
    const chkUser = {
      email : member.email,
      socialYn : 'N'
    };

    emailValidate(chkUser,setEmailVali);
  }

  // member항목 변경
  function onChangeMember(e) {
    setMember({...member, [e.target.name] : e.target.value});
  }

  // phone
  function onChangePhone(e) {
    // regex는 정규식을 사용할 수 있는 method이고 .test()는 해당 문자가 정규식에 포함되는지 아닌지를 판별
    // /^ : 문자열 시작, 0~9와 back space 사용 가능, 13번째까지 앞의 해당 문자로 이루어진 정규식
    const regex = /^[0-9\b]{0,13}$/;
    if(regex.test(e.target.value)) {
      setMember({...member, [e.target.name] : e.target.value});
    }
    
  }

  // 비밀번호
  function onChangePw(e) {
    setMember({...member, [e.target.name] : e.target.value});

    if(member.passwordChk === e.target.value) {
      return setPwdPop('비밀번호가 일치합니다');
    } else {
      return setPwdPop('비밀번호가 일치하지 않습니다.');
    }
  }

  // 비밀번호 확인
  function onChangePwChk(e) {
    setMember({...member, [e.target.name] : e.target.value});

    if(member.password === e.target.value) {
      return setPwdPop('비밀번호가 일치합니다');
    } else {
      return setPwdPop('비밀번호가 일치하지 않습니다.');
    }
  }

  console.log('duplicate : ',duplicate);
  console.log('member : ',member);
  console.log('isUpdate : ', isUpdate);

  return (
    <div className='join-container'>
        <div className='item-title' style={{display : isUpdate ? "none" : "block"}}>
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
                <tr className='brd-email'>
                  <th><strong>아이디</strong></th>
                  <td>
                    <div className='brd'><input type="email" id='email' name='email' 
                     style={{width : isUpdate ? "95%" : ""}} 
                     value = {member.email}
                     onChange={onChangeMember}
                     readOnly = {isUpdate ? true : false}
                      className='brd-ipt-email' placeholder='아이디는 이메일 형식 입니다.' /> </div>
                    <div className='brd-txt'><span id='LoginIdMsg'></span></div>
                    <button className='email-check-btn btn btn-outline-warning btn-lg' onClick={dupliEmail} style={{display : isUpdate ? "none" : "block"}}><strong>중복확인</strong></button>
                    <div className='email-check-txt' style={{display : isUpdate ? "none" : "block"}}>
                      <span>이메일 도용 피해 방지를 위해 메일 인증을 받아주세요   </span>
                      <button className='btn btn-outline-warning btn-sm' onClick={onEmailHandler}><span><strong>메일 인증받기</strong></span></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th><strong>이름</strong></th>
                  <td>
                    <div className='brd'>
                      <input type="id" id='username' name='username'
                      maxLength='12' className='brd-ipt' 
                      value = {member.username}
                      onChange={onChangeMember}
                      required /> </div>
                  </td>
                </tr>
                {
                  isUpdate === true ? <></>
                  :
                  <tr>
                  <th><strong>비밀번호</strong></th>
                  <td>
                    <div className='brd'>
                      <input type="password" id='password' name='password'
                      maxLength='12' className='brd-ipt' placeholder='영문, 숫자 혼합하여 8자~15자로 입력해주세요.' 
                      value = {member.password}
                      onChange={onChangePw}
                      /></div>
                    {/* <div className='brd-txt'><span id='LoginIdMsg'>영문, 숫자 혼합하여 8자~15자로 입력해주세요.</span></div> */}
                  </td>
                </tr>
                }
                {
                  isUpdate === true ? <></>
                  :
                  <tr>
                  <th><strong>비밀번호 확인</strong></th>
                  <td>
                    <div className='brd'>
                      <input type="password" id='passwordChk' name='passwordChk'
                      maxLength='12' className='brd-ipt'
                      value = {member.passwordChk}
                      onChange={onChangePwChk}
                      /> </div>
                    <div className='brd-txt'><span className={pwdPop === '비밀번호가 일치합니다' ? 'successPwd' : 'failPwd'} >{pwdPop}</span></div>
                  </td>
                </tr>
                }
                <tr>
                  <th><strong>집 주소</strong></th>
                  <td>
                    <div className='brd'>
                      <input type="text"  id='zipcode' name='zipcode'
                      maxLength='12' className={isUpdate ? 'brd-ipt' : popup ? 'brd-ipt' : 'input-hidden'}
                      onChange={onChangeMember} value={member.zipcode} 
                      />
                    </div>
                    <div className='brd'>
                      <input type="text"  id='address' name='address'
                      maxLength='12' className='brd-ipt'
                      onChange={onChangeMember} value={member.address}
                       /></div>
                    <div className='brd'>
                      <input type="text"  id='addressDetail' name='addressDetail'
                      maxLength='12' className={isUpdate ? 'brd-ipt' : popup ? 'brd-ipt' : 'input-hidden'}
                      value={member.addressDetail}
                      onChange={onChangeMember} placeholder='상세주소를 입력해주세요'/>
                    </div>
                    <div className='brd-txt'><span id='LoginIdMsg'></span></div>
                    <div className='phone-chk'>
                      <button className='btn btn-outline-warning btn-sm' onClick={handleComplete} >
                        <span><strong>집 주소 검색하기</strong></span>
                      </button>
                    </div>
                    <div>{popup && <Post company={member} setcompany={setMember}></Post>}</div>
                  </td>
                </tr>
                <tr>
                  <th><strong>휴대폰 번호</strong></th>
                  <td>
                    <div className='brd'>
                      <input type="tel" id='phone' name='phone'
                      maxLength='13' className='brd-ipt' 
                      value = {member.phone}
                      onChange={onChangePhone}
                      /> </div>
                    {/* <div className='brd-txt'><span id='LoginIdMsg'></span></div>
                    <di className='phone-chk'><button className='phone-btn'><span>핸드폰 인증하기</span></button></di> */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='joinUser-txt'>
            <p style={{display : isUpdate ? "none" : "block"}}>고객님의 정보를 모두 입력하시면 회원 가입이 완료됩니다.
              <br />입력된 정보는 개인정보취급방침에 의해 안전하게 보호받습니다.
            </p>
          </div>
          {
            isUpdate === true ? // Update
            <div className='d-flex flex-row bd-highlight gap-3'>
              <div className='bd-highlight'>
                <button className='btn btn-outline-warning' id='joinUser-Success' onClick={updateHandler}><strong>수정완료</strong></button>
              </div>
              <div className='bd-highlight'>
                <button className='btn btn-outline-warning' id='joinUser-Success' onClick={() => {
                  navigate('/myInfo/ChangePasswd', {state : {data : member.email}})
                  }}><strong>비밀번호 변경</strong></button>
              </div>

            </div> 
            : // 회원가입
            <div className='d-flex flex-row bd-highlight gap-3'>
              <div className='bd-highlight'>
                <button className='btn btn-outline-warning' id='joinUser-Success' onClick={onSubmitHandler}><strong>가입완료</strong></button>
              </div>
              <div className='bd-highlight'>
                <button className='btn btn-outline-secondary' id='joinUser-Cancel' onClick={() => navigate(-1)}><strong>취소</strong></button>
              </div>
            </div>          
          }
        </div>
    </div>
  );
}
export default JoinUser;