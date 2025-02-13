import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { isAxiosError } from "axios";
import { sendEmailVerification, checkUsernameAvailability } from "../api/apiFunctions";
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
  const [error, setError] = useState<string | null>(null);
  const [showPassword1, setShowPassword1] = useState(false); // 첫 번째 비밀번호 보이기 여부
  const [showPassword2, setShowPassword2] = useState(false); // 두 번째 비밀번호 보이기 여부

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password: string, username: string) => {
    // 1. 비밀번호 길이가 8자 이상인지 확인
    if (password.length < 8) {
      return "비밀번호는 8자 이상이어야 합니다.";
    }
    // 2. 숫자만으로 이루어졌는지 확인
    if (/^\d+$/.test(password)) {
      return "비밀번호는 숫자만 포함할 수 없습니다.";
    }
    // 3. 너무 흔한 비밀번호인지 확인
    const commonPasswords = ["12345678", "password", "123456", "qwerty", "11111111"]; // 예시: 흔한 비밀번호 목록
    if (commonPasswords.includes(password)) {
      return "너무 흔한 비밀번호입니다.";
    }
    // 4. 아이디와 유사한 비밀번호 확인
    if (password.toLowerCase().includes(username.toLowerCase())) {
      return "아이디와 유사한 비밀번호는 사용할 수 없습니다.";
    }
    return ""; // 조건을 모두 충족하면 빈 문자열 반환
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 확인 유효성 검사
    if (form.password1 !== form.password2) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 유효성 검사
    const passwordError = validatePassword(form.password1, form.username);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      // 회원가입 API 요청
      const response = await axiosInstance.post<{
        message: string;
      }>("/user/signup", {
        username: form.username,
        password1: form.password1,
        email: form.email,
        verification_code: form.verification_code,
      });

      alert("회원가입이 완료되었습니다!");
      navigate("/login");

      console.log(response.data.message);  // response.data.message
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setError(error.response?.data.message || "회원가입 실패");
      } else {
        setError("서버와의 연결에 실패했습니다.");
      }
    }
  };

  const handleEmailVerification = async () => {
    const message = await sendEmailVerification(form.email);
    setError(message);
  };

  const handleUsernameCheck = async () => {
    const message = await checkUsernameAvailability(form.username);
    setError(message);
  };

  return (
    <div className="register-container">
      <h2>회원가입</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={handleUsernameCheck}>
          아이디 중복 확인
        </button>

        <div className="password-container">
          <input
            type={showPassword1 ? "text" : "password"} // showPassword1 상태에 따라 비밀번호 보이기/숨기기
            name="password1"
            placeholder="비밀번호"
            value={form.password1}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword1(!showPassword1)} // 눈 아이콘 클릭 시 비밀번호 보이기/숨기기
          >
            {showPassword1 ? "숨기기" : "보기"}
          </button>
        </div>

        <div className="password-container">
          <input
            type={showPassword2 ? "text" : "password"} // showPassword2 상태에 따라 비밀번호 보이기/숨기기
            name="password2"
            placeholder="비밀번호 확인"
            value={form.password2}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword2(!showPassword2)} // 눈 아이콘 클릭 시 비밀번호 보이기/숨기기
          >
            {showPassword2 ? "숨기기" : "보기"}
          </button>
        </div>

        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={handleEmailVerification}>
          이메일 인증 요청
        </button>
        <input
          type="text"
          name="verification_code"
          placeholder="인증 코드"
          value={form.verification_code}
          onChange={handleChange}
          required
        />

        <button type="submit" className="register-button">회원가입</button>
        <button type="button" className="login-button" onClick={() => navigate("/login")}>로그인</button>
      </form>
    </div>
  );
};

export default Register;
