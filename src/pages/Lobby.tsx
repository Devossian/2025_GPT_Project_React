import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance";
import '../styles/Lobby.css';

interface ChatRoom {
  roomid: string,
  name: string,
  created_at: string,
  timestamp: string,
  messages: string[],
}

const Lobby = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.get(`/lobby`, {
        headers:{
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => {
          setChatRooms(response.data.rooms);
        })
        .catch(error => {
          console.error('채팅방 목록을 불러오는 중 오류 발생:', error);
        });
    }
  }, []);

  return (
    <div className="lobby">
      <h1>채팅방 목록</h1>
      <ul className="chat-room-list">
        {chatRooms.map((room) => (
          <li key={room.roomid} className="chat-room">
            <div className="chat-room-content">
              <span className="chat-room-title">{room.roomid}</span>
              {/* room.name을 사용하고 싶으면 {room.name}으로 변경 */}
              <Link to={`/chat/${room.roomid}`}>
                <button className="enter-button">입장</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;