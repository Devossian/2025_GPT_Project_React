import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '40px';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('/chat/send-message', {
        message: input,
        model: 'gpt-4',
        roomid: roomId,
      });

      setMessages((prev) => [...prev, { text: response.data.message, sender: 'gpt' }]);
    } catch (error) {
      console.error('Error:', error);
      alert('메시지 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    if (!input.trim()) return alert('질문을 입력해주세요.');

    try {
      const response = await axios.post('/create-room', {
        room_name: input,
      });

      setRoomId(response.data.roomid);
      alert('새로운 채팅방이 생성되었습니다!');
      setInput('');
      navigate(`/chat/${response.data.roomid}`);
    } catch (error) {
      console.error('채팅방 생성 실패:', error);
      alert('채팅방 생성에 실패했습니다.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat">
      <h1>Chat with GPT</h1>
      <div className="chat__container">
        {roomId ? (
          <>
            <h2>채팅방: {roomId}</h2>
            <div className="chat__box" ref={chatBoxRef}>
              {messages.map((message, index) => (
                <div key={index} className={`chat__message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="chat__input-container">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="chat__input"
                placeholder="Type a message... (Shift+Enter for new line)"
                disabled={loading}
                rows={1}
              />
              <button onClick={handleSendMessage} className="chat__button" disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
