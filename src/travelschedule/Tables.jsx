import React from 'react'
import '../css/table.css'
import { Draggable, Droppable } from 'react-beautiful-dnd';


const Tables = ({ rows, columns }) => {
  const timeDate = [
    "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00",
    "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
    "21:00", "22:00", "23:00"
  ];

  return (
    // <table>
    //   <thead>
    //     <tr>
    //       <th className='firstRow'>Time</th>
    //       <th>Day1</th>
    //       <th>Day2</th>
    //     </tr>
    //   </thead>
    //   <Droppable droppableId='Tables' key="tables">
    //     {(provided) => (
    //       <tbody
    //       ref={provided.innerRef}
    //       {...provided.droppableProps}
    //       >
    //         {
    //           timeDate.map((data, i) => {
    //             return (
    //             <Draggable 
    //             key={i} 
    //             draggableId={i.toString()} 
    //             index={i}>
    //               {
    //                 (provided) => (
    //                     <tr key={i} data={data}
    //                     ref={provided.innerRef}
    //                     {...provided.draggableProps}
    //                     {...provided.dragHandleProps}>
    //                       <td className='firstRow'>{data}</td>
    //                       <td></td>
    //                       <td></td>
    //                     </tr>
    //                 )
    //               }
    //             </Draggable>)

    //           })}
    //       {provided.placeholder}
    //       </tbody>
    //     )}
    //   </Droppable>

    // </table>
    <table>
      <thead>
        <tr>
          <th className='firstRow'>Time</th>
        </tr>
      </thead>
      <tbody>
        {
          timeDate.map((data, i) => {
            return (<tr>
              <td className='firstRow'>{data}</td>
            </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default Tables