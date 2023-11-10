import React, { useEffect, useState } from 'react';
import { call, getLocal } from '../common/ApiService';

const MypageJoin = (props) => {

  const isUpdate = props.isUpdate;
  const [pwdPop, setPwdPop] = useState('');
  const [popup, setPopup] = useState(false);
  const [member, setMember] = useState({
    email: '',
    username: '',
    password: '',
    passwordChk: '',
    zipcode: '',
    address: '',
    addressDetail: '',
    phone: '',
    adminYn: 'N',
    socialYn: 'N'
  })

  useEffect(() => {
    call("/member/update?socialYn=" + getLocal('social'), "GET")
      .then((response) => {
        console.log('response : ', response);
        if (response !== undefined && response !== null) setMember(response);
      })
  }, []);

  function onChangeMember(e) {
    setMember({ ...member, [e.target.name]: e.target.value });
  }

  // 비밀번호
  function onChangePw(e) {
    setMember({ ...member, [e.target.name]: e.target.value });

    if (member.passwordChk === e.target.value) {
      return setPwdPop('비밀번호가 일치합니다');
    } else {
      return setPwdPop('비밀번호가 일치하지 않습니다.');
    }
  }

  // 비밀번호 확인
  function onChangePwChk(e) {
    setMember({ ...member, [e.target.name]: e.target.value });

    if (member.password === e.target.value) {
      return setPwdPop('비밀번호가 일치합니다');
    } else {
      return setPwdPop('비밀번호가 일치하지 않습니다.');
    }
  }

  return (
    <div className='container'
    style={{width:"50vw", margin:"0 auto"}}>
      <div className='item mx-auto'>
        <div className='user-item-tb'>
          <table className='table'>
            <colgroup>
              <col width='10%' />
              <col width='*' />
            </colgroup>
            <tbody className='cursor'>
              <tr className='brd-email'>
                <th><strong>아이디</strong></th>
                <td>
                  <div className='brd'>
                    <input
                      type="email"
                      id='email'
                      name='email'
                      value={member.email}
                      readOnly
                      className='form-control col-md-6'
                      style={{ cursor: 'pointer', border: 'none', outline: 'none' }} // 커스텀 스타일링
                    />
                  </div>
                  <div className='brd-txt'><span id='LoginIdMsg'></span></div>
                </td>
              </tr>
              <tr>
                <th><strong>이름</strong></th>
                <td>
                  <div className='brd'>
                    <input
                      type="id"
                      id='username'
                      name='username'
                      maxLength='12'
                      value={member.username}
                      readOnly
                      className='form-control col-md-6'
                      style={{ cursor: 'pointer', border: 'none', outline: 'none' }} // 커스텀 스타일링
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th><strong>집 주소</strong></th>
                <td>
                  <div className='brd'>
                    <input
                      type="text"
                      id='zipcode'
                      name='zipcode'
                      maxLength='12'
                      value={member.zipcode}
                      readOnly
                      className='form-control col-md-6'
                      style={{ cursor: 'pointer', border: 'none', outline: 'none' }} // 커스텀 스타일링
                    />
                  </div>
                  <div className='brd'>
                    <input
                      type="text"
                      id='address'
                      name='address'
                      maxLength='12'
                      value={member.address}
                      readOnly
                      className='form-control col-md-6'
                      style={{ cursor: 'pointer', border: 'none', outline: 'none' }} // 커스텀 스타일링
                    />
                  </div>
                  <div className='brd'>
                    <input
                      type="text"
                      id='addressDetail'
                      name='addressDetail'
                      maxLength='12'
                      value={member.addressDetail}
                      readOnly
                      className='form-control col-md-6'
                      style={{ cursor: 'pointer', border: 'none', outline: 'none' }} // 커스텀 스타일링
                    />
                  </div>
                  <div className='brd-txt'><span id='LoginIdMsg'></span></div>
                </td>
              </tr>
              <tr>
                <th><strong>휴대폰 번호</strong></th>
                <td>
                  <div className='brd'>
                    <input
                      type="tel"
                      id='phone'
                      name='phone'
                      maxLength='13'
                      value={member.phone}
                      readOnly
                      className='form-control col-md-6'
                      style={{ cursor: 'pointer', border: 'none', outline: 'none' }} // 커스텀 스타일링
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default MypageJoin;