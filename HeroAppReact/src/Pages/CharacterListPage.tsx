import { useState } from "react";
import CharacterDetailComponent from "../Components/CharacterDetailsComponent";
import CharacterList from "../Components/CharacterListComponent";
import "../Styles/CharacterListPageStyles.css";
import Character from "../Models/CharacterModel";
import { motion as m } from "framer-motion";

const CharacterListPage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="main-container">
        <div className="left-container"></div>
        <CharacterList onCharacterSelect={setSelectedCharacter} />
        <div className="right-container"></div>
        <CharacterDetailComponent character={selectedCharacter} />
      </div>
    </m.div>
  );
};

export default CharacterListPage;
