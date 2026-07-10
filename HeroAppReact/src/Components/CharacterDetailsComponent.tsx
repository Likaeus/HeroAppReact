import Character from "../Models/CharacterModel";
import HeroImage from "./HeroImage";
import "../Styles/CharacterDetailStyles.css";

const CharacterDetailComponent = ({ character }: { character: Character | null }) => {
  if (!character) return <aside className="character-detail empty-detail surface-card"><div className="empty-sigil">✦</div><span className="eyebrow">Ficha de personaje</span><h2>Selecciona una leyenda</h2><p>Elige un personaje del archivo para descubrir su historia, sus dones y aquello que puede quebrarlo.</p></aside>;
  return <aside className="character-detail surface-card">
    <div className="detail-art"><HeroImage hero={character} alt={`Retrato de ${character.name}`} fallback={<div className="portrait-placeholder">✦</div>} /><div className="detail-title"><span className="eyebrow">Ficha de personaje</span><h2>{character.name}</h2></div></div>
    <div className="detail-body"><section><span className="detail-label">Historia</span><p>{character.description}</p></section><div className="detail-traits"><section><span className="trait-icon">✦</span><div><span className="detail-label">Don</span><p>{character.details.powers}</p></div></section><section><span className="trait-icon weakness">◇</span><div><span className="detail-label">Grieta</span><p>{character.details.weakness}</p></div></section></div></div>
  </aside>;
};

export default CharacterDetailComponent;
