import React, { useEffect, useRef, useState } from 'react';
import { VscSearch } from 'react-icons/vsc';
import style from '../css/QnABoard.css';
import { useNavigate } from 'react-router-dom';
import Paging from '../common/Paging';
import {call, getCookie, getLocal, setDateFormat} from './../common/ApiService';
import { Button, Table } from 'react-bootstrap';
import ListPaging from '../destination/ListPaging';
import Swal from 'sweetalert2';

export const Tr = (props) => {
  const navigate = useNavigate();
  const modDate = setDateFormat(props.data.modDate);

  const [isAdmin,setIsAdmin] = useState(false);
  const deleteItem = props.deleteItem;

  console.log("admin? " + isAdmin.current)
    call("/adminchk", "POST", {socialYn:getLocal("social")}).then(response=> {
      setIsAdmin(response)
    })

  const deleteHandler = (e) => {
    Swal.fire({
      icon : 'question',
      title: '삭제하시겠습니까?',
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: '확인',
      denyButtonText: '취소',
    }).then(response => {
      if(response.isConfirmed){
        deleteItem(props.data.qnaNum);
        Swal.fire({
          icon : 'info',
          title: '삭제되었습니다!',
          showCloseButton: true,
          confirmButtonText: '확인',        
        })
      }else {
        return;
      }
    });
  }

  return (
    <tr>
      <td>{props.data.qnaNum}</td>
      <td>{props.data.qnaCategory}</td>
      <td onClick={() => navigate('/qna/' + props.data.qnaNum)}>{props.data.qnaTitle}</td>
      <td>{modDate}</td>
      <td>{props.data.qnaView}</td>
      <td style={isAdmin ? null : { display: "none" }}>
        <button type='button'
          className='oBtn'
          onClick={deleteHandler}
        // style={isAdmin.current == "Y" ? null : { display: "none" }}
        >삭제</button>
      </td>
    </tr>
  );
}

const QnABoard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [pagingInfo, setPagingInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAdmin,setIsAdmin] = useState(false);
  const theme = localStorage.getItem("theme");
  const [searchResult, setSearchResult] = useState('');
  const [searchSelect, setSearchSelect] = useState('title');
  useEffect(() => {
    fetchData({ currentPage, pageSize });
    call("/adminchk", "POST", {socialYn:getLocal("social")})
       .then(response =>{
         setIsAdmin(response)
       })
  }, [currentPage, pageSize]);

  useEffect(() => {

  }, [theme]);

  const fetchData = (props) => {

    call(`/qna?page=${props.currentPage}&size=${props.pageSize}`, "GET", null)
      .then((response) => {
        // console.log("response.items : {}", response.items);
        if (response != null) {
          setItems(response.items);
          setPagingInfo(response.pagingInfo);
        } else {
          setItems([]);
        }
      });
  };

  const deleteItem = (qnaNum) => {
    console.log("qnanum : {}", qnaNum);
    call("/qna/admin", "DELETE", qnaNum)
      .then((response) => {
        setItems(response.data);
        fetchData({currentPage, pageSize});
      });
  }

  const addItemPage = () => {
    localStorage.setItem('qna.length', items.length);
    navigate("/qna/admin/write");
  }

  const changePageSize = (e) => {
    setPageSize(e.target.value);
  }

  function onChangeSearchSelect(e) {
    setSearchSelect(e.target.options[e.target.selectedIndex].value);
  }
  function onChangeSearchResult(e) {
    setSearchResult(e.target.value);
  }

  function handleOnKeyDown(e) {
    if(e.key === 'Enter') {
      onClickSearch();
    }
  }

  function onClickSearch() {

    call("/qna/search?select=" + searchSelect + "&result=" + searchResult,"GET")
    .then(response => {
      setItems(response.data);
      setCurrentPage(1);
      setPageSize(10);
    });
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
          <select className='searchKnowledge-select' onChange={onChangeSearchSelect}>
            <option value='title'>제목</option>
            <option value='content'>내용</option>
          </select>
          <input type="text" placeholder='검색어를 입력하세요' onChange={onChangeSearchResult} onKeyDown={handleOnKeyDown} />
          <button onClick={onClickSearch}><VscSearch /></button>
        </div>
      </div>
      <div className='qna-table'>
        <div className='page-choice'>
          <select className='select' 
          onChange={changePageSize}
          >
            <option value={5}>5개씩</option>
            <option value={10} selected>10개씩</option>
            <option value={15}>15개씩</option>
            <option value={20}>20개씩</option>
          </select>
        </div>
        <Table striped bordered hover variant={theme}>
          <thead>
            <tr>
              <th>Q</th>
              <th>구분</th>
              <th>제목</th>
              <th>작성일자</th>
              <th>조회수</th>
              <th
                style={isAdmin ? null : { display: "none" }}
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
      <div className="writeBtnBox">
        <button type='button' className='oBtn writeBtn'
                style={isAdmin ? null : { display: "none" }}
                onClick={addItemPage}>작성하기</button>
      </div>
      <div className='page'>
        <ListPaging page={pagingInfo.currentPage}
          lastPage={pagingInfo.totalPages}
          setPage={(page) => setCurrentPage(page)}>
        </ListPaging>
      </div>
    </div>
  );
};

export default QnABoard;
