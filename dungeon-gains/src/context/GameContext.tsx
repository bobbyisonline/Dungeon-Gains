import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useUser } from '@clerk/clerk-react';
import type { GameState, WorkoutLog, Item } from '../types';
import { saveGame, loadGame, createNewPlayer } from '../utils/storage';
import { generateDungeon } from '../utils/dungeonGenerator';
import {
  checkLevelUp,
  calculateMaxHealth,
  checkForPR,
  getBaseExerciseId
} from '../utils/gameLogic';interface GameContextType {
  gameState: GameState | null;
  isLoadingGame: boolean;
  createCharacter: (name: string, bench: number, squat: number, ohp: number, mileTime: number) => void;
  logWorkout: (workout: WorkoutLog) => void;
  startDungeon: () => void;
  completeDungeon: (remainingHealth: number, enemiesDefeated: number) => void;
  equipItem: (item: Item) => void;
  unequipItem: (slot: 'weapon' | 'armor' | 'accessory') => void;
  dropItem: (itemId: string) => void;
  useHealthPotion: () => void;
  clearLevelUpInfo: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoadingGame, setIsLoadingGame] = useState(true);

  // Generate or retrieve unique guest ID for this browser
  const getGuestId = (): string => {
    const GUEST_ID_KEY = 'dungeon_gains_guest_id';
    let guestId = localStorage.getItem(GUEST_ID_KEY);
    
    if (!guestId) {
      // Generate a unique guest ID (simple UUID-like string)
      guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem(GUEST_ID_KEY, guestId);
    }
    
    return guestId;
  };

  // Load game when user is loaded (or immediately for guest mode)
  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    
    setIsLoadingGame(true);
    
    const loadUserGame = async () => {
      // Use unique guest ID if no user is signed in
      const userId = user?.id || getGuestId();
      const saved = await loadGame(userId);
      if (saved) {
        // Check for 24-hour health restoration
        const player = saved.player;
        const now = new Date().toISOString();
        const lastRestore = player.lastHealthRestoreTime ? new Date(player.lastHealthRestoreTime) : null;
        
        if (lastRestore && (new Date(now).getTime() - lastRestore.getTime()) >= 24 * 60 * 60 * 1000) {
          // 24 hours have passed, restore health
          player.health = player.maxHealth;
          player.lastHealthRestoreTime = now;
        } else if (!lastRestore) {
          // First time loading, set timestamp
          player.lastHealthRestoreTime = now;
        }
        
        // Initialize healthPotions if not present
        if (player.healthPotions === undefined) {
          player.healthPotions = 0;
        }
        
        setGameState(saved);
      }
      setIsLoadingGame(false);
    };
    
    loadUserGame();
  }, [isLoaded, user]);

  // Save game whenever state changes (with debounce to avoid too many saves)
  useEffect(() => {
    if (gameState) {
      const saveTimeout = setTimeout(() => {
        // Use unique guest ID if no user is signed in
        const userId = user?.id || getGuestId();
        saveGame(gameState, userId).catch(err => 
          console.error('Failed to save game:', err)
        );
      }, 500); // Debounce saves by 500ms

      return () => clearTimeout(saveTimeout);
    }
  }, [gameState, user]);

  const createCharacter = (name: string, bench: number, squat: number, ohp: number, mileTime: number) => {
    const player = createNewPlayer(name, bench, squat, ohp, mileTime);
    setGameState({
      player,
      currentDungeon: null,
      availableDungeons: 1, // Start with 1 free dungeon run for onboarding
    });
  };

  const logWorkout = (workout: WorkoutLog) => {
    if (!gameState) return;

    const updatedPlayer = { ...gameState.player };
    
    // Initialize healthPotions if not present
    if (updatedPlayer.healthPotions === undefined) {
      updatedPlayer.healthPotions = 0;
    }
    
    // Check for 24-hour health restoration
    const now = new Date().toISOString();
    const lastRestore = updatedPlayer.lastHealthRestoreTime ? new Date(updatedPlayer.lastHealthRestoreTime) : null;
    
    if (lastRestore && (new Date(now).getTime() - lastRestore.getTime()) >= 24 * 60 * 60 * 1000) {
      // 24 hours have passed, restore health
      updatedPlayer.health = updatedPlayer.maxHealth;
      updatedPlayer.lastHealthRestoreTime = now;
    } else if (!lastRestore) {
      updatedPlayer.lastHealthRestoreTime = now;
    }
    
    // Check for PRs and award health potions
    let earnedPotions = 0;
    workout.exercises.forEach(exercise => {
      const isPR = checkForPR(exercise, updatedPlayer.personalRecords);
      
      if (isPR) {
        // Record the PR using base exercise ID
        const baseId = getBaseExerciseId(exercise.id);
        const prValue = exercise.category === 'cardio' ? exercise.time! : exercise.weight!;
        updatedPlayer.personalRecords[baseId] = {
          exerciseId: baseId,
          value: prValue,
          date: workout.date,
        };
        
        // Award health potion for PR (no stat buff)
        earnedPotions++;
      }
    });
    
    if (earnedPotions > 0) {
      updatedPlayer.healthPotions = (updatedPlayer.healthPotions || 0) + earnedPotions;
    }

    // Add workout log
    updatedPlayer.workoutLogs.push(workout);

    // Grant a dungeon run
    const newAvailableDungeons = gameState.availableDungeons + (workout.completed ? 1 : 0);

    setGameState({
      ...gameState,
      player: updatedPlayer,
      availableDungeons: newAvailableDungeons,
    });
  };

  const startDungeon = () => {
    if (!gameState || gameState.availableDungeons <= 0) return;

    // Scale difficulty based on player level (difficulty = 1-9), capped at level 25
    // At level 25, difficulty = 9 (keeps final content challenging but beatable)
    const difficulty = Math.min(1 + Math.floor((Math.min(gameState.player.stats.level, 25) - 1) / 3), 9);
    const playerStamina = gameState.player.stats.stamina + (gameState.player.equippedItems.accessory?.statBonus?.stamina || 0);
    const dungeon = generateDungeon(difficulty, playerStamina);

    setGameState({
      ...gameState,
      currentDungeon: dungeon,
      availableDungeons: gameState.availableDungeons - 1,
    });
  };

  const completeDungeon = (remainingHealth: number, enemiesDefeated: number) => {
    if (!gameState) return;

    const updatedPlayer = { ...gameState.player };
    const oldStats = { ...updatedPlayer.stats };
    
    // Update player health to what they had when leaving dungeon
    updatedPlayer.health = Math.max(0, Math.min(remainingHealth, updatedPlayer.maxHealth));
    
    // Award XP based on enemies defeated and health remaining
    const baseXP = enemiesDefeated * 20;
    const healthBonus = Math.floor((remainingHealth / updatedPlayer.maxHealth) * 30);
    const totalXP = baseXP + healthBonus;
    
    updatedPlayer.stats.experience += totalXP;
    
    let levelUpInfo = undefined;
    
    // Check for level up
    const levelCheck = checkLevelUp(updatedPlayer.stats.level, updatedPlayer.stats.experience);
    if (levelCheck.leveledUp) {
      updatedPlayer.stats.level = levelCheck.newLevel;
      updatedPlayer.stats.experience = Math.max(0, updatedPlayer.stats.experience - levelCheck.xpForNextLevel);
      
      // Increase all stats on level up
      updatedPlayer.stats.strength += 1;
      updatedPlayer.stats.power += 1;
      updatedPlayer.stats.endurance += 1;
      updatedPlayer.stats.stamina += 1;
      
      // Also update base stats
      updatedPlayer.baseStats.strength += 1;
      updatedPlayer.baseStats.power += 1;
      updatedPlayer.baseStats.endurance += 1;
      updatedPlayer.baseStats.stamina += 1;
      
      // Update max health on level up
      const newMaxHealth = calculateMaxHealth(updatedPlayer.stats);
      updatedPlayer.maxHealth = newMaxHealth;
      updatedPlayer.health = newMaxHealth; // Heal on level up
      
      // Store level up info for modal
      levelUpInfo = {
        newLevel: levelCheck.newLevel,
        oldStats,
        newStats: { ...updatedPlayer.stats }
      };
    }

    // Mark first dungeon as completed (disables tutorial protection)
    if (!updatedPlayer.firstDungeonCompleted) {
      updatedPlayer.firstDungeonCompleted = true;
    }

    setGameState({
      ...gameState,
      player: updatedPlayer,
      currentDungeon: null,
      levelUpInfo,
    });
  };

  const equipItem = (item: Item) => {
    if (!gameState) return;

    const updatedPlayer = { ...gameState.player };
    const slot = item.type === 'weapon' ? 'weapon' : item.type === 'armor' ? 'armor' : 'accessory';

    // Unequip current item in slot if exists
    if (updatedPlayer.equippedItems[slot]) {
      updatedPlayer.inventory.push(updatedPlayer.equippedItems[slot]!);
    }

    // Equip new item
    updatedPlayer.equippedItems[slot] = item;
    updatedPlayer.inventory = updatedPlayer.inventory.filter(i => i.id !== item.id);

    setGameState({
      ...gameState,
      player: updatedPlayer,
    });
  };

  const unequipItem = (slot: 'weapon' | 'armor' | 'accessory') => {
    if (!gameState) return;

    const updatedPlayer = { ...gameState.player };
    const item = updatedPlayer.equippedItems[slot];

    if (item) {
      updatedPlayer.inventory.push(item);
      delete updatedPlayer.equippedItems[slot];

      setGameState({
        ...gameState,
        player: updatedPlayer,
      });
    }
  };

  const useHealthPotion = () => {
    if (!gameState || !gameState.player.healthPotions || gameState.player.healthPotions <= 0) return;
    
    const updatedPlayer = { ...gameState.player };
    const healAmount = Math.floor(updatedPlayer.maxHealth * 0.5);
    updatedPlayer.health = Math.min(updatedPlayer.maxHealth, updatedPlayer.health + healAmount);
    updatedPlayer.healthPotions = Math.max(0, (updatedPlayer.healthPotions || 0) - 1);
    
    setGameState({
      ...gameState,
      player: updatedPlayer,
    });
  };

  const clearLevelUpInfo = () => {
    if (!gameState) return;
    setGameState({
      ...gameState,
      levelUpInfo: undefined,
    });
  };

  const dropItem = (itemId: string) => {
    if (!gameState) return;

    const updatedPlayer = {
      ...gameState.player,
      inventory: gameState.player.inventory.filter(item => item.id !== itemId)
    };

    const newState = {
      ...gameState,
      player: updatedPlayer
    };

    setGameState(newState);
    if (user) {
      saveGame(newState, user.id).catch(err => 
        console.error('Failed to save game:', err)
      );
    }
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        isLoadingGame,
        createCharacter,
        logWorkout,
        startDungeon,
        completeDungeon,
        equipItem,
        unequipItem,
        dropItem,
        useHealthPotion,
        clearLevelUpInfo,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
