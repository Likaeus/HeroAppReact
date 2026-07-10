import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import HeroComponent from "../Components/HeroComponent";

const CarouselPage = () => (
  <m.div className="home-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <section className="hero-intro page">
      <div className="hero-copy">
        <span className="eyebrow">El archivo de los mundos posibles</span>
        <h1>Tu próxima leyenda empieza <em>con una chispa.</em></h1>
        <p>Descubre y comparte personajes para Daggerheart, Dungeons & Dragons y cualquier mundo que tu mesa pueda imaginar.</p>
        <div className="hero-actions"><Link to="/characters" className="primary-button">Explorar personajes</Link><Link to="/create" className="text-link">Compartir una idea <span>↗</span></Link></div>
      </div>
      <div className="hero-sigil" aria-hidden="true"><span>✦</span><div className="orbit orbit-one" /><div className="orbit orbit-two" /><small>IMAGINA · CREA · COMPARTE</small></div>
    </section>
    <section className="manifesto-strip"><span>Personajes originales</span><i>✦</i><span>Sistemas abiertos</span><i>✦</i><span>Historias compartidas</span></section>
    <HeroComponent />
    <section className="future-callout page"><span className="eyebrow">El enclave está creciendo</span><h2>Hoy, personajes.<br />Mañana, mundos enteros.</h2><p>Estamos preparando espacios para compartir campañas, escenarios, facciones y herramientas para tu mesa.</p><span className="coming-pill">Próximamente · Archivo de campañas</span></section>
  </m.div>
);

export default CarouselPage;
