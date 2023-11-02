import { API_BASE_URL } from "./ApiConfig";
import { EventSourcePolyfill } from 'event-source-polyfill';
import { Cookies } from "react-cookie";
import moment from "moment/moment";
import {connect} from "react-redux";
import { useCallback } from "react";
import { useState } from "react";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  getCookie('ACCESS_TOKEN') && headers.append("Authorization", "Bearer " + getCookie('ACCESS_TOKEN'));
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

    console.log('request : ', request);
    console.log('options.body : ', options.body);

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
  const accessToken = getCookie('ACCESS_TOKEN');
  // SSE 지원
  if (typeof EventSource !== "undefined") {
    const eventSource = new EventSourcePolyfill(API_BASE_URL + '/notification/' + url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'text/event-stream',
      },
      heartbeatTimeout: 1000 * 60 * 60,
    });

    eventSource.addEventListener('sub',(event) =>{
      console.log("메세지 수신 : " + event.data);
    })

    eventSource.addEventListener('sse', (event) => {

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

// 쿠기 관련
export const setCookie = (name, value) => {
  const cookies = new Cookies();
  cookies.set(name, value, {path:'/', expires:moment().add(7,'days')});
  console.log("들어옴?");
}

export const getCookie = (name) => {
  const cookies = new Cookies();
  return name != 'adminChk' ? cookies.get(name) : cookies.get('adminChk');
}

export const deleteCookie = (name) => {
  const cookies = new Cookies();  
  cookies.remove(name);
  cookies.remove('adminChk');
}


// Date 관련
// Date Format
export const setDateFormat = (data) => {
  const revDate = new Date(data);
  const chnDate = moment(revDate).format('YYYY-MM-DD');
  return chnDate;
}

// Date Time Format
export const setDateTimeFormat = (data) => {
  const revDate = new Date(data);
  const chnDate = moment(revDate).format('YYYY-MM-DD HH:mm');
  return chnDate;
}