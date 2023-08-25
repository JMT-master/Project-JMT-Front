import React, { useState } from 'react';
import style from '../css/Knowledge.css';
import { Link, useNavigate } from 'react-router-dom';
import { VscSearch } from 'react-icons/vsc';
import { knowledgeData } from '../data/Data';
import Paging from '../common/Paging';


const Trkn = (props) => {
  const navigate = useNavigate();
  const { no, category, title, content, persnal, createDate } = props.data;

  return (
    <tr onClick={() => navigate('/knowledgeDetail/' + no)}>
      <td>{no}</td>
      <td>{category}</td>
      <td>{title}</td>
      <td>{persnal}</td>
      <td>{createDate}</td>
    </tr>
  );
}

const Knowledge = () => {
  const navigate = useNavigate();
  const [newKnowledgeData, setNewKnowledgeData] = useState(knowledgeData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = knowledgeData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(knowledgeData.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className='content'>
      <div className='knowledge-title'>
        <h1>Jhat JPT 지식in</h1>
        <p>제주도 여행에 관해서라면 관광지, 숙박, 음식, 축제, 교통 정보 등등 지식in을 이용해주세요</p>
        <p>전문가를 비롯한 제주도민, 제주도를 잘 아는 사람이라면 누구든지 답변 받을 수 있습니다.</p>
        <button className='question' onClick={() => navigate('/knowledgeWrite')}></button>
      </div>
      <div className='knowledge-content'>
        <div className='most-qna1' onClick={() => navigate('/knowledgeDetail/1')}>
          <img src="../images/qna-icon.png" alt="이미지1" style={{ width: '120px', height: '120px' }} />
          <p>가장 많이 본 qna1</p>
          <p>가장 많이 본 qna1의 내용 간략히</p>
        </div>
        <div className='most-qna2' onClick={() => navigate('/knowledgeDetail/2')}>
          <img src="../images/qna-icon.png" alt="이미지2" style={{ width: '120px', height: '120px' }} />
          <p>가장 많이 본 qna2</p>
          <p>가장 많이 본 qna2의 내용 간략히</p>
        </div>
        <div className='knowledge-category'>
          <button>전체</button>
          <button>관광지</button>
          <button>음식</button>
          <button>축제</button>
          <button>기타</button>
        </div>
        <div className='searchKnowledge-box'>
          <h2>지식in 
          </h2>
            <div className='searchKnowledge'>
              <input type="text" placeholder='검색어를 입력하세요' />
              <button><VscSearch /></button>
            </div>
        </div>
        <div className='knowledge-table'>
          <div className='page-choice'>
            <select >
              <option value="10개씩">10개씩</option>
              <option value="10개씩">15개씩</option>
              <option value="10개씩">20개씩</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>구분</th>
                <th>제목</th>
                <th>아이디</th>
                <th>작성일자</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                return (
                  <Trkn data={item} key={item.id}></Trkn>
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
    </div>
  );
};

export default Knowledge;