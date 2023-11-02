import React from 'react'
import { call } from '../common/ApiService';
import { API_BASE_URL } from '../common/ApiConfig';
import { useEffect } from 'react';

const KakaoLogin = () => {
  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");

  tokenCall(code);

  function tokenCall(code){
    const url = API_BASE_URL + "/login/auth?code=" + code;

    return fetch(url).then((response) => {
      window.location.href("/");
    }).catch((error) => {
      window.location.href("/login");
    });
    
  }

  return (
    <div>로그인 중 입니다.</div>
  )
}

export default KakaoLogin