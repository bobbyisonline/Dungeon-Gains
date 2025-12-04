import type { GameState, PlayerCharacter, PersonalRecord } from '../types';
import { calculateInitialStats, calculateMaxHealth } from './gameLogic';

const STORAGE_KEY = 'dungeon_gains_save';

export const saveGame = (gameState: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (error) {
    console.error('Failed to save game:', error);
  }
};

export const loadGame = (): GameState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load game:', error);
  }
  return null;
};

export const clearSave = (): void => {
  localStorage.removeItem(STORAGE_KEY);
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
