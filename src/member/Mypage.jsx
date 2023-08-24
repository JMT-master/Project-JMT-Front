import React from 'react'
import '../css/myPage.css'

const Mypage = () => {
  return (
    <div className='myPageContainer'>
      <div className='myPageHeader'>
        <div className='myPageHeader-profile'>
          <img className='myPageHeader-profile-img' src="../images/user.jpg" alt="" />
          <div className='myPageHeader-profile-name'>이름</div>
        </div>
        <div>
          <ul className='myPageHeader-ul'>
            <li className='myPageHeader-li'>
              <div className='myPageHeader-li-count'>100</div>
              <div>나의 일정</div>
            </li>
            <li className='myPageHeader-li'>
              <div className='myPageHeader-li-count'>100</div>
              <div>찜한 일정</div>
            </li>
            <li className='myPageHeader-li'>
              <div className='myPageHeader-li-count'>100</div>
              <div>찜한 여행지</div>
            </li>
          </ul>
        </div>
      </div>

      <div className='myPageChap1'>
        <button className='myPageBtn'>프로필 편집</button>
        <button className='myPageBtn'>여행 공유</button>
      </div>
      <div className='myPageChap2'>
        <ul className='myPageChap2-ul'>
          <div>
            <li className='myPageChap2-li'>+</li>
            <p className='myPageChap2-title'></p>
          </div>
          <div>
            <li className='myPageChap2-li'></li>
            <p className='myPageChap2-title'>제목 : ....</p>
          </div>
          <div>
            <li className='myPageChap2-li'></li>
            <p className='myPageChap2-title'>제목 : ....</p>
          </div>
          <div>
            <li className='myPageChap2-li'></li>
            <p className='myPageChap2-title'>제목 : ....</p>
          </div>
        </ul>
      </div>
      <div className='myPageImage'>
        <ul className='myPageImage-ul'>
          <li className='myPageImage-ul-li'></li>
          <li className='myPageImage-ul-li'></li>
          <li className='myPageImage-ul-li'></li>
          <li className='myPageImage-ul-li'></li>
          <li className='myPageImage-ul-li'></li>
          <li className='myPageImage-ul-li'></li>
          <li className='myPageImage-ul-li'></li>
          <li className='myPageImage-ul-li'></li>
          <li className='myPageImage-ul-li'></li>
          <li className='myPageImage-ul-li'></li>
          <li className='myPageImage-ul-li'></li>
          <li className='myPageImage-ul-li'></li>
        </ul>
      </div>
    </div>
  )
}

export default Mypage