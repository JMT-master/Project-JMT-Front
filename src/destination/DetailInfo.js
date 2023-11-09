import React, {useEffect, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import '../css/DetailInfo.scss'
import ReviewBox from './ReviewBox'
import ListPaging from './ListPaging'
import {call, getCookie} from "../common/ApiService";
import axios from "axios";
import {API_BASE_URL} from "../common/ApiConfig";
import Swal from "sweetalert2";


const DetailInfo = () => {
  const accessToken = getCookie("ACCESS_TOKEN");
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
  const [toggleData, setToggleData] = useState(false)
  // const modal

  const toggleTab = (tab) => {
    setTabState((prevState) => ({
      ...prevState,
      [tab]: !prevState[tab],
    }));
  };


  const [modal, setModal] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const openModal = (item) => {
    setSelectedItem(item);
    setModal(!modal);
  }

  const closeModal = () => {
    setSelectedItem(null);
    setModal(false);
  }

  const [page, setPage] = useState(0);
  const offset = 5;
  const pageNum = (page - 1) * offset;
  const [lastPage, setLastPage] = useState(0);

  const [file, setFile] = useState([]);


  //파일 업로드
  const fileUpload = (e, data) => {
    let uploadFile = null
    uploadFile = e.target.files[0];
    let value = e.target.value;
    let result = value.split('\\').reverse()[0];
    document.getElementById('review-file-text').value = result;
    setFile(uploadFile);
  }

  //리뷰 작성 버튼용 핸들러
  const onSubmitClick = () => {
    const content = document.getElementById('review-content').value;
    console.log("content : " + content.length)
    const newItem = {
      reviewContent: content,
      reviewContentId: id,
    };

    var blank_pattern = /^\s+|\s+$/g;
    if (content === '' || content.replace(blank_pattern, '') === "") {
      Swal.fire({
        icon: 'warning',
        title: '내용',
        text: '리뷰 내용이 없습니다.'
      });
      return;
    }

    writeReview(newItem);
  };

  //리뷰 작성
  const writeReview = async (item) => {
    const formData = new FormData();

    file && formData.append('file', file);
    formData.append('data', new Blob([JSON.stringify(item)], {
      type: "application/json"
    }));

    await axios({
      method: 'POST',
      url: API_BASE_URL + '/review',
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": 'Bearer ' + accessToken
      },
      data: formData,
      params: {page: page - 1, size: 5}
    }).then(response => {
      setLastPage(response.data.totalPages)
      setReviewList([]);
      let data = []
      data = response.data.content
      data.forEach((item) => {
        axios({
          method: 'POST',
          url: API_BASE_URL + "/review/viewFile",
          data: item,
          responseType: 'blob',

        }).then(responseFile => {
          const blob = new Blob([responseFile.data]);
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            item = {...item, imgData: reader.result ? reader.result : ""}
            setReviewList((prevReviewList) => {
              const updatedList = [...prevReviewList, item];
              // regDate를 기준으로 내림차순으로 정렬
              updatedList.sort((a, b) => new Date(b.reviewIdx) - new Date(a.reviewIdx));
              return updatedList;
            });
          }
        }).catch((error) => {
          console.log(error);
        });
      });
      document.getElementById('review-file-text').value = null;
      document.getElementById('review-content').value = "";
      document.getElementById('review-file').value = null;
      if (response.status === 200) {
        Swal.fire({
          icon: 'info',
          title: '작성되었습니다!',
          showCloseButton: true,
          confirmButtonText: '확인',
        })
      }
    });

    setFile([])
  }


  const deleteHandler = (idx) => {
    Swal.fire({
      icon: 'question',
      title: '삭제하시겠습니까?',
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: '확인',
      denyButtonText: '취소',

    }).then(response => {
      if (response.isConfirmed) {
        call("/review", "Delete", {reviewIdx: idx})
           .then(response => {
             console.log("delete response : " + JSON.stringify(response))
             let tmpList = reviewList.filter(review => (review.reviewIdx !== response.reviewIdx))
             setReviewList([...tmpList])
             console.log("change toggle")
             setToggleData((prevToggleData) => !prevToggleData);
           })
      }
    })
  }

  // const updateHanlder = (reviewForm) => {
  //   call("/review", "Put", reviewForm)
  //      .then(response => {
  //        console.log("update response : " + JSON.stringify(response))
  //        setReviewList(response.content);
  //      })
  // }
  const updateHanlder = (reviewForm) => {
    const formData = new FormData();

    file && formData.append('file', file);
    formData.append('data', new Blob([JSON.stringify(reviewForm)], {
      type: "application/json"
    }));

    axios({
      method: 'PUT',
      url: API_BASE_URL + '/review',
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": 'Bearer ' + accessToken
      },
      data: formData
    }).then(response => {
      setReviewList([]);
      let data = []
      data = response.data.content
      data.forEach((item) => {
        console.log("image item : " + item)
        axios({
          method: 'POST',
          url: API_BASE_URL + "/review/viewFile",
          data: item,
          responseType: 'blob',
        }).then(responseFile => {
          const blob = new Blob([responseFile.data]);
          console.log("blob : " + blob)
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            item = {...item, file: file, imgData: reader.result}
            setReviewList((prevReviewList) => [...prevReviewList, item]);
          }

        }).catch((error) => {
          console.log(error);
        });
      });
      document.getElementById('review-file-text').value = null;
      document.getElementById('review-content').value = "";
      document.getElementById('review-file').value = null;
      if (response.status === 200) {
        Swal.fire({
          icon: 'info',
          title: '수정되었습니다!',
          showCloseButton: true,
          confirmButtonText: '확인',
        })
      }
    });
  }

  const makeReviewList = () => {
    let reviews = []
    reviewList.forEach((item) => {
      reviews.push(
         <div>
           <ReviewBox item={item} setFile={setFile} fileUpload={fileUpload} setSelectedItem={setSelectedItem}
                      deleteHandler={deleteHandler} updateHanlder={updateHanlder}/>
           <hr/>
         </div>
      )
    })
    return reviews
  }

  //ㅣ전체 글 읽어오기
  useEffect(() => {
    call("/review/read", "POST", {reviewContentId: id}, page - 1, 5)
       .then((response) => {
         // console.log("페이징 response : "+JSON.stringify(response))
         setReviewList([]);
         setLastPage(response.totalPages)
         response.content.forEach((item) => {
           // console.log("페이징 item : "+JSON.stringify(item))
           axios({
             method: 'POST',
             url: API_BASE_URL + "/review/viewFile",
             data: item,
             responseType: 'blob',
           }).then(responseFile => {
             const blob = new Blob([responseFile.data]);
             console.log("blob : " + blob)
             const reader = new FileReader();
             reader.readAsDataURL(blob);
             reader.onloadend = () => {
               item = {...item, imgData: reader.result}
               setReviewList((prevReviewList) => {
                 const updatedList = [...prevReviewList, item];
                 // regDate를 기준으로 내림차순으로 정렬
                 updatedList.sort((a, b) => new Date(b.reviewIdx) - new Date(a.reviewIdx));
                 return updatedList;
               });
             }
             // console.log("페이징 List : "+JSON.stringify(reviewList))
           }).catch((error) => {
             console.log(error);
           });
         });

       })
       .catch((error) => {
         console.log(error);
       });
  }, [page, toggleData]);


  // console.log(modal)
  reviewList.forEach(item => {
    console.log("현재 페이지" + item.page)
  })

  return (
     <div className='detail'>
       <div className='detail-header'>
         <div className='detail-headerPhoto' style={{
           backgroundImage: `url(${img && img})`
         }}></div>
         <div className='detail-headerInfo'>
           <h1>{title && title}</h1>
           <p className='detail-headerInfo-p gray sf'>{tag && tag.replace(/, /gi, ',').split(',').map(tag => ('#' + tag + ' '))}</p>
           <div className='detail-headerInfo-baseInfo'>
             <h3>기본 정보</h3>
             <hr/>
             <p><span className='gray sf'>주소 : </span>{address && address}</p>
             <p><span className='gray sf'>연락처 : </span>{phoneno && phoneno !== '--' || null ? phoneno && phoneno : ''}
             </p>
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
           }}>사진</h2>
           <div className='detail-contentPhoto-content' id='photo'
                style={{display: tabState.photoVisible ? 'grid' : 'none'}}>
             {reviewList && reviewList.map(item => {
                  if (item.imgData != "data:application/octet-stream;base64,") {
                    return (
                       <div className="review-imgBox" key={item.id} onClick={() => {
                         openModal(item)
                       }}>
                         <img src={item.imgData} alt={item.id}/>
                       </div>
                    )
                  }
                }
             )
             }
           </div>
         </div>

         <div className='detail-contentReview'>
           <h2 className='detail-contentReview-tab' onClick={() => {
             toggleTab('reviewVisible')
           }}>리뷰</h2>
           <div className='detail-contentReview-content' id='review'
                style={{display: tabState.reviewVisible ? 'grid' : 'none'}}>
             <div className="review-writeBox" style={{display: accessToken ? 'grid' : 'none'}}>
               <div></div>
               <textarea name="review-content" id="review-content" cols="60"
                         rows="3"></textarea>
               <div style={{justifySelf: "start"}} className='file-attach reviewUpload'>
                 <input placeholder='첨부파일' id='review-file-text' readOnly></input>
                 <label htmlFor='review-file' className='btn-upload'>파일 업로드</label>
                 <input type="file" name='review-file' id='review-file'
                        accept='.jpg, .jpeg, .png'  // image 파일만 허용
                        onChange={fileUpload}
                 />
               </div>
               <div className="review-btnBox">
                 <button className="oBtn review-writeBtn" style={{display: "flex"}} onClick={onSubmitClick}
                         type="submit">리뷰 올리기
                 </button>
               </div>
             </div>
             <hr/>
             <div className='reviewListBox'>
               {
                 makeReviewList()
               }
             </div>
             <hr/>
             <ListPaging page={page} setPage={setPage} lastPage={lastPage}></ListPaging>
           </div>
         </div>
       </div>
       {modal &&
          <div className="modalBox" onClick={closeModal}>
            <div className="modalBody">
              <img src={selectedItem.imgData} alt="Selected"/>
              <ReviewBox item={selectedItem} modal={true}/>
            </div>
          </div>
       }
       {imgModal &&
          <div className="modalBox" onClick={closeModal}>
            <div className="modalBody">
              <img src={selectedItem.imgData} alt="Selected"/>
            </div>
          </div>
       }
     </div>
  )
}

export default DetailInfo