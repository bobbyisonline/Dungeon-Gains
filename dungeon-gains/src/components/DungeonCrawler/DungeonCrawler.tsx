import { useState, useEffect } from 'react';
import type { Enemy, DungeonRoom, Item } from '../../types';
import { useGame } from '../../context/GameContext';
import { calculatePlayerDamage, calculateDamageReduction } from '../../utils/gameLogic';
import { collectLoot } from '../../utils/dungeonGenerator';
import { ItemIcon } from '../ItemSprite';
import './DungeonCrawler.css';

export const DungeonCrawler = () => {
  const { gameState, completeDungeon } = useGame();
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [playerHealth, setPlayerHealth] = useState(gameState?.player.health || 100);
  const [, forceUpdate] = useState({});
  
  // Dungeon stats tracking
  const [enemiesDefeated, setEnemiesDefeated] = useState(0);
  const [totalDamageDealt, setTotalDamageDealt] = useState(0);
  const [lootCollected, setLootCollected] = useState<Item[]>([]);
  const [initialized, setInitialized] = useState(false);

  if (!gameState?.currentDungeon) return null;

  const dungeon = gameState.currentDungeon;
  const currentRoom = dungeon.rooms[dungeon.currentRoomIndex];
  const player = gameState.player;

  const startBattle = (room: DungeonRoom) => {
    if (room.enemy) {
      setCurrentEnemy({ ...room.enemy });
      setBattleLog([`⚔️ A ${room.enemy.name} appears! ${room.enemy.icon}`]);
    }
  };

  // Initialize the first room on mount
  useEffect(() => {
    if (!initialized && currentRoom) {
      if (currentRoom.type === 'enemy' || currentRoom.type === 'boss') {
        startBattle(currentRoom);
      }
      setInitialized(true);
    }
  }, [initialized, currentRoom]);

  const attackEnemy = () => {
    if (!currentEnemy) return;

    // Player attacks
    const playerDmg = calculatePlayerDamage(player);
    const newEnemyHealth = Math.max(0, currentEnemy.health - playerDmg);
    
    let log = [`You deal ${playerDmg} damage!`];
    setTotalDamageDealt(prev => prev + playerDmg);

    if (newEnemyHealth <= 0) {
      log.push(`💀 ${currentEnemy.name} defeated!`);
      currentRoom.cleared = true;
      setEnemiesDefeated(prev => prev + 1);
      
      if (currentRoom.loot) {
        const items = collectLoot(currentRoom);
        player.inventory.push(...items);
        setLootCollected(prev => [...prev, ...items]);
        log.push(`✨ Found loot: ${items.map(i => i.icon + ' ' + i.name).join(', ')}`);
      }
      
      setCurrentEnemy(null);
      setBattleLog([...battleLog, ...log]);
      return;
    }

    setCurrentEnemy({ ...currentEnemy, health: newEnemyHealth });

    // Enemy attacks back
    const damageReduction = calculateDamageReduction(player);
    const enemyDmg = Math.max(1, Math.floor(currentEnemy.attack * (1 - damageReduction / 100)));
    const newPlayerHealth = Math.max(0, playerHealth - enemyDmg);
    
    log.push(`${currentEnemy.name} deals ${enemyDmg} damage!`);
    
    if (newPlayerHealth <= 0) {
      log.push('💀 You were defeated... Better luck next time!');
      // TODO: Handle game over
    }

    setPlayerHealth(newPlayerHealth);
    setBattleLog([...battleLog, ...log]);
  };

  const nextRoom = () => {
    if (dungeon.currentRoomIndex < dungeon.rooms.length - 1) {
      dungeon.currentRoomIndex++;
      setBattleLog([]);
      
      const newRoom = dungeon.rooms[dungeon.currentRoomIndex];
      if (newRoom.type === 'enemy' || newRoom.type === 'boss') {
        startBattle(newRoom);
      }
    } else {
      dungeon.completed = true;
      setBattleLog(['🎉 Dungeon Complete! Returning to town...']);
    }
  };

  const renderRoom = () => {
    if (currentEnemy) {
      return (
        <div className="battle-screen">
          <div className="enemy-display">
            <div className="enemy-icon">{currentEnemy.icon}</div>
            <h3>{currentEnemy.name}</h3>
            <div className="health-bar">
              <div 
                className="health-fill enemy" 
                style={{ width: `${(currentEnemy.health / currentEnemy.maxHealth) * 100}%` }}
              />
            </div>
            <p>{currentEnemy.health} / {currentEnemy.maxHealth} HP</p>
          </div>

          <div className="battle-actions">
            <button onClick={attackEnemy} className="btn-attack">
              ⚔️ Attack
            </button>
          </div>

          <div className="battle-log">
            {battleLog.map((log, idx) => (
              <div key={idx} className="log-entry">{log}</div>
            ))}
          </div>
        </div>
      );
    }

    if (currentRoom.type === 'treasure') {
      if (currentRoom.cleared) {
        return (
          <div className="treasure-room">
            <div className="treasure-icon">✨</div>
            <h3>Chest Opened!</h3>
            <p className="empty-state">The treasure has been claimed.</p>
          </div>
        );
      }
      return (
        <div className="treasure-room">
          <div className="treasure-icon">📦</div>
          <h3>Treasure Room!</h3>
          <button onClick={() => {
            if (currentRoom.loot) {
              const items = collectLoot(currentRoom);
              player.inventory.push(...items);
              setLootCollected(prev => [...prev, ...items]);
              alert(`Found: ${items.map(i => i.icon + ' ' + i.name).join(', ')}`);
              currentRoom.cleared = true;
              forceUpdate({}); // Force re-render to show Continue button
            }
          }} className="btn-primary">
            Open Chest
          </button>
        </div>
      );
    }

    if (currentRoom.type === 'empty') {
      // Auto-clear empty rooms
      if (!currentRoom.cleared) {
        currentRoom.cleared = true;
      }
      return (
        <div className="empty-room">
          <p>An empty room. Nothing here.</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="dungeon-crawler">
      <div className="dungeon-header">
        <h2>🏰 Dungeon Level {dungeon.difficulty}</h2>
        <div className="progress">
          Room {dungeon.currentRoomIndex + 1} / {dungeon.rooms.length}
        </div>
      </div>

      <div className="player-status">
        <div className="player-info">
          <h3>🧙 {player.name}</h3>
          <div className="health-bar">
            <div 
              className="health-fill player" 
              style={{ width: `${(playerHealth / player.maxHealth) * 100}%` }}
            />
          </div>
          <p>{playerHealth} / {player.maxHealth} HP</p>
        </div>
        
        <div className="player-stats">
          <span>💪 STR: {player.stats.strength}</span>
          <span>⚡ PWR: {player.stats.power}</span>
          <span>🛡️ END: {player.stats.endurance}</span>
          <span>🏃 STA: {player.stats.stamina}</span>
        </div>
      </div>

      <div className="room-container">
        {renderRoom()}
      </div>

      {currentRoom.cleared && !dungeon.completed && (
        <button onClick={nextRoom} className="btn-primary">
          Continue to Next Room →
        </button>
      )}

      {dungeon.completed && (
        <div className="dungeon-results rs-panel">
          <div className="results-header">
            <h2 className="rs-text-gold">🎉 Dungeon Cleared! 🎉</h2>
            <p className="results-subtitle">Victory is yours, hero!</p>
          </div>

          <div className="results-grid">
            <div className="results-section">
              <h3>⚔️ Combat Statistics</h3>
              <div className="stat-row">
                <span>Enemies Defeated:</span>
                <strong>{enemiesDefeated}</strong>
              </div>
              <div className="stat-row">
                <span>Total Damage Dealt:</span>
                <strong>{totalDamageDealt}</strong>
              </div>
              <div className="stat-row">
                <span>Rooms Cleared:</span>
                <strong>{dungeon.rooms.length}</strong>
              </div>
              <div className="stat-row">
                <span>Health Remaining:</span>
                <strong>{playerHealth} / {player.maxHealth}</strong>
              </div>
            </div>

            <div className="results-section">
              <h3>✨ Loot Acquired</h3>
              {lootCollected.length === 0 ? (
                <p className="no-loot">No loot found this run</p>
              ) : (
                <div className="loot-grid">
                  {lootCollected.map((item, idx) => (
                    <div key={idx} className={`loot-item rarity-${item.rarity}`}>
                      <ItemIcon 
                        icon={item.icon}
                        spriteSheet={item.spriteSheet}
                        spriteIndex={item.spriteIndex}
                        size="normal"
                        className="loot-icon"
                      />
                      <div className="loot-info">
                        <span className="loot-name">{item.name}</span>
                        <span className="loot-rarity">{item.rarity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="results-section rewards">
              <h3>🏆 Rewards</h3>
              <div className="reward-item">
                <span className="reward-icon">⭐</span>
                <span>Dungeon Level {dungeon.difficulty} Completed</span>
              </div>
              <div className="reward-item">
                <span className="reward-icon">📦</span>
                <span>{lootCollected.length} Items Added to Inventory</span>
              </div>
              <div className="reward-item">
                <span className="reward-icon">💎</span>
                <span>Experience Gained from Workout</span>
              </div>
            </div>
          </div>

          <button 
            onClick={completeDungeon} 
            className="rs-button rs-button-primary results-btn"
          >
            🏠 Return to Town
          </button>
        </div>
      )}
    </div>
  );
};
