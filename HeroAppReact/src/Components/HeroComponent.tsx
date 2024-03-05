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
        console.log("Response data:", response.data);
        const characterData = response.data;

        const formattedCharacters = characterData
          .map((character: Character) => ({
            id: typeof character._id === "string",
            name: character.Name,
            details: character.Details,
            image: character.Image
              ? urlifyImage(character.Image.data, character.Image.contentType)
              : null,
          }))
          .filter((character: { image: null }) => character.image !== null);
        setCharacters(formattedCharacters);
        console.log("Formatted characters:", formattedCharacters);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  const urlifyImage = (imageData: Buffer | null, contentType: string) => {
    if (!imageData) {
      // Return an empty string instead of null
      return "";
    }
    // Convert Buffer to string before encoding
    const imageString = imageData.toString("base64");
    return `data:${contentType};base64,${imageString}`;
  };

  const handleCharacterClick = (index: number) => {
    setActiveIndex(index);
  };
  console.log("Characters:", characters);
  return (
    <div className="character-carousel">
      <h2 className="carousel-title">Lista de Personajes</h2>
      <div className="owl-carousel custom-carousel owl-theme">
        {characters.map((character, index) => (
          <div
            key={character._id}
            className={`item ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleCharacterClick(index)}
          >
            <div className="item-desc">
              <h3>{character.Name}</h3>
              {character.Details && (
                <>
                  <p>Poderes: {character.Details.Powers}</p>
                  <p>Debilidades: {character.Details.Weakness}</p>
                </>
              )}
            </div>
            {character.Image && (
              <img
                src={urlifyImage(
                  character.Image.data,
                  character.Image.contentType
                )}
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
