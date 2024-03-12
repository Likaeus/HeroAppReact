import React, { useEffect, useState } from "react";
import "../Styles/CharacterListStyles.css";
import { Link } from "react-router-dom";
import out from "../Services/heroService.tsx";
import Character from "../Models/CharacterModel";

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await out.getAllHeroCards();
        setCharacters(response.data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    // Mostrar el campo de búsqueda después de la carga inicial de los personajes
    setIsSearchVisible(true);
  }, []);

  return (
    <div>
      <div className="title-container">
        <h2 className="title">Lista de Personajes</h2>
      </div>
      <div className="bar-container">
        <div className="container">
          {isSearchVisible && (
            <input
              type="text"
              placeholder="Buscar personaje..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          )}
          <div className="search"></div>
        </div>
      </div>
      <div className="character-list">
        <div className="character-list-container">
          {filteredCharacters.map((character) => (
            <Link
              to={`/character/${character._id}`}
              key={character._id}
              className="character-item"
            >
              <img
                src={`${import.meta.env.VITE_APIURL}/api/image/${
                  character._id
                }`}
                alt={character.Name}
                className="character-image"
              />
              <p className="character-name">{character.Name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
