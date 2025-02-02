import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password1: "",
    password2: "",
    email: "",
    verification_code: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 데이터:", form);
    // TODO: 여기에 백엔드 API 연동 코드 추가
  };

  return (
    <div className="register-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="아이디" value={form.username} onChange={handleChange} required />
        <input type="password" name="password1" placeholder="비밀번호" value={form.password1} onChange={handleChange} required />
        <input type="password" name="password2" placeholder="비밀번호 확인" value={form.password2} onChange={handleChange} required />
        <input type="email" name="email" placeholder="이메일" value={form.email} onChange={handleChange} required />
        <input type="text" name="verification_code" placeholder="인증 코드" value={form.verification_code} onChange={handleChange} required />

        <button type="submit" className="register-button">회원가입</button>
        <button type="button" className="login-button" onClick={() => navigate("/login")}>로그인</button>
      </form>
    </div>
  );
};

export default Register;
