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
  const [compareText, setCompareText] = useState('');
  const [modifyFlg, setModifyFlg] = useState(false);
  const [modifyKey, setModifyKey] = useState();

  useEffect(() => {
    call('/knowledgeDetail/answer/?num='+props.data,'GET')
    .then(response => {
      setAnswerList(response);
      // setAnswerList()
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
    date.getDay() === comDate.getDay()) {
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
      if(date.getDay() - comDate.getDay() >= 365)  {
        showDate = (date.getFullYear() - comDate.getFullYear());
        showDate += '년 전';
      } else if(date.getDay() - comDate.getDay() >= 31)  {
        showDate = (date.getMonth() - comDate.getMonth())/31;
        showDate += '달 전';
      } else if(date.getDay() - comDate.getDay() >= 1)  {
        showDate = (date.getDay() - comDate.getDay());
        showDate += '일 전';
      }
    }

    return showDate;
  }

  function onAnswerChange(e) {
    setCompareText(e.target.value);
  }

  // 답글 삭제
  function onAnswerDelete(answer) {


    Swal.fire({
      icon : 'question',
      title: '삭제하시겠습니까?',
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: '확인',
      denyButtonText: '취소',

    }).then(function(result) {
      if(result.isConfirmed) { // 확인버튼
        call("/knowledgeDetail/answer/delete","POST",answer)
        .then(response => {
          // 에러 발생
          if(response === undefined || response.status === 400) {
            Swal.fire({
              icon : 'warning',
              title: '삭제되지 않았습니다.',
              showCloseButton: true,
              confirmButtonText: '확인',
        
            });
            return;
          }
          setAnswerList(response.data);
          Swal.fire({
            icon : 'info',
            title: '삭제되었습니다!',
            showCloseButton: true,
            confirmButtonText: '확인',
      
          });
          return;
        }
        )} 
      else { // 취소버튼
        return;
      }      
    })
  }

  // 수정버튼 클릭
  function onAnswerUpdate(e) {
    setCompareText(e.target.value);
    setModifyFlg(true);
    setModifyKey(e.target.id);
  }

  // 수정 완료
  function onAnserComfirm(data) {
    const revDate = {...data, content : compareText}
    call('/knowledgeDetail/answer/update','POST', revDate)
    .then(response => {
      setAnswerList(response.data);
      setContentValue('');
      window.location.href = "/knowledge"
    });

    setCompareText();
    setModifyFlg(false);
    setModifyKey();
  }

  // 수정 취소
  function onAnserCancel() {
    setCompareText();
    setModifyFlg(false);
    setModifyKey();
  }

  return (
    <div className='answerDetail-Container'>
      <div className='answerDetail-answer'>
        <textarea className='answerDetail-answer-area' id='answerDetail-content' cols="150" rows="5" placeholder='답글을 입력해주세요.' value={contentValue} onChange={answerContent}></textarea>
        <button className='oBtn' onClick={answerCreate}>
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
                <button className='oBtn' id={answer.answerId} value={answer.content} onClick={onAnswerUpdate}>수정</button>
                <button className='oBtn' onClick={() => onAnswerDelete(answer)}>삭제</button>
              </div>
              <div className='answerDetail-review-content'>
                <input className='answerDetail-review-content-text' id='' type='text' 
                value={modifyFlg === true && modifyKey == answer.answerId ? compareText : answer.content} onChange={onAnswerChange}></input>
                {
                  modifyFlg === true && modifyKey == answer.answerId ?
                  <>
                      <button value={answer.content} className='oBtn' onClick={() => onAnserComfirm(answer)}>확인</button>
                      <button value={answer.content} className='oBtn' onClick={onAnserCancel}>취소</button>
                  </> :
                  <></>
                }
                
                <div className='answerDetail-review-content-like'>
                  <BsHandThumbsUp className='answerDetail-review-content-thumbs' 
                  onClick={() => thumbsAdd(answer)}></BsHandThumbsUp>
                  <span className='answerDetail-review-content-count'>
                    {answer.answerLike !== 0 ? answer.answerLike : ''}
                  </span>
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