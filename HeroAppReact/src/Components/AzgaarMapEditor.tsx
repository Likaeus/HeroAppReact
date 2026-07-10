import { useEffect, useRef, useState } from "react";

export interface AzgaarExport { svg: string; mapData: string; seed: string; version: string }
interface Props { seed: string; onExport: (snapshot: AzgaarExport) => void; captured: boolean }

const configuredAzgaarUrl = import.meta.env.VITE_AZGAAR_URL || "/Fantasy-Map-Generator/";
const azgaarOrigin = new URL(configuredAzgaarUrl, window.location.origin).href.replace(/\/?$/, "/");
const azgaarMessageOrigin = new URL(azgaarOrigin).origin;

const AzgaarMapEditor = ({ seed, onExport, captured }: Props) => {
  const frame = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);
  const [exporting, setExporting] = useState(false);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.data?.source !== "azgaar") return;
      if (event.data.type === "map-ready") setReady(true);
      if (event.data.type === "epic-map-export") { setExporting(false); onExport(event.data as AzgaarExport); }
      if (event.data.type === "epic-map-error") setExporting(false);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [onExport]);
  const capture = () => { setExporting(true); frame.current?.contentWindow?.postMessage({ source: "epic-enclave", type: "export-map" }, azgaarMessageOrigin); };
  return <div className="azgaar-editor">
    <div className="azgaar-editor-bar"><span><i>✦</i><strong>Azgaar Fantasy Map Generator</strong><small>{ready ? "Editor listo" : "Generando el mundo…"}</small></span><div><button type="button" onClick={capture} disabled={!ready || exporting}>{exporting ? "Guardando mapa…" : captured ? "Actualizar mapa guardado" : "Usar este mapa"}</button><a href={`${azgaarOrigin}?seed=${encodeURIComponent(seed)}`} target="_blank" rel="noreferrer">Abrir ↗</a></div></div>
    <iframe ref={frame} key={seed} src={`${azgaarOrigin}?seed=${encodeURIComponent(seed)}`} title="Editor de mapas de Azgaar" allow="clipboard-write; fullscreen" />
  </div>;
};

export default AzgaarMapEditor;
