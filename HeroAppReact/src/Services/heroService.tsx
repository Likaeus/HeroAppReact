import Character from "../Models/CharacterModel";
import { apiClient, apiOrigin } from "./apiClient";

export interface HeroPayload {
  name: string;
  description: string;
  details: { powers: string; weakness: string };
}

export interface HeroListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface HeroListResponse {
  data: Character[];
  meta: { page: number; limit: number; total: number; pages: number };
}

interface HeroResponse {
  data: Character;
}

const list = (params: HeroListParams = {}) =>
  apiClient.get<HeroListResponse>("/heroes", { params });
const getById = (id: string) => apiClient.get<HeroResponse>(`/heroes/${id}`);

const create = (payload: HeroPayload, image?: File) => {
  if (!image) return apiClient.post<HeroResponse>("/heroes", payload);
  const form = new FormData();
  form.append("name", payload.name);
  form.append("description", payload.description);
  form.append("powers", payload.details.powers);
  form.append("weakness", payload.details.weakness);
  form.append("image", image);
  return apiClient.post<HeroResponse>("/heroes", form);
};

const update = (id: string, payload: HeroPayload) =>
  apiClient.put<HeroResponse>(`/heroes/${id}`, payload);
const updateImage = (id: string, image: File) => {
  const form = new FormData();
  form.append("image", image);
  return apiClient.put<HeroResponse>(`/heroes/${id}/image`, form);
};
const remove = (id: string) => apiClient.delete(`/heroes/${id}`);
const getImage = (id: string) =>
  apiClient.get<Blob>(`/heroes/${id}/image`, { responseType: "blob" });

export const getHeroImageUrl = (hero: Pick<Character, "imageUrl">) =>
  hero.imageUrl ? `${apiOrigin}${hero.imageUrl}` : null;

export default { list, getById, create, update, updateImage, remove, getImage };
