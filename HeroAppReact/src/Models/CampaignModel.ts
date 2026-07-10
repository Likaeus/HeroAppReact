export type CampaignStatus = "planning" | "active" | "paused" | "completed";
export type CampaignVisibility = "public" | "unlisted" | "private";
export type MapSize = "small" | "medium" | "large";
export type Landform = "continents" | "archipelago" | "islands" | "pangea";
export type Climate = "temperate" | "cold" | "arid" | "tropical";

export interface CampaignMap {
  provider: "seed-preview" | "azgaar";
  seed: string;
  generatorVersion: string;
  parameters: { size: MapSize; landform: Landform; climate: Climate };
}

export default interface Campaign {
  id: string;
  name: string;
  slug: string;
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
  map: CampaignMap;
  mapPreviewUrl: string | null;
  isOwnedByCurrentUser: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}
