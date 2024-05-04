// Importa React y cualquier tipo necesario de tu modelo
import React from "react";
import Character from "../Models/CharacterModel"; // Asegúrate de que la ruta y el nombre del archivo sean correctos
import "../Styles/CharacterDetailStyles.css";
// Define la interfaz de las props que el componente espera
interface CharacterDetailProps {
  character: Character | null;
}

// Define el componente funcional con sus props tipadas
const CharacterDetailComponent: React.FC<CharacterDetailProps> = ({
  character,
}) => {
  if (!character) {
    return (
      <div className="character-detail">
        Seleccione un personaje para ver los detalles.
      </div>
    );
  }

  // Asegúrate de manejar correctamente la imagen cuando es un Buffer o null
  //   let imageSrc = character.imageUrl || "";
  //   if (character.Image && character.Image.data) {
  //     imageSrc = `data:${character.Image.contentType};base64,${Buffer.from(
  //       character.Image.data
  //     ).toString("base64")}`;
  //   }

  return (
    <div className="character-detail-container">
      <div className="character-detail-image">
        <img
          src={`${import.meta.env.VITE_APIURL}/api/image/${character._id}`}
          alt={character.Name}
          className="character-image"
        />
      </div>

      <div className="character-detail-content">
        <h3>Descripcion</h3>
        <p className="character-detail-description">{character.Description}</p>
        <h3>Poderes </h3>
        <p>{character.Details.Powers}</p>
        <h3>Debilidades</h3>
        <p>{character.Details.Weakness}</p>
      </div>
    </div>
  );
};

export default CharacterDetailComponent;
