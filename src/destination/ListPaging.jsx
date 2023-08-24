import React, { useCallback } from 'react'

const ListPaging = (pageprops) => {
  const {page, setPage, lastPage} = pageprops
  // console.log(lastPage);
  const onSetPage = (e) => {
    e.preventDefault();
    setPage(parseInt(e.target.text));
  }

  const pagingNumMake = useCallback((pages) => {
    let arr = [];
    let cN = '';
    // todo!! : 선택한 페이지 번호의 텍스트와 현재 페이지가 일치하면 bold가 주어진 스타일 주기
    for (let i = page<3 ? 1 : pages-2 ; pages+2>=lastPage ? i<=lastPage : i <= page+2; i++) {
      if(pages===i) cN='currentPage'
      else cN ='';
      arr.push(<a className={`pagingNumBtn ${cN}`} href={i} onClick={onSetPage} >{i}</a>)
    } return arr;
  },[page])

  return (
    <div className='list-contentList-paging'>
      <button
        disabled={page === 1 && true}
        onClick={() => { setPage(1) }}>첫페이지
      </button>
      <button
        disabled={page === 1 && true}
        onClick={() => { setPage(page - 1) }}>이전 페이지
      </button>
      {pagingNumMake(page)}
      <button
        disabled={page === lastPage && true}
        onClick={() => { setPage(page + 1) }}>다음 페이지
      </button>
      <button
        disabled={page === lastPage && true}
        onClick={() => { setPage(lastPage) }}>마지막페이지
      </button>
    </div>
  )
}

export default ListPaging