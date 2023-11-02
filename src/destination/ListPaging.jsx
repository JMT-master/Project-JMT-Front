import React from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { useTheme } from 'styled-components'
import {useNavigate} from "react-router-dom";

const ListPaging = (pageprops) => {
  const {page, setPage, lastPage} = pageprops
  const lPage = lastPage;
  const theme = useTheme();

  console.log("page : ",page);
  console.log("lastPage : ",lastPage);
  const onSetPage = (e) => {
    console.log(e.target.text);
    e.preventDefault();
    setPage(parseInt(e.target.text));
  }

  const pagingNumMake = (pages) => {
    let arr = [];
    let cN = '';
    // todo!! : 선택한 페이지 번호의 텍스트와 현재 페이지가 일치하면 bold가 주어진 스타일 주기
    for (let i = page<3 ? 1 : pages-2 ; pages+2>=lastPage ? i<=lastPage : i <= page+2; i++) {
      if(pages===i) cN='currentPage'
      else cN ='';
      arr.push(<a id={i} className={`pagingNumBtn ${theme.body === "#FFF" ? 'blackText' : 'whiteText'} oBtn noBorder ${cN}`} key={i} href={i} onClick={onSetPage}>{i}</a>)
    } return arr;
  }

  return (
    <div className='content-paging'>
      <button className='oBtn'
        disabled={page === 1 && true}
        onClick={() => { setPage(1) }}><MdKeyboardDoubleArrowLeft className='twentySize'/>
      </button>
      <button className='oBtn'
        disabled={page === 1 && true}
        onClick={() => { setPage(page - 1) }}><MdKeyboardArrowLeft className='twentySize'/>
      </button>
      {pagingNumMake(page)}
      <button className='oBtn'
        disabled={page === lastPage && true}
        onClick={() => { setPage(page + 1) }}><MdKeyboardArrowRight className='twentySize'/>
      </button>
      <button className='oBtn'
        disabled={page === lastPage && true}
        onClick={() => { setPage(lastPage);
        }}><MdKeyboardDoubleArrowRight className='twentySize'/>
      </button>
    </div>
  )
}

export default ListPaging