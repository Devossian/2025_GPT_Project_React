// src/api/apiFunctions.ts
import axiosInstance from "./axiosInstance"; // axios 인스턴스 가져오기
import { isAxiosError } from "axios"; // axios에서 isAxiosError만 임포트

export const sendEmailVerification = async (email: string) => {
  try {
    const response = await axiosInstance.post("/user/send-email", { email });
    console.log("이메일 인증 요청 성공:", response.data);
    return response.data.message; // 성공 메시지 반환
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error("이메일 인증 요청 실패:", error.response?.data.message);
      return error.response?.data.message || "이메일 인증 요청 실패";
    } else {
      console.error("서버와의 연결 실패");
      return "서버와의 연결에 실패했습니다.";
    }
  }
};

export const checkUsernameAvailability = async (username: string) => {
  try {
    const response = await axiosInstance.get("/user/check-username", {
      params: { username },
    });
    console.log("아이디 중복 확인 성공:", response.data);
    return response.data.message; // 성공 메시지 반환
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error("아이디 중복 확인 실패:", error.response?.data.message);
      return error.response?.data.message || "아이디 중복 확인 실패";
    } else {
      console.error("서버와의 연결 실패");
      return "서버와의 연결에 실패했습니다.";
    }
  }
};
