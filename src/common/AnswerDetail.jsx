import React from 'react'
import style from '../css/AnswerDetail.css'
import { call } from './ApiService'
import { useState } from 'react'
// import moment from 'moment'
import { useEffect } from 'react'
import { BsHandThumbsUp } from 'react-icons/bs'
import Swal from 'sweetalert2'

const AnswerDetail = (props) => {
  const [answerList, setAnswerList] = useState();
  const [contentValue, setContentValue] = useState();

  useEffect(() => {
    call('/knowledgeDetail/answer/?num='+props.data,'GET')
    .then(response => {
      setAnswerList(response);
      setContentValue('');
    });
  },[]);

  // 답글 유효성 검사
  function answerCreate() {
    const content = document.getElementById('answerDetail-content').value;
    
    if(content === null || content === undefined || content === '') {
      Swal.fire({
        icon: 'warning',
        title: '답글',
        text: '답글을 입력해주세요'
      })
      return;
    }
    
    const create = {
      knNum : props.data,
      content : content,
      answerLike : 0
    }

    call('/knowledgeDetail/answer/create','POST',create)
    .then(response => {
      console.log(response);
      // 유효성 검사 에러
      if(response === undefined) {
        Swal.fire({
          icon: 'warning',
          title: '답글',
          text: '답글의 형식이 올바르지 않습니다.'
        }).then(function() {
          setContentValue('');    
        })
        return;
      } else {
        setAnswerList(response.data);
        setContentValue('');
      }
      
    });
  }

  // content 값 반영
  function answerContent(e) {
    setContentValue(e.target.value);
  }

  // thumbs 클릭 시 좋아요 증가
  function thumbsAdd(data) {
    console.log('thumbsAdd data',data);
    call('/knowledgeDetail/answer/likeUp','POST', data)
    .then(response => {
      setAnswerList(response);
      setContentValue('');
    });
  }

  // 시간 계산
  function reviewDateCal(revDate) {
    const date = new Date();
    const comDate = new Date(revDate);
    let showDate = '';
    
    if(date.getFullYear() === comDate.getFullYear() && 
    date.getMonth() === comDate.getMonth() && 
    date.getDate() === comDate.getDate()) {
      if((date.getHours() - comDate.getHours()) >= 1) {
        showDate = (date.getHours() - comDate.getHours());
        showDate += '시간 전';
      } else if((date.getMinutes() - comDate.getMinutes()) >= 1) {
        showDate = (date.getMinutes() - comDate.getMinutes());
        showDate += '분 전';
      } else {
        showDate = '방금';
      }
    } else {
      if(date.getFullYear() - comDate.getFullYear() >= 1)  {
        showDate = (date.getHours() - comDate.getHours());
        showDate += '년 전';
      } else if(date.getMonth() - comDate.getMonth() >= 1)  {
        showDate = (date.getMonth() - comDate.getMonth());
        showDate += '달 전';
      } else if(date.getDate() - comDate.getDate() >= 1)  {
        showDate = (date.getDate() - comDate.getDate());
        showDate += '일 전';
      }
    }

    return showDate;
  }

  return (
    <div className='answerDetail-Container'>
      <div className='answerDetail-answer'>
        <textarea className='answerDetail-answer-area' id='answerDetail-content' cols="150" rows="5" placeholder='답글을 입력해주세요.' value={contentValue} onChange={answerContent}></textarea>
        <button className='answerDetail-answer-btn' onClick={answerCreate}>
          답변하기
        </button>
      </div>
      <div className='answerDetail-reviews'>
        {
          answerList !== null && answerList !== undefined ? 
          answerList.map((answer,i) => {
            let showDate = reviewDateCal(answer.regDate);            

            return (
            <div key={i}>
              <div className='answerDetail-review-info'>
                <div className='answerDetail-review-info-writer'>{answer.answerWriter}</div>
                <div className='answerDetail-review-info-date'>{showDate}</div>
                <button className='answerDetail-review-info-btn'>수정</button>
                <button className='answerDetail-review-info-btn'>삭제</button>
              </div>
              <div className='answerDetail-review-content'>
                {answer.content}
                <div className='answerDetail-review-content-like'>
                  <BsHandThumbsUp className='answerDetail-review-content-thumbs' onClick={() => thumbsAdd(answer)}></BsHandThumbsUp>
                  <span className='answerDetail-review-content-count'>{answer.answerLike !== 0 ? answer.answerLike : ''}</span>
                  </div>
              </div>
            </div>
            )
          }) : <></>
        }
      </div>
    </div>
  )
}

export default AnswerDetail