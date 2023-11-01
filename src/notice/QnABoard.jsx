import React, { useEffect, useRef, useState } from 'react';
import { VscSearch } from 'react-icons/vsc';
import style from '../css/QnABoard.css';
import { useNavigate } from 'react-router-dom';
import { qnaData } from '../data/Data';
import Paging from '../common/Paging';
import { call, getCookie, setDateFormat } from './../common/ApiService';
import { Button, Table } from 'react-bootstrap';


export const Tr = (props) => {
  const navigate = useNavigate();
  // console.log("props.data : {}",props.data);
  const modDate = setDateFormat(props.data.modDate);
  
  const isAdmin = useRef(getCookie("adminChk"));
  const deleteItem = props.deleteItem;

  const deleteHandler = (e) => {
    deleteItem(props.data.qnaNum);
  }

  return (
    <tr>
      <td>{props.data.qnaNum}</td>
      <td>{props.data.qnaCategory}</td>
      <td onClick={() => navigate('/qna/' + props.data.qnaNum)}>{props.data.qnaTitle}</td>
      <td>{modDate}</td>
      <td>{props.data.qnaView}</td>
      <button type='button' className='oBtn'
      onClick={deleteHandler}
      style={isAdmin.current == "Y" ? null : {display: "none"}}
      >삭제</button>
    </tr>
  );
}

const QnABoard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [pagingInfo, setPagingInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const isAdmin = useRef(getCookie("adminChk"));

  useEffect(() => {

    fetchData(currentPage);

  }, [currentPage]);

  const fetchData = (page) => {

    call(`/qna?page=${page}`, "GET", null)
      .then((response) => {
        // console.log("response.items : {}", response.items);
        if(response != null) {
          setItems(response.items);
          setPagingInfo(response.pagingInfo);
        }else {
          setItems([]);
        }
      });
  };

  const deleteItem = (qnaNum) => {
    console.log("qnanum : {}", qnaNum);
    call("/qna/admin", "DELETE", qnaNum)
      .then((response) => {
        console.log("response : {}", response);
        setItems(response.data);
        fetchData(currentPage);
      });
  }

  const addItemPage = () => {
    localStorage.setItem('qna.length', items.length);
    navigate("/qna/admin/write");
  }

  return (
    <div className='content'>
      <h1 style={{ textAlign: 'left' }}>
        <img src="../images/qna-icon.png" alt="qna아이콘" style={{ width: '120px', height: '120px' }} />
      </h1>
      <div className='QnA-box'>
        <h2>Q & A
        </h2>
        <div className='QnA'>
          <input type="text" placeholder='검색어를 입력하세요' />
          <button><VscSearch /></button>
        </div>
      </div>
      <div className='qna-table'>
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
              <th
              style={isAdmin.current == "Y" ? null : {display: "none"}}
              >삭제 여부</th>
            </tr>
          </thead>
          <tbody className='cursor'>
            {items.map((item, index) => (
              <Tr key={item.qnaNum} data={item} deleteItem={deleteItem}></Tr>
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
        <Button type='button' className='oBtn'
        style={isAdmin.current == "Y" ? null : {display: "none"}}
        onClick={addItemPage}>Q&A 작성하기</Button>
      </div>
    </div>
  );
};

export default QnABoard;
