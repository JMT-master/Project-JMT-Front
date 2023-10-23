import Swal from "sweetalert2";
import {API_BASE_URL} from "./ApiConfig";
import { EventSourcePolyfill } from 'event-source-polyfill';

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if(accessToken && accessToken != null) {
      console.log("token is")
    headers.append("Authorization", "Bearer " + accessToken);
  }
  console.log("call 사용시 headers = " + headers.get('Authorization'))

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  console.log(options.url);
  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options).then((response) => {
    // console.log("call_response : ", response);
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 401) { // unauthorized
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
  // console.log("loginDto : ", loginDto);
  return call("/login", "POST", loginDto)
     .then(response => {
       // console.log("signin response : ",response);

       if (response !== undefined) {
         localStorage.setItem("ACCESS_TOKEN", response.accessToken);
         localStorage.setItem("REFRESH_TOKEN", response.refreshToken);
         window.location.href = "/";
       }
     })
}

//프론트에서 임시 버튼 만들고 더미 데이터 만들어서 클릭시 데이터 입력하게 하기.
export function sseSource(url){
  const eventSource = new EventSourcePolyfill(
     API_BASE_URL + '/notification/' + url,
     {
       headers:
          {
            'Authorization': `Bearer ` + localStorage.getItem('ACCESS_TOKEN'),
          }
     }
  )

  if (typeof (EventSource) !== "undefined") {
    console.log("sse지원");
  } else {
    console.log("sse미지원");
  }
  eventSource.onopen = e => {
    console.log('connect event data:');
  };
  eventSource.onmessage = function (event){
    const notificationDto = {
      "id": "1",
      "content": "ㅂㅈㄷㄱ",
      "url": "ㅁㄴㅇㄹ",
      "yn": "n"
    };
    // const notificationJson = JSON.parse(event.data);
    // const {id, content, url, yn} =
    // console.log("id : " + id);
    // console.log("content : " + content);
    // console.log("url : " + url);
    // console.log("yn : " + yn);
    // console.log(notificationJson);
    console.log(typeof(event.data));
  }

  console.log("eventSource", eventSource);

  // eventSource.addEventListener('message', (event) => {
  //   console.log('sse = ', event.data);
  // });



  eventSource.onerror = function (event) {
    // 에러 처리
    console.error("emitter SSE 에러 발생: ", event);
  };
  console.log("sse eventsorce : " + eventSource);
}