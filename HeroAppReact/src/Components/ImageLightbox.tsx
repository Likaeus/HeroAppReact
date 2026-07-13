import Character from "../Models/CharacterModel";
import HeroImage from "./HeroImage";
import ModalShell from "./ModalShell";

const ImageLightbox = ({ character, onClose }: { character: Character; onClose: () => void }) => <ModalShell onClose={onClose} label={`Retrato de ${character.name}`}><div className="image-lightbox"><HeroImage hero={character} alt={`Retrato completo de ${character.name}`} fallback={<div className="portrait-placeholder">✦</div>} /><span>{character.name}</span></div></ModalShell>;
export default ImageLightbox;
