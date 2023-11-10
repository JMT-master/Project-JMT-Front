import React from 'react'
import '../css/myPage.css'
import { useWindowDimensions } from 'react-native'
import { AiOutlineSchedule, AiOutlineLoading } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { MdTravelExplore } from 'react-icons/md'
import { GiCommercialAirplane } from 'react-icons/gi'
import { useState } from 'react'
import MypageList from './MypageList'
import { useEffect } from 'react'
import axios from 'axios'
import TravelPdf from '../travelschedule/TravelPdf'
import { useNavigate } from 'react-router'
import { call } from '../common/ApiService'
import JoinUser from './JoinUser'



const Mypage = () => {
  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState("나의 일정");
  const titleArray = ["나의 일정", "찜한 일정", "찜한 여행지"]
  const [loading, setLoading] = useState(false);
  const [visit, setVisit] = useState(null);
  const [list, setList] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();
  const [member, setMember] = useState();
  const [myTravelItem,setMyTravelItem] = useState(null);
  const [gubun,setGubun] = useState(0);


  //나의 일정
  function selectMyTravelScehdule(){
    setGubun(0);
    call("/travel/selectMyTravelScehdule", "GET",
    null
    ).then((response) => {
      console.log("selectTravelScehdule.response.data",response.data);
      setMyTravelItem(response.data);
      // window.location.href = '/';
    })
    .catch((error) => {
      console.log(error);
    })
  }
  //찜한 일정
  function selectWishTravelScehdule(){
    setGubun(1);
    call("/wish/wishTpsSelect", "GET",
    null
    ).then((response) => {
      console.log("wishTpsSelect.response.data",response.data);
      setMyTravelItem(response.data);
      // window.location.href = '/';
    })
    .catch((error) => {
      console.log(error);
    })
  }
  //찜한 여행지
  function selectTravelDes(){
    setGubun(2);
    call("/wish/wishTdnSelect", "GET",
    null
    ).then((response) => {
      console.log("wishTdnSelect.response.data",response.data);
      setMyTravelItem(response.data);
      // window.location.href = '/';
    })
    .catch((error) => {
      console.log(error);
    })
  }

  //member의 정보 가져와서 화면에 보여줘야함
  const getMember = () => {
    call("/mypage", "GET")
    .then((response) => {
      setMember(response);
      console.log("response : {}", response);
    })
  }

  // 회원 정보 수정
  function memberUpdate() {
    setTitle('회원 정보 수정');
    setTotalCount('');
    setIndex(4);
    setList(<JoinUser isUpdate = {true}></JoinUser>);
  }

  // Big page에서 Title 클릭시
  const onChangeTitle = (index) => {
    if(index === 0){
      selectMyTravelScehdule();
    }else if(index === 1){
      selectWishTravelScehdule();
    }else{
      selectTravelDes();
    }
    setIndex(index);
    setTitle(titleArray[index]);
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  useEffect(() => {
    let count = 0;
    getMember();
    console.log('myTravelItem',myTravelItem);
    console.log("gubun의 값:",gubun);
    if (myTravelItem != null) {
      setList(myTravelItem.map((item, i) => {
        count++;
        return (<MypageList className='myPage-Big-Image-li' data={item} gubun={gubun}></MypageList>)
      }));

      setTotalCount(count);
      setLoading(false);
    }else{
      setList('');
      setTotalCount(0);
      setLoading(false);
    }

  }, [myTravelItem]);

  // 일정 바뀔시 임의로 사진 뿌리게끔
  // useEffect(() => {
  //   setLoading(true);
  //   let num = 0;
  //   if (index === 0) num = 1;
  //   else if (index === 1) num = 4;
  //   else if (index === 2) num = 3;

  //   fetch(`https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=uimh6133t6toeyub&locale=kr&category=c${num}&page=1`)
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       setVisit(data);
  //     });
  // }, [title]);

  // data가 변경되었을 때, tag와 List 변경
  // useEffect(() => {
  //   let count = 0;
  //   getMember();
  //   if (visit != null) {
  //     setList(visit.items.map((item, i) => {
  //       count++;
  //       return (<MypageList className='myPage-Big-Image-li' data={item}></MypageList>)
  //     }));

  //     setTotalCount(count);
  //     setLoading(false);
  //   }

  // }, [visit]);

  const width = useWindowDimensions().width;
  if (loading) {
    return <div className='loading'><AiOutlineLoading className='loadingIcon'></AiOutlineLoading></div>
  }
  // 작은 경우
  else if (width <= 700) {
    return (
      <div className='myPageContainer'>
        <div className='myPageHeader'>
          <div className='myPageHeader-profile'>
            {/* <img className='myPageHeader-profile-img' src="../images/user.jpg" alt="" /> */}
            <BiUser className='myPage-tagList-li-icon'></BiUser>
            <div className='myPageHeader-profile-name' 
            onClick={memberUpdate}
            >회원정보수정</div>
          </div>
          <div>
            <ul className='myPageHeader-ul'>
              <li className='myPageHeader-li' onClick={() => onChangeTitle(0)}>
                <AiOutlineSchedule className='myPage-tagList-li-icon'></AiOutlineSchedule>
                <div>나의 일정</div>
              </li>
              <li className='myPageHeader-li' onClick={() => onChangeTitle(1)}>
                <MdTravelExplore className='myPage-tagList-li-icon'></MdTravelExplore>
                <div>찜한 일정</div>
              </li>
              <li className='myPageHeader-li' onClick={() => onChangeTitle(2)}>
                <GiCommercialAirplane className='myPage-tagList-li-icon'></GiCommercialAirplane>
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
            <li className='myPageChap2-li'>
              <button className='myPageChap2-button'>+</button>
            </li>
            <li className='myPageChap2-li'>
              <img className='myPageChap2-img' src='../images/001.png' alt='img1'></img>
              <p className='myPageChap2-title'>제목 : ....</p>
            </li>
            <li className='myPageChap2-li'>
              <img className='myPageChap2-img' src='../images/002.png' alt='img2'></img>
              <p className='myPageChap2-title'>제목 : ....</p>
            </li>
            <li className='myPageChap2-li'>
              <img className='myPageChap2-img' src='../images/003.png' alt='img3'></img>
              <p className='myPageChap2-title'>제목 : ....</p>
            </li>
          </ul>
        </div>
        <div className='myPageImage'>
          <ul className='myPageImage-ul'>
            {list}
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <div className='myPageBigContainer'>
        <div className='myPage-tagList'>
          <ul className='myPage-tagList-ul'>
            <li className='myPage-tagList-li' onClick={memberUpdate}>
              {/* <img className='myPage-tagList-li-profile-img' src="../images/user.jpg" alt="" /> */}
              <BiUser className='myPage-tagList-li-icon'></BiUser>
              <div className='myPage-tagList-li-name'
              >회원정보수정</div>
            </li>
            <li className='myPage-tagList-li' data-value='0' onClick={() => onChangeTitle(0)}>
              <AiOutlineSchedule className='myPage-tagList-li-icon'></AiOutlineSchedule>
              <div value='0' className='myPage-tagList-li-name'>나의 일정</div>
            </li>
            <li className='myPage-tagList-li' value={1} onClick={() => onChangeTitle(1)}>
              <MdTravelExplore className='myPage-tagList-li-icon'></MdTravelExplore>
              <div className='myPage-tagList-li-name'>찜한 일정</div>
            </li>
            <li className='myPage-tagList-li' value={2} onClick={() => onChangeTitle(2)}>
              <GiCommercialAirplane className='myPage-tagList-li-icon'></GiCommercialAirplane>
              <div className='myPage-tagList-li-name'>찜한 여행지</div>
            </li>
          </ul>
        </div>
        <hr></hr>
        {
          index === 4 ?
          <h1 className='myPage-h1-title'> {title}</h1> :
          <h1 className='myPage-h1-title'>{title}({totalCount})</h1>
        }
        
        <ul className='myPage-Big-Image-ul'>
          {list}
        </ul>

      </div>
    )
  }

}

export default Mypage