import React from 'react'

const ChangePasswd = () => {
  return (
    <div className='container-sm'>
      <div class="row g-3">
        <div class="col-sm"></div>

        <div class="col-sm-4">
          <h3 className='mb-5'>비밀번호 변경</h3>
          <div class="form-floating">
            <input type="password" class="form-control mb-3" id="floatingPassword" placeholder="현재 비밀번호" />
            <label for="floatingPassword">현재 비밀번호</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control mb-3" id="floatingPassword" placeholder="새 비밀번호" />
            <label for="floatingPassword">새 비밀번호</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control mb-5" id="floatingPassword" placeholder="새 비밀번호 확인" />
            <label for="floatingPassword">새 비밀번호 확인</label>
          </div>

          <div class="d-grid gap-2">
            <button class="btn btn-outline-warning btn-lg" type="button">확인</button>
            <button class="btn btn-outline-warning btn-lg" type="button">취소</button>
          </div>
        </div>

        <div class="col-sm"></div>
      </div>
    </div>
  )
}

export default ChangePasswd