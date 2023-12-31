import {API_BASE_URL} from "./ApiConfig";
import {EventSourcePolyfill} from 'event-source-polyfill';
import {Cookies} from "react-cookie";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookie()
  });

  // if(request.accessToken && request.accessToken != null) {
  //   headers.append("Authorization", "Bearer " + getCookie());
  // }
  // return call("/auth/signin","POST", {})
  //    .then((response) => {
  //      localStorage.setItem("ACCESS_TOKEN", response.token)
  //      console.log("response : " + response);
  //      window.location.href = "/";
  //    });

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
    console.log("call_response : ", response);
    if (response.status === 200) {
      return response.json();
    }
  }).catch((error) => {
    console.log(error);
  });

}

export function signin(loginDto) {
  console.log("loginDto : ", loginDto);
  return call("/login", "POST", loginDto)
     .then(response => {
       console.log("signin response : ", response);

       if (response !== undefined) {
         localStorage.setItem("ACCESS_TOKEN", response.accessToken);
         localStorage.setItem("REFRESH_TOKEN", response.refreshToken);
         window.location.href = "/";
       }
     })
}

export function sseSource(url, setNotifications) {
  const accessToken = getCookie();
  // SSE 지원
  if (typeof EventSource !== "undefined") {
    const eventSource = new EventSourcePolyfill(API_BASE_URL + '/notification/' + url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'text/event-stream',
      }
    });
    console.log("타입타입! : " + typeof eventSource);

    console.log("이벤트 소스  :" + eventSource.toString());

    eventSource.addEventListener('sse', (event) => {
      console.log("메세지 수신 : " + event.data);
      call("/notification",
         "POST",
         null
         // 아이디는 백에서 토큰으로 확인
      )
         .then((response) => {
           setNotifications(response);
         })
         .catch((error) => {
           console.log(error);
         })
    });

    eventSource.onerror = function (event) {
      console.error('SSE 에러 발생:', event);
      eventSource.close();
    };

  }
}


export const getCookie = () => {
  const cookies = new Cookies();
  return cookies.get('ACCESS_TOKEN');
}
