import React, { useLayoutEffect, useEffect } from 'react'
import TourItem from './TourItem';
import '../css/TourList.scss'
import { useState } from 'react';
import { useRef } from 'react';
import ListPaging from './ListPaging';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TagBtn from './TagBtn';
import axios from 'axios';
import { AiOutlineLoading } from 'react-icons/ai';



const TourList = () => {
  //데이터
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataList, setDataList] = useState(rawData);
  
  //Nav용
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pageId } = useParams();
  const pageType = searchParams.get('type') === null ? 'list' : searchParams.get('type');

  //태그용
  const [tagList, setTagList] = useState([]);
  const [tagFilter, setTagFilter] = useState('');

  //페이징용 변수
  const [page, setPage] = useState(1);
  const offset = 12;
  const pageNum = (page - 1) * offset;
  const lastPage = useRef(1);


  function checkCategory(cate) {
    switch (cate) {
      case 'tour':
        return 'c1';
      case 'restaurant':
        return 'c4';
      case 'lodge':
        return 'c3';
      default:
        return 'c1';
    }
  }
  const category = checkCategory(pageId);
  // console.log('pageId: ', category);
  // console.log('category: ', category);
  //param grid일때 list일때 css 변경
  //데이터 받아오기
  useLayoutEffect(() => {
    setLoading(true);
    const testData = async () => {
      const res = await axios.get(`https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=uimh6133t6toeyub&locale=kr&category=${category}&page=3`)
      setRawData(res.data.items);
      setTagFilter('');
      setPage(1)
    }

    testData();

    // setRawData(testData);
    // fetch(`https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=uimh6133t6toeyub&locale=kr&category=${category}&page=2`)
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(data => {
    //     setRawData(data.items);
    //   });
  }, [category]);

  //카테고리 변경으로 데이터 변경시 사용할 데이터 리스트 새로 셋
  useLayoutEffect(() => {
    setDataList(rawData.filter(item => item.tag.includes(tagFilter)));
    lastPage.current = Math.floor(dataList.length % offset > 0 ? (dataList.length / offset) + 1 : dataList.length / offset);
    // console.log('lastPage.current: ', lastPage.current);
    let tag = [];
    rawData.map((item) => {
      tag = tag.concat(item.tag.replace(/, /gi, ',').split(','));
    })
    setTagList(tag)
    setLoading(false);
  }, [rawData])


  if (loading === true || !rawData[0]) {
    return <div className='loading'><AiOutlineLoading className='loadingIcon'></AiOutlineLoading></div>
  } else if(rawData[0]){
    return (

      <div className={pageType}>
        {/* 관광지 리스트 화면 헤더, 리스트, 그리드 형태 변경시에도 그대로 유지 */}
        <div className={`${pageType}-head`}>
          <h1>{dataList[0] && dataList[0].contentscd.label}</h1>
          <hr />
          <p className={`${pageType}-head-intro`}>{dataList[0] && dataList[0].contentscd.label === '관광지' ?
            '내가 가본 제주는 어디까지일까? 수많은 제주의 아름다운 여행지를 취향에 맞게 선택해보자. 360여 개의 크고 작은 오름을 비롯하여 눈 돌리면 어디에서나 마주치는 한라산 그리고 푸른 바다…. 제주의 보석 같은 여행지가 여러분의 선택을 기다린다.'
            : ''}</p>
          {/* {rawData.map((item) => item.tag.map(tag => (<button key={tag} value={tag} onClick={clickFilter}>#{tag}</button>)))} */}
          {<TagBtn tagFilter={tagFilter} setTagFilter={setTagFilter} tagList={tagList} />}
          <br />
          <button onClick={() => { nav(`/test1/${pageId}?type=list`) }}>리스트</button>
          <button onClick={() => { nav(`/test1/${pageId}?type=grid`) }}>그리드</button>
        </div>
        <div className={`${pageType}-content`}>
          {/*todo - 버튼 선택시 list-content-listGrid와 list-content-Grid 변경, map삭제*/}
          <div className={`${pageType}-contentList`}>
            <ul className={`${pageType}-contentList-ul`}>
              {
                dataList.slice(pageNum, offset * page).map((item) => {
                  if (item.tag.includes(tagFilter)) {
                    return <TourItem spot={item} key={item.contentsid} pageType={pageType} navigate={nav} />
                  }
                })
              }
            </ul>
            <ListPaging page={page} setPage={setPage} lastPage={lastPage.current}></ListPaging>
          </div>
          {/* 맵 영역,  */}
          <div className={`${pageType}-content-map`}>맵</div>
        </div>
      </div>
    )
  }
}

export default TourList