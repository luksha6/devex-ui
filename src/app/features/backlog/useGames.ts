import { useCallback, useMemo, useState } from 'react';
import { achievements as seedAchievements, games as seedGames } from './seed';
import type { Achievement, CompleteGameResult, Game } from './types';

const STORAGE_KEY = 'backlog:v1';

interface PersistedState {
  games: Game[];
  achievements: Achievement[];
}

function isGame(value: unknown): value is Game {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const game = value as Game;
  return typeof game.id === 'string' && typeof game.title === 'string';
}

function isAchievement(value: unknown): value is Achievement {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const achievement = value as Achievement;
  return typeof achievement.id === 'string' && typeof achievement.gameId === 'string';
}

function readState(): PersistedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { games: seedGames, achievements: seedAchievements };
    }
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) {
      return { games: seedGames, achievements: seedAchievements };
    }
    const record = parsed as { games?: unknown; achievements?: unknown };
    if (!Array.isArray(record.games) || !Array.isArray(record.achievements)) {
      return { games: seedGames, achievements: seedAchievements };
    }
    if (!record.games.every(isGame) || !record.achievements.every(isAchievement)) {
      return { games: seedGames, achievements: seedAchievements };
    }
    return { games: record.games, achievements: record.achievements };
  } catch {
    return { games: seedGames, achievements: seedAchievements };
  }
}

function writeState(state: PersistedState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useGames() {
  const [state, setState] = useState<PersistedState>(() => {
    if (typeof window === 'undefined') {
      return { games: seedGames, achievements: seedAchievements };
    }
    return readState();
  });

  const persist = useCallback((next: PersistedState) => {
    setState(next);
    writeState(next);
  }, []);

  const completeGame = useCallback(
    (id: string): CompleteGameResult | null => {
      const game = state.games.find((item) => item.id === id);
      if (!game || game.status === 'completed') {
        return null;
      }

      const firstInGenre = !state.games.some(
        (item) => item.genre === game.genre && item.status === 'completed',
      );

      const nextGames = state.games.map((item) =>
        item.id === id ? { ...item, status: 'completed' as const, completion: 100 } : item,
      );

      const bonus: Achievement | null = firstInGenre
        ? {
            id: `${id}-genre-pioneer`,
            gameId: id,
            title: `${game.genre} Pioneer`,
            description: `Complete your first ${game.genre} game.`,
            rarity: 'epic',
            unlocked: true,
          }
        : null;

      persist({
        games: nextGames,
        achievements: bonus ? [...state.achievements, bonus] : state.achievements,
      });

      return { title: game.title, genre: game.genre, firstInGenre };
    },
    [persist, state.achievements, state.games],
  );

  const rateGame = useCallback(
    (id: string, rating: number) => {
      persist({
        ...state,
        games: state.games.map((item) => (item.id === id ? { ...item, rating } : item)),
      });
    },
    [persist, state],
  );

  const genres = useMemo(() => {
    const unique = [...new Set(state.games.map((game) => game.genre))].sort();
    return unique;
  }, [state.games]);

  return {
    games: state.games,
    achievements: state.achievements,
    genres,
    completeGame,
    rateGame,
  };
}
