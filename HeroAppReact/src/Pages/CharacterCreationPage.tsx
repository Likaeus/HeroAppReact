import { ChangeEvent, FormEvent, useState } from "react";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroService from "../Services/heroService";
import { getApiErrorMessage } from "../Services/apiClient";
import "../Styles/CharacterCreationPage.css";
import ImmersiveSelect from "../Components/ImmersiveSelect";

const CharacterCreationPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "", powers: "", weakness: "", visibility: "public" as "public" | "private" });
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const selectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : undefined);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setSubmitting(true); setError(null);
    try {
      await HeroService.create({ name: form.name, description: form.description, details: { powers: form.powers, weakness: form.weakness }, visibility: form.visibility }, image);
      navigate("/my-creations", { state: { created: form.name } });
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "No se pudo publicar el personaje."));
    } finally { setSubmitting(false); }
  };

  const field = (key: keyof typeof form) => ({ value: form[key], onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [key]: event.target.value }) });

  return (
    <m.section className="create-page page" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <header className="page-intro"><span className="eyebrow">Taller de personajes</span><h1>Dale forma a una nueva leyenda.</h1><p>No hace falta una ficha completa. Comparte el núcleo de la idea y deja que la comunidad imagine el resto.</p></header>
      <form className="create-layout" onSubmit={submit}>
        <div className="surface-card create-fields">
          <label>Nombre del personaje<input {...field("name")} placeholder="Ej. Kael, cartógrafo del vacío" required /></label>
          <label>Descripción<textarea {...field("description")} rows={5} placeholder="¿Quién es y qué busca?" required /></label>
          <div className="field-pair">
            <label>Poderes o talentos<textarea {...field("powers")} rows={4} placeholder="Magia, habilidades, dones…" required /></label>
            <label>Debilidad o conflicto<textarea {...field("weakness")} rows={4} placeholder="Todo héroe tiene una grieta…" required /></label>
          </div>
          <label>Visibilidad<ImmersiveSelect name="visibility" value={form.visibility} onChange={(_, value) => setForm({ ...form, visibility: value as "public" | "private" })} options={[{ value: "public", label: "Público", description: "Visible en el archivo y la galería" }, { value: "private", label: "Privado", description: "Solo aparecerá en Mis creaciones" }]} /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button" disabled={submitting}>{submitting ? "Publicando…" : "Publicar personaje"}</button>
        </div>
        <aside className="surface-card image-uploader">
          <span className="eyebrow">Retrato</span>
          <div className="image-preview">{preview ? <img src={preview} alt="Vista previa" /> : <div><span>✦</span><p>Añade una imagen para presentar tu creación.</p></div>}</div>
          <label className="secondary-button file-button">Elegir imagen<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={selectImage} /></label>
          <small>JPEG, PNG, WebP o GIF · máximo 5 MB</small>
        </aside>
      </form>
    </m.section>
  );
};

export default CharacterCreationPage;
