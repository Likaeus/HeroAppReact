import { useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import HeroService from "../Services/heroService";
import Character from "../Models/CharacterModel";
import HeroImage from "./HeroImage";
import "../Styles/CharacterCarousel.css";

const CharacterCarousel = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowStart, setWindowStart] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    HeroService.list({ limit: 6 })
      .then((response) => setCharacters(response.data.data))
      .catch(() => setError(true));
  }, []);

  const visibleCount = Math.min(3, characters.length);
  const visibleIndices = Array.from(
    { length: visibleCount },
    (_, position) => (windowStart + position) % characters.length,
  );

  const previous = () => {
    const previousIndex = (activeIndex - 1 + characters.length) % characters.length;
    if (!visibleIndices.includes(previousIndex)) {
      setWindowStart((windowStart - 1 + characters.length) % characters.length);
    }
    setActiveIndex(previousIndex);
  };

  const next = () => {
    const nextIndex = (activeIndex + 1) % characters.length;
    if (!visibleIndices.includes(nextIndex)) {
      setWindowStart((windowStart + 1) % characters.length);
    }
    setActiveIndex(nextIndex);
  };

  return (
    <section className="featured-section page">
      <header className="section-heading">
        <div><span className="eyebrow">Recién llegados al archivo</span><h2>Ideas que piden una historia</h2></div>
        <div className="carousel-controls"><button onClick={previous} disabled={!characters.length} aria-label="Anterior">←</button><button onClick={next} disabled={!characters.length} aria-label="Siguiente">→</button></div>
      </header>
      {error && <div className="empty-panel">El archivo está descansando. Inténtalo de nuevo en unos minutos.</div>}
      {!error && !characters.length && <div className="carousel-skeleton"><span /><span /><span /></div>}
      {characters.length > 0 && (
        <div className="character-carousel">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleIndices.map((index) => {
              const character = characters[index];
              const isActive = index === activeIndex;
              return (
                <m.article
                  layout
                  key={character.id}
                  className={`carousel-card ${isActive ? "active" : ""}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1, flexGrow: isActive ? 1.65 : 0.82 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{
                    layout: { type: "spring", stiffness: 180, damping: 24 },
                    flexGrow: { type: "spring", stiffness: 150, damping: 22 },
                    opacity: { duration: 0.25 },
                    scale: { duration: 0.35 },
                  }}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                >
                  <div className="card-art"><HeroImage hero={character} alt={`Retrato de ${character.name}`} fallback={<div className="portrait-placeholder">✦</div>} /><span className="card-number">0{index + 1}</span></div>
                  <div className="card-copy"><span className="card-kicker">Concepto de personaje</span><h3>{character.name}</h3><p>{character.description}</p><div className="trait"><small>DON</small><span>{character.details.powers}</span></div></div>
                </m.article>
              );
            })}
          </AnimatePresence>
        </div>
      )}
      <Link to="/characters" className="archive-link">Ver todo el archivo <span>→</span></Link>
    </section>
  );
};

export default CharacterCarousel;
