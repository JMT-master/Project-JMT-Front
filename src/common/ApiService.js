import { API_BASE_URL } from "./ApiConfig";
import { EventSourcePolyfill } from 'event-source-polyfill';
import { Cookies } from "react-cookie";
import moment from "moment/moment";
import {connect} from "react-redux";
import { useCallback } from "react";
import { useState } from "react";

export function call(api, method, request, page, pageSize ) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  getCookie('ACCESS_TOKEN') && headers.append("Authorization", "Bearer " + getCookie('ACCESS_TOKEN'));
  let url = `${API_BASE_URL}${api}`;
  if(page !== undefined && pageSize !== undefined) {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", pageSize);
    url += `?${params.toString()}`;
  }

  let options = {
    headers: headers,
    // url: API_BASE_URL + api,
    url: url,
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

export function sseSource(url, setNotifications) {
  const accessToken = getCookie('ACCESS_TOKEN');
  console.log("sse 호출!!!!!!!!")
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
      // console.error('SSE 에러 발생:', event);
      eventSource.close();
    };

  }
}

// localStorage 관련
export const getLocal = (name) => {
  const sessionValue = sessionStorage.getItem(name);

  if(sessionValue !== null && sessionValue !== undefined) {
    return sessionStorage.getItem(name);
  } else {
    return localStorage.getItem(name);
  }
}

// 쿠기 관련
export const setCookie = (name, value) => {
  const cookies = new Cookies();
  cookies.set(name, value, {path:'/', expires:moment().add(7,'days').toDate()});
  console.log("들어옴?");
}

export const getCookie = (name) => {
  const cookies = new Cookies();
  const sessionValue = sessionStorage.getItem(name);

  // 로그인 상태 유지 x
  if(name === "ACCESS_TOKEN" && sessionValue !== null && sessionValue !== undefined) {
    return sessionStorage.getItem(name);
  } else {
    return cookies.get(name);
  }
}

export function logoutAndClearStorage() {
  // 서버에 로그아웃 요청 보내기
  fetch('/logout', {
      method: 'POST',
      credentials: 'include', // 쿠키를 서버로 전송하기 위해 필요
  })
  .then(response => response.json())
  .then(data => {
      // 서버 응답 후 클라이언트 로직 추가 (예: 리다이렉션 등)

      // 쿠키 및 로컬 스토리지 삭제
      clearCookies();
      clearWebStorage();

      // 추가적인 클라이언트 로직 수행
  })
  .catch(error => console.error('Error during logout:', error));
}


export const clearCookies = () => {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export function clearWebStorage() {
  localStorage.clear(); // 로컬 스토리지
  sessionStorage.clear(); // 세션 스토리지
}

export const deleteCookie = (name) => {
  const cookies = new Cookies();
  const sessionValue = sessionStorage.getItem(name);

  // 로그인 상태 유지 x
  if(name === "ACCESS_TOKEN" && sessionValue !== null && sessionValue !== undefined) {
    sessionStorage.removeItem('loginState');
    sessionStorage.removeItem(name);
  } else {
    cookies.remove(name);
    cookies.remove('adminChk');
  }
}

export const loginStateCookie = () => {
  const cookies = new Cookies();
  sessionStorage.setItem('ACCESS_TOKEN', getCookie('ACCESS_TOKEN'));
  cookies.remove('ACCESS_TOKEN');
}

// 쿠키 갱신용
// 기존 ACCESS_TOKEN으로 넘기면 된다는 글이 많지만 아직 원인을 찾지 못함
// EXTENSION_TOKEN은 받아오므로 받아와서 덮어쓰기 하는 형식으로 작성
export const extensionCookie = () => {
  const cookies = new Cookies();
  deleteCookie('ACCESS_TOKEN');
  cookies.set("ACCESS_TOKEN", getCookie('EXTENSION_TOKEN'));
  deleteCookie('EXTENSION_TOKEN');
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