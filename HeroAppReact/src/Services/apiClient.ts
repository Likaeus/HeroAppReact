import axios from "axios";

export const apiOrigin = (import.meta.env.VITE_APIURL || "http://localhost:8000")
  .trim()
  .replace(/\/$/, "");

export const apiClient = axios.create({ baseURL: `${apiOrigin}/api/v1` });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("epic-enclave-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const code = error?.response?.data?.error?.code;
    if (code === "INVALID_TOKEN" || code === "AUTHENTICATION_REQUIRED") {
      localStorage.removeItem("epic-enclave-token");
      window.dispatchEvent(new Event("epic-enclave-session-expired"));
    }
    return Promise.reject(error);
  },
);

export interface ApiErrorBody {
  error?: { code?: string; message?: string };
}

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    const code = error.response?.data?.error?.code;
    if (code === "INVALID_CREDENTIALS") return "El correo o la contraseña no son correctos.";
    if (code === "ACCOUNT_NOT_AVAILABLE") return "No se puede crear una cuenta con esos datos.";
    if (code === "TOO_MANY_ATTEMPTS" || code === "RATE_LIMITED") return "Demasiados intentos. Espera unos minutos.";
    if (code === "INVALID_TOKEN" || code === "AUTHENTICATION_REQUIRED") return "Tu sesión expiró. Inicia sesión nuevamente.";
    return error.response?.data?.error?.message || fallback;
  }
  return fallback;
};
