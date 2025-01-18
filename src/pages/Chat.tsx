import { useState } from 'react';
import '../styles/Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    setMessages([...messages, input]);
    setInput('');
  };

  return (
    <div className="page">
      <h1>Chat with GPT</h1>
      <div className="chatBox">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className='input'
      />
      <button onClick={handleSendMessage} className='button'>Send</button>
    </div>
  );
};

export default Chat;