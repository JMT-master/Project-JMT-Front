import React from 'react'
import { call } from '../common/ApiService';
import { API_BASE_URL } from '../common/ApiConfig';
import { useEffect } from 'react';
import { signin } from './MemberFuc';
import { AiOutlineLoading } from 'react-icons/ai';

const KakaoLogin = () => {
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");

  tokenCall(code);

  function tokenCall(code){
    const url = API_BASE_URL + "/login/auth?code=" + code;

    return fetch(url).then((response) => {
      return response.json()
    }).then(result => {
      signin(result);
    }).then(
      () => window.location.href = '/'
    )    
  }

  return (
    <div className='container-sm'>
      <div class="row g-3">
        <div class="col-sm"></div>

        <div class="col-sm-4">
          <div className='loading'><AiOutlineLoading className='loadingIcon'></AiOutlineLoading></div>
        </div>

        <div class="col-sm"></div>
      </div>                
    </div>
  )
}

export default KakaoLogin