import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroService from "../Services/heroService";
import Character from "../Models/CharacterModel";
import HeroImage from "./HeroImage";
import "../Styles/CharacterCarousel.css";

const CharacterCarousel = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => { HeroService.list({ limit: 6 }).then((r) => setCharacters(r.data.data)).catch(() => setError(true)); }, []);
  const previous = () => setActiveIndex((activeIndex - 1 + characters.length) % characters.length);
  const next = () => setActiveIndex((activeIndex + 1) % characters.length);

  return (
    <section className="featured-section page">
      <header className="section-heading"><div><span className="eyebrow">Recién llegados al archivo</span><h2>Ideas que piden una historia</h2></div><div className="carousel-controls"><button onClick={previous} disabled={!characters.length} aria-label="Anterior">←</button><button onClick={next} disabled={!characters.length} aria-label="Siguiente">→</button></div></header>
      {error && <div className="empty-panel">El archivo está descansando. Inténtalo de nuevo en unos minutos.</div>}
      {!error && !characters.length && <div className="carousel-skeleton"><span /><span /><span /></div>}
      {characters.length > 0 && <div className="character-carousel">
        {characters.map((character, index) => {
          const offset = (index - activeIndex + characters.length) % characters.length;
          const visible = offset < 3;
          return <article key={character.id} className={`carousel-card ${offset === 0 ? "active" : ""} ${visible ? "visible" : "hidden"}`} style={{ order: offset }} onClick={() => setActiveIndex(index)}>
            <div className="card-art"><HeroImage hero={character} alt={`Retrato de ${character.name}`} fallback={<div className="portrait-placeholder">✦</div>} /><span className="card-number">0{index + 1}</span></div>
            <div className="card-copy"><span className="card-kicker">Concepto de personaje</span><h3>{character.name}</h3><p>{character.description}</p><div className="trait"><small>DON</small><span>{character.details.powers}</span></div></div>
          </article>;
        })}
      </div>}
      <Link to="/characters" className="archive-link">Ver todo el archivo <span>→</span></Link>
    </section>
  );
};

export default CharacterCarousel;
