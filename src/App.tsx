import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import CreateChat from './pages/CreateChat';
import Chat from './pages/Chat';
import Success from './pages/success';
import Login from './components/Login';
import Register from './components/Register';
import Payment from './components/Payment';
import Lobby from './pages/Lobby';
import { useEffect, useState } from 'react';

interface User {
  username: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number>(0);

  // JWT 토큰 디코딩 함수
  const parseJwt = (token : string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => { // 1분마다 토큰 유효한지 확인
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken.exp) {
          const storedUsername = localStorage.getItem('username'); // 로컬에 username 저장되어있을 시 username 가져오기
          if (storedUsername) {
            setUser({ username: storedUsername });
          } else {
            setUser(null); // 또는 기본값 처리
          }

          const expirationTime = decodedToken.exp * 1000 - 60000; // 만료 1분 전
          if (Date.now() >= expirationTime) {
            localStorage.removeItem('token');
            // 여기에 전역 상태 업데이트나 리다이렉션 등 추가 로그아웃 처리 로직을 넣으세요.
            alert('로그인 시간이 만료되어 로그아웃 됐습니다.');
            setUser(null);
          }
        }
        else{
          localStorage.removeItem('token');
        }
      }
    };

    // 컴포넌트가 마운트될 때 즉시 체크
    checkTokenExpiration();
    // 이후 1분마다 체크
    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <NavBar user={user} balance={balance} setBalance={setBalance}/>
      <Routes>
        <Route path="/" element={<CreateChat />} />
        <Route path="/chat" element={<CreateChat />} />
        <Route path="/chat/:roomId" element={<Chat setBalance={setBalance} />} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/lobby" element={<Lobby user={user} />} />
      </Routes>
    </>
  );
};

export default App;
