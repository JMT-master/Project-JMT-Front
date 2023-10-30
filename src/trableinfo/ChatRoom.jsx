import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { call } from '../common/ApiService';
import Modal from 'react-modal';

const ChatRoomComponent = () => {
  const [roomName, setRoomName] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('ACCESS_TOKEN');

  const fetchChatRooms = async () => {
      call("/chat/room", "GET", null)
      .then((response) => {
        setChatRooms(response.data);
        console.log("response.data : "+response.data);
      }).catch((error) => {
        console.error('Error fetching chat rooms:', error);
      });
  };

  const createChatRoom = async () => {
    call("/chat/room", "POST", { 
        roomName: roomName 
    })
      .then((response) => {
        console.log(roomName);
        var newChro = [...chatRooms , response.data]
        setChatRooms(newChro)
        setRoomName("");
        fetchChatRooms();
          console.log('Chat room created:', response.data);
      }).catch((error)=>{
        console.error('Error creating chat room:', error);
      });
  };
const enterRoom = (roomId) => {
    const sender = prompt('대화명을 입력해 주세요.');
    if (sender !== null && sender !== '') {
        localStorage.setItem('wschat.sender', sender);
        localStorage.setItem('wschat.roomId', roomId);
        window.location.href = '/chat/room/' + roomId;
    }
};
  useEffect(() => {
    fetchChatRooms(); // 컴포넌트가 마운트될 때 방 목록을 불러옵니다.
  }, [chatRooms.length]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.


  //모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  }
  //모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>채팅방 만들기</button>
      <Modal
        isOpen={isModalOpen} // 모달 열림 여부를 상태 변수로 제어
        onRequestClose={closeModal} // 모달을 닫기 위한 콜백 함수
        contentLabel="Chat Room Modal" // 모달의 레이블 (접근성을 위해 사용됨)
      >
      <h1>채팅방 만들기</h1>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.roomId}
          ><span 
          style={{ cursor: "pointer" }}
          onClick={() => enterRoom(room.roomId)} >{room.roomName}</span></li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="방 제목을 입력하세요."
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') createChatRoom();
        }}
        />
        <button type='button'
         onClick={() => {
          createChatRoom();
          closeModal(); // 모달을 닫음
        }}
         >방 만들기</button>
      </div>
      <button onClick={closeModal}>취소</button>
      </Modal>
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


