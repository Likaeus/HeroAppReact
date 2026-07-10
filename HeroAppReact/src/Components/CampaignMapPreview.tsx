import { useEffect, useState } from "react";
import { Climate, Landform, MapSize } from "../Models/CampaignModel";
import { apiClient, apiOrigin } from "../Services/apiClient";

interface Props { seed: string; size?: MapSize; landform?: Landform; climate?: Climate; label?: string; previewUrl?: string | null; svg?: string }

const hashSeed = (seed: string) => Array.from(seed || "epic-enclave").reduce((hash, character) => Math.imul(hash ^ character.charCodeAt(0), 16777619), 2166136261) >>> 0;

const CampaignMapPreview = ({ seed, size = "medium", landform = "continents", climate = "temperate", label, previewUrl, svg }: Props) => {
  const [remotePreview, setRemotePreview] = useState<string>();
  const isPrivatePreview = previewUrl?.endsWith("/mine");
  useEffect(() => {
    if (!previewUrl || !isPrivatePreview) { setRemotePreview(undefined); return; }
    let objectUrl: string | undefined;
    apiClient.get<Blob>(previewUrl.replace(/^\/api\/v1/, ""), { responseType: "blob" }).then(({ data }) => { objectUrl = URL.createObjectURL(data); setRemotePreview(objectUrl); }).catch(() => setRemotePreview(undefined));
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [isPrivatePreview, previewUrl]);
  const publicPreview = previewUrl && !isPrivatePreview ? `${apiOrigin}${previewUrl}` : undefined;
  const capturedUrl = svg ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` : publicPreview || remotePreview;
  if (capturedUrl) return <div className="campaign-map campaign-map-real" role="img" aria-label={`Mapa de ${label || "la campaña"}`}><img src={capturedUrl} alt="" /><span className="map-seed">MAPA DE AZGAAR · {seed}</span></div>;
  if (previewUrl) return <div className="campaign-map map-loading" role="status"><span>✦</span><small>Revelando el mapa…</small></div>;
  let state = hashSeed(`${seed}:${size}:${landform}:${climate}`);
  const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
  const count = landform === "archipelago" ? 11 : landform === "islands" ? 8 : landform === "pangea" ? 4 : 6;
  const palette = climate === "cold" ? ["#b9cbc8", "#758f8c"] : climate === "arid" ? ["#c59c5f", "#8d7048"] : climate === "tropical" ? ["#54896d", "#315f50"] : ["#718866", "#445f50"];
  const shapes = Array.from({ length: count }, (_, index) => {
    const cx = 8 + random() * 84; const cy = 12 + random() * 72;
    const rx = (landform === "pangea" ? 20 : 7) + random() * (landform === "pangea" ? 15 : 13);
    const ry = 6 + random() * 15;
    return <ellipse key={index} cx={cx} cy={cy} rx={rx} ry={ry} fill={palette[index % 2]} opacity={.86} transform={`rotate(${Math.round(random() * 80 - 40)} ${cx} ${cy})`} />;
  });
  return <div className="campaign-map" role="img" aria-label={`Mapa generado para ${label || "la campaña"}, semilla ${seed}`}>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs><radialGradient id={`sea-${hashSeed(seed)}`}><stop stopColor="#263a4a"/><stop offset="1" stopColor="#111c29"/></radialGradient></defs>
      <rect width="100" height="100" fill={`url(#sea-${hashSeed(seed)})`} />
      <g className="map-grid"><path d="M0 25H100M0 50H100M0 75H100M25 0V100M50 0V100M75 0V100" /></g>
      <g className="map-land">{shapes}</g>
      <path className="map-route" d={`M${10 + random() * 15} ${70 + random() * 12} Q 45 ${15 + random() * 30}, ${82 + random() * 10} ${25 + random() * 40}`} />
    </svg>
    <span className="map-seed">SEMILLA · {seed}</span><i className="map-compass">✦</i>
  </div>;
};

export default CampaignMapPreview;
