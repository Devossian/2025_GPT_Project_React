import { useState, useRef, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from 'react-router-dom';
import '../styles/Chat.css';

const Chat = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '40px';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleCreateRoom = async () => {
    if (!input.trim()) return alert('질문을 입력해주세요.');

    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('/create-room', {
        room_name: input,
      }, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      });

      alert('새로운 채팅방이 생성되었습니다!');
      setInput('');
      navigate(`/chat/${response.data.roomid}`);
    } catch (error) {
      console.error('채팅방 생성 실패:', error);
      alert('채팅방 생성에 실패했습니다.');
    }
  };

  return (
    <div className="chat">
      <h1>Chat with GPT</h1>
      <div className="chat__container">
        <h2>새로운 채팅방 만들기</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat__room-input"
          placeholder="채팅방 이름 입력..."
        />
        <button onClick={handleCreateRoom} className="chat__button">
          메세지 보내기
        </button>
      </div>
    </div>
  );
};

export default Chat;
