import type { PlayerCharacter, GameState } from '../types';

// Demo hero for onboarding walkthrough
export const DEMO_HERO: PlayerCharacter = {
  name: 'Demo Hero',
  stats: {
    strength: 12,
    power: 10,
    endurance: 8,
    stamina: 9,
    level: 5,
    experience: 120,
  },
  baseStats: {
    strength: 12,
    power: 10,
    endurance: 8,
    stamina: 9,
    level: 5,
    experience: 120,
  },
  health: 85,
  maxHealth: 100,
  inventory: [
    {
      id: 'demo-sword-1',
      name: 'Steel Longsword',
      type: 'weapon',
      rarity: 'uncommon',
      statBonus: { strength: 3 },
      description: 'A reliable blade for any adventurer.',
      icon: '⚔️',
    },
    {
      id: 'demo-helm-1',
      name: 'Iron Helm',
      type: 'armor',
      rarity: 'common',
      statBonus: { endurance: 2 },
      description: 'Basic head protection.',
      icon: '🪖',
    },
    {
      id: 'demo-ring-1',
      name: 'Ring of Vitality',
      type: 'accessory',
      rarity: 'rare',
      statBonus: { stamina: 4 },
      description: 'Pulses with life energy.',
      icon: '💍',
    },
  ],
  equippedItems: {
    weapon: {
      id: 'demo-axe',
      name: 'Battle Axe',
      type: 'weapon',
      rarity: 'rare',
      statBonus: { strength: 5, power: 2 },
      description: 'A fearsome weapon earned in battle.',
      icon: '🪓',
    },
    armor: {
      id: 'demo-chainmail',
      name: 'Chainmail Vest',
      type: 'armor',
      rarity: 'uncommon',
      statBonus: { endurance: 3 },
      description: 'Provides solid protection.',
      icon: '🛡️',
    },
  },
  workoutLogs: [
    {
      id: 'demo-workout-1',
      date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      exercises: [
        { id: 'bench', name: 'Bench Press', category: 'bench', statType: 'strength', weight: 185, sets: 4, reps: 8 },
        { id: 'squat', name: 'Squat', category: 'squat', statType: 'power', weight: 225, sets: 4, reps: 6 },
      ],
      completed: true,
      dungeonCompleted: true,
    },
    {
      id: 'demo-workout-2',
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      exercises: [
        { id: 'ohp', name: 'Overhead Press', category: 'overhead', statType: 'endurance', weight: 115, sets: 3, reps: 10 },
      ],
      completed: true,
      dungeonCompleted: true,
    },
  ],
  personalRecords: {
    bench: { exerciseId: 'bench', value: 185, date: new Date().toISOString() },
    squat: { exerciseId: 'squat', value: 225, date: new Date().toISOString() },
    ohp: { exerciseId: 'ohp', value: 115, date: new Date().toISOString() },
    deadlift: { exerciseId: 'deadlift', value: 275, date: new Date().toISOString() },
  },
  healthPotions: 2,
  firstDungeonCompleted: true,
};

export const DEMO_GAME_STATE: GameState = {
  player: DEMO_HERO,
  currentDungeon: null,
  availableDungeons: 1,
};
