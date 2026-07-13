import Campaign from "../Models/CampaignModel";
import CampaignMapPreview from "./CampaignMapPreview";
import ModalShell from "./ModalShell";

const status = { planning: "En preparación", active: "En curso", paused: "En pausa", completed: "Finalizada" };
const CampaignModal = ({ campaign, onClose }: { campaign: Campaign; onClose: () => void }) => <ModalShell onClose={onClose} label={`Campaña ${campaign.name}`} wide><div className="campaign-modal-map"><CampaignMapPreview seed={campaign.map.seed} {...campaign.map.parameters} label={campaign.name} previewUrl={campaign.mapPreviewUrl} /></div><div className="modal-copy campaign-modal-copy"><span className="eyebrow">Una campaña de {campaign.creatorName}</span><h2>{campaign.name}</h2><div className="campaign-modal-facts"><span>{campaign.system}</span><span>{status[campaign.status]}</span><span>{campaign.playerCount.min}–{campaign.playerCount.max} jugadores</span><span>{campaign.tone}</span></div><p>{campaign.description}</p><div className="genre-row">{campaign.genres.map((genre) => <span key={genre}>{genre}</span>)}</div>{campaign.schedule && <small>Ritmo de mesa · {campaign.schedule}</small>}</div></ModalShell>;
export default CampaignModal;
