import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { isAxiosError } from "axios";
import { sendEmailVerification, checkUsernameAvailability } from "../api/apiFunctions";
import "../styles/Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password1: "",
    password2: "",
    email: "",
    verification_code: "",
  });
  const [error, setError] = useState<{ field?: string; message: string } | null>(null);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string, username: string) => {
    if (password.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
    if (/^\d+$/.test(password)) return "비밀번호는 숫자만 포함할 수 없습니다.";
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      return "비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다.";
    }
    const commonPasswords = ["12345678", "password", "qwerty", "asdf1234", "11111111"];
    if (commonPasswords.includes(password)) return "너무 흔한 비밀번호입니다.";
    if (password.toLowerCase().includes(username.toLowerCase())) return "아이디와 유사한 비밀번호는 사용할 수 없습니다.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (form.password1 !== form.password2) {
      setError({ field: "password", message: "비밀번호가 일치하지 않습니다." });
      return;
    }
    const passwordError = validatePassword(form.password1, form.username);
    if (passwordError) {
      setError({ field: "password", message: passwordError });
      return;
    }

    try {
      await axiosInstance.post("/user/signup", form);
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setError({ message: error.response?.data.message || "회원가입 실패" });
      } else {
        setError({ message: "서버와의 연결에 실패했습니다." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailVerification = async () => {
    const message = await sendEmailVerification(form.email);
    setError(message ? { field: "email", message } : null);
  };

  const handleUsernameCheck = async () => {
    const message = await checkUsernameAvailability(form.username);
    setError(message ? { field: "username", message } : null);
  };

  return (
    <div className="register-container">
      <h2>회원가입</h2>
      {error && <div className="error-message">{error.message}</div>}
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <input type="text" name="username" placeholder="아이디" value={form.username} onChange={handleChange} required />
          <button type="button" onClick={handleUsernameCheck}>아이디 중복 확인</button>
        </div>

        <div className="password-container">
          <input type={showPassword1 ? "text" : "password"} name="password1" placeholder="비밀번호" value={form.password1} onChange={handleChange} required />
          <button type="button" className="password-toggle" onClick={() => setShowPassword1(!showPassword1)}>
            {showPassword1 ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="password-container">
          <input type={showPassword2 ? "text" : "password"} name="password2" placeholder="비밀번호 확인" value={form.password2} onChange={handleChange} required />
          <button type="button" className="password-toggle" onClick={() => setShowPassword2(!showPassword2)}>
            {showPassword2 ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div>
          <input type="email" name="email" placeholder="이메일" value={form.email} onChange={handleChange} required />
          <button type="button" onClick={handleEmailVerification}>이메일 인증 요청</button>
        </div>

        <input type="text" name="verification_code" placeholder="인증 코드" value={form.verification_code} onChange={handleChange} required />

        <button type="submit" className="register-button" disabled={loading}>{loading?'회원가입 중...':'회원가입'}</button>
        <button type="button" className="login-button" onClick={() => navigate("/login")}>로그인</button>
      </form>
    </div>
  );
};

export default Register;