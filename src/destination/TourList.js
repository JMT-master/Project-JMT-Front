import React, {useEffect, useRef, useState} from 'react'
import TourItem from './TourItem';
import '../css/TourList.scss'
import ListPaging from './ListPaging';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import TagBtn from './TagBtn';
import axios from 'axios';
import {AiOutlineLoading} from 'react-icons/ai';
import {BsGridFill} from 'react-icons/bs';
import {FaThList} from 'react-icons/fa';
import NaverMapView from '../common/NaverMapView';

//cid=콘텐츠아이디 -> 콘텐츠 단일검색
const TourList = () => {
  //데이터
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const apiPageCount = useRef(1);

  //Nav용
  const nav = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const {pageId} = useParams();
  const prevCategory = useRef(1);
  const pageType = searchParams.get('type') === null ? 'list' : searchParams.get('type');

  //태그용
  const [tagList, setTagList] = useState([]);
  const [tagFilter, setTagFilter] = useState('');

  //페이징용 변수
  const [page, setPage] = useState(1);
  const offset = 12;
  const pageNum = (page - 1) * offset;
  const lastPage = useRef(1);

  const dataNum = useRef(0);

  const [gps, setGps] = useState({
    lat: 33.3764981,
    lng: 126.5193789,
    contentsid: '',
    title: '',
    img: '',
    tag: '',
    address: '',
    phoneno: '',
    content: '',
  });

  const onNav = () => {
    console.log("asd"+gps);
    nav(`/destination/detail/${gps.contentsid}`, {
      state: {
        title: gps.title,
        img: gps.img,
        tag: gps.tag,
        address: gps.address,
        phoneno: gps.phoneno,
        content: gps.introduction,
      }
    })
  }

  function checkCategory(cate) {
    switch (cate) {
      case 'tour':
        return 'c1'; // 13
      case 'restaurant':
        return 'c4'; // 20
      case 'lodge':
        return 'c3'; // 10
      default:
        return 'c1';
    }
  }

  const category = checkCategory(pageId);
//데이터 받아오기

  useEffect(() => {
    if (page >= (lastPage.current - 2) && dataNum.current < apiPageCount.current) {
      dataNum.current += 1;
    }
  }, [page]);
  const callApi = async () => {
    let rawDatas = rawData && [...rawData];
    for (let i = dataNum.current; i < (dataNum.current + 1); i++) {
      const res = await axios.get(`https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=uimh6133t6toeyub&locale=kr&category=${category}&page=${i}`)
      console.log("Res : " + res.data.pageCount);
      rawDatas = rawDatas.concat(res.data.items);
      apiPageCount.current = res.data.pageCount;
    }
    setRawData(rawDatas);
    setTagFilter('');
  }
  console.log("page : ", page)
  console.log("dataNum : " , dataNum)
  console.log("비교 : " , page >= (lastPage.current - 2));




  useEffect(() => {
    setLoading(true);
    callApi();
  }, [category, dataNum.current]);

//카테고리 변경으로 데이터 변경시 사용할 데이터 리스트 새로 셋
  useEffect(() => {
    setDataList(rawData.filter(item => item.tag.includes(tagFilter)));
    lastPage.current = Math.floor(dataList.length % offset > 0 ? (dataList.length / offset) + 1 : dataList.length / offset)
    console.log("useEffect : " + lastPage.current)
    let tag = [];

    rawData.map((item) => {
      tag = tag.concat(item.tag.replace(/, /gi, ',').split(','));
    })
    setTagList(tag)
    setLoading(false);
  }, [rawData, tagFilter, dataList.length])

  const makeItemList = () => {
    const itemList = []
    dataList.slice(pageNum, offset * page).map((item) => {
      if (item.tag.includes(tagFilter)) {
        itemList.push(<TourItem spot={item} key={item.contentsid} pageType={pageType} setGps={setGps} nav={nav}/>);
      }
    })
    return itemList;
  }

  if (loading === true || !dataList[0]) {
    return <div className='loading'><AiOutlineLoading className='loadingIcon'></AiOutlineLoading></div>
  } else if (dataList[0]) {
    return (

       <div className={pageType}>
         {/* 관광지 리스트 화면 헤더, 리스트, 그리드 형태 변경시에도 그대로 유지 */}
         <div className={`${pageType}-head`}>
           <h1>{dataList[0] && dataList[0].contentscd.label}</h1>
           <hr/>
           <p className={`${pageType}-head-intro`}>{dataList[0] && dataList[0].contentscd.label === '관광지' ?
              '내가 가본 제주는 어디까지일까? 수많은 제주의 아름다운 여행지를 취향에 맞게 선택해보자. 360여 개의 크고 작은 오름을 비롯하여 눈 돌리면 어디에서나 마주치는 한라산 그리고 푸른 바다…. 제주의 보석 같은 여행지가 여러분의 선택을 기다린다.'
              : ''}</p>
           {<TagBtn tagFilter={tagFilter} setTagFilter={setTagFilter} tagList={tagList} setPage={setPage}/>}
           <br/>
           <div className={`${pageType}-head-typeBtn`}>
             <button className='oBtn' onClick={() => {
               nav(`/destination/${pageId}?type=list`)
             }}><FaThList></FaThList></button>
             <button className='oBtn' onClick={() => {
               nav(`/destination/${pageId}?type=grid`)
             }}><BsGridFill></BsGridFill></button>
           </div>
         </div>
         <div className={`${pageType}-content`}>
           {/*버튼 선택시 list-content-listGrid와 list-content-Grid 변경*/}
           <div className={`${pageType}-content-list`}>
             <ul className={`${pageType}-content-list-ul`}>
               {
                 makeItemList()
               }
             </ul>
             <ListPaging page={page} setPage={setPage} lastPage={lastPage.current}></ListPaging>
           </div>
           {/* 맵 영역,  */}
           <div className={`${pageType}-content-map`}>
             <NaverMapView gps={gps} onNav={onNav}></NaverMapView>
           </div>
         </div>
       </div>
    )
  }
}

export default TourList