import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

  const position = useRef(0);
  const cycleWidth = useRef(0);

  const animationFrame = useRef<number | null>(null);
  const initialized = useRef(false);
  const pausedRef = useRef(false);

  /*
    Guarda el desplazamiento pendiente cuando se pulsa
    una de las flechas.
  */
  const manualMovement = useRef(0);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await HeroService.list({
          limit: 100,
        });

        const receivedCharacters = response.data.data ?? [];

        setCharacters(receivedCharacters);
      } catch (loadError) {
        console.error("Error cargando personajes:", loadError);

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  /*
    Mantiene la posición dentro de la copia central.

    El track contiene:

    Copia 1
    Copia 2, visible
    Copia 3

    Cuando llega a otra copia, se cambia a una posición
    equivalente dentro de la copia central.
  */
  const normalizePosition = (
    currentPosition: number,
    currentCycleWidth: number,
  ) => {
    if (currentCycleWidth <= 0) {
      return currentPosition;
    }

    let normalizedPosition = currentPosition;

    while (normalizedPosition <= -currentCycleWidth * 2) {
      normalizedPosition += currentCycleWidth;
    }

    while (normalizedPosition > -currentCycleWidth) {
      normalizedPosition -= currentCycleWidth;
    }

    return normalizedPosition;
  };

  const updateTrackPosition = () => {
    const gallery = track.current;

    if (!gallery) return;

    gallery.style.transform = `translate3d(
      ${position.current}px,
      0,
      0
    )`;
  };

  /*
    Calcula la distancia exacta entre la primera
    y la segunda copia del contenido.
  */
  const measureCycleWidth = () => {
    const gallery = track.current;

    if (!gallery) return 0;

    const groups = gallery.querySelectorAll<HTMLElement>(".gallery-group");

    const firstGroup = groups[0];
    const secondGroup = groups[1];

    if (!firstGroup || !secondGroup) {
      return 0;
    }

    return secondGroup.offsetLeft - firstGroup.offsetLeft;
  };

  /*
    Posiciona el carrusel inicialmente en la segunda copia.
  */
  useLayoutEffect(() => {
    if (loading || error || characters.length === 0) {
      return;
    }

    const gallery = track.current;

    if (!gallery) return;

    initialized.current = false;

    let firstFrame = 0;
    let secondFrame = 0;

    const initializeCarousel = () => {
      const measuredCycleWidth = measureCycleWidth();

      if (measuredCycleWidth <= 0) return;

      cycleWidth.current = measuredCycleWidth;

      /*
        La posición negativa coloca la segunda copia
        exactamente donde estaba la primera.
      */
      position.current = -measuredCycleWidth;

      manualMovement.current = 0;
      initialized.current = true;

      updateTrackPosition();
    };

    /*
      Se esperan dos frames para asegurar que React
      y el navegador hayan calculado todos los anchos.
    */
    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(initializeCarousel);
    });

    /*
      Recalcula el ancho cuando cambia el tamaño
      de la pantalla.
    */
    const resizeObserver = new ResizeObserver(() => {
      if (!initialized.current) return;

      const oldCycleWidth = cycleWidth.current;

      const newCycleWidth = measureCycleWidth();

      if (oldCycleWidth <= 0 || newCycleWidth <= 0) {
        return;
      }

      /*
        Conserva el punto del recorrido en el que
        se encontraba el carrusel.
      */
      const normalizedOldPosition = normalizePosition(
        position.current,
        oldCycleWidth,
      );

      const traveledDistance = -normalizedOldPosition - oldCycleWidth;

      const progress = traveledDistance / oldCycleWidth;

      cycleWidth.current = newCycleWidth;

      position.current = -newCycleWidth - progress * newCycleWidth;

      position.current = normalizePosition(position.current, newCycleWidth);

      updateTrackPosition();
    });

    resizeObserver.observe(gallery);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);

      resizeObserver.disconnect();

      initialized.current = false;
    };
  }, [loading, error, characters.length]);

  /*
    Movimiento automático continuo.
  */
  useEffect(() => {
    if (loading || error || characters.length === 0) {
      return;
    }

    let previousTime = performance.now();

    /*
      Velocidad automática en píxeles por segundo.
    */
    const autoplaySpeed = 45;

    /*
      Duración aproximada del movimiento generado
      por las flechas.
    */
    const manualAnimationDuration = 260;

    const animate = (currentTime: number) => {
      const elapsed = Math.min(currentTime - previousTime, 50);

      previousTime = currentTime;

      const currentCycleWidth = cycleWidth.current;

      if (initialized.current && currentCycleWidth > 0) {
        /*
          Movimiento automático.
        */
        if (!pausedRef.current) {
          position.current -= autoplaySpeed * (elapsed / 1000);
        }

        /*
          Movimiento suave producido por las flechas.
        */
        if (Math.abs(manualMovement.current) > 0.1) {
          const movementPercentage = Math.min(
            elapsed / manualAnimationDuration,
            1,
          );

          const movementStep = manualMovement.current * movementPercentage;

          position.current += movementStep;

          manualMovement.current -= movementStep;
        } else {
          manualMovement.current = 0;
        }

        /*
          Reubica silenciosamente el carrusel
          dentro de la copia central.
        */
        position.current = normalizePosition(
          position.current,
          currentCycleWidth,
        );

        updateTrackPosition();
      }

      animationFrame.current = window.requestAnimationFrame(animate);
    };

    animationFrame.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);

        animationFrame.current = null;
      }
    };
  }, [loading, error, characters.length]);

  const move = (direction: number) => {
    const gallery = track.current;

    if (!gallery || !initialized.current) {
      return;
    }

    const groups = gallery.querySelectorAll<HTMLElement>(".gallery-group");

    /*
      Se utiliza la copia central para calcular
      el ancho real de cada tarjeta.
    */
    const middleGroup = groups[1];

    if (!middleGroup) return;

    const slides = middleGroup.querySelectorAll<HTMLElement>(".gallery-slide");

    const firstSlide = slides[0];
    const secondSlide = slides[1];

    if (!firstSlide) return;

    let distance = firstSlide.offsetWidth + 20;

    if (secondSlide) {
      distance = secondSlide.offsetLeft - firstSlide.offsetLeft;
    }

    /*
      Flecha derecha:
      desplaza el track hacia la izquierda.

      Flecha izquierda:
      desplaza el track hacia la derecha.
    */
    manualMovement.current += direction > 0 ? -distance : distance;
  };

  const renderGroup = (groupIndex: number) => {
    const isMiddleGroup = groupIndex === 1;

    return (
      <div
        className="gallery-group"
        key={`gallery-group-${groupIndex}`}
        aria-hidden={!isMiddleGroup}
      >
        {characters.map((character, characterIndex) => {
          const visibleIndex = characterIndex + 1;

          return (
            <article
              className="gallery-slide"
              key={`${groupIndex}-${character.id}-${characterIndex}`}
            >
              <HeroImage
                hero={character}
                alt={`Retrato de ${character.name}`}
                fallback={<div className="gallery-placeholder">✦</div>}
              />

              <div className="gallery-overlay">
                <span>{String(visibleIndex).padStart(2, "0")}</span>

                <div>
                  <small>Personaje compartido</small>

                  <h2>{character.name}</h2>

                  <p>{character.description}</p>
                </div>

                <Link to="/characters" tabIndex={isMiddleGroup ? 0 : -1}>
                  Ver ficha →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    );
  };

  return (
    <m.section
      className="gallery-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="gallery-header page">
        <div>
          <span className="eyebrow">Galería del enclave</span>

          <h1>Rostros de otros mundos.</h1>
        </div>

        <div>
          <p>Recorre visualmente las creaciones de toda la comunidad.</p>

          <div className="gallery-controls">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Desplazar hacia atrás"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => setPaused((currentPaused) => !currentPaused)}
              aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}
            >
              {paused ? "▶" : "Ⅱ"}
            </button>

            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Desplazar hacia adelante"
            >
              →
            </button>
          </div>

          <small className="autoplay-label">
            <i className={paused ? "paused" : ""} />

            {paused ? "Galería en pausa" : "Movimiento continuo"}
          </small>
        </div>
      </header>

      {loading && (
        <div className="gallery-loading page">Revelando retratos…</div>
      )}

      {!loading && error && (
        <div className="gallery-loading page">No pudimos abrir la galería.</div>
      )}

      {!loading && !error && characters.length > 0 && (
        <div className="gallery-viewport">
          <div className="gallery-track" ref={track}>
            {renderGroup(0)}
            {renderGroup(1)}
            {renderGroup(2)}
          </div>
        </div>
      )}

      {!loading && !error && characters.length === 0 && (
        <div className="gallery-loading page">
          Todavía no hay retratos en el archivo.
        </div>
      )}
    </m.section>
  );
};

export default GalleryPage;
