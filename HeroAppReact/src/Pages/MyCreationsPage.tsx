import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import HeroImage from "../Components/HeroImage";
import { useAuth } from "../Context/useAuth";
import Character from "../Models/CharacterModel";
import { getCreationIds } from "../Services/creationService";
import HeroService from "../Services/heroService";
import "../Styles/MyCreationsPage.css";

const MyCreationsPage = () => {
  const { user } = useAuth();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const created = (useLocation().state as { created?: string } | null)?.created;

  useEffect(() => {
    if (!user) return;
    const ids = getCreationIds(user.id);
    Promise.all(ids.map((id) => HeroService.getById(id).then((r) => r.data.data).catch(() => null)))
      .then((values) => setCharacters(values.filter((hero): hero is Character => Boolean(hero))))
      .finally(() => setLoading(false));
  }, [user]);

  return <m.section className="my-creations page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <header className="my-header"><div><span className="eyebrow">Tu archivo personal</span><h1>Mis creaciones.</h1><p>Los personajes que has aportado al enclave desde este dispositivo.</p></div><Link to="/create" className="primary-button">＋ Nueva creación</Link></header>
    {created && <div className="success-banner">✦ <strong>{created}</strong> ya forma parte del enclave.</div>}
    {loading ? <div className="my-empty">Buscando tus personajes…</div> : characters.length ? <div className="creation-grid">{characters.map((character) => <article className="creation-card surface-card" key={character.id}><div className="creation-art"><HeroImage hero={character} alt={`Retrato de ${character.name}`} fallback={<div className="portrait-placeholder">✦</div>} /></div><div><span className="eyebrow">Tu personaje</span><h2>{character.name}</h2><p>{character.description}</p><small>{character.details.powers}</small></div></article>)}</div> : <div className="my-empty surface-card"><span>✦</span><h2>Tu archivo aún está en blanco</h2><p>Da forma a tu primera idea y aparecerá aquí.</p><Link to="/create" className="primary-button">Crear mi primer personaje</Link></div>}
    <p className="ownership-note">Esta lista se conserva localmente. La API aún no vincula personajes con su autor; cuando incorpore esa relación, tus creaciones podrán sincronizarse entre dispositivos.</p>
  </m.section>;
};

export default MyCreationsPage;
