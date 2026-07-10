import { apiClient } from "./apiClient";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface SessionData {
  user: User;
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: string;
}

export interface LoginPayload { email: string; password: string }
export interface RegisterPayload extends LoginPayload { name: string }

const login = (payload: LoginPayload) =>
  apiClient.post<{ data: SessionData }>("/auth/login", payload);
const register = (payload: RegisterPayload) =>
  apiClient.post<{ data: SessionData }>("/auth/register", payload);
const me = () => apiClient.get<{ data: { user: User } }>("/auth/me");

export default { login, register, me };
