import React, { useState, useEffect } from "react";
import { call } from "../common/ApiService";
import style from "../css/chatRoom.css";
import axios from "axios";
import { API_BASE_URL } from "../common/ApiConfig";

const ChatRoomComponent = () => {
  const [roomName, setRoomName] = useState("");
  const [chatRooms, setChatRooms] = useState([]);

  const fetchChatRooms = async () => {
    try {
      const response = await call("/chat/room", "GET", null);
      setChatRooms(response.data);
    } catch (error) {
      console.error("채팅 방을 불러오는 중 오류 발생:", error);
    }
  };
  

  const createChatRoom = async () => {
    try {
      const response = await call("/chat/room", "POST", {
        roomName: roomName,
      });
      const newChro = [...chatRooms, response.data];
      setChatRooms(newChro);
      setRoomName("");
      fetchChatRooms();
    } catch (error) {
      console.error("채팅 방을 생성하는 중 오류 발생:", error);
    }
  };
  
  const enterRoom = (roomId, roomName) => {
    const sender = prompt("대화명을 입력해 주세요.");
    if (sender !== null && sender.trim() !== "") {
      console.log("sender: " + sender);
      localStorage.setItem("wschat.sender", sender);
      localStorage.setItem("wschat.roomId", roomId);
      localStorage.setItem("wschat.roomName", roomName);
  
      // 디버깅을 위해 저장된 값을 확인
      console.log("localStorage wschat.sender:", localStorage.getItem("wschat.sender"));
      console.log("localStorage wschat.roomId:", localStorage.getItem("wschat.roomId"));
      console.log("localStorage wschat.roomName:", localStorage.getItem("wschat.roomName"));
  
      window.location.href = "/chat/room/" + roomId;
    }
  };
  
  useEffect(() => {
    fetchChatRooms();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행되도록 합니다.
  
  const deleteRoom = (room) => {
    call("/chat/delete", "DELETE", room)
      .then((response) => {
        setChatRooms(response.data)
      })
  };

  return (
    <div className="chat-list-container">
      <h1 className="chat-list-title">전체 채팅방 목록</h1>
      <ul 
      className="list-group"
      >
        {chatRooms.map((room) => (
          <li key={room.roomId} 
          class="

          text-center"
          >
            <span
              style={{ cursor: "pointer",
                      backgroundColor:"" }}
              onClick={() => enterRoom(room.roomId, room.roomName)}
            >
              {room.roomName}
            </span>
            <button type="button" className="oBtn" onClick={() => deleteRoom(room)} >삭제</button>
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