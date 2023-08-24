import React, { useEffect, useState } from 'react'

const TagBtn = (tag) => {
  const {tagFilter, setTagFilter, tagList} = tag
  // console.log('tag: ', tag);
  // console.log('tagFilter, setTagFilter, tagList: ', tagFilter, setTagFilter, tagList);
  
  const [btn, setBtn] = useState([]);
  useEffect(()=>{
    setBtn('');
  },[tagList])
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
      setBtn('');
  }



  //태그 버튼
    const btnList = []
    const num = 4;
    let tagSet = [...new Set(tagList)];
    // console.log('tagSet: ', tagSet);

    for (let i = 0; i < 40; i += num) {
      btnList.push(<button key={i / num} className={`tagBtn ${btn.includes(i / num) ? 'Focused' : ''}`} value={tagSet[i]}
        onClick={(e) => {
          clickFilter(e);
          focusHandler(e, i / num);
        }} >#{tagSet[i]}</button>)
    }
    
  return (
    <div>{btnList}</div>
  )
}

export default TagBtn