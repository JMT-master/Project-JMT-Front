import React from 'react'

const ReviewBox = ({ item, user }) => {
  console.log('item: ', item);
  return (
    <div className='testimg'>
      <div>{item.date}</div>
      <div>
        <img src={user.current[0].profileImg} alt="" />123
      </div>
    </div>
  )
}

export default ReviewBox