import React, { useEffect, useRef, useState } from 'react'
import "../css/curator.css"
import ImageList from './ImageList';
import TagBtn from './TagBtn';

const Curator = () => {
  const [categoryNum, setCategoryNum] = useState("c1");
  const [visit, setVisit] = useState(null);
  const [copyVisit,setCopyVisit] = useState(null); // json 데이터 불러온 후 그대로 복사
  const [list, setList] = useState();
  const [tagBtn, setTagBtn] = useState();
  const [selectTag, setSelectTag] = useState([]);
  let   visitTag = [], tagSet = [];
  const tagStyle = {
    color:"black",
    fontWeight : "500"
  };

  // const checkStyled = styled.button`
  // color : "blue",
  // font : 
  // `;
  
  const categoryList = (e) => {
    setCategoryNum(e.target.value);
  };
  
  // 관광지, 음식, 숙박이 바뀔때마다 json fetch
  useEffect(() => {
    fetch(`https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=uimh6133t6toeyub&locale=kr&category=${categoryNum}&page=3`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setVisit(data);
    });

    setList();
    setTagBtn();
  }, [categoryNum]);

  // data가 변경되었을 때, tag와 List 변경
  useEffect(() => {
    if(visit != null) {
      // copyVisit = visit;
      setCopyVisit(visit);
      visitTag = []; tagSet = [];

      setList(visit.items.map((item,i) => {
        visitTag = visitTag.concat(item.tag.replace(/, /gi, ',').split(','));
        // if(i <= 10){
          return <ImageList key={i} number={i} className='curatorResult-img-li' 
          data={item.repPhoto !== null ? item.repPhoto.photoid.imgpath : null}></ImageList>
        // }
      }));

      tagSet = [...new Set(visitTag)];

      setTagBtn(tagSet.map((tag,i) => {
        return <TagBtn className='tagBtn' name={"tag"+i} key={i} data={tag} tagAdd={tagAdd} style={tagStyle}></TagBtn>
      }));

    }
  }, [visit]);

  // tag 클릭했을 때 색상 변경 및 배열에 값 대입
  const tagAdd = (e) => {
    e.preventDefault();
    if(e.target.style.color === "black") { // 태그 클릭시
      e.target.style.fontWeight = "bold";
      e.target.style.color = "red";
      setSelectTag(selectTag => [e.target.value, ...selectTag]);
    } else {  // 태그 unClick시
      e.target.style.fontWeight = "500";
      e.target.style.color = "black";
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
          data={item.repPhoto !== null ? item.repPhoto.photoid.imgpath : null}></ImageList>
      }));

      return 0;
    }

    setList(copyVisit.items.map((item,i) => {
      tagValue = [];
      tagValue = tagValue.concat(item.tag.replace(/, /gi, ',').split(','));

      tagValue = tagValue.filter(str => selectTag.includes(str));

      if(tagValue.length !== 0){
        return <ImageList key={i} number={i} className='curatorResult-img-li' 
        data={item.repPhoto !== null ? item.repPhoto.photoid.imgpath : null}></ImageList>
      }
    }));
  };

  // 선택 삭제
  function clearTag (e) {
    e.preventDefault();
    setSelectTag([]);

    for(let i=0; i < tagBtn.length; i++){
      document.getElementsByName("tag"+i)[0].style.color = "black";
      document.getElementsByName("tag"+i)[0].style.fontWeight = "500";
    }    
  };

  return (
    <div className='curatorContainer'>
      <div>
        <form className='curatorForm'>
          <select className='curatorForm-select' onChange={categoryList}>
            <option value="c1">관광지</option>
            <option value="c4">음식</option>
            <option value="c3">숙박</option>
          </select>
          <div className='curatorForm-tag'>
            {tagBtn}
          </div>
          <button className='curatorForm-submit' onClick={checkTag}>적용하기</button>
          <button className='curatorForm-submit' onClick={clearTag}>선택삭제</button>
        </form>
      </div>
      <div className='curatorResult'>
        <div>
          <ul className='curatorContent-ul'>
            <li className='curatorContent-li'>관광지</li>
            <li className='curatorContent-li'>여행일정</li>
          </ul>
        </div>
        <div className='curatorResult-img'>
          <ul className='curatorResult-img-ul'>
            {list}
          </ul>
        </div>
        <div className='curatorResult-paging'>
          <ul className='curatorResult-paging-ul'>
            <li className='curatorResult-paging-li'>1</li>
            <li className='curatorResult-paging-li'>2</li>
            <li className='curatorResult-paging-li'>3</li>
            <li className='curatorResult-paging-li'>4</li>
            <li className='curatorResult-paging-li'>5</li>
            <li className='curatorResult-paging-li'>6</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Curator