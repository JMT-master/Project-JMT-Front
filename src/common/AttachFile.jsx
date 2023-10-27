import React from 'react'
import style from '../css/attachFile.css'
import { AiFillFile } from 'react-icons/ai'

const AttachFile = (props) => {
  const test = props.data;
  console.log("test : ", test);
  return (
    <div className='attachfile-container'>
      <div className='attachfile-icon-box'>
        <div className='attachfile-icon-info'>
          <AiFillFile style={{width:'50px', height:'30px'}} ></AiFillFile>
          <p className='attachfile-name'>첨부파일</p>
        </div>
        <ul className='attachfile-data-ul'>
          {
            test !== undefined ? 
            test.map(data => {
              return <li className='attachfile-data-li'><a href='/'>{data.fileSendKey}</a></li>
            }): <li></li>
          }
        </ul>
      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default AttachFile