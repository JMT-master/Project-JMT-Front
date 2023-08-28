import React, { useEffect, useState } from 'react'
import '../css/schedule.css'
import RadioGroup from './RadioGroup'
import Radio from './Radio'
import { Link } from 'react-router-dom'
import { DateRange, DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns/esm'
import Swal from 'sweetalert2'
import SelectpageList from './SelectpageList'
import { PiSubtitlesBold } from 'react-icons/pi'
import { BsPeopleFill } from 'react-icons/bs'
import { BiTime } from 'react-icons/bi'
import { AiOutlineLoading } from 'react-icons/ai'
import {MdNavigateNext} from 'react-icons/md'


const SelectSchedule = () => {
  const [peopleNum, setPeopleNum] = useState(1);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [loading, setLoading] = useState(false);
  const [visit, setVisit] = useState(null);
  const [list, setList] = useState();
  const [selectIndex, setSelectIndex] = useState(0);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);

  // 일정 바뀔시 임의로 사진 뿌리게끔
  useEffect(() => {
    setLoading(true);
    let num = 0;
    if(selectIndex === 0) num = 1;
    else if(selectIndex === 1) num = 4;
    else if(selectIndex === 2) num = 3;

    fetch(`https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=uimh6133t6toeyub&locale=kr&category=c${num}&page=1`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setVisit(data);
      });
  }, [selectIndex]);

  // data가 변경되었을 때, tag와 List 변경
  useEffect(() => {
    if(visit != null) {
      setList(visit.items.map((item,i) => {
          return (<SelectpageList data={item} key={i}></SelectpageList>)
      }));

      setLoading(false);
    }
    
  }, [visit]);

  const numberChange = (e) => {
    setPeopleNum(e.target.value);
  }

  const onStartTime = (e) => {
    setStartTime(e.target.value);
  }

  const onEndTime = (e) => {
    setEndTime(e.target.value);
  }

  const dateChange = (item) => {
    let diff = item.selection.startDate - item.selection.endDate;
    diff = Math.abs(diff / (1000 * 60 * 60 * 24));

    if (diff <= 10) {
      setState([item.selection]);
    } else {
      Swal.fire(
        {
          icon: 'warning',
          title: '경고',
          text: '날짜는 10일까지만 선택 가능.',
          confirmButtonText: 'OK'
        }
      );
    }
  }

  // 일정 선택
  const changeSchedule = (index) => {
    setSelectIndex(index);
  };

  if(loading) {
    return <div className='loading'><AiOutlineLoading className='loadingIcon'></AiOutlineLoading></div>
  } else {
    return (
      <div className='container'>
        <div className='selectContainer-menu'>
          {/* <Link to="/"><h1 className='Logo'>JMT</h1></Link> */}
          <Link to="/select">
            <div className='schedule-Step SelectText'>
              <p className='schedule-Step-num'>Step1</p>
              <p>일정 선택</p>
            </div>
          </Link>
          <Link to="/travelSchedule">
            <div className='schedule-Step'>
              <p className='schedule-Step-num'>Step2</p>
              <p>여행지 선택</p>
            </div>
          </Link>
          <Link to="/travelSchedule"><MdNavigateNext className='SelectBtn'>다음</MdNavigateNext></Link>
        </div>
        <div className='selectContainer-Form'>
          <div className='selectInfo-Form'>
            <h3 className='selectDate'>{`${format(state[0].startDate, 'yyyy년 MM월 dd일')} ~ ${format(state[0].endDate, 'yyyy년 MM월 dd일')}`}</h3>
            <div className='ScheduleForm'>
              <div className='selectItem'>
                <button className={`scheduleBtn ${selectIndex === 0 ? 'SelectBG' : ''}`} 
                onClick={() => changeSchedule(0)}>새 일정</button>
                <button className={`scheduleBtn ${selectIndex === 1 ? 'SelectBG' : ''}`} 
                onClick={() => changeSchedule(1)}>나의 일정</button>
                <button className={`scheduleBtn ${selectIndex === 2 ? 'SelectBG' : ''}`} 
                onClick={() => changeSchedule(2)}>찜한 일정</button>
              </div>
              <div className='selectItem'>
                <PiSubtitlesBold className='selectItem-icon'></PiSubtitlesBold>
                <label className='selectItem-label'>제목</label>
                <input className='selectItem-input' placeholder='내용을 입력해주세요.'></input>
              </div>
              <div className='selectItem'>
                <BsPeopleFill className='selectItem-icon'></BsPeopleFill>
                <label className='selectItem-label'>인원</label>
                <input className='selectItem-input selectItem-input-people' type='number' value={peopleNum} onChange={numberChange}></input>
              </div>
              <div className='selectItem'>
                <BiTime className='selectItem-icon'></BiTime>
                <label className='selectItem-label'>출발시간</label>
                <input className='inputTime' type='time' value={startTime} onChange={onStartTime}></input>
              </div>
              <div className='selectItem'>
                <BiTime className='selectItem-icon'></BiTime>
                <label className='selectItem-label'>도착시간</label>
                <input className='inputTime' type='time' value={endTime} onChange={onEndTime}></input>
              </div>
              <div className='selectItem'>
                <RadioGroup>
                  <Radio name="public">공개</Radio>
                  <Radio name="public" defaultChecked="true">비공개</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div className='Calendar'>
            {/* <Calendar onChange={setValue} value={value}></Calendar> */}
            <DateRange
              editableDateInputs={true}
              onChange={(item) => dateChange(item)}
              moveRangeOnFirstSelection={false}
              ranges={state}
              months={2}
              direction="horizontal"
              minDate={new Date()}
              rangeColors={['#FFA500', '#FFA500', '#FFA500']}
              className='date-range'
            />
          </div>
          <div className='Data-List'>
            <ul className='Data-List-ul'>
              {list}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectSchedule