import React, { useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import '../css/DetailInfo.scss'
import { ReveiwList } from '../data/ReviewList'
import ReviewBox from './ReviewBox'
import ListPaging from './ListPaging'


const DetailInfo = () => {
  const location = useLocation();
  const [tabState, setTabState] = useState({
    contentVisible: true,
    photoVisible: false,
    reviewVisible: false,
  });
  const { img, tag, address, phoneno, title, content } = location.state;
  console.log('img: ', img);
  const { id } = useParams();
  console.log('id: ', id);

  const toggleTab = (tab) => {
    setTabState((prevState) => ({
      ...prevState,
      [tab]: !prevState[tab],
    }));
  };

  const review = useRef(ReveiwList);
  const size = review.current.length;
  for (let i = 0; i < size; i++) {
    review.current[i].contentsid = id;
  }

  const user = useRef([{
    id: 'pkw',
    name: '박기웅',
    profileImg: '../img_non_profile.png'
  },
  {
    id: 'pkw',
    name: '박기웅',
    profileImg: ''
  },
  ]);

  const [page, setPage] = useState(1);
  const offset = 12;
  const pageNum = (page - 1) * offset;
  const lastPage = useRef(1);

  lastPage.current = Math.floor(size % offset > 0 ? (size / offset) + 1 : size / offset);

  return (
    <div className='detail'>
      <div className='detail-header'>
        <div className='detail-headerPhoto' style={{
          backgroundImage: `url(${img})`
        }}></div>
        <div className='detail-headerInfo'>
          <h1>{title}</h1>
          <p className='detail-headerInfo-p gray sf'>{tag.replace(/, /gi, ',').split(',').map(tag => ('#' + tag + ' '))}</p>
          <div className='detail-headerInfo-baseInfo'>
            <h3>기본 정보</h3>
            <hr />
            <p><span className='gray sf'>주소 : </span>{address}</p>
            <p><span className='gray sf'>연락처 : </span>{phoneno !== '--' || null ? phoneno : ''}</p>
          </div>
        </div>
      </div>

      <div className='detail-content'>
        <div className='detail-contentInfo'>
          <div className='detail-contentInfo-tab' onClick={() => { toggleTab('contentVisible') }}>상세정보 탭</div>
          <div className='detail-contentInfo-content' id='content' style={{ display: tabState.contentVisible ? 'block' : 'none' }}>
            <p>{content}</p>
          </div>
        </div>

        <div className='detail-contentPhoto'>
          <div className='detail-contentPhoto-tab' onClick={() => { toggleTab('photoVisible') }}>사진({review.current.filter(item => item.contentsid === id).length})</div>
          <div className='detail-contentPhoto-content' id='photo' style={{ display: tabState.photoVisible ? 'inline-block' : 'none' }}>
            {
              review.current.filter(item => item.contentsid === id).map(item =>
                <div>
                  <img src={item.img} alt="" />
                </div>
              )
            }
          </div>
        </div>

        <div className='detail-contentReview'>
          <div className='detail-contentReview-tab' onClick={() => { toggleTab('reviewVisible') }}>리뷰({review.current.filter(item => item.contentsid === id).length})</div>
          <div className='detail-contentReview-content' id='review' style={{ display: tabState.reviewVisible ? 'grid' : 'none' }}>
            {
              review.current.filter(item => item.contentsid === id).slice(pageNum, offset * page).map(item =>(
                <div className='reviewListBox'>
                  <ReviewBox item={item} user={user} />
                </div>)

              )

            }
            <ListPaging page={page} setPage={setPage} lastPage={lastPage.current} ></ListPaging>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailInfo