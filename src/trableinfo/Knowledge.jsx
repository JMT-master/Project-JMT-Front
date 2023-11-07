import React, { useEffect, useState } from 'react';
import style from '../css/Knowledge.css';
import { useNavigate } from 'react-router-dom';
import { VscSearch } from 'react-icons/vsc';
import { call, setDateFormat } from '../common/ApiService';
import ListPaging from '../destination/ListPaging';


const Trkn = (props) => {
  const navigate = useNavigate();
  const { num, category, title, userid, regDate, view } = props.data;
  console.log("noticedata : " + props.data)
  const regDateFormat = setDateFormat(regDate);

  return (
    <tr onClick={() => navigate('/knowledgeDetail/' + num)}>
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
  const [itemsPerPage, setItemsPerPage] = useState(10); // 5/10/15/20
  const [currentItems, setCurrentItems] = useState();
  const [itemsLength, setItemsLength] = useState();
  const [currentPage,setCurrentPage] = useState(1);
  const [categoryChk, setCategoryChk] = useState(0);
  const [totalPage, setTotalPage] = useState(0);  
  const [searchResult, setSearchResult] = useState('');
  const [searchSelect, setSearchSelect] = useState('title');
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const totalPages = Math.ceil(knowledgeData.length / itemsPerPage);

  useEffect(() => {
    call("/knowledge","GET")
    .then(response => {
      setCurrentItems(response);
      const totalpage = (response.length%itemsPerPage) === 0 ? (response.length/itemsPerPage) : (response.length/itemsPerPage) + 1;
      setTotalPage(totalpage);
      setItemsLength(response.length);
    });
  },[]);


  const handleSelect = (e) =>{
    setItemsPerPage(e.target.value);
    const totalpage = (itemsLength%e.target.value) === 0 ? (itemsLength/e.target.value) : (itemsLength/e.target.value) + 1;
    setTotalPage(totalpage);
    setCurrentPage(1);
  }

  const onKnowledgeClick = (e,value) => {
    call("/knowledge/category?name="+e.target.value,"GET")
    .then(response => {
      setCurrentItems(response.data);
      const totalpage = (response.data.length%itemsPerPage) === 0 ? (response.data.length/itemsPerPage) : (response.data.length/itemsPerPage)+1;
      setTotalPage(totalpage);
      setItemsLength(response.data.length);
      setCurrentPage(1);
    });

    setCategoryChk(value);
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
    call("/knowledge/search?select=" + searchSelect + "&result=" + searchResult,"GET")
    .then(response => setCurrentItems(response.data));
  }


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
          <button className={'knowledge-category-default' + (categoryChk === 0 ? ' knowledge-category-check' : '')} value='전체'   onClick={(e) => onKnowledgeClick(e,0)}>전체</button>
          <button className={'knowledge-category-default' + (categoryChk === 1 ? ' knowledge-category-check' : '')} value='관광지' onClick={(e) => onKnowledgeClick(e,1)}>관광지</button>
          <button className={'knowledge-category-default' + (categoryChk === 2 ? ' knowledge-category-check' : '')} value='음식'   onClick={(e) => onKnowledgeClick(e,2)}>음식</button>
          <button className={'knowledge-category-default' + (categoryChk === 3 ? ' knowledge-category-check' : '')} value='숙박'   onClick={(e) => onKnowledgeClick(e,3)}>숙박</button>
          {/* <button>기타</button> */}
        </div>
        <div className='searchKnowledge-box'>
          <h2>지식in 
          </h2>
            <div className='searchKnowledge'>
              <select className='searchKnowledge-select' onChange={onChangeSearchSelect}>
                <option value='title'>제목</option>
                <option value='content'>내용</option>
              </select>
              <input type="text" placeholder='검색어를 입력하세요' value={searchResult} onChange={onChangeSearchResult} onKeyDown={handleOnKeyDown} />
              <button className='searchKnowledge-btn' onClick={onClickSearch}><VscSearch /></button>
            </div>
        </div>
        <div className='knowledge-table'>
          <div className='page-choice'>
            <select onChange={handleSelect} id='page-choice'>
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
                if(index >= ((currentPage-1)*itemsPerPage) && index < (currentPage*itemsPerPage)) {
                  return <Trkn data={item} key={item.id}></Trkn>
                }                
              })}
            </tbody>
          </table>
        </div>
        <div className='page'>
        <ListPaging lastPage={totalPage} page={currentPage} setPage={setCurrentPage}></ListPaging>
        </div>
      </div>
    </div>
  );
};

export default Knowledge;