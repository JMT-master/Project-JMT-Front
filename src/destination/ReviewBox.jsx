import React from 'react'

const ReviewBox = ({ item }) => {
  const date = new Date(item.date);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  return (
    <div className='reviewBox'>
      <div className='reviewBox-header'>
        <img src={item.profileImg} alt="" />
        <div>{item.id}</div>
        <div>{`${year}/${month}/${day}`}</div>
      </div>
      <div className='reviewBox-content'>
        <img src={item.img} alt="" />
        <p>{item.content}</p>
      </div>
    </div >
  )
}

export default ReviewBox