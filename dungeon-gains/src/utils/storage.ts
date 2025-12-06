import type { GameState, PlayerCharacter, PersonalRecord } from '../types';
import { calculateInitialStats, calculateMaxHealth } from './gameLogic';
import { supabase } from '../lib/supabase';

const STORAGE_KEY_PREFIX = 'dungeon_gains_save';

const getStorageKey = (userId: string): string => {
  return `${STORAGE_KEY_PREFIX}_${userId}`;
};

// Save game to Supabase (with localStorage fallback)
export const saveGame = async (gameState: GameState, userId: string): Promise<void> => {
  try {
    // Save to Supabase with explicit conflict resolution on user_id
    const { error } = await supabase
      .from('game_saves')
      .upsert({
        user_id: userId,
        game_data: gameState,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Supabase save error:', error);
      // Fallback to localStorage
      const storageKey = getStorageKey(userId);
      localStorage.setItem(storageKey, JSON.stringify(gameState));
    }
  } catch (error) {
    console.error('Failed to save game:', error);
    // Fallback to localStorage
    const storageKey = getStorageKey(userId);
    localStorage.setItem(storageKey, JSON.stringify(gameState));
  }
};

// Load game from Supabase (with localStorage fallback)
export const loadGame = async (userId: string): Promise<GameState | null> => {
  try {
    // Try loading from Supabase
    const { data, error } = await supabase
      .from('game_saves')
      .select('game_data')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Supabase load error:', error);
      // Fallback to localStorage
      const storageKey = getStorageKey(userId);
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : null;
    }

    return data?.game_data || null;
  } catch (error) {
    console.error('Failed to load game:', error);
    // Fallback to localStorage
    const storageKey = getStorageKey(userId);
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : null;
  }
};

// Clear save from both Supabase and localStorage
export const clearSave = async (userId: string): Promise<void> => {
  try {
    await supabase
      .from('game_saves')
      .delete()
      .eq('user_id', userId);
  } catch (error) {
    console.error('Failed to clear Supabase save:', error);
  }
  
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
    healthPotions: 3, // Start with 3 potions to help new players
  };
};
