import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import "../Styles/NavBarComponentStyles.css";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Navegación principal">
        <Link to="/" className="brand" onClick={close} aria-label="Epic Enclave, inicio">
          <span className="brand-mark">E</span><span><strong>EPIC</strong> ENCLAVE<small>Archivo de personajes</small></span>
        </Link>
        <button className="nav-toggle" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
        <div className={`nav-content ${open ? "open" : ""}`}>
          <div className="nav-links">
            <NavLink to="/" end onClick={close}>Descubrir</NavLink>
            <NavLink to="/characters" onClick={close}>Personajes</NavLink>
            <NavLink to="/gallery" onClick={close}>Galería</NavLink>
            <NavLink to="/campaigns" onClick={close}>Campañas</NavLink>
          </div>
          <div className="nav-actions">
            {isAuthenticated ? <>
              <Link to="/create" className="nav-create" onClick={close}>＋ Crear personaje</Link>
              <Link to="/my-creations" className="nav-my-creations" onClick={close}>Mis creaciones</Link>
              <div className="user-menu"><span className="user-avatar">{user?.name.charAt(0).toUpperCase()}</span><span className="user-name">{user?.name}</span><button onClick={() => { logout(); close(); }}>Salir</button></div>
            </> : <Link to="/auth" className="nav-login" onClick={close}>Entrar <span>→</span></Link>}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
