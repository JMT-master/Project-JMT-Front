import React, {useEffect, useState} from 'react';
import style from '../css/NoticeBoard.css'
import { VscSearch } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import { noticeData } from '../data/Data';
import Paging from '../common/Paging';
import {call} from "../common/ApiService";
import { Button, Table } from 'react-bootstrap';



const TestTr = (props) => {
  const navigate = useNavigate();
  // console.log("props.data : {}",props.data);
  const modDate = new Date(props.data.modDate);

  const deleteItem = props.deleteItem;

  const deleteHandler = (e) => {
    deleteItem(props.data.noticeNum);
  }

  return (
    <tr>
      <td>{props.data.noticeNum}</td>
      <td>{props.data.noticeCategory}</td>
      <td onClick={() => navigate('/qna/' + props.data.noticeNum)}>{props.data.noticeTitle}</td>
      <td>{props.data.modDate}</td>
      <button type='button' onClick={deleteHandler}>삭제</button>
    </tr>
  );
};

const NoticeBoard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [pagingInfo, setPagingInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {

    fetchData(currentPage);

  }, [currentPage]);

  const fetchData = (page) => {

    call(`/notice?page=${page}`, "GET", null)
      .then((response) => {
        // console.log("response.items : {}", response.items);
        setItems(response.items);
        setPagingInfo(response.pagingInfo);
      });
  };

  const deleteItem = (noticeNum) => {
    console.log("noticenum : {}", noticeNum);
    call("/notice/admin", "DELETE", noticeNum)
      .then((response) => {
        console.log("response : {}", response);
        setItems(response.data);
        fetchData(currentPage);
      });
  }

  const addItemPage = () => {
    localStorage.setItem('notice.length', items.length);
    navigate("/notice/admin/write");
  }

  return (
    <div className='content'>
      <h1 style={{ textAlign: 'left' }}>
        <img src="../images/notice-icon.png" alt="notice아이콘" style={{ width: '120px', height: '120px' }} />
      </h1>
      <div className='notice-box'>
        <h2>공지사항
        </h2>
        <div className='notice'>
          <input type="text" placeholder='검색어를 입력하세요' />
          <button><VscSearch /></button>
        </div>
      </div>
      <div className='notice-table'>
        <div className='page-choice'>
          <select >
            <option value={5}>5개씩</option>
            <option value={10} selected>10개씩</option>
            <option value={15}>15개씩</option>
            <option value={20}>20개씩</option>
          </select>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Q</th>
              <th>구분</th>
              <th>제목</th>
              <th>작성일자</th>
              <th>조회수</th>
              <th>삭제 여부</th>
            </tr>
          </thead>
          <tbody className='cursor'>
            {items.map((item, index) => (
              <TestTr key={item.noticeNum} data={item} deleteItem={deleteItem}></TestTr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className='page'>
      <Paging
                currentPage={pagingInfo.currentPage}
                totalPages={pagingInfo.totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
      </div>
      <div>
        <Button type='button' onClick={addItemPage}>공지사항 작성하기</Button>
      </div>
    </div>
  );
};

export default NoticeBoard;