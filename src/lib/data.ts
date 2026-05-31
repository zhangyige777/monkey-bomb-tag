import casesData from '@/data/cases.json';
import tailsData from '@/data/tails.json';
import mapsData from '@/data/maps.json';
import cosmeticsData from '@/data/cosmetics.json';
import codesData from '@/data/codes.json';
import configData from '@/data/game.config.json';

export interface Code {
  code: string;
  reward: string;
  source: string;
  addedDate: string;
  status: 'active' | 'expired';
  isNew?: boolean;
}

export interface DropRate {
  rarity: string;
  chance: number;
  example: string;
}

export interface Case {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: 'bananas';
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  description: string;
  dropRates: DropRate[];
  tags: string[];
}

export interface Tail {
  id: string;
  slug: string;
  name: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  source: string;
  dropRate: number;
  description: string;
  tags: string[];
}

export interface GameMap {
  id: string;
  name: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  tips?: string[];
  tags: string[];
}

export interface Cosmetic {
  id: string;
  name: string;
  type: 'bomb' | 'effect' | 'emote';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  source: string;
  description: string;
}

export interface GameConfig {
  game: { name: string; robloxId: string; developer: string; genre: string; currentVersion: string; lastUpdated: string; updateSchedule: string; platforms: string[]; };
  stats: { visits: string; favorites: string; likes: string; onlineNow: string; serverSize: number; active: boolean; lastChecked: string; };
  seo: { siteTitle: string; siteDescription: string; baseUrl: string; primaryKeywords: string[]; secondaryKeywords: string[]; defaultOgImage: string; };
  routes: { path: string; title: string; priority: string }[];
}

const cases: Case[] = (casesData as { cases: Case[] }).cases;
const tails: Tail[] = (tailsData as { tails: Tail[] }).tails;
const maps: GameMap[] = (mapsData as { maps: GameMap[] }).maps;
const cosmetics: Cosmetic[] = (cosmeticsData as { cosmetics: Cosmetic[] }).cosmetics;
const codes: Code[] = (codesData as { codes: Code[] }).codes;
const config: GameConfig = configData as GameConfig;

export const getGameConfig = () => config;
export const getActiveCodes = () => codes.filter(c => c.status === 'active');
export const getExpiredCodes = () => codes.filter(c => c.status === 'expired');
export const getCases = () => cases;
export const getTails = () => tails;
export const getMaps = () => maps;
export const getCosmetics = () => cosmetics;
export const getCosmeticsByType = (type: Cosmetic['type']) => cosmetics.filter(c => c.type === type);

export function formatNumber(num: number): string {
  if (num >= 1e15) return (num / 1e15).toFixed(1) + 'Q';
  if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
}
