import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import "../Styles/ModalStyles.css";

const ModalShell = ({ children, onClose, label, wide = false }: { children: ReactNode; onClose: () => void; label: string; wide?: boolean }) => {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", close); document.body.classList.add("modal-open");
    return () => { document.removeEventListener("keydown", close); document.body.classList.remove("modal-open"); };
  }, [onClose]);
  return createPortal(<div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className={`archive-modal ${wide ? "wide" : ""}`} role="dialog" aria-modal="true" aria-label={label} onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>{children}</section></div>, document.body);
};

export default ModalShell;
