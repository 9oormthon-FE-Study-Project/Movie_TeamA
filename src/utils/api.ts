import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com", // 실제 API가 올 자리리
});

export const login = (data: { email: string; password: string }) =>
  api.post("/login", data);

export const signup = (data: { email: string; password: string }) =>
  api.post("/signup", data);
