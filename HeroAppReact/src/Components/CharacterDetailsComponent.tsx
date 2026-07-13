import { useState } from "react";
import Character from "../Models/CharacterModel";
import HeroImage from "./HeroImage";
import ImageLightbox from "./ImageLightbox";
import "../Styles/CharacterDetailStyles.css";

const CharacterDetailComponent = ({ character }: { character: Character | null }) => {
  const [lightbox, setLightbox] = useState(false);
  const [expanded, setExpanded] = useState(false);
  if (!character) return <aside className="character-detail empty-detail surface-card"><div className="empty-sigil">✦</div><span className="eyebrow">Ficha de personaje</span><h2>Selecciona una leyenda</h2><p>Elige un personaje del archivo para descubrir su historia, sus dones y aquello que puede quebrarlo.</p></aside>;
  return <aside className="character-detail surface-card">
    <button className="detail-art" onClick={() => setLightbox(true)} aria-label="Ver retrato completo"><HeroImage hero={character} alt={`Retrato de ${character.name}`} fallback={<div className="portrait-placeholder">✦</div>} /><div className="detail-title"><span className="eyebrow">Por {character.creatorName}</span><h2>{character.name}</h2><small>Ver retrato completo ↗</small></div></button>
    <div className={`detail-body ${expanded ? "expanded" : ""}`}><section><span className="detail-label">Historia</span><p>{character.description}</p></section><div className="detail-traits"><section><span className="trait-icon">✦</span><div><span className="detail-label">Don</span><p>{character.details.powers}</p></div></section><section><span className="trait-icon weakness">◇</span><div><span className="detail-label">Grieta</span><p>{character.details.weakness}</p></div></section></div><button className="expand-detail" onClick={() => setExpanded(!expanded)}>{expanded ? "Contraer ficha ↑" : "Leer ficha completa ↓"}</button></div>
    {lightbox && <ImageLightbox character={character} onClose={() => setLightbox(false)} />}
  </aside>;
};

export default CharacterDetailComponent;
