import axios from 'axios';
import React  from 'react'
import { useState } from 'react';



const RoomList = (props) => {

const [roomName, setRoomName] = useState("");
const [item, setItem] = useState([]);

  const findAllRoom = () => {

    axios.get('/chat/room')
        .then(response => {
          setItem(response.data);
        })
        .catch(error => {
            console.error(error);
        });
};

  const createRoom = () => {
    if (roomName === '') {
      alert('방 제목을 입력해 주십시오.');
    } else {
      axios.post('/chat/room', { name: roomName })
        .then(response => {
          alert(`${response.data.name} 방 개설에 성공하였습니다.`);
          setRoomName('');
          findAllRoom();
        })
        .catch(error => {
          alert('채팅방 개설에 실패하였습니다.');
          console.error(error);
        });
    }
  };
  const enterRoom = roomId => {
    const sender = prompt('대화명을 입력해 주세요.');
    if (sender !== null && sender !== '') {
        localStorage.setItem('wschat.sender', sender);
        localStorage.setItem('wschat.roomId', roomId);
        window.location.href = '/chat/room/enter/' + roomId;
    }
};
  return (
    <div>
    <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text">방제목</label>
        </div>
        <input
          type="text"
          className="form-control"
          value={item.roomName}
          id={item.id} name={item.id}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && createRoom()}
        />
      </div>
    </div>
  )
}


export default RoomList