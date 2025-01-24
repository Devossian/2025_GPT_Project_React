import '../styles/Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form className="login-form">
        <input type="text" placeholder="아이디" />
        <input type="password" placeholder="비밀번호" />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
