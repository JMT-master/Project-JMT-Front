import React from 'react';
import style from '../css/Paging.css'

const Paging = ({totalPages, currentPage, onPageChange}) => {

  return (
    <div>
      <button onClick={()=>onPageChange(1)} className='paging-btn'>첫 페이지</button>
      {Array.from({length:totalPages}).map((id,index)=> (
        <button key={index} onClick={() => onPageChange(index + 1)}
        style={{fontWeight:currentPage === index + 1 ? 'bold' : 'normal'}}
        className='paging-btn'>
          {index+1}</button>
      ))}
      <button className='paging-btn' onClick={()=>onPageChange(totalPages)}>마지막 페이지</button>
    </div>
  )
}
export default Paging;