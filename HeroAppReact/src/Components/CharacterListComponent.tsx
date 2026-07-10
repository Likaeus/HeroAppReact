import { useEffect, useState } from "react";
import HeroService from "../Services/heroService";
import Character from "../Models/CharacterModel";
import HeroImage from "./HeroImage";
import "../Styles/CharacterListStyles.css";

interface Props { onCharacterSelect: (character: Character) => void; selectedId?: string }

const CharacterList = ({ onCharacterSelect, selectedId }: Props) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const timeout = window.setTimeout(async () => {
      setLoading(true); setError(null);
      try {
        const response = await HeroService.list({ limit: 100, search: searchTerm.trim() || undefined });
        if (active) setCharacters(response.data.data);
      } catch { if (active) setError("No pudimos abrir el archivo de personajes."); }
      finally { if (active) setLoading(false); }
    }, searchTerm ? 300 : 0);
    return () => { active = false; window.clearTimeout(timeout); };
  }, [searchTerm]);

  return <div className="character-browser surface-card">
    <div className="browser-toolbar"><div><span className="eyebrow">Explorar</span><h2>El archivo</h2></div><label className="search-field"><span aria-hidden="true">⌕</span><input type="search" aria-label="Buscar personaje" placeholder="Buscar por nombre…" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /></label></div>
    <div className="character-list-container" aria-live="polite">
      {loading && [1, 2, 3, 4].map((item) => <div className="list-skeleton" key={item}><span /><div><i /><i /></div></div>)}
      {!loading && error && <div className="list-message"><span>◇</span><p>{error}</p></div>}
      {!loading && !error && !characters.length && <div className="list-message"><span>⌕</span><p>No encontramos personajes con ese nombre.</p></div>}
      {!loading && !error && characters.map((character) => {
        return <button type="button" className={`character-item ${selectedId === character.id ? "selected" : ""}`} key={character.id} onClick={() => onCharacterSelect(character)}>
          <span className="list-portrait"><HeroImage hero={character} alt="" fallback={<>✦</>} /></span>
          <span className="list-copy"><strong>{character.name}</strong><small>{character.details.powers}</small></span><span className="list-arrow">→</span>
        </button>;
      })}
    </div>
  </div>;
};

export default CharacterList;
