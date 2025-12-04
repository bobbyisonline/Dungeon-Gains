import type { CharacterStats, Exercise, PersonalRecord, PlayerCharacter } from '../types';

// Calculate initial stats based on starting lifts
export const calculateInitialStats = (
  benchPress: number,
  squat: number,
  overheadPress: number,
  mileTime: number // in minutes
): CharacterStats => {
  // Normalize lifts to stats (adjustable formulas)
  const strength = Math.floor(benchPress / 10) + 10; // Bench press
  const power = Math.floor(squat / 15) + 10;         // Squat (typically higher weight)
  const endurance = Math.floor(overheadPress / 5) + 10; // Overhead press
  const stamina = Math.floor((20 - mileTime) * 2) + 10; // Mile time (lower is better)

  return {
    strength: Math.max(strength, 10),
    power: Math.max(power, 10),
    endurance: Math.max(endurance, 10),
    stamina: Math.max(stamina, 10),
    level: 1,
    experience: 0,
  };
};

// Check if a new PR was achieved
export const checkForPR = (
  exercise: Exercise,
  previousRecords: Record<string, PersonalRecord>
): boolean => {
  const previousPR = previousRecords[exercise.id];
  
  if (!previousPR) return true; // First time is always a PR

  if (exercise.category === 'cardio' && exercise.time) {
    return exercise.time < previousPR.value; // Lower time is better
  } else if (exercise.weight) {
    return exercise.weight > previousPR.value; // Higher weight is better
  }

  return false;
};

// Calculate stat buff from PR
export const calculateStatBuff = (exercise: Exercise): Partial<CharacterStats> => {
  const buff: Partial<CharacterStats> = {};
  
  switch (exercise.category) {
    case 'bench':
      buff.strength = 2;
      break;
    case 'squat':
      buff.power = 2;
      break;
    case 'overhead':
      buff.endurance = 2;
      break;
    case 'cardio':
      buff.stamina = 2;
      break;
  }

  return buff;
};

// Apply stat buff to character
export const applyStatBuff = (
  stats: CharacterStats,
  buff: Partial<CharacterStats>
): CharacterStats => {
  return {
    ...stats,
    strength: stats.strength + (buff.strength || 0),
    power: stats.power + (buff.power || 0),
    endurance: stats.endurance + (buff.endurance || 0),
    stamina: stats.stamina + (buff.stamina || 0),
  };
};

// Calculate experience gain from workout
export const calculateExperienceGain = (exercises: Exercise[]): number => {
  let xp = 0;
  
  exercises.forEach(exercise => {
    xp += (exercise.sets || 1) * (exercise.reps || 1) * 5;
    if (exercise.time) {
      xp += Math.floor(exercise.time / 60) * 10; // 10 XP per minute
    }
  });

  return xp;
};

// Check if player leveled up
export const checkLevelUp = (
  currentLevel: number,
  currentXP: number
): { leveledUp: boolean; newLevel: number; xpForNextLevel: number } => {
  const xpForNextLevel = currentLevel * 100;
  
  if (currentXP >= xpForNextLevel) {
    return {
      leveledUp: true,
      newLevel: currentLevel + 1,
      xpForNextLevel: (currentLevel + 1) * 100,
    };
  }

  return {
    leveledUp: false,
    newLevel: currentLevel,
    xpForNextLevel,
  };
};

// Calculate max health based on stats
export const calculateMaxHealth = (stats: CharacterStats): number => {
  return 100 + (stats.level * 10) + stats.endurance * 2;
};

// Calculate damage dealt by player
export const calculatePlayerDamage = (player: PlayerCharacter): number => {
  const baseDamage = player.stats.strength + player.stats.power;
  const weaponBonus = player.equippedItems.weapon?.statBonus?.strength || 0;
  const variance = Math.random() * 0.2 + 0.9; // 90-110% damage variance
  
  return Math.floor((baseDamage + weaponBonus) * variance);
};

// Calculate damage reduction from armor
export const calculateDamageReduction = (player: PlayerCharacter): number => {
  const armorBonus = player.equippedItems.armor?.statBonus?.endurance || 0;
  const defenseStat = player.stats.endurance + armorBonus;
  
  // Each point of endurance reduces damage by 1%
  return Math.min(defenseStat, 75); // Cap at 75% reduction
};
