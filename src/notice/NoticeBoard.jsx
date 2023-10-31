import React, {useEffect, useRef, useState} from 'react';
import '../css/NoticeBoard.css'
import {VscSearch} from 'react-icons/vsc';
import {useNavigate} from 'react-router-dom';
import {noticeData} from '../data/Data';
import Paging from '../common/Paging';
import {call, getCookie} from "../common/ApiService";


const NoticeBoard = () => {
  const navigate = useNavigate();
  const [newNoticedata, setNewNoticeData] = useState(noticeData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [currentItems, setCurrentItems] = useState([])
  const totalPages = Math.ceil(noticeData.length / itemsPerPage);
  const idxNum = useRef(0);
  const isAdmin = useRef(getCookie("adminChk"));


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelect = (e) => {
    setItemsPerPage(e.target.value);
  }


  useEffect(() => {
    //   call("/checkUser","POST",{
    //     userid : "1234"
    //   })
    //      .then(response =>{
    //        console.log("checkUser : " + response)
    //        console.log("checkUser u : " + response.isSameUser)
    //        console.log("checkUser a : " + response.isAdmin)
    //      })
    console.log("admin? " + isAdmin.current)

    call("/notice",
       "GET",
       null
    ).then((response) => {
      response != null ? setCurrentItems(response) : setCurrentItems([]);
      // response != null ? console.log("데이터 있음")  : console.log("데이터 ddjqtmda");
      idxNum.current = parseInt(JSON.stringify(response[0].idx));
    })
       .catch((error) => {
         console.log(error);
       })
  }, []);


  return (
     <div className='content'>
       <h1><img src="../images/notice-icon.png" alt="공지사항 이미지"/></h1>
       <div className='searchNotice-box'>
         <h2>공지사항
         </h2>
         <div className='searchNotice'>
           <input type="text" placeholder='검색어를 입력하세요'/>
           <button><VscSearch/></button>
         </div>
       </div>
       <br/>
       <div className='notice-table'>
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
             <th>작성일자</th>
           </tr>
           </thead>
           <tbody>
           {currentItems && currentItems.map((item) => {
             return (
                <NoticeRead data={item} key={item.id} currentItems={currentItems}
                            setCurrentItems={setCurrentItems}></NoticeRead>
             )
           })}
           </tbody>
         </table>
         <div className='plus-notice'>
           <button style={isAdmin.current == "Y" ? null : {display: "none"}}
                   onClick={() => navigate('/notice/admin/write', {state: {idx: idxNum.current}})}>글쓰기
           </button>
         </div>
       </div>
       <div className='page'>
         <Paging
            totalPages={totalPages} currentPage={currentPage}
            onPageChange={handlePageChange}></Paging>
       </div>
     </div>
  );
};

export default NoticeBoard;

const NoticeRead = (props) => {
  const navigate = useNavigate();
  const {idx, category, title, regDate,} = props.data;
  const {currentItems, setCurrentItems} = props;
  return (
     <tr>
       <td>{idx}</td>
       <td>{category}</td>
       <td onClick={() => {
         navigate('/notice/' + idx)
       }} className='cursor'>{title}</td>
       <td>{regDate}</td>
     </tr>
  );
};