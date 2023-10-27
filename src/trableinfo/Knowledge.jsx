import React, { useEffect, useState } from 'react';
import style from '../css/Knowledge.css';
import { Link, useNavigate } from 'react-router-dom';
import { VscSearch } from 'react-icons/vsc';
import Paging from '../common/Paging';
import { call, setDateFormat } from '../common/ApiService';


const Trkn = (props) => {
  const navigate = useNavigate();
  console.log('props.data : ',props.data);
  const { num, category, title, userid, regDate, view } = props.data;

  const regDateFormat = setDateFormat(regDate);

  return (
    <tr onClick={() => navigate('/knowledgeDetail/' + num, {
      state : {
        data : props.data
      }
    })}>
      <td>{num}</td>
      <td>{category}</td>
      <td>{title}</td>
      <td>{userid}</td>
      <td>{regDateFormat}</td>
      <td>{view}</td>
    </tr>
  );
}

const Knowledge = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // const totalPages = Math.ceil(knowledgeData.length / itemsPerPage);
  const [categoryChk, setCategoryChk] = useState(0);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSelect = (e) =>{
    setItemsPerPage(e.target.value);
  }

  const onKnowledgeClick = (value) => {
    setCategoryChk(value);
  }

  useEffect(() => {
    call("/knowledge","GET")
    .then(response => {
      setCurrentItems(response);
    });
  },[]);


  console.log(currentItems);
  return (
    <div className='content'>
      <div className='knowledge-title'>
        <h1>Jhat JPT 지식in</h1>
        <p>제주도 여행에 관해서라면 관광지, 숙박, 음식, 축제, 교통 정보 등등 지식in을 이용해주세요</p>
        <p>전문가를 비롯한 제주도민, 제주도를 잘 아는 사람이라면 누구든지 답변 받을 수 있습니다.</p>
        <button className='question cursor' onClick={() => navigate('/knowledgeWrite')}></button>
      </div>
      <div className='knowledge-content cursor'>
        <div className='knowledge-category'>
          <button className={'knowledge-category-default' + (categoryChk === 0 ? ' knowledge-category-check' : '')} onClick={() => onKnowledgeClick(0)}>전체</button>
          <button className={'knowledge-category-default' + (categoryChk === 1 ? ' knowledge-category-check' : '')} onClick={() => onKnowledgeClick(1)}>관광지</button>
          <button className={'knowledge-category-default' + (categoryChk === 2 ? ' knowledge-category-check' : '')} onClick={() => onKnowledgeClick(2)}>음식</button>
          <button className={'knowledge-category-default' + (categoryChk === 3 ? ' knowledge-category-check' : '')} onClick={() => onKnowledgeClick(3)}>숙박</button>
          {/* <button>기타</button> */}
        </div>
        <div className='searchKnowledge-box'>
          <h2>지식in 
          </h2>
            <div className='searchKnowledge'>
              <select className='searchKnowledge-select'>
                <option value='title'>제목</option>
                <option value='content'>내용</option>
              </select>
              <input type="text" placeholder='검색어를 입력하세요' />
              <button><VscSearch /></button>
            </div>
        </div>
        <div className='knowledge-table'>
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
                <th>No.</th>
                <th>구분</th>
                <th>제목</th>
                <th>아이디</th>
                <th>작성일자</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody className='cursor'>
              {currentItems !== undefined && currentItems !== null && currentItems.map((item, index) => {
                return (
                  <Trkn data={item} key={item.id}></Trkn>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className='page'>
          <Paging
            // totalPages={totalPages} 
            totalPages='3'
            currentPage={currentPage}
            onPageChange={handlePageChange}></Paging>
        </div>
      </div>
    </div>
  );
};

export default Knowledge;