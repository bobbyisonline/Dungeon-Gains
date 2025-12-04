// Core game types
export interface CharacterStats {
  strength: number;      // Tied to bench press
  power: number;         // Tied to squat
  endurance: number;     // Tied to overhead press
  stamina: number;       // Tied to mile time
  level: number;
  experience: number;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'bench' | 'squat' | 'overhead' | 'cardio' | 'accessory';
  statType: keyof CharacterStats;
  muscle?: string;   // Muscle group targeted (for API exercises)
  weight?: number;   // For weighted exercises
  reps?: number;
  sets?: number;
  time?: number;     // For cardio (in seconds)
  distance?: number; // For cardio (in miles)
}

export interface WorkoutLog {
  id: string;
  date: string;
  exercises: Exercise[];
  completed: boolean;
  dungeonCompleted: boolean;
}

export interface PersonalRecord {
  exerciseId: string;
  value: number; // weight or time
  date: string;
}

export interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'cosmetic';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  statBonus?: Partial<CharacterStats>;
  description: string;
  icon: string;
  spriteSheet?: string;  // e.g., 'common-swords'
  spriteIndex?: number;  // Position in the sprite sheet
}

export interface Enemy {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  icon: string;
}

export interface DungeonRoom {
  id: string;
  type: 'enemy' | 'treasure' | 'empty' | 'boss';
  enemy?: Enemy;
  loot?: Item[];
  cleared: boolean;
}

export interface Dungeon {
  id: string;
  rooms: DungeonRoom[];
  currentRoomIndex: number;
  completed: boolean;
  difficulty: number;
}

export interface PlayerCharacter {
  name: string;
  stats: CharacterStats;
  baseStats: CharacterStats;
  health: number;
  maxHealth: number;
  inventory: Item[];
  equippedItems: {
    weapon?: Item;
    armor?: Item;
    accessory?: Item;
  };
  workoutLogs: WorkoutLog[];
  personalRecords: Record<string, PersonalRecord>;
}

export interface GameState {
  player: PlayerCharacter;
  currentDungeon: Dungeon | null;
  availableDungeons: number; // Dungeons unlocked by completed workouts
}
