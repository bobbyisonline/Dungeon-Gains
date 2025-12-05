import { useState, useEffect } from 'react';
import type { CharacterStats } from '../../types';
import './LevelUpModal.css';

interface LevelUpModalProps {
  newLevel: number;
  oldStats: CharacterStats;
  newStats: CharacterStats;
  onClose: () => void;
}

export const LevelUpModal = ({ newLevel, oldStats, newStats, onClose }: LevelUpModalProps) => {
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const statChanges = [
    { name: 'Strength', old: oldStats.strength, new: newStats.strength, icon: '💪' },
    { name: 'Power', old: oldStats.power, new: newStats.power, icon: '⚡' },
    { name: 'Endurance', old: oldStats.endurance, new: newStats.endurance, icon: '🛡️' },
    { name: 'Stamina', old: oldStats.stamina, new: newStats.stamina, icon: '🏃' },
  ];

  // Check if a new dungeon level was unlocked (every 3 levels starting at 4)
  const oldLevel = newLevel - 1;
  const oldDungeonLevel = Math.min(1 + Math.floor((oldLevel - 1) / 3), 9);
  const newDungeonLevel = Math.min(1 + Math.floor((newLevel - 1) / 3), 9);
  const dungeonLevelUnlocked = newDungeonLevel > oldDungeonLevel;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="level-up-modal" onClick={(e) => e.stopPropagation()}>
        <div className="level-up-burst"></div>
        
        <div className="level-up-header">
          <h2 className="level-up-title">🎉 LEVEL UP! 🎉</h2>
          <div className="new-level-badge">
            Level {newLevel}
          </div>
        </div>

        <div className="level-up-message">
          Congratulations! You've grown stronger!
        </div>

        {showStats && (
          <div className="stats-changes">
            {statChanges.map((stat, idx) => {
              const increased = stat.new > stat.old;
              return (
                <div 
                  key={stat.name} 
                  className="stat-change-row"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <span className="stat-icon">{stat.icon}</span>
                  <span className="stat-name">{stat.name}</span>
                  <div className="stat-values">
                    <span className="old-value">{stat.old}</span>
                    <span className="arrow">→</span>
                    <span className="new-value">{stat.new}</span>
                    {increased && (
                      <span className="stat-increase">+{stat.new - stat.old}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="health-restore-notice">
          ❤️ Health Fully Restored!
        </div>

        {dungeonLevelUnlocked && (
          <div className="dungeon-unlock-notice">
            <div className="dungeon-unlock-icon">🏰</div>
            <div className="dungeon-unlock-text">
              <strong>New Dungeon Level Unlocked!</strong>
              <p>Dungeon Level {newDungeonLevel} is now available. Tougher enemies and better loot await!</p>
            </div>
          </div>
        )}

        <button onClick={onClose} className="rs-button level-up-continue-btn">
          Continue Your Journey ⚔️
        </button>
      </div>
    </div>
  );
};
