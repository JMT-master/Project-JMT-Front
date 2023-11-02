import React, { useState, useEffect } from "react";
import axios from "axios";
import { call } from "../common/ApiService";
import style from "../css/chatRoom.css";

const ChatRoomComponent = () => {
  const [roomName, setRoomName] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("ACCESS_TOKEN");

  const fetchChatRooms = async () => {
    call("/chat/room", "GET", null)
      .then((response) => {
        setChatRooms(response.data);
        console.log("response.data : " + response.data);
      })
      .catch((error) => {
        console.error("Error fetching chat rooms:", error);
      });
  };

  const createChatRoom = async () => {
    call("/chat/room", "POST", {
      roomName: roomName,
    })
      .then((response) => {
        console.log(roomName);
        var newChro = [...chatRooms, response.data];
        setChatRooms(newChro);
        setRoomName("");
        fetchChatRooms();
        console.log("Chat room created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating chat room:", error);
      });
  };
  const enterRoom = (roomId, roomName) => {
    const sender = prompt("대화명을 입력해 주세요.");
    if (sender !== null && sender !== "") {
      localStorage.setItem("wschat.sender", sender);
      localStorage.setItem("wschat.roomId", roomId);
      localStorage.setItem("wschat.roomName", roomName);
      window.location.href = "/chat/room/" + roomId;
    }
  };
  useEffect(() => {
    fetchChatRooms(); // 컴포넌트가 마운트될 때 방 목록을 불러옵니다.
  }, [chatRooms.length]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  return (
    <div className="chat-list-container">
      <h1 className="chat-list-title">전체 채팅방 목록</h1>
      <ul 
      // className="chat-list"
      className="list-group"
      >
        {chatRooms.map((room) => (
          <li key={room.roomId} 
          // className="chat-room"
          class="list-group-item list-group-item-warning text-center"
          >
            <span
              style={{ cursor: "pointer" }}
              onClick={() => enterRoom(room.roomId, room.roomName)}
            >
              {room.roomName}
            </span>
          </li>
        ))}
      </ul>
      <div className="create-chat-room">
        <input
          type="text"
          placeholder="방 제목을 입력하세요."
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") createChatRoom();
          }}
        />
        <button type="button" onClick={createChatRoom}>
          방 만들기
        </button>
      </div>
    </div>
  );
};

export default ChatRoomComponent;
// const ChatRoomComponent = () => {
//   const [roomName, setRoomName] = useState('');
//   const [chatrooms, setChatrooms] = useState([]);

//   useEffect(() => {
//       findAllRoom();
//   }, []);

//   const findAllRoom = () => {
//       axios.get('/chat/rooms')
//           .then(response => {
//               setChatrooms(response.data);
//           })
//           .catch(error => {
//               console.error(error);
//           });
//   };

//   const createRoom = () => {
//       if (roomName === '') {
//           alert('방 제목을 입력해 주십시요.');
//       } else {
//           const params = new URLSearchParams();
//           params.append('name', roomName);

//           axios.post('/chat/room', params)
//               .then(response => {
//                   alert(response.data.roomName + '방 개설에 성공하였습니다.');
//                   setRoomName('');
//                   findAllRoom();
//               })
//               .catch(error => {
//                   console.error(error);
//                   alert('채팅방 개설에 실패하였습니다.');
//               });
//       }
//   };

//   const enterRoom = roomId => {
//       const sender = prompt('대화명을 입력해 주세요.');
//       if (sender !== null && sender !== '') {
//           localStorage.setItem('wschat.sender', sender);
//           localStorage.setItem('wschat.roomId', roomId);
//           window.location.href = '/chat/room/enter/' + roomId;
//       }
//   };

//   return (
//       <div className="container" id="app">
//           <div className="row">
//               <div className="col-md-12">
//                   <h3>채팅방 리스트</h3>
//               </div>
//           </div>
//           <div className="input-group">
//               <div className="input-group-prepend">
//                   <label className="input-group-text">방제목</label>
//               </div>
//               <input
//                   type="text"
//                   className="form-control"
//                   value={roomName}
//                   onChange={e => setRoomName(e.target.value)}
//                   onKeyUp={e => {
//                       if (e.key === 'Enter') createRoom();
//                   }}
//               />
//               <div className="input-group-append">
//                   <button className="btn btn-primary" type="button" onClick={createRoom}>
//                       채팅방 개설
//                   </button>
//               </div>
//           </div>
//           <ul className="list-group">
//               {chatrooms.map(item => (
//                   <li
//                       className="list-group-item list-group-item-action"
//                       key={item.roomId}
//                       onClick={() => enterRoom(item.roomId)}
//                   >
//                       {item.roomName}
//                   </li>
//               ))}
//           </ul>
//       </div>
//   );
// };
