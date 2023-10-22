import Swal from "sweetalert2";
import { call } from "../common/ApiService";

// 이메일 중복 확인
export function userChk(chkUser) {
  return call("/joinUser/email", "POST", chkUser)
  .then(response => {
    if(response !== undefined) {
      Swal.fire({
        icon: 'info',
        title: '회원가입',
        text: '사용 가능'
      });

      return 1;
    } else{
      Swal.fire({
        icon: 'error',
        title: '회원가입',
        text: '이미 있는 회원입니다.'
      });

      return 0;
    }
  }).catch((error => {
    console.log(error);
  }));
}

// 이메일 인증
export function emailValidate(chkUser) {
  console.log(chkUser);
  return call("/joinUser/email/validateSend", "POST", chkUser)
  .then(response => {
    console.log(response);
  }).catch((error => {
    console.log(error);
  }));
}

// 이메일 인증 확인
export function emailValidateCheck(chkUser) {
  console.log(chkUser);
  return call("/joinUser/email/validateCheck", "POST", chkUser)
  .then(response => {
    console.log(response);
    window.close();
  }).catch((error => {
    console.log(error);
  }));
}

// 회원 가입
export function joinUser(memberDto) {
  return call("/joinUser", "POST", memberDto)
  .then(response => {
      if(response !== undefined) window.location.href = "/login";
      else {
          Swal.fire({
              icon: 'warning',
              title: '회원가입',
              text: '가입 확인'
          })
      }
  });
}

// 로그인
export function signin(loginDto) {
  return call("/login", "POST", loginDto)
  .then(response => {
      console.log("signin response : ",response);
      
      if(response !== undefined) {
          localStorage.setItem("ACCESS_TOKEN", response.accessToken);
          localStorage.setItem("REFRESH_TOKEN", response.refreshToken);
          window.location.href = "/";
      } else if(response.status === 401) { // unauthorized
          Swal.fire({
              icon: 'warning',
              title: '로그인',
              text: '아이디 혹은 비밀번호가 맞지 않습니다.'
          })
      }
  })

}

