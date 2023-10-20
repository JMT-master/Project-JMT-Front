import Swal from "sweetalert2";
import {API_BASE_URL} from "./ApiConfig";

export function call(api, method, request){
    let  headers = new Headers({
        "Content-Type" : "application/json",
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    console.log("call 사용시 토큰" + accessToken);
    if(accessToken) {
      headers.append("Authorization", "Bearer " + accessToken);
    }
  console.log("call 사용시 headers = " + headers.get('Authorization'))

    let options = {
        headers : headers,
        url : API_BASE_URL + api,
        method : method,
    };

    console.log(options.url);
    if (request){
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then((response) => {
        console.log("call_response : ", response);
        if (response.status === 200){
            return response.json();
        } else if(response.status === 401) { // unauthorized
            Swal.fire({
                icon: 'warning',
                title: '로그인',
                text: '아이디 혹은 비밀번호가 맞지 않습니다.'
            })
            // window.location.href = "/login";
        }
    }).catch((error) => {
        console.log(error);
    });

}

export function signin(loginDto) {
    console.log("loginDto : ", loginDto);
    return call("/login", "POST", loginDto)
    .then(response => {
        console.log("signin response : ",response);

        if(response !== undefined) {
            localStorage.setItem("ACCESS_TOKEN", response.accessToken);
            localStorage.setItem("REFRESH_TOKEN", response.refreshToken);
            window.location.href = "/";
        }
    })

  }