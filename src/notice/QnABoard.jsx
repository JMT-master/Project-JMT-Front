import React, { useRef, useState } from 'react';
import { VscSearch } from 'react-icons/vsc';
import style from '../css/QnABoard.css';
import { useNavigate } from 'react-router-dom';
import { qnaData } from '../data/Data';
import Paging from '../common/Paging';


const Tr = (props) => {
  const navigate = useNavigate();
  const { no, Q, category, title, content, createDate } = props.data;
  return (
    <tr onClick={() => navigate('/qnaBoard/' + no)}>
      <td>{Q}</td>
      <td>{category}</td>
      <td>{title}</td>
      <td>{createDate}</td>
    </tr>
  );
}

const QnABoard = () => {
  const [newQnaData, setNewQnaData] = useState(qnaData);
  const [currentPage , setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = newQnaData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(newQnaData.length / itemsPerPage);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
          <select >
            <option value="10">10개씩</option>
            <option value="15">15개씩</option>
            <option value="20">20개씩</option>
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
          <tbody>
            {currentItems.map((item, index) => {
                return (
                  <Tr data={item} key={item.id}></Tr>
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
    </div>
  );
};

export default QnABoard;