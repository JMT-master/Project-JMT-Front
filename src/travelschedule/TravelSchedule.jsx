import React, { useCallback, useEffect, useState } from 'react';
import "../css/travelSchedule.css";
import Tables from './Tables';
import { Link } from 'react-router-dom';
import TravelForm from './TravelForm';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import ListPaging from '../destination/ListPaging'
import {TiDeleteOutline} from 'react-icons/ti'

const TravelSchedule = (props) => {
  const [visit, setVisit] = useState();
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [table1FontColor, setTable1FontColor] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [table2FontColor, setTable2FontColor] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [tableData1, setTableData1] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
  const [tableData2, setTableData2] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);

  useEffect(() => {
    fetch(`https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=uimh6133t6toeyub&locale=kr&category=c1&page=${currentPage}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setVisit(data);
      });
  }, [currentPage]);

  // data가 변경되었을 때, tag와 List 변경
  useEffect(() => {
    if (visit != null && visit !== undefined) {
      setList(visit.items.map(item => {
        return ({ item })
      }));
    }
  }, [visit]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    let dragIndex = 0;

    console.log("result : ", result);


    // drop이 List일 경우
    if (destination.droppableId === "Lists") return;

    // flag : 0 : List Data, 1 : table Data
    let data = null, flag = 0;
    if (source.droppableId === "Lists") {
      data = list !== undefined ? list.filter((item, i) => i === source.index) : null;
    } else if (source.droppableId === "table1") {
      data = tableData1.filter((item, i) => i === source.index);
      flag = 1;
    }

    // table1일 경우
    if (destination.droppableId === "table1") {
      const table1FontColorChn = [];

      if(flag===0){
        if(tableData1.find(item => item === data[0].item.title)) return;
      } else {
        dragIndex = source.index;
      }

      setTableData1(flag === 0 ? tableData1.map((item, i) => {
        if (destination.index === i) {
          table1FontColorChn.push(1);
          return data[0].item.title;
        } else if (Number.isInteger(item)) {
          table1FontColorChn.push(0);
          return i;
        } else {
          table1FontColorChn.push(1);
          return item;
        }
      }) : tableData1.map((item, i) => {
        if (destination.index === i) {
          table1FontColorChn.push(1);
          return data;
        } else if (Number.isInteger(item)) {
          table1FontColorChn.push(0);
          return i;
        } else if(dragIndex !== 0 && dragIndex === i) {
          table1FontColorChn.push(0);
          return i;
        } else {
          table1FontColorChn.push(1);
          return item;
        }
      })
      )

      setTable1FontColor(table1FontColorChn);
    } else if (destination.droppableId === "table2") {
      const table2FontColorChn = [];

      if(flag===0){
        if(tableData2.find(item => item === data[0].item.title)) return;
      } else {
        dragIndex = source.index;
      }

      setTableData2(flag === 0 ? tableData2.map((item, i) => {
        if (destination.index === i) {
          table2FontColorChn.push(1);
          return data[0].item.title;
        } else if (Number.isInteger(item)) {
          table2FontColorChn.push(0);
          return i;
        } else {
          table2FontColorChn.push(1);
          return item;
        }
      }) : tableData2.map((item, i) => {
        if (destination.index === i) {
          table2FontColorChn.push(1);
          return data;
        } else if (Number.isInteger(item)) {
          table2FontColorChn.push(0);
          return i;
        } else if(dragIndex !== 0 && dragIndex === i) {
          table2FontColorChn.push(0);
          return i;
        } else {
          table2FontColorChn.push(1);
          return item;
        }
      })
      )

      setTable2FontColor(table2FontColorChn);
    }
  };

  const deleteValue= (e,index) => {
    console.log("gg");
    console.log(typeof(e.target.id));
    // table1의 요소 삭제
    if(index === 0){
      const table1FontColorChn = [];

      let data = [...tableData1];
      data = data.map((item,i) => {
        if(parseInt(e.target.id) === i) {
          table1FontColorChn.push(0);
          return i;
        } else if(Number.isInteger(item)) {
          table1FontColorChn.push(0);
          return item;
        } else {
          table1FontColorChn.push(1);
          return item;
        }
      });

      setTable1FontColor(table1FontColorChn);
      setTableData1(data);
    } else if(index === 1){
      const table2FontColorChn = [];

      let data = [...tableData2];
      data = data.map((item,i) => {
        if(parseInt(e.target.id) === i) {
          table2FontColorChn.push(0);
          return i;
        } else if(Number.isInteger(item)) {
          table2FontColorChn.push(0);
          return item;
        } else {
          table2FontColorChn.push(1);
          return item;
        }
      });

      setTable1FontColor(table2FontColorChn);
      setTableData1(data);
    }
  };

  return (
    <div className='travelContainer'>
      <div>
        <div className='travelSelect'>
          {/* <Link to="/"><h1 className='travelLogo'>JMT</h1></Link> */}
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
          onDragStart={() => document.body.style.overflow = 'hidden'}
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
              {/* Img List */}
              <Droppable droppableId='Lists' key="Lists">
                {(provided) => (
                  <div className='searchSchedule-data'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {
                      visit !== undefined
                        ? visit.items.map((item, i) => {
                          // if (i <= 10) {
                          return (
                            <Draggable
                              key={i}
                              draggableId={"List" + i.toString()} // 드래그 가능한 항목마다 고유한 문자열로 설정
                              index={i}
                            >
                              {(provided, snapshot) => (
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
                          // }
                          return null; // 일치하지 않는 항목에 대해 무언가 반환하도록 수정
                        })
                        : null // <></> 대신 null을 사용하세요.
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div className='searchSchedule-paging'>
              <ListPaging lastPage={visit ? visit.pageCount : 1} page={currentPage} setPage={setCurrentPage}></ListPaging>
              </div>
            </div>
            <div className='tableForm' >
              <Tables></Tables>
              {/* Day1 */}
              <table>
                <thead>
                  <tr className='tableTr'>
                    <td className='travelSchedule-thead'>Day1</td>
                  </tr>
                </thead>
                <Droppable droppableId='table1' key="table1">
                  {(provided,snapshot) => (
                    <tbody
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {
                        // (table1Data1 !== undefined && table1Data1 !== null) ?
                        tableData1.map((data, i) => {
                          return (
                            <Draggable
                              key={data}
                              draggableId={"table1" + data.toString()} // 드래그 가능한 항목마다 고유한 문자열로 설정
                              index={i}
                              isDragDisabled={false}
                              >
                              {(provided, snapshot) => (
                                <tr
                                  ref={provided.innerRef} // provided.innerRef를 여기서 사용
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{  
                                    backgroundColor: snapshot.isDragging ? 'blue' : 'white',
                                      ...provided.draggableProps.style,
                                    }}
                                  className='tableTr'
                                >
                                  <td className={table1FontColor[i] === 1 ? 'travelSchedule-table-td travelSchedule-table-td-black' : 'travelSchedule-table-td'}>
                                    {data}
                                    {table1FontColor[i] === 1 ? 
                                    <TiDeleteOutline className='travelSchedule-table-btn'
                                            id={i}
                                    onClick={(e) => deleteValue(e,0)}
                                    ></TiDeleteOutline> : null}
                                  </td>
                                </tr>
                              )
                              }
                            </Draggable>
                          )
                        })
                      }
                      {provided.placeholder}
                    </tbody>
                  )
                  }
                </Droppable>
              </table>
              {/* Day2 */}
              <table>
                <thead>
                  <tr className='tableTr'>
                    <td className='travelSchedule-thead'>Day2</td>
                  </tr>
                </thead>
                <Droppable droppableId='table2' key="table2">
                  {(provided) => (
                    <tbody
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {
                        tableData2.map((data, i) => {
                          return (
                            <Draggable
                              key={data}
                              draggableId={"table2" + data.toString()} // 드래그 가능한 항목마다 고유한 문자열로 설정
                              index={i}>
                              {(provided) => (
                                <tr
                                  ref={provided.innerRef} // provided.innerRef를 여기서 사용
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className='tableTr'
                                >
                                  <td className={table2FontColor[i] === 1 ? 'travelSchedule-table-td travelSchedule-table-td-black' : 'travelSchedule-table-td'}>
                                    {data}
                                    {table2FontColor[i] === 1 ? 
                                    <button className='travelSchedule-table-btn'
                                            id={i}
                                    onClick={(e) => deleteValue(e,1)}
                                    > X </button> : null}
                                  </td>
                                </tr>
                              )
                              }
                            </Draggable>
                          )
                        })
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