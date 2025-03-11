import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance";
import '../styles/NavBar.css';

interface NavBarProps { // User props 받기 위한 인터페이스
  user: { username: string } | null,
  balance: number | 0,
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

const NavBar: React.FC<NavBarProps> = ({ user, balance, setBalance }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => { // 페이지, user 변경 감지 후 잔고 불러오는 함수
    if(user?.username){
      const token = localStorage.getItem('token');
      axiosInstance.get(`/user/user-info/?username=${user.username}`, {
        headers: {
          'Authorization' : `Bearer ${token}`,
        },
      })
        .then(response => {
          // 예시: response.data.balance 값이 잔고라고 가정
          setBalance(response.data.balance);
        })
        .catch(error => {
          console.error('잔고를 불러오는 중 오류 발생:', error);
        });
    }
  }, [location, user]);

  const handleClick = () => {
    if (user) {
      // 예시: 로그인된 사용자는 프로필 페이지로 이동
      navigate('/profile');
    } else {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      navigate('/login');
    }
  };

  return (
    <div className="navbar">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {/* 사이드바 */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>X</button>
        <h3>채팅방</h3>
        <Link to="/lobby" className="sidebar-link" onClick={toggleSidebar}>채팅방 목록</Link>
        <Link to="/chat" className="sidebar-link" onClick={toggleSidebar}>채팅하기</Link>
        <Link to="/login" className="sidebar-link" onClick={toggleSidebar}>로그인</Link>
        <Link to="/payment" className="sidebar-link" onClick={toggleSidebar}>결제</Link>
      </div>

      <h1 onClick={handleClick} style={{ cursor: 'pointer' }}>
      {user ? `${user.username} 잔고: ${balance}` : '로그인 안됨'}
      </h1>
    </div>
  );
};

export default NavBar;
