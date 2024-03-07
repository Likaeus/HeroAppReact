import React, { useEffect, useState } from "react";
import out from "../Services/heroService.tsx";
import Character from "../Models/CharacterModel.tsx";
import "../Styles/CharacterCarousel.css";

const CharacterCarousel: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await out.getAllHeroCards();
        const characterData = response.data;

        const lastFourCharacters = characterData.slice(-4);

        setCharacters(lastFourCharacters);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);
  console.log(characters);

  const handleCharacterClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="character-carousel">
      <h2 className="carousel-title">Últimos Personajes</h2>
      <div className="owl-carousel custom-carousel owl-theme">
        {characters.map((character, index) => (
          <div
            key={character._id}
            className={`item ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleCharacterClick(index)}
          >
            <div className="item-desc">
              <h3 className="name">{character.Name}</h3>
              {character.Details && (
                <>
                  <p>Poderes: {character.Details.Powers}</p>
                  <p>Debilidades: {character.Details.Weakness}</p>
                </>
              )}
            </div>
            {character.Image && (
              <img
                src={`${import.meta.env.VITE_APIURL}/api/image/${
                  character._id
                }`}
                alt={character.Name}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterCarousel;
