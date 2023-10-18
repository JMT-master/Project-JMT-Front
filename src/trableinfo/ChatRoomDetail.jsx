import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
import axios from 'axios';

const ChatRoomDetail = () => {
    const [roomId, setRoomId] = useState(localStorage.getItem('wschat.roomId') || '');
    const [room, setRoom] = useState({});
    const [sender, setSender] = useState(localStorage.getItem('wschat.sender') || '');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null); // 상태로 ws를 관리

    useEffect(() => {
        findRoom();
        // connect();
        // 컴포넌트 언마운트 시 웹소켓 연결 해제
        return () => {
            if (ws) {
                ws.disconnect();
            }
        };
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

    const findRoom = () => {
        axios.get(`/chat/room/${roomId}`)
            .then(response => {
                setRoom(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const sendMessage = () => {
        const socketMessage = {
            type: 'TALK',
            roomId: roomId,
            sender: sender,
            message: message,
        };

        if (ws) {
            ws.send(`/app/chat/message`, {}, JSON.stringify(socketMessage));
        }

        setMessage('');
    };

    const recvMessage = recv => {
        setMessages(prevMessages => [
            { type: recv.type, sender: recv.type === 'ENTER' ? '[알림]' : recv.sender, message: recv.message },
            ...prevMessages,
        ]);
    };

    // const connect = () => {
    //     const sock = new SockJS(`/ws/chat`);
    //     const stompClient = Stomp.over(sock);
    //     stompClient.connect({}, frame => {
    //         stompClient.subscribe(`/topic/chat/room/${roomId}`, message => {
    //             const recv = JSON.parse(message.body);
    //             recvMessage(recv);
    //         });
    //         stompClient.send(`/app/chat/message`, {}, JSON.stringify({ type: 'ENTER', roomId: roomId, sender: sender }));
    //         // ws 상태 업데이트
    //         setWs(stompClient);
    //     });
    // };


    return (
        <div className="container" id="app">
            <div>
                <h2>{room.name}</h2>
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <label className="input-group-text">내용</label>
                </div>
                <input
                    type="text"
                    className="form-control"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={e => {
                        if (e.key === 'Enter') sendMessage();
                    }}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={sendMessage}>
                        보내기
                    </button>
                </div>
            </div>
            <ul className="list-group">
                {messages.map((msg, index) => (
                    <li className="list-group-item" key={index}>
                        {msg.sender} - {msg.message}
                    </li>
                ))}
            </ul>
            <div></div>
        </div>
    );
};

export default ChatRoomDetail;
