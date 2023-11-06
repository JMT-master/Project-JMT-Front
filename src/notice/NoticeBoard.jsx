import React, {useEffect, useRef, useState} from 'react';
import '../css/NoticeBoard.css'
import {VscSearch} from 'react-icons/vsc';
import {useNavigate} from 'react-router-dom';
import {noticeData} from '../data/Data';
import {call, getCookie, setDateFormat} from "../common/ApiService";
import ListPaging from "../destination/ListPaging";
import {Table} from 'react-bootstrap';
import Swal from "sweetalert2";


const NoticeBoard = () => {
  const navigate = useNavigate();
  const [newNoticedata, setNewNoticeData] = useState(noticeData);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  const [currentItems, setCurrentItems] = useState([])
  const [lastPage, setLastPage] = useState(0);
  const idxNum = useRef(0);
  const isAdmin = useRef(getCookie("adminChk"));
  const theme = localStorage.getItem("theme");

  const handlePageChange = (page) => {
    setPage(page);
  };


  const handleSelect = (e) => {
    setItemsPerPage(e.target.value);
  }

  const deleteHandler = (idx) => {
    call("/notice/admin", "DELETE", {idx: idx})
       .then(response => {
         console.log("delete 호출!!")
         setCurrentItems(response.content);
         setLastPage(response.totalPages)
         if (response === undefined) {
           Swal.fire({
             icon: 'warning',
             title: '삭제 중 에러 발생!',
             showCloseButton: true,
             confirmButtonText: '확인',
           });
         } else {
           Swal.fire({
             icon: 'info',
             title: '삭제되었습니다!',
             showCloseButton: true,
             confirmButtonText: '확인',
           }).then(
              () => {
                navigate("/notice")
              }
           );
         }
       })
  }
  useEffect(() => {
    console.log("admin? " + isAdmin.current)

    call("/notice",
       "GET",
       null, page - 1, itemsPerPage
    ).then((response) => {
      if (response != null) setCurrentItems(response.content);
      console.log("notice response : " + JSON.stringify(response.content))
      setLastPage(response.totalPages)
      // console.log("alstpage : " + response.totalPages)
      idxNum.current = parseInt(JSON.stringify(response.content[0].idx));
    })
       .catch((error) => {
         console.log(error);
       })
  }, [page,itemsPerPage]);


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
           <select onChange={handleSelect} id="noticePageSelect">
             <option value={5}>5개씩</option>
             <option value={10} selected>10개씩</option>
             <option value={15}>15개씩</option>
             <option value={20}>20개씩</option>
           </select>
         </div>
         <Table striped bordered hover variant={theme}>
           <thead>
           <tr>
             <th>No.</th>
             <th>구분</th>
             <th>제목</th>
             <th>작성일자</th>
             <th>조회수</th>
           </tr>
           </thead>
           <tbody>
           {currentItems && currentItems.map((item) => {
             return (
                <NoticeRead data={item} key={item.id} deleteHandler={deleteHandler}></NoticeRead>
             )
           })}
           </tbody>
         </Table>
         <div className='plus-notice' style={{display:"flex",justifyContent: "flex-end"}}>
           <button className="oBtn"
              style={{display: isAdmin.current === "Y" ? "flex" : "none", marginRight:"20px" }}
                   onClick={() => navigate('/notice/admin/write')}>글쓰기
           </button>
         </div>
       </div>
       <div className='page'>
         <ListPaging
            lastPage={lastPage} page={page}
            setPage={setPage}></ListPaging>
       </div>
     </div>
  );
};

export default NoticeBoard;

const NoticeRead = (props) => {
  const navigate = useNavigate();
  const {idx, category, title, regDate, view} = props.data;
  const dataForm = setDateFormat(props.data.modDate);
  const isAdmin = useRef(getCookie("adminChk"))
  const {deleteHandler} = props;
  const deleteNotice = (idx) => {
    deleteHandler(idx);
    console.log("마사카!")
  }

  return (
     <tr>
       <td>{idx}</td>
       <td>{category}</td>
       <td onClick={() => {

         navigate('/notice/' + idx)
       }} className='cursor'>{title}</td>
       <td>{dataForm}</td>
       <td>{view}</td>
       <td>
         <button type='button' className='oBtn'
                 onClick={() => {
                   deleteNotice(idx)
                 }}
                 style={isAdmin.current == "Y" ? null : {display: "none"}}
         >삭제
         </button>
       </td>
     </tr>
  );
};