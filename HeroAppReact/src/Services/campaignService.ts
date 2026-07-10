import Campaign, { CampaignStatus, CampaignVisibility, Climate, Landform, MapSize } from "../Models/CampaignModel";
import { apiClient } from "./apiClient";

export interface CampaignPayload {
  name: string;
  shortDescription: string;
  description: string;
  system: string;
  genres: string[];
  tone: string;
  status: CampaignStatus;
  visibility: CampaignVisibility;
  playerCount: { min: number; max: number };
  schedule: string;
  contentWarnings: string[];
  map: { provider: "seed-preview"; seed: string; generatorVersion: string; parameters: { size: MapSize; landform: Landform; climate: Climate } };
}

interface CampaignListResponse { data: Campaign[]; meta: { page?: number; limit?: number; total: number; pages?: number } }
interface CampaignResponse { data: Campaign }

const list = (params: { search?: string; system?: string; status?: string } = {}) =>
  apiClient.get<CampaignListResponse>("/campaigns", { params });
const listMine = () => apiClient.get<CampaignListResponse>("/campaigns/mine");
const getById = (id: string) => apiClient.get<CampaignResponse>(`/campaigns/${id}`);
const create = (payload: CampaignPayload) => apiClient.post<CampaignResponse>("/campaigns", payload);
const update = (id: string, payload: CampaignPayload) => apiClient.put<CampaignResponse>(`/campaigns/${id}`, payload);
const remove = (id: string) => apiClient.delete(`/campaigns/${id}`);
const uploadMap = (id: string, svg: string, mapData: string) => {
  const form = new FormData();
  form.append("preview", new Blob([svg], { type: "image/svg+xml" }), "campaign-map.svg");
  form.append("source", new Blob([mapData], { type: "text/plain" }), "campaign.map");
  return apiClient.put<CampaignResponse>(`/campaigns/${id}/map`, form);
};

export default { list, listMine, getById, create, update, remove, uploadMap };
