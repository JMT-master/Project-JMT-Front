import './css/App.scss';
import $ from 'jquery';
import Slider from 'react-slick';
import {Link, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import JoinUser from './member/JoinUser';
import Curator from './thema/Curator';
import Mypage from './member/Mypage';
import TravelSchedule from './travelschedule/TravelSchedule';
import Login from './member/Login';
import NoticeBoard from './notice/NoticeBoard';
import NoticeBoardDetail from './notice/NoticeBoardDetail';
import {useEffect, useMemo, useRef, useState} from 'react';
import {noticeData} from './data/Data';
import QnABoard from './notice/QnABoard';
import QnaBoardDetail from './notice/QnaBoardDetail';
import {FesListNoImg} from './trableinfo/Festival';
import Knowledge from './trableinfo/Knowledge';
import KnowledgeDetail from './trableinfo/KnowledgeDetail';
import KnowledgeWrite from './trableinfo/KnowledgeWrite';
import TourList from './destination/TourList';
import DetailInfo from './destination/DetailInfo';
import Traffic from './trableinfo/Traffic';
import SelectSchedule from './travelschedule/SelectSchedule';
import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from './common/Themes';
import {GlobalStyles} from './common/GlobalStyles';
import {useDarkMode} from './common/useDarkMode';
import Toggle from './common/Toggle';
import YouTube from 'react-youtube'
import data from "./data/festival.json";
import {AiFillYoutube, AiOutlineBell} from 'react-icons/ai';
import {MdCardTravel, MdFestival} from 'react-icons/md';
import QnaWrite from './notice/QnaWrite';
import ChatRoom from './trableinfo/ChatRoom';
import OnModalComp from "./common/OnModalComp";
import ChatDetail from './trableinfo/ChatDetail';
import JoinUserValidateChk from './member/JoinUserValidateChk';
import NotificationList from "./common/Notification";
import axios from "axios";
import {deleteCookie, getCookie, sseSource} from "./common/ApiService";
import NoticeWrite from './notice/NoticeWrite';
import TravelPdf from './travelschedule/TravelPdf';
import LoginTimer from './member/LoginTimer';
import moment from 'moment';
import NoticeUpdate from "./notice/NoticeUpdate";

function App(factory, deps) {
  const [newNoticedata, setNewNoticeData] = useState(noticeData);
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [notifications, setNotifications] = useState()
  const [modalOpen, setModalOpen] = useState(false);
  const notifyCount = useMemo(() => {
    let count = 0;
    notifications && notifications.length != 0 && notifications.forEach((notify) => {
      if (notify.yn === "Y") {
        count += 1;
      }
    });
    return count; // count를 반환해야 합니다.
  }, [notifications]);
  const isSub = useRef(true);
  console.log("count : " + notifyCount)

//채팅 관련
  const {pathname} = useLocation();
  const isChatRoom = pathname.includes("/chat/room");

  const modalToggle = () => {
    setModalOpen(!modalOpen);
  }
  const [notifications, setNotifications] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const localStorage = sessionStorage.getItem('loginState');
    const cookie = getCookie('ACCESS_TOKEN');
    if (localStorage === 'false' && cookie !== null && cookie !== undefined) {
      sessionStorage.setItem('ACCESS_TOKEN', getCookie('ACCESS_TOKEN'));
      deleteCookie('ACCESS_TOKEN');
    }
  }, []);

  const send = async (type, nav) => {
    const accessToken = getCookie("ACCESS_TOKEN");
    console.log("accesTK : " + accessToken)
    await axios({
      method: 'POST',
      url: `http://localhost:8888/${type}/send`,
      data: {
        "content": "테스트3",
        "url": "테스트용url",
        "yn": "y"
      },
      headers: {
        Authorization: "Bearer " + accessToken,
      }
    })
       .then(function (response) {
         console.log("현재 로그인된 아이디 " + JSON.stringify(response.data))
         // call("/notification",
         //    "POST",
         //    null
         //    // 아이디는 백에서 토큰으로 확인
         // )
         //    .then((response) => {
         //      setNotifications(response);
         //
         //    })
         //    .catch((error) => {
         //      console.log(error);
         //    })
       })
       .catch(function (error) {
         console.log('error', error);
       });
  };
  useEffect(() => {
    if (isSub.current) sseSource("sub", setNotifications, notifyCount);
    isSub.current = false;
  }, []);

  if (loading === true) {
    return (
       <></>
    )
  }

  return (
    <ThemeProvider theme={themeMode}>
        <GlobalStyles/>
        <HeaderTop theme={theme} themeToggler={themeToggler} notifications={notifications}
                  setNotifications={setNotifications} send={send}/>
       <Routes>
         <Route path='/' element={<Header></Header>}></Route>
         <Route path="/joinUser" element={<JoinUser></JoinUser>}></Route>
         <Route path="/joinUser/email/validateCheck/:userid"
                element={<JoinUserValidateChk></JoinUserValidateChk>}></Route>
         <Route path="/curator" element={<Curator></Curator>}></Route>
         <Route path="/travelSchedule/:id?" element={<TravelSchedule></TravelSchedule>}></Route>
         <Route path="/mypage" element={<Mypage></Mypage>}></Route>
         <Route path="/login" element={<Login></Login>}></Route>
         <Route path="/notice" element={<NoticeBoard send={send}></NoticeBoard>}></Route>
         <Route path="/notice/admin/write" element={<NoticeWrite></NoticeWrite>}></Route>
         <Route path="/notice/:id?" element={<NoticeBoardDetail data={newNoticedata}></NoticeBoardDetail>}></Route>
         <Route path="/notice/admin/write" element={<NoticeWrite></NoticeWrite>}></Route>
         <Route path="/notice/admin/update" element={<NoticeUpdate></NoticeUpdate>}></Route>
         <Route path="/qna" element={<QnABoard></QnABoard>}></Route>
         <Route path="/qna/:id?" element={<QnaBoardDetail></QnaBoardDetail>}></Route>
         <Route path="/qna/admin/:id?" element={<QnaWrite></QnaWrite>}></Route>
         <Route path="/traffic" element={<Traffic></Traffic>}></Route>
         <Route path="/knowledge?" element={<Knowledge></Knowledge>}></Route>
         <Route path="/knowledgeDetail/:id?" element={<KnowledgeDetail></KnowledgeDetail>}></Route>
         <Route path="/knowledgeWrite" element={<KnowledgeWrite></KnowledgeWrite>}></Route>
         <Route path='/destination/:pageId' element={<TourList/>}></Route>
         <Route path='/destination/detail/:id' element={<DetailInfo/>}></Route>
         <Route path='/selectSchedule' element={<SelectSchedule></SelectSchedule>}></Route>
         <Route path='/qna/admin/write' element={<QnaWrite/>}></Route>
         <Route path='/chat/room' element={<ChatRoom/>}></Route>
         <Route path='/chat/rooms'></Route>
         <Route path='/chat/room/:roomId?' element={<ChatDetail/>}></Route>
         <Route path='/travel-schedule' element={<TravelPdf></TravelPdf>}></Route>
         <Route path='/member/update' element={<JoinUser></JoinUser>}></Route>
       </Routes>

       {isChatRoom ? null : (
          <div>
         <div className="notifyContainer">
           {<div className="numOfNotify">{notifyCount}</div>}
           <button className={modalOpen === false ? "notifyToggleBtn" : "notifyToggleBtnOff"} type="button"
                   onClick={modalToggle}>
             <AiOutlineBell className="notifyIcon"/>
           </button>
         </div>
         <OnModalComp setModalOpen={setModalOpen}
                      comp={<NotificationList notifications={notifications} setNotifications={setNotifications}
                                              modalOpen={modalOpen}/>}></OnModalComp>
         <button type="button" className="testBtn" onClick={() => {
           send("notification")
         }}>테스트용 send
         </button>
       </div>
       )}

     </ThemeProvider>
  );
}

function HeaderTop(props) {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const accessToken = getCookie("ACCESS_TOKEN");
  // const refreshToken = localStorage.getItem('REFRESH_TOKEN');
  const {notifications, setNotifications, send} = props;
  const [chkTime, setChkTime] = useState();


  useEffect(() => {
    sseSource("sub", setNotifications);
    if(localStorage.getItem("loginTime")) {
      console.log("탔어?");
      setChkTime(moment(localStorage.getItem("loginTime")));
    }
}, [accessToken]);
  //알람 모달 관련

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(!modalOpen);
  }

  //채팅 화면 관련
  if(pathname.includes("/chat/room")) {
    return <div></div>;
  }

  const handleMouseOverDes = () => {
    $(".destination-list").show();
  };
  const handleMouseOutDes = () => {
    $(".destination-list").hide();
  };
  const handleMouseOverInfo = () => {
    $(".myTrableInfo-list").show();

  };
  const handleMouseOutInfo = () => {
    $(".myTrableInfo-list").hide();
  };
  const handleMouseOverNoti = () => {
    $(".notice-list").show();

  };
  const handleMouseOutNoti = () => {
    $(".notice-list").hide();
  };

  const state = getCookie('ACCESS_TOKEN');

  // token 처리
  const handleClick = () => {

    if (state === undefined || state === null) { // login
      navigate("/login");
    } else { // logout
      console.log('pathname : ', pathname);
      deleteCookie('ACCESS_TOKEN');
      localStorage.removeItem("loginTime");
      window.location.reload();
    }
  };


 //채팅 관련 새 창 띄우는 코드
 const handleChatLinkClick = () => {
  const width = 800; // 원하는 너비
  const height = 600; // 원하는 높이
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  window.open('/chat/room', '_blank', `width=${width},height=${height},left=${left},top=${top}, status=no,toolbar=no,scrollbars=no`);
};
  useEffect(() => {
    if(accessToken !== undefined && accessToken !== null) {
      // loginExpired().then(() => {
      //   console.log('탐???????');
        sseSource("sub", setNotifications);
        if(localStorage.getItem("loginTime")) {
          setChkTime(moment(localStorage.getItem("loginTime")));
        }
      // });
    }
  }, [accessToken]);

  return (
     <div className={`header-main-position ${pathname === '/' ? 'headernoCh' : 'headerCh'}`}>
       <div className="headerTop">
         <button type="button" onClick={showModal} style={{justifyContent: "left"}}>
           <AiOutlineBell className="headerNotification"/>
         </button>
         <button type="button" className="testBtn" onClick={() => {
           send("notification")
         }}>테스트용 send
         </button>
         {
           chkTime === undefined || chkTime === '' ?
              <></> :
              <>
                <LoginTimer theme={props.theme} chkTime={chkTime}></LoginTimer>
              </>
         }
         <Link to="/mypage" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>
           {(state === undefined || state === null) ? '' : '마이페이지'}
         </Link>
         <span>
          <a href={() => false} onClick={() => handleClick()}
             className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`} id="loginToggle"
          >{(state === undefined || state === null) ? '로그인' : '로그아웃'}</a>
        </span>
         <Toggle theme={props.theme} toggleTheme={props.themeToggler}/>
       </div>
       <div className="header-container">
         <Link to="/">
           <div className="header-image"><img id="jeju-image" src="../images/JMT.jpg" alt=""/></div>
         </Link>
         <div className="headerSell">
           <ul id="destination" onMouseOver={handleMouseOverDes} onMouseOut={handleMouseOutDes}>
             <div >
              <a className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>여행지</a>
              </div>
             <div className='destination-list'>
               <li><Link to='/destination/tour'
                         className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>관광지</Link></li>
               <li><Link to='/destination/restaurant'
                         className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>음식</Link></li>
               <li><Link to='/destination/lodge'
                         className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>숙박</Link></li>
             </div>
           </ul>
           <ul id="tema">
             <div>
               <a><Link to="/curator" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>테마</Link></a>
             </div>
           </ul>
           <ul id="myTrab">
             <div>
               <span><Link to="/selectSchedule"
                           className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>여행일정</Link></span>
             </div>
           </ul>
           <ul id="myTrableInfo" onMouseOver={handleMouseOverInfo} onMouseOut={handleMouseOutInfo}>
             <div >
              <a className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>여행정보</a></div>
             <div className='myTrableInfo-list'>
               <li><Link to="/traffic" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>교통
                 혼잡도</Link></li>
               <li>
                <a onClick={handleChatLinkClick} className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>채팅 제주
                  </a>
                {/* <Link to="/chat/room" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>채팅 제주
                 </Link> */}
                 </li>
               <li><Link to="/knowledge" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>관광
                 지식in</Link></li>
             </div>
           </ul>
           <ul id="notice" onMouseOver={handleMouseOverNoti} onMouseOut={handleMouseOutNoti}>
             <div >
              <a className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>공지사항</a></div>
             <div className='notice-list'>
               <li><Link to="/notice"
                         className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>공지사항</Link></li>
               <li><Link to="/qna" className={`${props.theme === 'light' ? 'blackText' : 'whiteText'}`}>Q&A</Link>
               </li>
             </div>
           </ul>
         </div>
       </div>
     </div>
  )
}

function Header() {
  const navigate = useNavigate();
  const [changeImage, setChangeImage] = useState(0);

  // const handleMouseOver = () => {
  //   $(".destination-list").show();
  //   $(".myTrableInfo-list").show();
  //   $(".notice-list").show();

  // };

  // const handleMouseOut = () => {
  //   $(".destination-list").hide();
  //   $(".myTrableInfo-list").hide();
  //   $(".notice-list").hide();
  // };

  const settings = {
    dots: false, //지정콘텐츠로 이동하는 버튼 true / false
    infinite: true, //콘텐츠의 끝까지 갔을때 처음 콘텐츠로 돌아와서 반복
    speed: 1500, // 콘텐츠 넘어가는 속도
    autoplay: true,
    fade: true, //사라지는 애니메이션 없으면 slide애니메이션
    autoplaySpeed: 3000,
    slidesToShow: 1, //한 화면에 보이는 콘텐츠 개수
    slidesToScroll: 1 //한번에 넘어가는 콘텐츠 수 ex)2로 지정시 2개씩 넘어감
  };

  const onChnImage = (e) => {
    setChangeImage(Number(e.target.value));
  };

  return (
     <>
       <div className='header-slider'>
         <Slider {...settings} className='header-slider-divs'>
           <div className='header-slider-img1'></div>
           <div className='header-slider-img2'></div>
           <div className='header-slider-img3'></div>
           <div className='header-slider-img4'></div>
         </Slider>
       </div>
       <div className='header-body'></div>
       <div className='header-travel-Image'>
         <div className='header-travel-Image-title'>
           <MdCardTravel className='header-travel-Image-icon'></MdCardTravel>
           <p className='header-travel-Image-text'>여행지 확인</p>
         </div>
         <ul className='header-travel-Image-ul'>
           <li className=
                  {`header-travel-Image-li header-travel-Image-li-background1 ${changeImage === 0 ?
                     'header-travel-Image-li-width' : ''}`}
               value={0}
               onClick={onChnImage}>
             <div className=
                     {`header-travel-Image-li-title ${changeImage === 0 ?
                        'header-travel-Image-li-info' : 'header-travel-Image-li-info-vertical'}`}>관광지
             </div>
             <div
                className={`header-travel-Image-li-content ${changeImage === 0 ?
                   'header-travel-Image-li-info header-travel-Image-li-info-cursor' : 'header-travel-Image-li-info-title-none'}`}
                onClick={() => navigate('/destination/tour')}>원하는 관광지를 찾아보세요
             </div>
           </li>
           <li className=
                  {`header-travel-Image-li header-travel-Image-li-background2 ${changeImage === 1 ?
                     'header-travel-Image-li-width' : ''}`}
               value={1}
               onClick={onChnImage}>
             <div className=
                     {`header-travel-Image-li-title ${changeImage === 1 ?
                        'header-travel-Image-li-info' : 'header-travel-Image-li-info-vertical'}`}>음식
             </div>
             <div
                className={`header-travel-Image-li-content ${changeImage === 1 ?
                   'header-travel-Image-li-info header-travel-Image-li-info-cursor' : 'header-travel-Image-li-info-title-none'}`}
                onClick={() => navigate('/destination/restaurant')}>원하는 음식를 찾아보세요
             </div>
           </li>
           <li className=
                  {`header-travel-Image-li header-travel-Image-li-background3 ${changeImage === 2 ?
                     'header-travel-Image-li-width' : ''}`}
               value={2}
               onClick={onChnImage}>
             <div className=
                     {`header-travel-Image-li-title ${changeImage === 2 ?
                        'header-travel-Image-li-info' : 'header-travel-Image-li-info-vertical'}`}>숙박
             </div>
             <div
                className={`header-travel-Image-li-content ${changeImage === 2 ?
                   'header-travel-Image-li-info header-travel-Image-li-info-cursor' : 'header-travel-Image-li-info-title-none'}`}
                onClick={() => navigate('/destination/lodge')}>원하는 숙박를 찾아보세요
             </div>
           </li>
         </ul>

       </div>
       <div className='festival-send-content'>
         <div className='festival-send-title'><h2><span><MdFestival
            style={{width: '45px', height: '45px'}}></MdFestival></span>JMT의 최신 소식을 알아보세요</h2></div>
         <ul onClick={() => navigate('/festival')} className='main-fest'>
           <FesListNoImg data={data.data[0]}></FesListNoImg>
           <FesListNoImg data={data.data[1]}></FesListNoImg>
         </ul>
       </div>
       <div className='header-Youtube-container'>
         <div className='header-Youtube-title'>
           <AiFillYoutube className='header-Youtube-title-icon'></AiFillYoutube>
           <p className='header-Youtube-title-text'>영상으로 만나는 제주</p>
         </div>
         <ul className='header-Youtube-ul'>
           <li className='header-Youtube-li'>
             <YouTube className='header-Youtube-content'
                      videoId="nPuJ9QXGB8E" //동영상 주소
                      opts={{
                        width: "400px",
                        height: "250px",
                        playerVars: {
                          autoplay: 0, //자동 재생 여부
                          modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                          loop: 0, //반복 재생
                          // playlist: "auAQ_A--c5I", //반복 재생으로 재생할 플레이 리스트
                        },
                      }}
                      onReady={(e) => {
                        e.target.mute(); //소리 끔
                      }}
             />
           </li>
           <li className='header-Youtube-li'>
             <YouTube className='header-Youtube-content'
                      videoId="ESF7SDWBtH0" //동영상 주소
                      opts={{
                        width: "400px",
                        height: "250px",
                        playerVars: {
                          autoplay: 0, //자동 재생 여부
                          modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                          loop: 0, //반복 재생
                          // playlist: "auAQ_A--c5I", //반복 재생으로 재생할 플레이 리스트
                        },
                      }}
                      onReady={(e) => {
                        e.target.mute(); //소리 끔
                      }}
             />
           </li>
           <li className='header-Youtube-li'>
             <YouTube className='header-Youtube-content'
                      videoId="PMBa2F44jxU" //동영상 주소
                      opts={{
                        width: "400px",
                        height: "250px",
                        playerVars: {
                          autoplay: 0, //자동 재생 여부
                          modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                          loop: 0, //반복 재생
                          // playlist: "auAQ_A--c5I", //반복 재생으로 재생할 플레이 리스트
                        },
                      }}
                      onReady={(e) => {
                        e.target.mute(); //소리 끔
                      }}
             />
           </li>
         </ul>
       </div>

     </>
  );
}

function Footer() {
  const {pathname} = useLocation();
  if(pathname.includes("/chat/room")) {
    return <div></div>;
  }

  return (
     <>
       <div class={`footer-main`}>
         <div className='footer-container'>
           <img id="jeju-image" src="../images/JMT.jpg" alt=""/>
           <ul className='footer-Grid1'>
             <li>개인정보 처리방침</li>
             <li>이용약관</li>
             <li>틀린정보신고</li>
             <li>제주관광사진이용</li>
             <li>제주소식</li>
             <div className='footer-Grid2'>
               <p>(63122) 제주특별자치도 제주시 선덕로 23(연동) 제주웰컴센터
                 관광문의 : 제주관광공사Tel : 064-740-6000~1FAX : 064-740-6090사업자등록번호 : 616-82-21432
                 관광불편신고 : 제주안내 120콜센터(국번없이 120번)
                 Copyright©Jeju Tourism Organization, All rights reserved.

                 홈페이지에 게시된 이메일 주소가 자동수집되는 것을 거부하며, 위반시 정보통신망법에 의해 처벌될 수 있습니다.
               </p>
             </div>
           </ul>
         </div>
       </div>
     </>
  )
}

export {HeaderTop, Footer};
export default App;

