import React, { useState } from 'react'
import '../css/schedule.css'
import RadioGroup from './RadioGroup'
import Radio from './Radio'
import { Link } from 'react-router-dom'
import { DateRange, DateRangePicker } from 'react-date-range'
import {addDays} from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns/esm'


const SelectSchedule = () => {
  const [value, setValue] = useState(new Date());
  const [peopleNum, setPeopleNum] = useState(1);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

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
    console.log(state);
    console.log(state);

    let diff = item.selection.startDate - item.selection.endDate;
    diff = Math.abs(diff / (1000 * 60 * 60 * 24));

    if(diff <= 10) setState([item.selection]);
    
    // if()
  }

  return (
    <div className='container'>
      <div className='selectContainer-menu'>
        {/* <Link to="/"><h1 className='Logo'>JMT</h1></Link> */}
        <Link to="/select">
          <div className='Step SelectText'>
            <h3>Step1</h3>
            <h3>일정 선택</h3>
          </div>
        </Link>
        <Link to="/travelSchedule">
          <div className='Step'>
            <h3>Step2</h3>
            <h3>여행지 선택</h3>
          </div>
        </Link>
        <Link to="/travelSchedule"><button className='SelectBtn'>다음</button></Link>
      </div>
      <div className='selectContainer-Form'>
        <h3 className='selectDate'>{`${format(state[0].startDate, 'yyyy년 MM월 dd일')} ~ ${format(state[0].endDate, 'yyyy년 MM월 dd일')}`}</h3>
        <form className='ScheduleForm'>
          <div className='selectItem'>
            <button className='scheduleBtn SelectBG'>새일정</button>
            <button className='scheduleBtn'>나의 일정</button>
          </div>
          <div className='selectItem'>
            <label >제목</label>
            <input placeholder='내용을 입력해주세요.'></input>
          </div>
          <div className='selectItem'>
            <label>인원</label>
            <input type='number' value={peopleNum} onChange={numberChange}></input>
          </div>
          <div className='selectItem'>
            <label >출발시간</label>
            <input className='inputTime' type='time' value={startTime} onChange={onStartTime}></input>
          </div>
          <div className='selectItem'>
            <label >도착시간</label>
            <input className='inputTime' type='time' value={endTime} onChange={onEndTime}></input>
          </div>
          <div className='selectItem'>
            <RadioGroup>
              <Radio name="public" value="public">공개</Radio>
              <Radio name="public" value="private" defaultChecked="true">비공개</Radio>
            </RadioGroup>
          </div>
        </form>
        <div className='Calendar'>
          {/* <Calendar onChange={setValue} value={value}></Calendar> */}
          <DateRange
            editableDateInputs={true}
            onChange={(item) => dateChange(item)}
            moveRangeOnFirstSelection={false}
            ranges={state}
            months={2}
            direction="horizontal"
          />
        </div>
      </div>
      <div>지도 넣을 곳</div>
    </div>
  )
}

export default SelectSchedule