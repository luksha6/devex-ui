export type Platform = 'pc' | 'playstation' | 'xbox' | 'switch';

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export const PLATFORMS: readonly Platform[] = ['pc', 'playstation', 'xbox', 'switch'];

export const RARITIES: readonly Rarity[] = ['common', 'rare', 'epic', 'legendary'];

export const PLATFORM_LABELS: Record<Platform, string> = {
  pc: 'PC',
  playstation: 'PlayStation',
  xbox: 'Xbox',
  switch: 'Switch',
};

export const RARITY_LABELS: Record<Rarity, string> = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};
