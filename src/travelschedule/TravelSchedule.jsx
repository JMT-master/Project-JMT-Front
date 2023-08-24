import React, { useCallback, useEffect, useState } from 'react';
import "../css/travelSchedule.css";
import Tables from './Tables';
import { Link } from 'react-router-dom';
import TravelForm from './TravelForm';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

const TravelSchedule = (props) => {
  const [visit, setVisit] = useState();
  const [list, setList] = useState([]);
  // const [table1Data1, setTableData1] = useState([' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']);
  const [table1Data1, setTableData1] = useState([0,1,2,3,4,5,6,7,8,9,10,
  11,12,13,14,15,16,17,18,19,20, 21,22,23]);
  const testData = [0,"a","b","c",4,5,6,7,8,9,10,
                    11,12,13,14,15,16,17,18,19,20, 21,22,23];
  // const [testData, setTestData] = useState([]);

  useEffect(() => {
    fetch(`https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=uimh6133t6toeyub&locale=kr&category=c1&page=2`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setVisit(data);
      });
  }, []);

  // data가 변경되었을 때, tag와 List 변경
  useEffect(() => {
    if(visit != null && visit !== undefined) {
      setList(visit.items.map(item => {
          return ({item})
      }));  
    }
  }, [visit]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    console.log(result);

    // const data = list !== undefined ? list.map((item,i) => {
    //   if(i === destination.index) {
    //     return item;
    //   }
    // }) : null;
    const data = list !== undefined ? list.filter((item,i) => i === destination.index) : null;
    console.log("data:", data);
    
    if (destination.droppableId === "table1") {
      setTableData1(table1Data1.map((item,i) => {
        console.log(i);
        return (destination.index === i ? data[0].item.title : "실패");
      })
      )
    }
  };

  return (
    <div className='travelContainer'>
      <div>
        <div className='travelSelect'>
          <Link to="/"><h1 className='travelLogo'>JMT</h1></Link>          
          <div className='travelStepBox'>
            <Link to="/select">
              <div className='travelStep'>
                <h5>Step1</h5>
                <h5>일정 선택</h5>
              </div>
            </Link>
            <Link to="/travel">
              <div className='travelStep travelSelectText'>
                <h5>Step2</h5>
                <h5>여행지 선택</h5>
              </div>
            </Link>
          </div>
          <button className='travelBtn'>저장</button>
        </div>

        <DragDropContext
          onDragEnd={onDragEnd}
        // onDragStart={handleDragStart}
        >
          <div className='travelInfo'>
            <div className='searchSchedule'>
              <div className='searchSchedule-btns'>
                <button className='searchSchedule-btns-travel'>찜한여행지</button>
                <button className='searchSchedule-btns-search'>검색</button>
                <button className='searchSchedule-btns-thema'>테마</button>
              </div>
              <div className='searchSchedule-input'>
                <input type='text' placeholder='내용을 입력하세요.'></input>
                <button className='searchSchedule-input-btn'>검색</button>
              </div>
              <Droppable droppableId='Lists' key="Lists">
                {(provided) => (
                  <div className='searchSchedule-data'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {
                      visit !== undefined
                        ? visit.items.map((item, i) => {
                          if (i <= 10) {
                            return (
                              <Draggable
                                key={i}
                                draggableId={"List" + i.toString()} // 드래그 가능한 항목마다 고유한 문자열로 설정
                                index={i}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef} // provided.innerRef를 여기서 사용
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <TravelForm key={i} data={item}></TravelForm>
                                  </div>
                                )}
                              </Draggable>
                            );
                          }
                          return null; // 일치하지 않는 항목에 대해 무언가 반환하도록 수정
                        })
                        : null // <></> 대신 null을 사용하세요.
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div className='searchSchedule-paging'>
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                </ul>
              </div>
            </div>
            <div className='tableForm' >
              <Tables></Tables>
              <table>
                <thead>
                  <tr>
                    <td>Day1</td>
                  </tr>
                </thead>
                <Droppable droppableId='table1' key="table1">
                  {(provided) => (
                    <tbody
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {
                        // (table1Data1 !== undefined && table1Data1 !== null) ?
                        table1Data1.map((data,i) => {
                          console.log("table1Data1",i);
                          return (
                            <Draggable
                              key={data}
                              draggableId={"table1" + data.toString()} // 드래그 가능한 항목마다 고유한 문자열로 설정
                              index={i}>
                              {(provided) => (
                                <tr
                                  ref={provided.innerRef} // provided.innerRef를 여기서 사용
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className='tableTr'
                                >
                                  <td>{data}</td>
                                </tr>
                              )
                              }
                            </Draggable>
                          )
                        }) 
                      //   : .testData.map((data,i) => {
                      //     return (
                      //       <Draggable
                      //         key={data}
                      //         draggableId={"table2" + data.toString()} // 드래그 가능한 항목마다 고유한 문자열로 설정
                      //         index={i}>
                      //         {(provided) => (
                      //           <tr
                      //             ref={provided.innerRef} // provided.innerRef를 여기서 사용
                      //             {...provided.draggableProps}
                      //             {...provided.dragHandleProps}
                      //             className='tableTr'
                      //           >
                      //             <td>{data}</td>
                      //           </tr>
                      //         )
                      //         }
                      //       </Draggable>
                      //     )
                      //   })
                      }
                      {provided.placeholder}
                    </tbody>
                  )
                  }
                </Droppable>
              </table>
              <table>
                <thead>
                  <tr>
                    <td>Day2</td>
                  </tr>
                </thead>
                <Droppable droppableId='table2' key="table2">
                  {(provided) => (
                    <tbody
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {
                        // (table1Data1 !== undefined && table1Data1 !== null) ?
                        table1Data1.map(data => {
                          return (
                            <Draggable
                              key={data}
                              draggableId={"table2" + data.toString()} // 드래그 가능한 항목마다 고유한 문자열로 설정
                              index={data}>
                              {(provided) => (
                                <tr
                                  ref={provided.innerRef} // provided.innerRef를 여기서 사용
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className='tableTr'
                                >
                                  <td>{data}</td>
                                </tr>
                              )
                              }
                            </Draggable>
                          )
                        })
                        // : testData.map(data => {
                        //   return (
                        //     <Draggable
                        //       key={data}
                        //       draggableId={"table2" + data.toString()} // 드래그 가능한 항목마다 고유한 문자열로 설정
                        //       index={data}>
                        //       {(provided) => (
                        //         <tr
                        //           ref={provided.innerRef} // provided.innerRef를 여기서 사용
                        //           {...provided.draggableProps}
                        //           {...provided.dragHandleProps}
                        //           className='tableTr'
                        //         >
                        //           <td>{data}</td>
                        //         </tr>
                        //       )
                        //       }
                        //     </Draggable>
                        //   )
                        // })
                      }
                      {provided.placeholder}
                    </tbody>
                  )
                  }
                </Droppable>
              </table>
            </div>
          </div>
        </DragDropContext>

      </div>
      <div>
        지도
      </div>
    </div>
  )
}

export default TravelSchedule