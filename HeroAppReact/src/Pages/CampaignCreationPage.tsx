import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CampaignMapPreview from "../Components/CampaignMapPreview";
import AzgaarMapEditor, { AzgaarExport } from "../Components/AzgaarMapEditor";
import ImmersiveSelect from "../Components/ImmersiveSelect";
import PlayerStepper from "../Components/PlayerStepper";
import { CampaignStatus, CampaignVisibility, Climate, Landform, MapSize } from "../Models/CampaignModel";
import { getApiErrorMessage } from "../Services/apiClient";
import CampaignService from "../Services/campaignService";
import "../Styles/CampaignCreationPage.css";

const steps = ["Premisa", "Tono", "Mesa", "Mundo", "Publicación"];
const initialForm = { name: "", shortDescription: "", description: "", system: "Daggerheart", genres: [] as string[], tone: "Fantasía heroica", status: "planning" as CampaignStatus, visibility: "private" as CampaignVisibility, minPlayers: 3, maxPlayers: 5, schedule: "", contentWarnings: "", seed: Math.random().toString(36).slice(2, 10), size: "medium" as MapSize, landform: "continents" as Landform, climate: "temperate" as Climate };

const CampaignCreationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [mapSnapshot, setMapSnapshot] = useState<AzgaarExport>();
  const update = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (event.target.name === "seed") setMapSnapshot(undefined);
    setForm({ ...form, [event.target.name]: event.target.type === "number" ? Number(event.target.value) : event.target.value });
  };
  const setField = (name: string, value: string | number) => setForm((current) => ({ ...current, [name]: value }));
  const toggleGenre = (genre: string) => setForm({ ...form, genres: form.genres.includes(genre) ? form.genres.filter((item) => item !== genre) : [...form.genres, genre] });
  const canContinue = useMemo(() => step === 0 ? Boolean(form.name && form.shortDescription && form.description && form.system) : step === 1 ? Boolean(form.tone && form.genres.length) : step === 2 ? form.minPlayers > 0 && form.maxPlayers >= form.minPlayers : step === 3 ? Boolean(form.seed && mapSnapshot) : Boolean(form.seed), [form, mapSnapshot, step]);
  const newSeed = () => { setMapSnapshot(undefined); setForm({ ...form, seed: Math.random().toString(36).slice(2, 10) }); };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (step < steps.length - 1) { if (canContinue) setStep(step + 1); return; }
    setSubmitting(true); setError(null);
    try {
      const created = await CampaignService.create({ name: form.name, shortDescription: form.shortDescription, description: form.description, system: form.system, genres: form.genres, tone: form.tone, status: form.status, visibility: form.visibility, playerCount: { min: form.minPlayers, max: form.maxPlayers }, schedule: form.schedule, contentWarnings: form.contentWarnings.split(",").map((item) => item.trim()).filter(Boolean), map: { provider: "seed-preview", seed: form.seed, generatorVersion: mapSnapshot?.version || "epic-preview-1", parameters: { size: form.size, landform: form.landform, climate: form.climate } } });
      if (mapSnapshot) await CampaignService.uploadMap(created.data.data.id, mapSnapshot.svg, mapSnapshot.mapData);
      navigate("/campaigns");
    } catch (requestError) { setError(getApiErrorMessage(requestError, "No se pudo guardar la campaña.")); }
    finally { setSubmitting(false); }
  };

  return <m.section className="campaign-create page" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
    <header><span className="eyebrow">Fundar un nuevo mundo</span><h1>Comienza la crónica.</h1><p>Traza primero la promesa de la campaña. El resto del mundo crecerá a su alrededor.</p></header>
    <nav className="creation-steps" aria-label="Progreso de creación">{steps.map((label, index) => <button type="button" key={label} className={index === step ? "active" : index < step ? "done" : ""} onClick={() => index < step && setStep(index)}><i>{index < step ? "✓" : index + 1}</i><span>{label}</span></button>)}</nav>
    <form onSubmit={submit} className={`campaign-wizard surface-card ${step === 3 ? "map-workshop" : ""}`}>
      <div className="wizard-main">
        <span className="step-count">PASO {step + 1} DE {steps.length}</span>
        {step === 0 && <div className="wizard-fields"><h2>¿Qué historia promete este mundo?</h2><label>Nombre de la campaña<input name="name" value={form.name} onChange={update} placeholder="Ej. Las coronas de ceniza" maxLength={120} required /></label><label>Promesa en una frase<input name="shortDescription" value={form.shortDescription} onChange={update} placeholder="Una corona perdida divide el último reino libre." maxLength={240} required /></label><label>Descripción<textarea name="description" value={form.description} onChange={update} rows={6} placeholder="Presenta el conflicto, el mundo y lo que encontrarán sus protagonistas…" required /></label><label>Sistema<ImmersiveSelect name="system" value={form.system} onChange={setField} options={[{ value: "Daggerheart", label: "Daggerheart", description: "Esperanza y temor" }, { value: "Dungeons & Dragons 5e", label: "Dungeons & Dragons 5e", description: "Fantasía de aventuras" }, { value: "Pathfinder 2e", label: "Pathfinder 2e", description: "Táctico y detallado" }, { value: "Sistema propio", label: "Sistema propio" }, { value: "Sin sistema", label: "Sin sistema", description: "Mundo agnóstico" }]} /></label></div>}
        {step === 1 && <div className="wizard-fields"><h2>Elige la atmósfera de la mesa.</h2><label>Tono principal<ImmersiveSelect name="tone" value={form.tone} onChange={setField} options={["Fantasía heroica", "Fantasía oscura", "Intriga política", "Maravilla y exploración", "Horror fantástico"].map((label) => ({ value: label, label }))} /></label><fieldset><legend>Géneros <small>elige al menos uno</small></legend><div className="choice-chips">{["Aventura", "Exploración", "Política", "Misterio", "Supervivencia", "Guerra"].map((genre) => <button type="button" className={form.genres.includes(genre) ? "selected" : ""} onClick={() => toggleGenre(genre)} key={genre}>{genre}</button>)}</div></fieldset></div>}
        {step === 2 && <div className="wizard-fields"><h2>Prepara un lugar para la mesa.</h2><div className="field-pair"><PlayerStepper label="Compañía mínima" value={form.minPlayers} onChange={(value) => setField("minPlayers", value)} /><PlayerStepper label="Compañía máxima" value={form.maxPlayers} onChange={(value) => setField("maxPlayers", value)} /></div><label>Ritmo o calendario <small>opcional</small><input name="schedule" value={form.schedule} onChange={update} placeholder="Ej. Quincenal · sábados por la tarde" /></label><label>Avisos de contenido <small>separados por comas</small><input name="contentWarnings" value={form.contentWarnings} onChange={update} placeholder="Ej. horror, violencia fantástica" /></label><label>Estado<ImmersiveSelect name="status" value={form.status} onChange={setField} options={[{ value: "planning", label: "En preparación", description: "La crónica aún se está trazando" }, { value: "active", label: "En curso", description: "La mesa ya está jugando" }, { value: "paused", label: "En pausa" }, { value: "completed", label: "Finalizada" }]} /></label></div>}
        {step === 3 && <div className="wizard-fields world-step"><h2>Traza las primeras fronteras.</h2><div className="seed-field"><label>Semilla del mundo<input name="seed" value={form.seed} onChange={update} maxLength={80} /></label><button type="button" className="secondary-button" onClick={newSeed}>Nuevo mundo</button></div><AzgaarMapEditor seed={form.seed} onExport={setMapSnapshot} captured={Boolean(mapSnapshot)} /><p className="azgaar-note"><span>✦</span><strong>{mapSnapshot ? "Mapa capturado" : "Guarda tu elección antes de continuar"}</strong> {mapSnapshot ? "El SVG y el archivo editable de Azgaar se guardarán con la campaña." : "Edita el mundo y pulsa “Usar este mapa”. Así el paso final mostrará exactamente tu selección."}</p></div>}
        {step === 4 && <div className="publish-preview"><CampaignMapPreview seed={form.seed} size={form.size} landform={form.landform} climate={form.climate} label={form.name} svg={mapSnapshot?.svg} /><span className="eyebrow">Vista previa</span><h2>{form.name}</h2><p>{form.shortDescription}</p><div className="choice-chips">{form.genres.map((genre) => <span key={genre}>{genre}</span>)}</div><label>Visibilidad<ImmersiveSelect name="visibility" value={form.visibility} onChange={setField} options={[{ value: "private", label: "Borrador privado", description: "Solo tú puedes verlo" }, { value: "unlisted", label: "No listada", description: "Visible únicamente mediante enlace" }, { value: "public", label: "Pública", description: "Aparecerá en el atlas" }]} /></label><small>Los borradores solo son visibles para ti. Las campañas públicas aparecerán inmediatamente en el atlas.</small></div>}
        {error && <p className="form-error" role="alert">{error}</p>}
        <footer>{step > 0 && <button type="button" className="secondary-button" onClick={() => setStep(step - 1)}>← Anterior</button>}<button className="primary-button" disabled={!canContinue || submitting}>{submitting ? "Guardando…" : step === steps.length - 1 ? form.visibility === "public" ? "Publicar campaña" : "Guardar campaña" : "Continuar →"}</button></footer>
      </div>
      <aside><span className="eyebrow">Consejo del cartógrafo</span><p>{["Una buena premisa expresa conflicto y posibilidad, sin decidir todavía cómo terminará.", "Combinar dos géneros suele producir una identidad más memorable que intentar cubrirlos todos.", "Estos datos ayudan a otros jugadores a saber si esta campaña es para su mesa.", "La semilla hace reproducible el mundo: guárdala y el mapa podrá reconstruirse.", "Publica cuando la promesa sea clara. Siempre podrás expandir la crónica después."][step]}</p><blockquote>“Todo mapa empieza como una decisión sobre qué merece un nombre.”</blockquote></aside>
    </form>
  </m.section>;
};

export default CampaignCreationPage;
