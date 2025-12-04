import type { CharacterStats, Exercise, PersonalRecord, PlayerCharacter } from '../types';

// Calculate initial stats based on starting lifts
export const calculateInitialStats = (
  _benchPress: number,
  _squat: number,
  _overheadPress: number,
  _mileTime: number // in minutes
): CharacterStats => {
  // Everyone starts with the same stats - progression is purely from leveling up
  // Starting lifts are still tracked for PR comparisons, but don't affect initial stats
  // Starting at 3 gives new players a fighting chance in first dungeon
  return {
    strength: 3,
    power: 3,
    endurance: 3,
    stamina: 3,
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
  
  // If no previous record exists (shouldn't happen with initialized PRs), don't count as PR
  if (!previousPR) return false;

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

// Calculate damage dealt by player against enemy
export const calculatePlayerDamage = (player: PlayerCharacter, enemyDefense: number = 0): number => {
  const baseDamage = player.stats.strength + player.stats.power;
  const weaponBonus = player.equippedItems.weapon?.statBonus?.strength || 0;
  const totalAttack = baseDamage + weaponBonus;
  
  // Defense reduces damage - each point of defense reduces 1 damage
  // Minimum 1 damage to prevent 0-damage attacks
  const damageAfterDefense = Math.max(1, totalAttack - enemyDefense);
  
  const variance = Math.random() * 0.2 + 0.9; // 90-110% damage variance
  
  return Math.floor(damageAfterDefense * variance);
};

// Calculate player's defense value
export const calculatePlayerDefense = (player: PlayerCharacter): number => {
  const armorBonus = player.equippedItems.armor?.statBonus?.endurance || 0;
  const defenseStat = player.stats.endurance + armorBonus;
  
  // Defense directly reduces incoming damage
  return defenseStat;
};
