import type { GameState, PlayerCharacter } from '../types';
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
  mileTime: number
): PlayerCharacter => {
  const baseStats = calculateInitialStats(benchPress, squat, overheadPress, mileTime);
  
  return {
    name,
    stats: { ...baseStats },
    baseStats: { ...baseStats },
    health: calculateMaxHealth(baseStats),
    maxHealth: calculateMaxHealth(baseStats),
    inventory: [],
    equippedItems: {},
    workoutLogs: [],
    personalRecords: {},
  };
};
