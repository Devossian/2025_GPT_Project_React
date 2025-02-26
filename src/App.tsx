import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import CreateChat from './pages/CreateChat';
import Chat from './pages/Chat';
import Login from './components/Login';
import Register from './components/Register';
import Payment from './components/Payment';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<CreateChat />} />
        <Route path="/chat" element={<CreateChat />} />
        <Route path="/chat/:roomId" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
