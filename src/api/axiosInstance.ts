import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://port-0-gpt-project-backend-m6bz8aey7c6da6e0.sel4.cloudtype.app", // 공통 API 기본 주소
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;