import { useState, useRef, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance";
import '../styles/Chat.css';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { roomId } = useParams<{ roomId: string }>();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

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
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('/chat/send-message', {
        message: input,
        model: 'gpt-3.5-turbo',
        roomid: roomId,
      }, {
        headers: {
          'Authorization' : `Token ${token}`
        }
      });


      setMessages((prev) => [...prev, { text: response.data.message, sender: 'gpt' }]);
    } catch (error) {
      console.error('Error:', error);

      // 에러 발생 시 메시지 생긴 꼬라지 변경
      setMessages((prev) => {
        if (prev.length > 0) {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = {
            ...updatedMessages[updatedMessages.length - 1],
            sender: 'user-error',
          };
          return updatedMessages;
        }
        return prev;
      });

      if (error instanceof AxiosError && error.response){
        alert(error.response.data.message);
      } else {
        alert("알 수 없는 에러가 발생했습니다.")
      }
      
    } finally {
      setLoading(false);
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
              <button onClick={handleSendMessage} className="chat__button" disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
