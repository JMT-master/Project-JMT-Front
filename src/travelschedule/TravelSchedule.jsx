import React, { useEffect, useState } from 'react';
import "../css/travelSchedule.css";
import Tables from './Tables';
import { Link } from 'react-router-dom';
import TravelForm from './TravelForm';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ListPaging from '../destination/ListPaging'
import { TiDeleteOutline } from 'react-icons/ti'
import { AiOutlineLoading } from 'react-icons/ai'
import { BiSolidSave, BiTrash, BiFileFind } from 'react-icons/bi'
import NaverMapView from '../common/NaverMapView';
import { useTheme } from 'styled-components';
import TravelScheduleModal from './TravelScheduleModal';
import Swal from 'sweetalert2'
import TsModalMap from '../common/TsModalMap'
const TravelSchedule = (props) => {
  const [visit, setVisit] = useState();
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [table1FontColor, setTable1FontColor] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [table2FontColor, setTable2FontColor] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [tableData1, setTableData1] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
  const [tableData2, setTableData2] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
  const [loading, setLoading] = useState(true);
  const [scheduleBtn, setScheduleBtn] = useState("2");
  const [mapModal, setMapModal] = useState(false);
  const theme = useTheme();

  // const markers = [
  //   ...tableData1
  // ];

  const markers = [];
  tableData1.map((item) => {
    if(!Number.isInteger(item)) markers.push(item);
<<<<<<< HEAD
  })
=======
  });
>>>>>>> 1d2cf79ebe5fc3d4855c2adceac29c049f905476

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=uimh6133t6toeyub&locale=kr&category=c4&page=${currentPage}`)
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
      setLoading(false);
    }
  }, [visit]);

  // Drag 도중
  // const onDragUpdate = (update) => {
  //   const { destination } = update;

  //   if (destination) {
  //     // 아이템이 특정 대상 영역 위로 드래그
  //     const isDraggingOverTable1 = destination.droppableId === "table1";
  //     const isDraggingOverTable2 = destination.droppableId === "table2";

  //     if (isDraggingOverTable1) {
  //       const tableRows = document.querySelectorAll(".table1"); // 테이블의 모든 행 가져오기

  //       tableRows.forEach((row, index) => {
  //         if(index === destination.index) {
  //           row.style.backgroundColor = "orange";
  //         }
  //       });
  //     } else if (isDraggingOverTable2) {
  //       // table2 대상 영역에 드래그 중 CSS를 적용합니다.
  //       // 마찬가지로, 배경색을 변경하거나 테두리를 추가할 수 있습니다.
  //     }
  //   }
  // };

  // Drag가 끝났을 경우
  const onDragEnd = (result) => {
    // source : drag 지점
    // destination : drop 지점
    const { destination, source } = result;
    let dragIndex = 0;

    // console.log("result : ", result);

    // drop이 List일 경우
    if (destination === null) return;
    if (destination && destination.droppableId === "Lists") return;
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return;

    // drag 지점 => Lists : flag 0, table1 : flag 1, table2 : flag 2
    let dragIndexData = null, dropIndexData = null, flag = 0;
    if (source.droppableId === "Lists") {
      dragIndexData = list !== undefined ? list.filter((item, i) => i === source.index) : null;
    } else if (source.droppableId === "table1") {
      dragIndexData = tableData1.filter((item, i) => i === source.index);
      flag = 1;
    } else if (source.droppableId === "table2") {
      dragIndexData = tableData2.filter((item, i) => i === source.index);
      flag = 2;
    }

    // drop 지점 : table1일 경우
    if (destination.droppableId === "table1") {
      const table1FontColorChn = [];
      dropIndexData = tableData1.filter((item, i) => i === destination.index);

      if (flag === 0) { // drag 지점 => Lists, drop 지점 => table1
        if (tableData1.find(item => item === dragIndexData[0].item)) return;

        setTableData1(tableData1.map((item, i) => {
          if (destination.index === i) {
            table1FontColorChn.push(1);
            return dragIndexData[0].item;
          } else if (Number.isInteger(item)) {
            table1FontColorChn.push(0);
            return i;
          } else {
            table1FontColorChn.push(1);
            return item;
          }
        }));
      } else if (flag === 1) { // drag 지점 => table1, drop 지점 => table1
        dragIndex = source.index;

        if (Number.isInteger(dragIndexData[0])) return;

        setTableData1(tableData1.map((item, i) => {
          if (destination.index === i) { // 도착지점과 index가 같을 때
            table1FontColorChn.push(1);
            return dragIndexData[0];
          } else if (Number.isInteger(item)) { // 빈 테이블
            table1FontColorChn.push(0);
            return i;
          } else if (dragIndex === i) { // drag 시작 지점
            if (Number.isInteger(dropIndexData)) {
              table1FontColorChn.push(0);
              return i;
            } else {
              table1FontColorChn.push(1);
              return dropIndexData[0];
            }
          } else {
            table1FontColorChn.push(1);
            return item;
          }
        })
        )
      } else if (flag === 2) { // drag 지점 => table2, drop 지점 => table1
        dragIndex = source.index;
        let table2ChnColor = [...table2FontColor];
        const table1Chn = [...tableData1];
        const table1ChnColor = [...table1FontColor] ;

        if (tableData1.includes(dragIndexData[0])) return; // table2의 데이터를 table1이 갖고 있는 경우

        setTableData1(tableData1.map((item, i) => {
          if (destination.index === i) { // 도착지점과 index가 같을 때
            table1FontColorChn.push(1);
            return dragIndexData[0];
          } else if(destination.index > i) {
            table1FontColorChn.push(table1ChnColor[i]);
            return table1Chn[i];
          } else {
            table1FontColorChn.push(table1ChnColor[i-1]);
            return table1Chn[i-1];
          }
        }));

        setTableData2(tableData2.map((item, i) => {
          if(dragIndex === i) {
            table2ChnColor[i] = 0;
            return i;
          } else {
            return item;
          }
        }));

        setTable2FontColor(table2ChnColor);
      }

      setTable1FontColor(table1FontColorChn);
    }
    // drop 지점 => table2
     else if (destination.droppableId === "table2") { 
      const table2FontColorChn = [];
      dropIndexData = tableData2.filter((item, i) => i === destination.index);

      if (flag === 0) { // drag 지점 => Lists, drop 지점 => table2
        if (tableData2.find(item => item === dragIndexData[0].item)) return;

        setTableData2(tableData2.map((item, i) => {
          if (destination.index === i) {
            table2FontColorChn.push(1);
            return dragIndexData[0].item;
          } else if (Number.isInteger(item)) {
            table2FontColorChn.push(0);
            return i;
          } else {
            table2FontColorChn.push(1);
            return item;
          }
        }));
      } else if (flag === 1) { // drag 지점 => table1, drop 지점 => table2
        dragIndex = source.index;
        let table1ChnColor = [...table1FontColor];
        const table2Chn = [...tableData2];
        const table2ChnColor = [...table2FontColor] ;

        if (tableData2.includes(dragIndexData[0])) return; // table1의 데이터를 table2가 갖고 있는 경우

        setTableData2(tableData2.map((item, i) => {
          if (destination.index === i) { // 도착지점과 index가 같을 때
            table2FontColorChn.push(1);
            return dragIndexData[0];
          } else if(destination.index > i) {
            table2FontColorChn.push(table2ChnColor[i]);
            return table2Chn[i];
          } else {
            table2FontColorChn.push(table2ChnColor[i-1]);
            return table2Chn[i-1];
          }
        }));

        setTableData1(tableData1.map((item, i) => {
          if (dragIndex === i) {
            table1ChnColor[i] = 0;
            return i;
          } else {
            return item;
          }
        }));

        setTable1FontColor(table1ChnColor);
      } else if (flag === 2) { // drag 지점 => table2, drop 지점 => table2
        dragIndex = source.index;
  
        if (Number.isInteger(dragIndexData[0])) return;
  
        setTableData2(tableData2.map((item, i) => {
          if (destination.index === i) { // 도착지점과 index가 같을 때
            table2FontColorChn.push(1);
            return dragIndexData[0];
          } else if (Number.isInteger(item)) { // 빈 테이블
            table2FontColorChn.push(0);
            return i;
          } else if (dragIndex === i) { // drag 시작 지점
            if (Number.isInteger(dropIndexData)) {
              table2FontColorChn.push(0);
              return i;
            } else {
              table2FontColorChn.push(1);
              return dropIndexData[0];
            }
          } else {
            table2FontColorChn.push(1);
            return item;
          }
        })
        )
      }

      setTable2FontColor(table2FontColorChn);
    }
  };

  // 삭제 버튼
  const deleteValue = (e, index) => {
    // table1의 요소 삭제
    if (index === 0) {
      const table1FontColorChn = [];

      let data = [...tableData1];
      data = data.map((item, i) => {
        if (parseInt(e.target.id) === i) {
          table1FontColorChn.push(0);
          return i;
        } else if (Number.isInteger(item)) {
          table1FontColorChn.push(0);
          return item;
        } else {
          table1FontColorChn.push(1);
          return item;
        }
      });

      setTable1FontColor(table1FontColorChn);
      setTableData1(data);
    } else if (index === 1) {
      const table2FontColorChn = [];

      let data = [...tableData2];
      data = data.map((item, i) => {
        if (parseInt(e.target.id) === i) {
          table2FontColorChn.push(0);
          return i;
        } else if (Number.isInteger(item)) {
          table2FontColorChn.push(0);
          return item;
        } else {
          table2FontColorChn.push(1);
          return item;
        }
      });

      setTable2FontColor(table2FontColorChn);
      setTableData2(data);
    }
  };

  // 찜한 여행지, 검색, 테마 중 클릭
  const searchScheduleChange = (e) => {
    setScheduleBtn(e.target.value);
  };

  // 일정 추가
  const addSchedule = (e) => {
    let flag = 0;
    const data = list !== undefined ? list.filter((item, i) => i === parseInt(e.target.value)) : null;
    let tableFontColorChn = [...table1FontColor];

    setTableData1(tableData1.map((item, i) => {
      if (flag === 0 && Number.isInteger(item)) {
        flag = 1;
        if (tableData1.includes(data[0].item))
          return item;
        else {
          tableFontColorChn[i] = 1;
          return data[0].item;
        }
      } else {
        return item;
      }
    }));

    if (flag === 0) {
      tableFontColorChn = [];
      tableFontColorChn = [...table2FontColor]
      setTableData2(tableData2.map((item, i) => {
        if (flag === 0 && Number.isInteger(item)) {
          flag = 1;
          if (tableData2.includes(data[0].item))
            return item;
          else {
            tableFontColorChn[i] = 1;
            return data[0].item;
          }
        } else {
          return item;
        }
      }));

      setTable2FontColor(tableFontColorChn);
    } else {
      setTable1FontColor(tableFontColorChn);
    }
  };

  // 지도 확대 Modal
  const showMapModal = () => {
    setMapModal(!mapModal);
  };

  // 전체 삭제
  const onScheduleReset = () => {
    setTableData1([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
    setTableData2([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
    setTable1FontColor([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setTable2FontColor([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    Swal.fire(
      {
        icon: 'info',
        title: '삭제',
        text: '일정이 전부 삭제되었습니다.',
        confirmButtonText: 'OK'
      }
    );
  };

  // Loading 화면
  if (loading === true) {
    return <div className='loading'><AiOutlineLoading className='loadingIcon'></AiOutlineLoading></div>
  } else {
    return (
      <div className='travelContainer'>
        <div>
          <div className='travelSelect'>
            {/* <Link to="/"><h1 className='travelLogo'>JMT</h1></Link> */}
            <div className='travelStepBox'>
              <Link to="/selectSchedule">
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
            <div className='travelSchedule-icons'>
              <div onClick={showMapModal} className='travelSchedule-icon'>
                {/* <BiFileFind className={`travelBtn ${theme.body === "#FFF" ? 'blackText' : 'whiteText'}`}>확대</BiFileFind> */}
                <p className={`travelSchedule-icons-title ${theme.body === "#FFF" ? 'blackText' : 'whiteText'}`}>확대</p>
                {mapModal && <TravelScheduleModal mapModalsend={mapModal} setMapModalsend={setMapModal} markers={markers}></TravelScheduleModal>}
              </div>
              <div onClick={onScheduleReset} className='travelSchedule-icon'>
                {/* <BiTrash className={`travelBtn ${theme.body === "#FFF" ? 'blackText' : 'whiteText'}`}>삭제</BiTrash> */}
                <p className={`travelSchedule-icons-title ${theme.body === "#FFF" ? 'blackText' : 'whiteText'}`}>삭제</p>
              </div>
              <div className='travelSchedule-icon'>
                {/* <BiSolidSave className={`travelBtn ${theme.body === "#FFF" ? 'blackText' : 'whiteText'}`}>저장</BiSolidSave> */}
                <p className={`travelSchedule-icons-title ${theme.body === "#FFF" ? 'blackText' : 'whiteText'}`}>저장</p>
              </div>
            </div>
          </div>

          <DragDropContext
            onDragEnd={onDragEnd}
          // onDragUpdate={onDragUpdate}
          >
            <div className='travelInfo'>
              <div className='searchSchedule'>
                <div className='searchSchedule-btns'>
                  <button className={`searchSchedule-btns-travel${scheduleBtn === "0" ? ' searchSchedule-btns-select' : ''}`}
                    onClick={searchScheduleChange}
                    value='0'>찜한여행지</button>
                  <button className={`searchSchedule-btns-search${scheduleBtn === "1" ? ' searchSchedule-btns-select' : ''}`}
                    onClick={searchScheduleChange}
                    value='1'>검색</button>
                  <button className={`searchSchedule-btns-thema${scheduleBtn === "2" ? ' searchSchedule-btns-select' : ''}`}
                    onClick={searchScheduleChange}
                    value='2'>테마</button>
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
                                    <TravelForm key={i} data={item} tableArea={0} addSchedule={addSchedule} index={i}></TravelForm>
                                  </div>
                                )}
                              </Draggable>
                            );
                            // }
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
                    <tr className='firstRowHead'>
                      <td className='travelSchedule-thead'>Day1</td>
                    </tr>
                  </thead>
                  <Droppable droppableId='table1' key="table1">
                    {(provided, snapshot) => (
                      <tbody
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='table1'
                      >
                        {
                          // (table1Data1 !== undefined && table1Data1 !== null) ?
                          tableData1.map((data, i) => {
                            return (
                              <Draggable
                                key={i}
                                draggableId={"table1" + i.toString()} // 드래그 가능한 항목마다 고유한 문자열로 설정
                                index={i}
                                isDragDisabled={false}
                              >
                                {(provided, snapshot) => (
                                  <tr
                                    ref={provided.innerRef} // provided.innerRef를 여기서 사용
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className='tableTr'
                                  // style={{
                                  //   backgroundColor: snapshot.isDragging ? 'orange' : 'white',
                                  //   ...provided.draggableProps.style,
                                  // }}
                                  >
                                    <td className={table1FontColor[i] === 1 ? 'travelSchedule-table-td travelSchedule-table-td-black' : 'travelSchedule-table-td'}>
                                      {/* {data} */}
                                      <TravelForm key={i} data={data} tableArea={1} addSchedule={addSchedule} index={i}></TravelForm>
                                      {table1FontColor[i] === 1 ?
                                        <TiDeleteOutline className='travelSchedule-table-btn'
                                          id={i}
                                          onClick={(e) => deleteValue(e, 0)}
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
                    <tr className='firstRowHead'>
                      <td className='travelSchedule-thead'>Day2</td>
                    </tr>
                  </thead>
                  <Droppable droppableId='table2' key="table2">
                    {(provided, snapshot) => (
                      <tbody
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='table2'
                      >
                        {
                          // (table1Data1 !== undefined && table1Data1 !== null) ?
                          tableData2.map((data, i) => {
                            return (
                              <Draggable
                                key={i}
                                draggableId={"table2" + i.toString()} // 드래그 가능한 항목마다 고유한 문자열로 설정
                                index={i}
                                isDragDisabled={false}
                              >
                                {(provided, snapshot) => (
                                  <tr
                                    ref={provided.innerRef} // provided.innerRef를 여기서 사용
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    // style={{
                                    //   backgroundColor: snapshot.isDragging ? 'orange' : 'white',
                                    //   ...provided.draggableProps.style,
                                    // }}
                                    className='tableTr'
                                  >
                                    <td className={table2FontColor[i] === 1 ? 'travelSchedule-table-td travelSchedule-table-td-black' : 'travelSchedule-table-td'}>
                                      {/* {data} */}
                                      <TravelForm key={i} data={data} tableArea={1} addSchedule={addSchedule} index={i}></TravelForm>
                                      {table2FontColor[i] === 1 ?
                                        <TiDeleteOutline className='travelSchedule-table-btn'
                                          id={i}
                                          onClick={(e) => deleteValue(e, 1)}
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
              </div>
            </div>
          </DragDropContext>

        </div>
        <div className='travelSchedule-naverMap'>
          <TsModalMap markers={markers}></TsModalMap>
        </div>
      </div>
    )
  }
}

export default TravelSchedule