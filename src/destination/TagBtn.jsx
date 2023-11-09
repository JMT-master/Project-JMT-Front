import React, { useEffect, useState } from 'react'

const TagBtn = (tag) => {
  const {tagFilter, setTagFilter, tagList, setPage} = tag
  // console.log('tag: ', tag);
  // console.log('tagFilter, setTagFilter, tagList: ', tagFilter, setTagFilter, tagList);
  
  const [btn, setBtn] = useState([]);
  const [randomNum, setRandomNum] = useState(Math.random());
  //필터 버튼
  const clickFilter = (e) => {
    if (e.target.value !== tagFilter) setTagFilter(e.target.value);
    else setTagFilter('');
  }

  //버튼 토글 
  const focusHandler = (e, i) => {
    // console.log(e.target.id)
    setBtn((prevBtn) => {
      if (prevBtn.includes(i)) {
        return prevBtn.filter(btnIdx => btnIdx !== i)
      }
      else {
        return [i]
      }
    });
    if (e.target.id === i)
      setBtn([]);
  }



  //태그 버튼
    const btnList = []
    const num = 10;
    let tagSet = [...new Set(tagList)];
    let ranNum = Math.floor(randomNum * (tagSet.length/10));
    let ranNumMax = Math.floor(randomNum * tagSet.length/(tagSet.length/10));

    for (let i = ranNum; i < tagSet.length; i += Math.floor(tagSet.length/10)) {
      btnList.push(<button key={i / num} className={`oBtn ${btn.includes(i / num) ? 'Focused' : ''}`} value={tagSet[i-ranNumMax]}
        onClick={(e) => {
          setPage(1);
          clickFilter(e);
          focusHandler(e, i / num);
        }} >#{tagSet[i]}</button>)
    }
    
  return (
    <div>{btnList}</div>
  )
}

export default TagBtn