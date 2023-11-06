import React from 'react'
import { call } from '../common/ApiService';
import { API_BASE_URL } from '../common/ApiConfig';
import { useEffect } from 'react';
import { signin } from './MemberFuc';
import { AiOutlineLoading } from 'react-icons/ai';

const KakaoLogin = () => {
  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");

  console.log('들어옴???');

  tokenCall(code);

  function tokenCall(code){
    
  console.log('들어옴???');
    const url = API_BASE_URL + "/login/auth?code=" + code;

    return fetch(url).then((response) => {
      return response.json()
      // window.location.href("/");
    }).then(result => {
      signin(result);
    })
    
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