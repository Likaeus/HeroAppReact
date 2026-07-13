import { FormEvent, useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import CampaignMapPreview from "../Components/CampaignMapPreview";
import ImmersiveSelect from "../Components/ImmersiveSelect";
import { useAuth } from "../Context/useAuth";
import Campaign from "../Models/CampaignModel";
import CampaignService from "../Services/campaignService";
import "../Styles/CampaignsPage.css";
import CampaignModal from "../Components/CampaignModal";

const statusLabel = { planning: "En preparación", active: "En curso", paused: "En pausa", completed: "Finalizada" };

const CampaignsPage = () => {
  const { isAuthenticated } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [openCampaign, setOpenCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    setLoading(true); setError(false);
    CampaignService.list({ search: query || undefined, status: status || undefined })
      .then(({ data }) => setCampaigns(data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [query, status]);

  const submitSearch = (event: FormEvent) => { event.preventDefault(); setQuery(search.trim()); };
  const featured = campaigns[0];

  return <m.section className="campaigns-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <header className="campaigns-hero page">
      <div><span className="eyebrow">Atlas de historias compartidas</span><h1>Mundos esperando <em>una historia.</em></h1><p>Descubre escenarios listos para la mesa o abre las fronteras de una campaña propia.</p></div>
      <Link to={isAuthenticated ? "/campaigns/create" : "/auth"} className="primary-button">＋ Crear campaña</Link>
    </header>
    <div className="campaign-toolbar page">
      <form onSubmit={submitSearch}><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar un reino, sistema o promesa…" aria-label="Buscar campañas" /><button className="search-submit">Buscar</button></form>
      <ImmersiveSelect name="status" value={status} onChange={(_, value) => setStatus(value)} options={[{ value: "", label: "Todos los estados" }, { value: "planning", label: "En preparación" }, { value: "active", label: "En curso" }, { value: "paused", label: "En pausa" }, { value: "completed", label: "Finalizadas" }]} />
    </div>

    {loading ? <div className="campaign-state page">Consultando el atlas…</div> : error ? <div className="campaign-state page surface-card"><span>✦</span><h2>El atlas no respondió</h2><p>Comprueba que la API local esté ejecutándose e inténtalo de nuevo.</p></div> : !campaigns.length ? <div className="campaign-state page surface-card"><span>✦</span><h2>Este territorio aún no tiene nombre</h2><p>{query || status ? "No encontramos campañas con esos filtros." : "Sé la primera persona en publicar un mundo para la comunidad."}</p><Link to={isAuthenticated ? "/campaigns/create" : "/auth"} className="primary-button">Fundar la primera campaña</Link></div> : <>
      {featured && <article className="featured-campaign page" role="button" tabIndex={0} onClick={() => setOpenCampaign(featured)}>
        <CampaignMapPreview seed={featured.map.seed} {...featured.map.parameters} label={featured.name} previewUrl={featured.mapPreviewUrl} />
        <div className="featured-copy"><span className="eyebrow">Campaña destacada · por {featured.creatorName}</span><div className="campaign-meta"><span>{featured.system}</span><span>{statusLabel[featured.status]}</span></div><h2>{featured.name}</h2><p>{featured.description}</p><div className="genre-row">{featured.genres.map((genre) => <span key={genre}>{genre}</span>)}</div><small>{featured.playerCount.min}–{featured.playerCount.max} jugadores · {featured.tone}</small></div>
      </article>}
      <div className="campaign-section page"><div className="section-heading"><div><span className="eyebrow">Explora el archivo</span><h2>Campañas recientes</h2></div><span>{campaigns.length} mundos</span></div>
        <div className="campaign-grid">{campaigns.slice(1).map((campaign) => <article className="campaign-card surface-card" role="button" tabIndex={0} onClick={() => setOpenCampaign(campaign)} key={campaign.id}><CampaignMapPreview seed={campaign.map.seed} {...campaign.map.parameters} label={campaign.name} previewUrl={campaign.mapPreviewUrl} /><div className="campaign-card-copy"><div className="campaign-meta"><span>{campaign.system}</span><span>{statusLabel[campaign.status]}</span></div><h3>{campaign.name}</h3><p>{campaign.shortDescription}</p><small>Por {campaign.creatorName} · {campaign.playerCount.min}–{campaign.playerCount.max} jugadores</small></div></article>)}</div>
      </div>
    </>}
    {openCampaign && <CampaignModal campaign={openCampaign} onClose={() => setOpenCampaign(null)} />}
  </m.section>;
};

export default CampaignsPage;
