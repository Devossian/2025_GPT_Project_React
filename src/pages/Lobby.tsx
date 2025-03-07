import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance";

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
          console.log(response.data.rooms);
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
      <ul>
        {chatRooms.map((room) => (
          <li key={room.roomid}>
            <Link to={`/chat/${room.roomid}`}>{room.roomid}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;