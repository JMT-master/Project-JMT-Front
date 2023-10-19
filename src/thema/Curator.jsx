import React, { useEffect, useRef, useState } from 'react'
import "../css/curator.css"
import '../css/TourList.scss'
import ImageList from './ImageList';
import TagBtn from './TagBtn';
import ListPaging from '../destination/ListPaging';
import {AiOutlineLoading, AiOutlineCheck, AiFillCamera,AiOutlineClear} from 'react-icons/ai';
import {BsFillCalendarCheckFill} from 'react-icons/bs';
import { useTheme } from 'styled-components';

const Curator = () => {
  const [categoryNum, setCategoryNum] = useState("c1");
  const [visit, setVisit] = useState(null);
  const [copyVisit,setCopyVisit] = useState(null); // json 데이터 불러온 후 그대로 복사
  const [list, setList] = useState();
  const [tagBtn, setTagBtn] = useState();
  const [selectTag, setSelectTag] = useState([]);
  const [selectBoxName, setSelectBoxName] = useState("c1");
  const [selectContent, setSelectContent] = useState(0);
  let   visitTag = [], tagSet = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const [onChnTheme, setChnTheme] = useState(theme.body);

  let tagStyle = null;
  tagStyle = theme.body === "#FFF" ? {
    color : "black",
    backgroundColor : "white",
    fontWeight : "500",
    transition : "all 1s linear"
  } : {
    color : "white",
    backgroundColor : "#333",
    fontWeight : "500",
    transition : "all 1s linear"
  };

  if(theme.body !== onChnTheme) setChnTheme(theme.body);
  
  const categoryList = (e) => {
    setCategoryNum(e.target.value);
    setSelectBoxName(e.target.value);
  };
  
  // 관광지, 음식, 숙박이 바뀔때마다 json fetch
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=uimh6133t6toeyub&locale=kr&
    category=${categoryNum}&page=${currentPage}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setVisit(data);
    });

    setList();
    setTagBtn();
  }, [categoryNum,currentPage]);

  // data가 변경되었을 때, tag와 List 변경
  useEffect(() => {
    if(visit != null) {
      // copyVisit = visit;
      setCopyVisit(visit);
      visitTag = []; tagSet = [];

      setList(visit.items.map((item,i) => {

        if(item.tag !== null) visitTag = visitTag.concat(item.tag.replace(/, /gi, ',').split(','));
        
        // if(i <= 10){
          return <ImageList key={i} number={i} className='curatorResult-img-li' 
          data={item.repPhoto !== null ? item.repPhoto.photoid.imgpath : null} title={item.title}></ImageList>
        // }
      }));

      tagSet = [...new Set(visitTag)];

      setTagBtn(tagSet.map((tag,i) => {
        return <TagBtn className='tagBtn' name={"tag"+i} key={i} data={tag} tagAdd={tagAdd} style={tagStyle}></TagBtn>
      }));
      setLoading(false);
    }

  }, [visit,onChnTheme]);

  // tag 클릭했을 때 색상 변경 및 배열에 값 대입
  const tagAdd = (e) => {
    const colorFlag = theme.body === "#FFF" ? "black" : "white";

    e.preventDefault();
    if(e.target.style.color === colorFlag) { // 태그 클릭시
      e.target.style.fontWeight = "bold";
      e.target.style.color = "#f3a344";
      setSelectTag(selectTag => [e.target.value, ...selectTag]);
    } else {  // 태그 unClick시
      e.target.style.fontWeight = "500";
      e.target.style.color = colorFlag;
      setSelectTag(selectTag => selectTag.filter(select => select !== e.target.value));
    }
  }

  // 적용하기
  const checkTag = (e) => {
    let tagValue = []; // 각 아이템들의 태그

    e.preventDefault();
    if(selectTag.length === 0) {
      setList(copyVisit.items.map((item,i) => {
          return <ImageList key={i} number={i} className='curatorResult-img-li' 
          data={item.repPhoto !== null ? item.repPhoto.photoid.imgpath : null} title={item.title}></ImageList>
      }));

      return 0;
    }

    setList(copyVisit.items.map((item,i) => {
      tagValue = [];
      tagValue = tagValue.concat(item.tag.replace(/, /gi, ',').split(','));

      tagValue = tagValue.filter(str => selectTag.includes(str));

      if(tagValue.length !== 0){
        return <ImageList key={i} number={i} className='curatorResult-img-li' 
        data={item.repPhoto !== null ? item.repPhoto.photoid.imgpath : null} title={item.title}></ImageList>
      }
    }));
  };

  // 선택 삭제
  function clearTag (e) {
    const colorFlag = theme.body === "#FFF" ? "black" : "white";
    e.preventDefault();
    setSelectTag([]);

    for(let i=0; i < tagBtn.length; i++){
      document.getElementsByName("tag"+i)[0].style.color = colorFlag;
      document.getElementsByName("tag"+i)[0].style.fontWeight = "500";
    }    
  };

  // content 선택(관광지, 여행일정)
  const onContent = () => {
    selectContent === 1 ? setSelectContent(0) : setSelectContent(1);
  }

  // Loading 화면
  if (loading === true) {
    return <div className='loading'><AiOutlineLoading className='loadingIcon'></AiOutlineLoading></div>
  } else{
    return (
      <div className='curatorContainer'>
        <div>
          <form className='curatorForm'>
            <select id='curatorForm-select' defaultValue={selectBoxName} className='curatorForm-select' onChange={categoryList}>
              <option value="c1">관광지</option>
              <option value="c4">음식</option>
              <option value="c3">숙박</option>
            </select>
            <div className='curatorForm-tag'>
              {tagBtn}
            </div>
            <AiOutlineCheck className={`curatorForm-submit ${theme.body === "#FFF" ? 'blackText' : 'whiteText'}`} onClick={checkTag}>적용하기</AiOutlineCheck>
            <AiOutlineClear  className={`curatorForm-submit ${theme.body === "#FFF" ? 'blackText' : 'whiteText'}`} onClick={clearTag}>선택삭제</AiOutlineClear>
          </form>
        </div>
        <div className='curatorResult'>
          <div className='curatorResult-Content'>
            <ul className='curatorContent-ul'>
              <li className={`curatorContent-li ${selectContent === 1 ? 'curatorContent-li-unCheck' : ''}`} onClick={onContent}>
                <AiFillCamera className='curatorContent-icon'></AiFillCamera>
                <div className='curatorContent-title'>관광지</div>
              </li>
              <li className={`curatorContent-li ${selectContent === 0 ? 'curatorContent-li-unCheck' : ''}`} onClick={onContent}>
                <BsFillCalendarCheckFill className='curatorContent-icon'></BsFillCalendarCheckFill>
                <div className='curatorContent-title'>여행일정</div>
                </li>
            </ul>
          </div>
          <hr></hr>
          <div className='curatorResult-img'>
            <ul className='curatorResult-img-ul'>
              {list}
            </ul>
          </div>
          <div className='curatorResult-paging'>
            <ListPaging lastPage={visit ? visit.pageCount : 1} page={currentPage} setPage={setCurrentPage}></ListPaging>
          </div>
        </div>
      </div>
    )
  }
}

export default Curator