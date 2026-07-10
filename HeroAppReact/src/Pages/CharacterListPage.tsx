import { useState } from "react";
import { motion as m } from "framer-motion";
import { useLocation } from "react-router-dom";
import CharacterDetailComponent from "../Components/CharacterDetailsComponent";
import CharacterList from "../Components/CharacterListComponent";
import Character from "../Models/CharacterModel";
import "../Styles/CharacterListPageStyles.css";

const CharacterListPage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const created = (useLocation().state as { created?: string } | null)?.created;
  return <m.section className="archive-page page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <header className="archive-header"><div><span className="eyebrow">Archivo comunitario</span><h1>Personajes buscando mundo.</h1></div><p>Explora semillas narrativas creadas por la comunidad. Toma inspiración, encuentra conexiones y prepara tu próxima aventura.</p></header>
    {created && <div className="success-banner">✦ <strong>{created}</strong> ya forma parte del archivo.</div>}
    <div className="archive-layout"><CharacterList onCharacterSelect={setSelectedCharacter} selectedId={selectedCharacter?.id} /><CharacterDetailComponent character={selectedCharacter} /></div>
  </m.section>;
};

export default CharacterListPage;
