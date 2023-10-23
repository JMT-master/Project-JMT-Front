import React from 'react'
import * as StompJs from "@stomp/stompjs";
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const ChatDetail = () => {
  const navigate = useNavigate();

  //채널 구분 식별자
  const param = useParams();
  // const roomId = param.roomId;
  //현재 로그인된 사용자 토큰
  const token = JSON.stringify(window.localStorage.getItem("token"));
  const [roomId, setRoomId] = useState(localStorage.getItem('wschat.roomId') || '');
  const [sender, setSender] = useState(localStorage.getItem('wschat.sender') || '');
  let [client, changeClient] = useState(null);
  //채팅 변수
  const [message, setMessage] = useState("");
  //채팅 기록
  const [messages, setMessages] = useState([]);

  //유저 코드 받을꺼임

  //보낸 메시지 받은 메시지 다른 스타일로 확인해볼까? -> 나중에 해도됨
  const msgBox = messages.map((item, index) => {

    console.log("item.data 찍어보기"+item.data);
    console.log("item.data.data : "+item.data.data);
    console.log("item.sender 찍어보기 : "+item.sender);

    if (Number(item.sender) !== sender) {
      return (
        <div key={index}>
          <div>
            상대방
            <span>{item.data}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <span>{item.data}</span>
        </div>
      )
    }
  })

  const connect = () => {
    //소켓을 연결합시다
    try {
      const clientdata = new StompJs.Client({
        brokerURL: "ws://localhost:8888/ws/chat",
        connectHeaders: {
          login: "",
          passcode: "password",
        },
        debug: function (str) {
          console.log("str임 : " + str);
          console.log("str.chatAt임 : " + str.charAt);
        },
        // reconnectDelay: 5000, //자동 재 연결 값
        // heartbeatIncoming: 4000,
        // heartbeatOutgoing: 4000,
      });

      //구독하는 코드
      clientdata.onConnect = function () {
        clientdata.subscribe("/topic/chat/room/" + roomId, callback);
      };

      clientdata.activate(); //클라이언트 활성화
      changeClient(clientdata); //클라이언트 갱신
    } catch (error) {
      console.log("connect 하면서 생긴 오류 : " + error);
    }
  };

  const disConnect = () => {
    //연결 끊기
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  //콜백 함수  => messages 저장하기
  const callback = function (message) {
    if (message.body) {
      let msg = JSON.parse(message.body);
      console.log("msg임 : "+msg);
      setMessages((messages) => [...messages, msg]);
    }
  };

  const sendChat = () => {
    if (message === "") {
      return;
    }

    client.publish({
      destination: "/app/chat/message/" + roomId,
      body: JSON.stringify({
        type: "",
        sender: sender,
        roomId: roomId,
        data: message,
      }),
    });

    setMessage("");
  };

  useEffect(()=>{
    //최초 렌더링 시 웹소켓에 연결해야함
    connect();

    return () => disConnect();
  }, [changeClient]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChangeMessage = (e) => {
    console.log("e.target.value : "+e.target.value);
    setMessage(e.target.value);
  }

  return (
    <div>
      {/* 나가기 버튼 */}
        <button type='button' onClick={() => navigate("/chat/room")}>나가기</button>
        {/* 상대방 이름 */}
        <span>상대방</span>
        {/* 여기는 입력 폼 */}
        {msgBox}
        <form onSubmit={handleSubmit}>
          <input type="text" id='msg' value={message} placeholder='메세지를 보내라'
          onChange={onChangeMessage} onKeyDown={(ev) => {
            if(ev.key === 'ENTER'){
              sendChat();
            }
          }} />
        </form>
        <button type='button' onClick={sendChat}>전송</button>
    </div>
  )
}

export default ChatDetail