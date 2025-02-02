import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form className="login-form">
        <input type="text" placeholder="아이디" />
        <input type="password" placeholder="비밀번호" />
        <button type="submit">로그인</button>

        <button className='register-button' onClick={() => navigate('/register')}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Login;
