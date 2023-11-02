import Swal from "sweetalert2";
import {call, deleteCookie, getCookie, setCookie, sseSource} from "../common/ApiService";
import {API_BASE_URL} from "../common/ApiConfig";
import moment from "moment";

// 이메일 중복 확인
export function userChk(chkUser) {
  return call("/joinUser/email", "POST", chkUser)
     .then(response => {
       if (response !== undefined) {
         Swal.fire({
           icon: 'info',
           title: '회원가입',
           text: '사용 가능'
         });

         return 1;
       } else {
         Swal.fire({
           icon: 'error',
           title: '회원가입',
           text: '이미 있는 회원입니다.'
         });

         return 0;
       }
     }).catch((error => {

     }));
}

// 이메일 인증
export function emailValidate(chkUser) {
  return call("/joinUser/email/validateSend", "POST", chkUser)
     .then(response => {
     }).catch((error => {
      
     }));
}

// 이메일 인증 확인
export function emailValidateCheck(chkUser) {
  return call("/joinUser/email/validateCheck", "POST", chkUser)
     .then(response => {
       window.close();
     }).catch((error => {
      
     }));
}

// 회원 가입
export function joinUser(memberDto) {
  return call("/joinUser", "POST", memberDto)
     .then(response => {
       if (response !== undefined) { 
        Swal.fire({
          icon: 'success',
          title: '회원가입',
          text: '가입을 축하드립니다.'
        }).then(function() {
           window.location.href = "/login";
          });
      }
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
export function signin(loginDto, id, idSave) {

  const url = API_BASE_URL + "/login";
  const body = JSON.stringify(loginDto);

  fetch(url, {
    method: 'POST',
    body: body,
    headers: {"Content-Type": "application/json"},
    // 신원확인을 할 때 필요!, include설정시 서버가 자격증명을 요청할 때 적용할 수 있음
    // 쿠키 확인 시 필수
    credentials: 'include'
  })
  .then(response => {
      
      if(response.status === 401) { // unauthorized
        Swal.fire({
            icon: 'warning',
            title: '로그인',
            text: '아이디 혹은 비밀번호가 맞지 않습니다.'
        })
      }
      else if(response !== undefined) {
        const infoUrl = API_BASE_URL + "/login/info";
        fetch(infoUrl, {
          method: 'POST',
          body: body,
          headers: {"Content-Type": "application/json"}
        }).then(resultInfo => resultInfo.json())
        .then(result => {
          console.log('login response : ',result);
          
          // 로그인 상태 유지 x
          if(loginDto.loginState === false) {
            sessionStorage.setItem("loginState", loginDto.loginState);
            window.location.href = "/";
            return;
          }

          const loginTime = moment(result);
          const resultTime = loginTime.add(1, 'hours').format();

          localStorage.setItem("loginTime",resultTime);

          console.log('loginTime : ', loginTime);

          if(idSave) {
            const saveCookie = getCookie('save_id');
            if(saveCookie !== null || saveCookie !== undefined) 
              deleteCookie('save_id');

            setCookie('save_id',id);
          } 

          window.location.href = "/";
        })
        
      } 
  })

}

// 로그인 만료시간 확인
export function loginExpired() {

  console.log("loginExpired, 들어옴?????");
  console.log("getCookie('ACCESS_TOKEN')",getCookie('ACCESS_TOKEN'));

  const url = API_BASE_URL + "/login/expired";

  return fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie('ACCESS_TOKEN')
    },
    
  })
  .then(response => {
    console.log('response' , response);
      
      if(response.status === 401) { // unauthorized
        if(localStorage.getItem("loginTime")) {
          localStorage.removeItem("loginTime");
        };
        deleteCookie("ACCESS_TOKEN");
      }
  })

}

