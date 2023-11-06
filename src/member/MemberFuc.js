import Swal from "sweetalert2";
import {call, deleteCookie, extensionCookie, getCookie, getLocal, loginStateCookie, setCookie} from "../common/ApiService";
import {API_BASE_URL} from "../common/ApiConfig";
import moment from "moment";

// 이메일 중복 확인
export function userChk(chkUser,setDuplicate) {

  console.log('chkUser : ',chkUser);
  console.log('setDuplicate : ',setDuplicate);
  call("/joinUser/email", "POST", chkUser)
     .then(response => {
       if (response !== undefined) {
         Swal.fire({
           icon: 'info',
           title: '회원가입',
           text: '사용 가능'
         });

         return setDuplicate(true);
       } else {
         Swal.fire({
           icon: 'error',
           title: '회원가입',
           text: '이미 있는 회원입니다.'
         });

         return setDuplicate(false);
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
  const url = API_BASE_URL + "/joinUser";
  const body = JSON.stringify(memberDto);

  fetch(url, {
    method: 'POST',
    body: body,
    headers: {"Content-Type": "application/json"},
  })
  .then(response => response.json())
  .then(result => {
    console.log('회원가입 response', result)
    if (result.error !== 'error') {
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
        text: result.data[0]
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
        loginInfo(loginDto, body, id, idSave)
      } 
  })

}

// 로그인 정보 확인
export function loginInfo(loginDto, body, id, idSave) {
  const infoUrl = API_BASE_URL + "/login/info";
  fetch(infoUrl, {
    method: 'POST',
    body: body,
    headers: {"Content-Type": "application/json"}
  }).then(resultInfo => resultInfo.json())
  .then(result => {          
    // 로그인 상태 유지 x
    console.log('loginDto.loginState',loginDto.loginState)
    sessionStorage.setItem("loginState", loginDto.loginState);

    const loginTime = moment(result);
    const resultTime = loginTime.add(1, 'hours').format();

    if(loginDto.loginState === false) {
      loginStateCookie();
      sessionStorage.setItem("loginTime",resultTime);
      sessionStorage.setItem("social",loginDto.socialYn);
    } else {
      localStorage.setItem("loginTime",resultTime);
      localStorage.setItem("social",loginDto.socialYn);
    }

    if(idSave) {
      const saveCookie = getCookie('save_id');
      if(saveCookie !== null || saveCookie !== undefined) 
        deleteCookie('save_id');

      setCookie('save_id',id);
    } 

    window.location.href = "/";
  })
}

// 로그인 시간 연장
export function loginTimeUpdate() {
  let url = API_BASE_URL + "/login/info?socialYn=" + getLocal('social');


  return fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie('ACCESS_TOKEN')
    }
  }).then(result => {
    return result.json();
  }).then(data => {
    url = API_BASE_URL + "/login/extension";
    console.log('data : ', data)

    const result = {
      email : data.data[0],
      socialYn : getLocal('social')
    }

    const body = JSON.stringify(result);

    fetch(url, {
      method: 'POST',
      body : body,
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
      
    }).then(revTimeInfo => revTimeInfo.json())
    .then(revTime => {
        console.log('revTime', revTime);
        const loginTime = moment(revTime);
        const resultTime = loginTime.add(1, 'hours').format();
    
        if(sessionStorage.getItem('loginState') === false) {
          sessionStorage.setItem("loginTime",resultTime);
        } else {
          localStorage.setItem("loginTime",resultTime);
        }        

        extensionCookie();

        window.location.href = "/";
    })
  });
}


// 로그인 만료시간 확인
export function loginExpired() {
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
        if(sessionStorage.getItem('loginState') === false
        && sessionStorage.getItem('loginTime')) {
          sessionStorage.removeItem("loginTime");
        } else if(localStorage.getItem("loginTime")) {
          localStorage.removeItem("loginTime");
        } 

        deleteCookie("ACCESS_TOKEN");
      }
  })

}

