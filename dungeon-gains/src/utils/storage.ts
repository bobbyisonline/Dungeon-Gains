import type { GameState, PlayerCharacter, PersonalRecord } from '../types';
import { calculateInitialStats, calculateMaxHealth } from './gameLogic';

const STORAGE_KEY_PREFIX = 'dungeon_gains_save';

const getStorageKey = (userId: string): string => {
  return `${STORAGE_KEY_PREFIX}_${userId}`;
};

export const saveGame = (gameState: GameState, userId: string): void => {
  try {
    const storageKey = getStorageKey(userId);
    localStorage.setItem(storageKey, JSON.stringify(gameState));
  } catch (error) {
    console.error('Failed to save game:', error);
  }
};

export const loadGame = (userId: string): GameState | null => {
  try {
    const storageKey = getStorageKey(userId);
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load game:', error);
  }
  return null;
};

export const clearSave = (userId: string): void => {
  const storageKey = getStorageKey(userId);
  localStorage.removeItem(storageKey);
};

export const createNewPlayer = (
  name: string,
  benchPress: number,
  squat: number,
  overheadPress: number,
  deadlift: number
): PlayerCharacter => {
  const baseStats = calculateInitialStats(benchPress, squat, overheadPress, deadlift);
  
  // Initialize personal records with starting lifts
  // Future workouts must exceed these to count as PRs
  const initialPRs: Record<string, PersonalRecord> = {
    'bench': {
      exerciseId: 'bench',
      value: benchPress,
      date: new Date().toISOString(),
    },
    'squat': {
      exerciseId: 'squat',
      value: squat,
      date: new Date().toISOString(),
    },
    'ohp': {
      exerciseId: 'ohp',
      value: overheadPress,
      date: new Date().toISOString(),
    },
    'deadlift': {
      exerciseId: 'deadlift',
      value: deadlift,
      date: new Date().toISOString(),
    },
  };
  
  return {
    name,
    stats: { ...baseStats },
    baseStats: { ...baseStats },
    health: calculateMaxHealth(baseStats),
    maxHealth: calculateMaxHealth(baseStats),
    inventory: [],
    equippedItems: {},
    workoutLogs: [],
    personalRecords: initialPRs,
  };
};
