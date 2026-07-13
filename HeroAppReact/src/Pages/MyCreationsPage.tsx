import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import HeroImage from "../Components/HeroImage";
import Character from "../Models/CharacterModel";
import HeroService from "../Services/heroService";
import CampaignMapPreview from "../Components/CampaignMapPreview";
import Campaign from "../Models/CampaignModel";
import CampaignService from "../Services/campaignService";
import "../Styles/MyCreationsPage.css";
import EditCreationModal from "../Components/EditCreationModal";

const MyCreationsPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<{ type: "character"; value: Character } | { type: "campaign"; value: Campaign } | null>(null);
  const created = (useLocation().state as { created?: string } | null)?.created;

  useEffect(() => {
    Promise.all([HeroService.listMine({ limit: 100 }), CampaignService.listMine()])
      .then(([heroResponse, campaignResponse]) => { setCharacters(heroResponse.data.data); setCampaigns(campaignResponse.data.data); })
      .finally(() => setLoading(false));
  }, []);

  return <m.section className="my-creations page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <header className="my-header"><div><span className="eyebrow">Tu archivo personal</span><h1>Mis creaciones.</h1><p>Los personajes y campañas que has aportado al enclave.</p></div></header>
    {created && <div className="success-banner">✦ <strong>{created}</strong> ya forma parte del enclave.</div>}
    {loading ? <div className="my-empty">Buscando tus creaciones…</div> : characters.length || campaigns.length ? <>
      {campaigns.length > 0 && <section className="my-creation-section"><div className="my-section-title"><div><span className="eyebrow">Tus mundos</span><h2>Campañas</h2></div><Link to="/campaigns/create" className="primary-button">＋ Nueva campaña</Link></div><div className="my-campaign-grid">{campaigns.map((campaign) => <article className="my-campaign-card surface-card" key={campaign.id}><CampaignMapPreview seed={campaign.map.seed} {...campaign.map.parameters} label={campaign.name} previewUrl={campaign.mapPreviewUrl} /><div><span className={`visibility-mark ${campaign.visibility}`}>{campaign.visibility === "public" ? "Pública" : campaign.visibility === "unlisted" ? "No listada" : "Borrador privado"}</span><h3>{campaign.name}</h3><p>{campaign.shortDescription}</p><small>{campaign.system} · {campaign.playerCount.min}–{campaign.playerCount.max} jugadores</small><button className="edit-button" onClick={() => setEditing({ type: "campaign", value: campaign })}>Editar campaña</button></div></article>)}</div></section>}
      {characters.length > 0 && <section className="my-creation-section"><div className="my-section-title"><div><span className="eyebrow">Tus protagonistas</span><h2>Personajes</h2></div><Link to="/create" className="primary-button">＋ Nuevo personaje</Link></div><div className="creation-grid">{characters.map((character) => <article className="creation-card surface-card" key={character.id}><div className="creation-art"><HeroImage hero={character} alt={`Retrato de ${character.name}`} fallback={<div className="portrait-placeholder">✦</div>} /></div><div><span className="eyebrow">Tu personaje · {character.visibility === "private" ? "Privado" : "Público"}</span><h2>{character.name}</h2><p>{character.description}</p><small>{character.details.powers}</small><button className="edit-button" onClick={() => setEditing({ type: "character", value: character })}>Editar personaje</button></div></article>)}</div></section>}
    </> : <div className="my-empty surface-card"><span>✦</span><h2>Tu archivo aún está en blanco</h2><p>Da forma a tu primera idea y aparecerá aquí.</p><div className="empty-actions"><Link to="/create" className="primary-button">Crear personaje</Link><Link to="/campaigns/create" className="secondary-button">Crear campaña</Link></div></div>}
    <p className="ownership-note">Tus creaciones están vinculadas a tu cuenta y se sincronizan automáticamente entre dispositivos.</p>
    {editing && <EditCreationModal item={editing} onClose={() => setEditing(null)} onSaved={(updated) => { if (editing.type === "character") setCharacters((items) => items.map((item) => item.id === updated.id ? updated as Character : item)); else setCampaigns((items) => items.map((item) => item.id === updated.id ? updated as Campaign : item)); }} />}
  </m.section>;
};

export default MyCreationsPage;
