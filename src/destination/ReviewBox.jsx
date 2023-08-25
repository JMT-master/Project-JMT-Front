import React from 'react'

const ReviewBox = ({ item, user }) => {
  console.log('item: ', item);
  return (
    <div className='reviewBox'>
      <div className='reviewBox-header'>
        <img src={user.current[0].profileImg} alt="" />
        <div>{item.id}</div>
        <div>{item.date}</div>
      </div>
      <div className='reviewBox=content'>{item.content}</div>
    </div>
  )
}

export default ReviewBox