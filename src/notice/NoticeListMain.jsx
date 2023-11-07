import React from 'react';
import { useEffect } from 'react';

const NoticeListMain = () => {

  useEffect(() => {

  }, [])

  return (
    <div class="row">
      <div class="col-sm-6 mb-3 mb-sm-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">공지사항 1번</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-outline-warning">공지사항 확인</a>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">공지사항 2번</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-outline-warning">공지사항 확인</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeListMain;