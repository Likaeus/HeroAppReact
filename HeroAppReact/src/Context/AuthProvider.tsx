import { ReactNode, useEffect, useState } from "react";
import AuthService, { LoginPayload, RegisterPayload, User } from "../Services/authService";
import { AuthContext, AuthContextValue } from "./AuthContext";

const TOKEN_KEY = "epic-enclave-token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { setIsLoading(false); return; }
    AuthService.me().then(({ data }) => setUser(data.data.user)).catch(() => localStorage.removeItem(TOKEN_KEY)).finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const expireSession = () => setUser(null);
    window.addEventListener("epic-enclave-session-expired", expireSession);
    return () => window.removeEventListener("epic-enclave-session-expired", expireSession);
  }, []);

  const saveSession = (accessToken: string, sessionUser: User) => { localStorage.setItem(TOKEN_KEY, accessToken); setUser(sessionUser); };
  const login = async (payload: LoginPayload) => { const { data } = await AuthService.login(payload); saveSession(data.data.accessToken, data.data.user); };
  const register = async (payload: RegisterPayload) => { const { data } = await AuthService.register(payload); saveSession(data.data.accessToken, data.data.user); };
  const logout = () => { localStorage.removeItem(TOKEN_KEY); setUser(null); };
  const value: AuthContextValue = { user, isAuthenticated: Boolean(user), isLoading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
