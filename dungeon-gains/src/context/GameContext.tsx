import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { GameState, WorkoutLog, Item } from '../types';
import { saveGame, loadGame, createNewPlayer } from '../utils/storage';
import { generateDungeon } from '../utils/dungeonGenerator';
import { 
  calculateExperienceGain, 
  checkLevelUp, 
  calculateMaxHealth,
  checkForPR,
  calculateStatBuff,
  applyStatBuff
} from '../utils/gameLogic';

interface GameContextType {
  gameState: GameState | null;
  createCharacter: (name: string, bench: number, squat: number, ohp: number, mileTime: number) => void;
  logWorkout: (workout: WorkoutLog) => void;
  startDungeon: () => void;
  completeDungeon: () => void;
  equipItem: (item: Item) => void;
  unequipItem: (slot: 'weapon' | 'armor' | 'accessory') => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  // Load game on mount
  useEffect(() => {
    const saved = loadGame();
    if (saved) {
      setGameState(saved);
    }
  }, []);

  // Save game whenever state changes
  useEffect(() => {
    if (gameState) {
      saveGame(gameState);
    }
  }, [gameState]);

  const createCharacter = (name: string, bench: number, squat: number, ohp: number, mileTime: number) => {
    const player = createNewPlayer(name, bench, squat, ohp, mileTime);
    setGameState({
      player,
      currentDungeon: null,
      availableDungeons: 0,
    });
  };

  const logWorkout = (workout: WorkoutLog) => {
    if (!gameState) return;

    const updatedPlayer = { ...gameState.player };
    
    // Check for PRs and apply stat buffs
    workout.exercises.forEach(exercise => {
      const isPR = checkForPR(exercise, updatedPlayer.personalRecords);
      
      if (isPR) {
        // Record the PR
        const prValue = exercise.category === 'cardio' ? exercise.time! : exercise.weight!;
        updatedPlayer.personalRecords[exercise.id] = {
          exerciseId: exercise.id,
          value: prValue,
          date: workout.date,
        };
        
        // Apply stat buff
        const buff = calculateStatBuff(exercise);
        updatedPlayer.stats = applyStatBuff(updatedPlayer.stats, buff);
        updatedPlayer.baseStats = applyStatBuff(updatedPlayer.baseStats, buff);
      }
    });

    // Add experience
    const xpGain = calculateExperienceGain(workout.exercises);
    updatedPlayer.stats.experience += xpGain;

    // Check for level up
    const levelCheck = checkLevelUp(updatedPlayer.stats.level, updatedPlayer.stats.experience);
    if (levelCheck.leveledUp) {
      updatedPlayer.stats.level = levelCheck.newLevel;
      updatedPlayer.stats.experience -= levelCheck.xpForNextLevel;
      
      // Update max health on level up
      const newMaxHealth = calculateMaxHealth(updatedPlayer.stats);
      updatedPlayer.maxHealth = newMaxHealth;
      updatedPlayer.health = newMaxHealth; // Heal on level up
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

    const difficulty = Math.min(gameState.player.stats.level, 10);
    const dungeon = generateDungeon(difficulty);

    setGameState({
      ...gameState,
      currentDungeon: dungeon,
      availableDungeons: gameState.availableDungeons - 1,
    });
  };

  const completeDungeon = () => {
    if (!gameState) return;

    setGameState({
      ...gameState,
      currentDungeon: null,
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

  const resetGame = () => {
    setGameState(null);
    localStorage.removeItem('dungeon_gains_save');
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        createCharacter,
        logWorkout,
        startDungeon,
        completeDungeon,
        equipItem,
        unequipItem,
        resetGame,
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
