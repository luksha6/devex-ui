import type { Platform, Rarity } from '../../../design-system';

export type { Platform, Rarity };

export type Status = 'playing' | 'backlog' | 'wishlist' | 'completed';

export type LibraryTab = 'library' | 'backlog' | 'wishlist' | 'completed';

export interface Game {
  id: string;
  title: string;
  platform: Platform;
  genre: string;
  hoursPlayed: number;
  completion: number;
  status: Status;
  rating: number | null;
}

export interface Achievement {
  id: string;
  gameId: string;
  title: string;
  description: string;
  rarity: Rarity;
  unlocked: boolean;
  progress?: number;
}

export interface FriendActivity {
  id: string;
  name: string;
  gameTitle: string;
  online: boolean;
  action: 'playing' | 'completed';
}

export interface CompleteGameResult {
  title: string;
  genre: string;
  firstInGenre: boolean;
}
