import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/NavBar.css';  // 스타일 파일을 따로 추가합니다.

const NavBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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

      <h1>채팅 사이트</h1>
    </div>
  );
};

export default NavBar;
