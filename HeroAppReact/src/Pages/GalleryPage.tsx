import { useEffect, useRef, useState } from "react";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import HeroImage from "../Components/HeroImage";
import Character from "../Models/CharacterModel";
import HeroService from "../Services/heroService";
import "../Styles/GalleryPage.css";

const GalleryPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [paused, setPaused] = useState(false);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => { HeroService.list({ limit: 100 }).then((r) => setCharacters(r.data.data)).catch(() => setError(true)).finally(() => setLoading(false)); }, []);
  const move = (direction: number) => {
    const gallery = track.current;
    if (!gallery) return;
    const distance = Math.min(window.innerWidth * .75, 760) + 20;
    gallery.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  useEffect(() => {
    if (paused || characters.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frameId = 0;
    let previousTime = performance.now();
    const advance = (time: number) => {
      const gallery = track.current;
      if (!gallery) return;
      const elapsed = Math.min(time - previousTime, 50);
      previousTime = time;
      gallery.scrollLeft += elapsed * .032;

      const slides = gallery.querySelectorAll<HTMLElement>(".gallery-slide");
      const first = slides[0];
      const repeatedFirst = slides[characters.length];
      if (first && repeatedFirst) {
        const cycleWidth = repeatedFirst.offsetLeft - first.offsetLeft;
        if (gallery.scrollLeft >= cycleWidth) gallery.scrollLeft -= cycleWidth;
      }
      frameId = window.requestAnimationFrame(advance);
    };
    frameId = window.requestAnimationFrame(advance);
    return () => window.cancelAnimationFrame(frameId);
  }, [characters.length, paused]);

  return <m.section className="gallery-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <header className="gallery-header page"><div><span className="eyebrow">Galería del enclave</span><h1>Rostros de otros mundos.</h1></div><div><p>Recorre visualmente las creaciones de toda la comunidad.</p><div className="gallery-controls"><button onClick={() => move(-1)} aria-label="Desplazar hacia atrás">←</button><button onClick={() => setPaused(!paused)} aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}>{paused ? "▶" : "Ⅱ"}</button><button onClick={() => move(1)} aria-label="Desplazar hacia adelante">→</button></div><small className="autoplay-label"><i className={paused ? "paused" : ""} /> {paused ? "Galería en pausa" : "Movimiento continuo"}</small></div></header>
    {loading && <div className="gallery-loading page">Revelando retratos…</div>}
    {error && <div className="gallery-loading page">No pudimos abrir la galería.</div>}
    {!loading && !error && <div className="gallery-track" ref={track}>
      {[...characters, ...characters].map((character, index) => <article className="gallery-slide" key={`${character.id}-${index >= characters.length ? "repeat" : "original"}`} aria-hidden={index >= characters.length}>
        <HeroImage hero={character} alt={`Retrato de ${character.name}`} fallback={<div className="gallery-placeholder">✦</div>} />
        <div className="gallery-overlay"><span>0{index % characters.length + 1}</span><div><small>Personaje compartido</small><h2>{character.name}</h2><p>{character.description}</p></div><Link to="/characters" tabIndex={index >= characters.length ? -1 : 0}>Ver ficha →</Link></div>
      </article>)}
      {!characters.length && <div className="gallery-loading">Todavía no hay retratos en el archivo.</div>}
    </div>}
  </m.section>;
};

export default GalleryPage;
