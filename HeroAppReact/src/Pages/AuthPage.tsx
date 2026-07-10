import { FormEvent, useState } from "react";
import { motion as m } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import { getApiErrorMessage } from "../Services/apiClient";
import "../Styles/AuthPage.css";

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true); setError(null);
    try {
      if (mode === "login") await login({ email, password });
      else await register({ name, email, password });
      const destination = (location.state as { from?: string } | null)?.from || "/";
      navigate(destination, { replace: true });
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "No pudimos completar la solicitud."));
    } finally { setSubmitting(false); }
  };

  return (
    <m.section className="auth-page page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="auth-story">
        <span className="eyebrow">Entra al círculo</span>
        <h1>Las grandes campañas empiezan con una idea.</h1>
        <p>Guarda tus conceptos, comparte héroes memorables y encuentra la chispa para tu próxima mesa.</p>
        <div className="auth-rune" aria-hidden="true">✦</div>
      </div>
      <div className="auth-card surface-card">
        <div className="auth-tabs" role="tablist">
          <button className={mode === "login" ? "active" : ""} onClick={() => { setMode("login"); setError(null); }}>Iniciar sesión</button>
          <button className={mode === "register" ? "active" : ""} onClick={() => { setMode("register"); setError(null); }}>Crear cuenta</button>
        </div>
        <form onSubmit={submit}>
          <div className="form-heading">
            <span className="eyebrow">{mode === "login" ? "Bienvenido de vuelta" : "Únete al enclave"}</span>
            <h2>{mode === "login" ? "Abre tu archivo" : "Crea tu perfil"}</h2>
          </div>
          {mode === "register" && <label>Nombre de aventurero<input value={name} onChange={(e) => setName(e.target.value)} minLength={2} maxLength={100} required autoComplete="name" /></label>}
          <label>Correo electrónico<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label>
          <label>Contraseña<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={mode === "register" ? 12 : undefined} maxLength={128} required autoComplete={mode === "login" ? "current-password" : "new-password"} /></label>
          {mode === "register" && <p className="field-hint">12 caracteres como mínimo, con mayúscula, minúscula y número.</p>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button full-button" disabled={submitting}>{submitting ? "Invocando…" : mode === "login" ? "Entrar al enclave" : "Crear cuenta"}</button>
        </form>
      </div>
    </m.section>
  );
};

export default AuthPage;
