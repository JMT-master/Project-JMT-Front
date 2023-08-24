import React, { useEffect, useState } from 'react';
import '../css/Festival.css'
import { Link, useNavigate } from 'react-router-dom';
import data from '../data/festival.json';

const FesList = (props) => {
  const navigate = useNavigate();
  const { 시작일, 종료일, 콘텐츠명, imgUrl } = props.data;
  return (
    <ul key={콘텐츠명} onClick={()=>navigate('/info/festival/detail/'+props.data.id)}>
      <li style={{padding:'0'}}><img src={imgUrl} alt="콘텐츠 이미지" style={{width:'240px',height:'120px',padding:'0'}} /></li>
      <li style={{lineHeight:'40px'}}>{콘텐츠명}</li>
      <li>시작일 : {시작일}</li>
      <li>종료일 : {종료일}</li>
    </ul>
  )
}

const Festival = () => {
  const navigate = useNavigate();
  const [newFestivalData, setNewFestivalData] = useState(data.data);
  const [onFestival, setOnFestival] = useState([]);
  const [offFestival, setOffFestival] = useState([]);
  let month = 8;
  let now = new Date('2022-' + month + '-22');

  newFestivalData.map(index => {
    const fesDate = new Date(index.종료일);
    if (now < fesDate) {
      onFestival.push(<FesList data={index} key={index.컨텐츠명}></FesList>);
    } else if (now > fesDate) {
      offFestival.push(<FesList data={index} key={index.컨텐츠명}></FesList>);
    }
  })

  return (
    <div className='festival-content'>
      <div className='festival-title'>
        <h1>축제 및 행사</h1>
        <p>축제나 행사는 보통 한해별로 데이터를 제공하므로 월별로 구분한다.</p>
      </div>
      <div className='festival-category'>
        {/* <label onClick={()=>{dateChoice(1)}}>1월</label> */}
        <label>1월</label>
        <label>2월</label>
        <label>3월</label>
        <label>4월</label>
        <label>5월</label>
        <label>6월</label>
        <label>7월</label>
        <label>8월</label>
        <label>9월</label>
        <label>10월</label>
        <label>11월</label>
        <label>12월</label>
      </div>
      {/* <div className='festival-list'>
          <h3>진행 중인 축제 및 행사</h3>
        <div className='on-festival'>
          {newFestivalData.map((index)=>{
            return (
              <FesList data={index} key={index.컨텐츠명}></FesList>
            )
          })}
        </div>
          <h3>종료된 축제 및 행사</h3>
        <div className='off-festival'>
          {newFestivalData.map((index)=>{
            return (
              <FesList data={index} key={index.컨텐츠명}></FesList>
            )
          })}
        </div>
      </div> */}
      <div className='festival-list'>
        <h3>진행중인 축제 및 행사</h3>
        <div className='on-festival'>
          {onFestival}
        </div>
        <h3>종료된 축제 및 행사</h3>
        <div className='off-festival'>
        {offFestival}
          </div>
      </div>
    </div>
  );
};

export default Festival;