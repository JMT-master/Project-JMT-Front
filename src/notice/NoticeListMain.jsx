import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { API_BASE_URL } from "../common/ApiConfig";
import { useState } from "react";

const NoticeListMain = () => {
  const [notice, setNotice] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      url: API_BASE_URL + "/notice/main",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log("response.data {} ", response.data.data);
      setNotice(response.data.data);
    });
  }, []);

  if (!notice || !notice.length) {
    return (
      <div class="row">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">공지사항 준비중...</h5>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">공지사항 준비중...</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      {notice.map((item) => (
        <div className="col-sm-6 mb-3 mb-sm-0" key={item.id}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{"공지사항 "+item.idx+"번"}</h5>
              <p className="card-text">{item.title}</p>
              <a href={`/notice/${item.idx}`} className="btn btn-outline-warning">
                확인
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticeListMain;
