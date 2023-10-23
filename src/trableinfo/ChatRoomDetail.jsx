import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { Stomp } from '@stomp/stompjs';
import * as StompJs from '@stomp/stompjs'
import { call } from '../common/ApiService';

const ChatRoomDetail = () => {
    const [roomId, setRoomId] = useState(localStorage.getItem('wschat.roomId') || '');
    const [sender, setSender] = useState(localStorage.getItem('wschat.sender') || '');
    const [room, setRoom] = useState({});
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null); // 상태로 ws를 관리

    useEffect(() => {
        connect();
        // 컴포넌트 언마운트 시 웹소켓 연결 해제
        return () => {
            if (ws) {
                ws.disconnect();
            }
        };
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

    const sendMessage = () => {
        const socketMessage = {
            type: 'TALK',
            roomId: roomId,
            sender: sender,
            message: message,
        };

        if (ws) {
            ws.publish({
                destination : "/app/chat/message",
                body : JSON.stringify(socketMessage)
            });
        }
        setMessage('');
    };

    const recvMessage = recv => {
        setMessages(prevMessages => [
            { type: recv.type, sender: recv.type === 'ENTER' ? '[알림]' : recv.sender, message: recv.message },
            ...prevMessages,
        ]);
    };

    // const createWebSocket = () => {
    //     var sock = new SockJS("http://localhost:8888/ws/chat");
    //     const stompClient = StompJs.Stomp.over(sock);
    //     return stompClient;
    // };

    const createWebSocket = () => {
        const client = new StompJs.Client({
            brokerURL: "ws://localhost:8888/ws/chat",
            debug: function (str) {
                console.log("str임 : " + str);
              },
            reconnectDelay: 5000, // 자동 재 연결 값
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
        return client;
    };

    function connect(e) {
        const stompClient = createWebSocket();
        console.log("stompClient: " + stompClient.brokerURL);

        stompClient.onConnect = function(){
            stompClient.subscribe(`/topic/chat/room/${roomId}`, message => {
                const recv = JSON.parse(message.body);
                recvMessage(recv);
            });

            // 입장 메시지를 발행
            const enterMessage = {
                type: 'ENTER',
                roomId: roomId,
                sender: sender
            };
            stompClient.publish({
                destination: "/app/chat/message",
                body: JSON.stringify(enterMessage)
            });
            // ws 상태 업데이트
            setWs(stompClient);

        };
    };

    // const clientdata = new StompJs.Client({
    //     brokerURL: "ws://localhost:8888/ws/chat",
    //     connectHeaders: {
    //       login: "",
    //       passcode: "password",
    //     },
    //     debug: function (str) {
    //       console.log(str);
    //     },
    //     reconnectDelay: 5000, // 자동 재 연결
    //     heartbeatIncoming: 4000,
    //     heartbeatOutgoing: 4000,
    //   });

    return (
        <div >
            <div>
                <h2>{room.name}</h2>
            </div>
            <div >
                <div >
                    <label >내용</label>
                </div>
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={e => {
                        if (e.key === 'Enter') sendMessage();
                    }}
                />
                <div>
                    <button type="button" onClick={sendMessage}>
                        보내기
                    </button>
                </div>
            </div>
            <ul >
                {messages.map((msg, index) => (
                    <li key={index}>
                        {msg.sender} - {msg.message}
                    </li>
                ))}
            </ul>
            <div></div>
        </div>
    );
};

export default ChatRoomDetail;
