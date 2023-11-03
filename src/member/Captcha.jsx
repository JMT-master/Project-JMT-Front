import React, { useEffect, useState } from 'react'
import { AiOutlineLoading, AiOutlineReload } from 'react-icons/ai';
import { LoadCanvasTemplateNoReload, validateCaptcha,loadCaptchaEnginge } from 'react-simple-captcha';
import Swal from 'sweetalert2';

const Captcha = (props) => {
  const subColor = ['red','blue','black','white','pink','cyan','lightgray','aqua','aquamarine','burlywood'];
  const [chkMsg, setChkMsg] = useState();
  const {confirm, setConfirm} = props;

  function randomArray(font) {
    let random;
    
    while(true) {
      random = Math.floor(Math.random() * subColor.length);
      if(font !== null && font !== undefined && font !== subColor[random]) break;
      else if(font === null || font === undefined) break;
    }

    return subColor[random];
  }

  useEffect(() => {
    const fontColor = randomArray();
    const background = randomArray(fontColor);
    loadCaptchaEnginge(6,background,fontColor);
  },[])

  const doSubmit = () => {
    const fontColor = randomArray();
    const background = randomArray(fontColor);

    if(confirm) {
      Swal.fire({
        icon: 'info',
        title: '문자입력',
        text: '이미 완료 되었습니다.'
      })
      return;
    }

    if (validateCaptcha(chkMsg) === true) {
      setConfirm(true);
      Swal.fire({
        icon: 'info',
        title: '문자입력',
        text: '성공'
      });
      return;
    } else {
      setChkMsg("");
      loadCaptchaEnginge(6,background,fontColor);
      Swal.fire({
        icon: 'warning',
        title: '문자입력',
        text: '실패'
      });
    }
  };

  const loadCaptchaAgain = () => {
    const fontColor = randomArray();
    const background = randomArray(fontColor);
    loadCaptchaEnginge(6,background,fontColor);
  };

  const changeMsg = (e) => {
    setChkMsg(e.target.value);
  }

  return (
    <>
      <div>
        <div className="form-group">
          <div className='mb-4' style={{fontWeight : '700'}}>자동입력방지</div>
          <div className="row border mx-0 align-items-center justify-content-between">
            <div className="col-5 mt-0 ">
              <LoadCanvasTemplateNoReload/>
            </div>
            <div className="col-2 algin-items-center btn btn-lg"
              onClick={loadCaptchaAgain}
            >
              <AiOutlineReload></AiOutlineReload>
            </div>
          </div>
          <div className="form-floating mb-2">
              <input type="text" class="form-control" placeholder="문자 입력" value={chkMsg} onChange={changeMsg} />
              <label for="floatingPassword">문자 입력</label>
          </div>
          <button className="btn btn-lg gap-10 btn-outline-warning" onClick={doSubmit}>
            문자 확인
          </button>
        </div>
      </div>
    
    
    </>
  );
}

export default Captcha