import React, { useState } from 'react'
import '../css/schedule.css'
import RadioGroup from './RadioGroup'
import Radio from './Radio'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom'

const SelectSchedule = () => {
  const [value, setValue] = useState(new Date());
  return (
    <div className='container'>
      <div>
        <Link to="/"><h1 className='Logo'>JMT</h1></Link>
        <Link to="/select">
          <div className='Step SelectText'>
            <h3>Step1</h3>
            <h3>일정 선택</h3>
          </div>
        </Link>
        <Link to="/travel">
          <div className='Step'>
            <h3>Step2</h3>
            <h3>여행지 선택</h3>
          </div>
        </Link>
        <button className='SelectBtn'>다음</button>
      </div>
      <div>
        <h3 className='selectDate'>2023.00.00(월) ~ 2023.00.00(월)</h3>
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
            <label >인원</label>
            <input type='number' value="1"></input>
          </div>
          <div className='selectItem'>
            <label >출발시간</label>
            <input className='inputTime' type='time' value="00:00:00"></input>
          </div>
          <div className='selectItem'>
            <label >도착시간</label>
            <input className='inputTime' type='time' value="00:00:00"></input>
          </div>
          <div className='selectItem'>
            <RadioGroup>
              <Radio name="public" value="public">공개</Radio>
              <Radio name="public" value="private" defaultChecked="true">비공개</Radio>
            </RadioGroup>
          </div>
        </form>
        <div className='Calendar'>
          <Calendar onChange={setValue} value={value}></Calendar>
        </div>
      </div>
      <div>지도 넣을 곳</div>
    </div>
  )
}

export default SelectSchedule