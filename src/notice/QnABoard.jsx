import React, { useEffect, useRef, useState } from 'react';
import { VscSearch } from 'react-icons/vsc';
import style from '../css/QnABoard.css';
import { useNavigate } from 'react-router-dom';
import { qnaData } from '../data/Data';
import Paging from '../common/Paging';
import { call } from './../common/ApiService';


export const Tr = (props) => {
  const navigate = useNavigate();
  // console.log("props : {} ",props);
  console.log("props.data {} : ",props.data);

  const modDate = new Date(props.data.modDate);
  // console.log(modDate.getTime);

  const deleteItem = props.deleteItem;

  const deleteHandler = (e) => {
    deleteItem(props.item);
  }

  const colnumhandler = () => {
    navigate('/qna/' + props.data.qnaNum)
  }

  return (
    <tr>
      <td>{props.data.qnaNum}</td>
      <td>{props.data.qnaCategory}</td>
      <td onClick={() => navigate('/qna/' + props.data.qnaNum)}>{props.data.qnaTitle}</td>
      <td>{props.data.modDate}</td>
      <button type='button' onClick={deleteHandler}>삭제</button>
    </tr>
    
  );
}

const QnABoard = () => {
  const [items, setItems] = useState([]);
  const [currentPage , setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    call("/qna", "GET", null)
        .then((response) => {
          console.log("response data {}", response.data);
          // console.log("response {}", response);
          setItems(response.data);
        })}, [items.length]);

  const addItem = (item) => {
    call("/qna/admin/write","POST", item)
        .then((response) => setItems(response.data));
  }

  const editItem = (item) => {
    call("/qna/admin/"+item.id, "PUT", item)
        .then((response) => setItems(response.data));
  }

  const deleteItem = (item) => {
    call("/qna/admin", "DELETE", item)
        .then((response) => setItems(response.data));
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelect = (e) =>{
    setItemsPerPage(e.target.value);
  }

  return (
    <div className='content'>
      <h1 style={{ textAlign: 'left' }}>
        <img src="../images/qna-icon.png" alt="qna아이콘" style={{width:'120px', height:'120px'}}/>
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
          <select onChange={handleSelect}>
            <option value={5}>5개씩</option>
            <option value={10} selected>10개씩</option>
            <option value={15}>15개씩</option>
            <option value={20}>20개씩</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Q</th>
              <th>구분</th>
              <th>제목</th>
              <th>작성일자</th>
            </tr>
          </thead>
          <tbody className='cursor'>
            {currentItems
            .sort((a,b) => b.modDate - a.modDate)
            .map((item, index) => {
                return (
                  <Tr data={item} index={index} key={item.id} deleteItem={deleteItem}></Tr>
                )
            })}
          </tbody>
        </table>
      </div>
      <div className='page'>
        <Paging
        totalPages={totalPages} currentPage={currentPage}
        onPageChange={handlePageChange}></Paging>
      </div>
      <div>
        <button type='button' onClick={()=> navigate("/qna/admin/write")}>Q&A 작성하기</button>
      </div>
    </div>
  );
};

export default QnABoard;
