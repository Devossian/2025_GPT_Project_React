import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/user/login', {
        username,
        password,
      });

      // 로그인 성공 시, 서버에서 받은 토큰을 로컬 스토리지에 저장
      localStorage.setItem('token', response.data.token);

      // 로그인 후 대시보드로 이동
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response) {
        // 서버에서 오류 메시지가 있으면 그 메시지 표시
        setError(err.response.data.message);
      } else {
        // 네트워크 오류 등 처리
        setError('서버 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">로그인</button>

        <button className="register-button" onClick={() => navigate('/register')}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Login;
