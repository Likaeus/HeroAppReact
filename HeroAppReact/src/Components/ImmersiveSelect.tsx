import { useEffect, useRef, useState } from "react";

interface Option { value: string; label: string; description?: string }
interface Props { name: string; value: string; options: Option[]; onChange: (name: string, value: string) => void }

const ImmersiveSelect = ({ name, value, options, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value) || options[0];
  useEffect(() => {
    const close = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  return <div ref={root} className={`immersive-select ${open ? "open" : ""}`}>
    <button type="button" className="select-trigger" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>
      <span><strong>{selected.label}</strong>{selected.description && <small>{selected.description}</small>}</span><i aria-hidden="true">⌄</i>
    </button>
    <div className="select-menu" role="listbox" aria-hidden={!open}>{options.map((option) => <button type="button" role="option" tabIndex={open ? 0 : -1} aria-selected={option.value === value} className={option.value === value ? "selected" : ""} key={option.value} onClick={() => { onChange(name, option.value); setOpen(false); }}><span>{option.label}</span>{option.description && <small>{option.description}</small>}<i>{option.value === value ? "✦" : ""}</i></button>)}</div>
  </div>;
};

export default ImmersiveSelect;
