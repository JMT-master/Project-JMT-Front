import React, { useState, useEffect } from "react";
import { call } from "../common/ApiService";
import style from "../css/chatRoom.css";

const ChatRoomComponent = () => {
  const [roomName, setRoomName] = useState("");
  const [chatRooms, setChatRooms] = useState([]);

  const fetchChatRooms = async () => {
    call("/chat/room", "GET", null)
      .then((response) => {
        setChatRooms(response.data);
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
        var newChro = [...chatRooms, response.data];
        setChatRooms(newChro);
        setRoomName("");
        fetchChatRooms();
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
      className="list-group"
      >
        {chatRooms.map((room) => (
          <li key={room.roomId} 
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