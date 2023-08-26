import React, { useEffect, useState } from "react";
import "../css/Festival.css";
import { Link, useNavigate } from "react-router-dom";
import data from "../data/festival.json";

const FesList = (props) => {
  const navigate = useNavigate();
  const { 시작일, 종료일, 콘텐츠명, imgUrl } = props.data;
  return (
    <li className="festival-list-item"
      key={콘텐츠명}
      // onClick={() => navigate("/info/festival/detail/" + props.data.id)}
    >
      <a>
        <div className="festival-item-img" style={{ padding: "0" }}>
          <img
            src={imgUrl}
            alt="콘텐츠 이미지"
            style={{display:'block', width:'100%', height:'100%'}} />
        </div>
        <div className="festival-item-content">
          <p className="festival-item-title">{콘텐츠명}</p>
          <p className="festival-item-start">시작일 : {시작일}</p>
          <p className="festival-item-end">종료일 : {종료일}</p>
        </div>
      </a>
    </li>
  );
};

const Festival = () => {
  const navigate = useNavigate();
  const [newFestivalData, setNewFestivalData] = useState(data.data);
  const [onFestival, setOnFestival] = useState([]);
  const [offFestival, setOffFestival] = useState([]);
  let month = 8;
  let now = new Date("2022-" + month + "-22");

  newFestivalData.map((index) => {
    const fesDate = new Date(index.종료일);
    if (now < fesDate) {
      onFestival.push(<FesList data={index} key={index.컨텐츠명}></FesList>);
    } else if (now > fesDate) {
      offFestival.push(<FesList data={index} key={index.컨텐츠명}></FesList>);
    }
  });

  return (
    <div className="festival-content">
      <div className="festival-title">
        <h1>축제 및 행사</h1>
        <p>축제나 행사는 보통 한해별로 데이터를 제공하므로 월별로 구분한다.</p>
      </div>
      <ul className="festival-category">
        <li>1월</li>
        <li>2월</li>
        <li>3월</li>
        <li>4월</li>
        <li>5월</li>
        <li>6월</li>
        <li>7월</li>
        <li>8월</li>
        <li>9월</li>
        <li>10월</li>
        <li>11월</li>
        <li>12월</li>
      </ul>
      <div className="festival-list">
        <h3><span>진행중이거나 예정된 축제 및 행사</span></h3>
        <ul className="on-festival">{onFestival}</ul>
        <h3>종료된 축제 및 행사</h3>
        <ul className="off-festival">{offFestival}</ul>
      </div>
    </div>
  );
};

export default Festival;
