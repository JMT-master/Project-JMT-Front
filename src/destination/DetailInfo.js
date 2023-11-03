import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import '../css/DetailInfo.scss'
import {ReveiwList} from '../data/ReviewList'
import ReviewBox from './ReviewBox'
import ListPaging from './ListPaging'
import {call} from "../common/ApiService";


const DetailInfo = () => {
  const location = useLocation();
  const [tabState, setTabState] = useState({
    contentVisible: true,
    photoVisible: false,
    reviewVisible: false,
    reviewWriteVisible: false
  });
  const {img, tag, address, phoneno, title, content} = location.state;
  const {id} = useParams();
  const [reviewList, setReviewList] = useState([]);

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


  const [page, setPage] = useState(1);
  const offset = 12;
  const pageNum = (page - 1) * offset;
  const lastPage = useRef(1);

  lastPage.current = Math.floor(size % offset > 0 ? (size / offset) + 1 : size / offset);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const content = formData.get('review-content');

    const jsonForm = {
      // idx: idx,
      reviewContent: content,
      reviewContentId : id,
      // reviewImg : img
    }

    call("/review", "POST", jsonForm).then(response =>{
      let tmpList = reviewList;
      setReviewList([response,...tmpList]);
    })
  }

  const deleteHandler = (idx) => {
    call("/review", "Delete", {reviewIdx: idx})
       .then(response =>{
         let tmpList = reviewList.filter(review => (review.reviewIdx !== response.reviewIdx))
         setReviewList([...tmpList])
       })
  }

  const updateHanlder = (reviewForm) =>{
    call("/review", "Put", reviewForm)
       .then(response => {
         setReviewList(response);
       })
  }

  const makeReviewList = () => {
    let reviews = []
    reviewList.forEach((item) => {
      reviews.push(
         <ReviewBox item={item} deleteHandler={deleteHandler}/>
      )})
    return reviews
  }

  useEffect(() => {
    call("/review/read", "POST", {reviewContentId: id})
       .then((response) => {
         console.log("responsereview: " + JSON.stringify(response));
         setReviewList(response);
         console.log("나와라 리뷰 :" + reviewList);
       })
  }, []);

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
             <hr/>
             <p><span className='gray sf'>주소 : </span>{address}</p>
             <p><span className='gray sf'>연락처 : </span>{phoneno !== '--' || null ? phoneno : ''}</p>
           </div>
         </div>
       </div>

       <div className='detail-content'>
         <div className='detail-contentInfo'>
           <h2 className='detail-contentInfo-tab' onClick={() => {
             toggleTab('contentVisible')
           }}>상세정보</h2>
           <div className='detail-contentInfo-content' id='content'
                style={{display: tabState.contentVisible ? 'block' : 'none'}}>
             <hr/>
             <p>{content} 같은 이상 내려온 고동을 철환하였는가? 과실이 청춘이 주며, 어디 부패뿐이다. 내려온 튼튼하며, 사람은 있을 용감하고 위하여서, 몸이 봄바람이다. 위하여, 평화스러운
               과실이 공자는 때까지 보라. 밝은 생의 우리의 따뜻한 생생하며, 사는가 미묘한 하였으며, 듣는다. 주는 어디 우리는 끓는다. 기관과 몸이 우리의 청춘 청춘을 봄바람이다. 평화스러운 청춘의
               그들의 보이는 창공에 속에서 힘차게 바이며, 청춘을 있는가? 어디 보내는 곧 소리다.이것은 밝은 이상의 힘차게 곳이 칼이다. 열락의 힘차게 거친 구하지 목숨을 청춘이 역사를 목숨이 것이다.
               오직 곳으로 모래뿐일 이 끓는 물방아 황금시대다. {content}</p>
           </div>
         </div>

         <div className='detail-contentPhoto'>
           <h2 className='detail-contentPhoto-tab' onClick={() => {
             toggleTab('photoVisible')
           }}>사진({review.current.filter(item => item.contentsid === id).length})</h2>
           <div className='detail-contentPhoto-content' id='photo'
                style={{display: tabState.photoVisible ? 'grid' : 'none'}}>
             {
               review.current.map(item =>
                  <div>
                    <img src={item.img} alt={item.id}/>
                  </div>
               )
             }
           </div>
         </div>

         <div className='detail-contentReview'>
           <h2 className='detail-contentReview-tab' onClick={() => {
             toggleTab('reviewVisible')
           }}>리뷰({review.current.filter(item => item.contentsid === id).length})</h2>
           <div className='detail-contentReview-content' id='review'
                style={{display: tabState.reviewVisible ? 'grid' : 'none'}}>
             <button style={{display: tabState.reviewWriteVisible ? 'none' : 'grid'}} onClick={(e) => {
               e.preventDefault();
               toggleTab('reviewWriteVisible')
             }}>리뷰 작성하기
             </button>
             <form onSubmit={handleFormSubmit} className="review-writeBox"
                   style={{border: "1px black", display: tabState.reviewWriteVisible ? 'grid' : 'none'}}>
               <div>리뷰 작성</div>
               <textarea style={{display: "flex"}} name="review-content" id="review-content" cols="80"
                         rows="5"></textarea>
               <input style={{justifySelf: "end"}} type="file"/>
               <button type="submit">리뷰 올리기</button>
             </form>
             <hr/>
             <div className='reviewListBox'>
               {
                 makeReviewList()
               }
               <button type="button">더미 데이터 insert</button>
             </div>
             <hr/>
             <ListPaging page={page} setPage={setPage} lastPage={lastPage.current}></ListPaging>
             {/*  일단 커밋용*/}
           </div>
         </div>
       </div>
     </div>
  )
}

export default DetailInfo