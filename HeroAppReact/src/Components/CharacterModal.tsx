import Character from "../Models/CharacterModel";
import HeroImage from "./HeroImage";
import ModalShell from "./ModalShell";

const CharacterModal = ({ character, onClose }: { character: Character; onClose: () => void }) => <ModalShell onClose={onClose} label={`Ficha de ${character.name}`} wide><div className="character-modal-layout"><div className="modal-art"><HeroImage hero={character} alt={`Retrato completo de ${character.name}`} fallback={<div className="portrait-placeholder">✦</div>} /></div><div className="modal-copy"><span className="eyebrow">Creado por {character.creatorName}</span><h2>{character.name}</h2><section><small>Historia</small><p>{character.description}</p></section><div className="modal-traits"><section><small>Don</small><p>{character.details.powers}</p></section><section><small>Grieta</small><p>{character.details.weakness}</p></section></div></div></div></ModalShell>;

export default CharacterModal;
