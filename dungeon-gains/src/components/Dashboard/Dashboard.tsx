import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { ItemIcon } from '../ItemSprite';
import { LevelUpModal } from '../LevelUpModal/LevelUpModal';
import { ProgressChart } from '../ProgressChart/ProgressChart';
import '../../styles/runescape.css';
import './Dashboard.css';

export const Dashboard = () => {
  const { gameState, startDungeon, equipItem, unequipItem, dropItem, useHealthPotion, clearLevelUpInfo } = useGame();
  const [showInventory, setShowInventory] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Check for level-up modal
  useEffect(() => {
    if (gameState?.levelUpInfo) {
      setShowLevelUp(true);
    }
  }, [gameState?.levelUpInfo]);

  if (!gameState) return null;

  const { player, availableDungeons } = gameState;
  const xpForNextLevel = player.stats.level * 100;
  const xpProgress = (player.stats.experience / xpForNextLevel) * 100;

  // Calculate equipment bonuses
  const equipmentBonus = {
    strength: 0,
    power: 0,
    endurance: 0,
    stamina: 0,
  };

  Object.values(player.equippedItems).forEach(item => {
    if (item?.statBonus) {
      Object.entries(item.statBonus).forEach(([stat, bonus]) => {
        if (stat in equipmentBonus) {
          equipmentBonus[stat as keyof typeof equipmentBonus] += bonus;
        }
      });
    }
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>⚔️ {player.name}'s Adventure ⚔️</h1>
        <div className="level-badge">Level {player.stats.level}</div>
      </div>

      <div className="dashboard-grid">
        {/* Character Stats */}
        <div className="card stats-card">
          <h2>📊 Character Stats</h2>
          <div className="stats-list">
            <div className="stat-item">
              <span className="stat-icon">💪</span>
              <div className="stat-details">
                <span className="stat-name">Strength</span>
                <span className="stat-value">
                  {player.stats.strength + equipmentBonus.strength}
                  {equipmentBonus.strength > 0 && (
                    <span className="stat-bonus-text"> (+{equipmentBonus.strength})</span>
                  )}
                </span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⚡</span>
              <div className="stat-details">
                <span className="stat-name">Power</span>
                <span className="stat-value">
                  {player.stats.power + equipmentBonus.power}
                  {equipmentBonus.power > 0 && (
                    <span className="stat-bonus-text"> (+{equipmentBonus.power})</span>
                  )}
                </span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🛡️</span>
              <div className="stat-details">
                <span className="stat-name">Endurance</span>
                <span className="stat-value">
                  {player.stats.endurance + equipmentBonus.endurance}
                  {equipmentBonus.endurance > 0 && (
                    <span className="stat-bonus-text"> (+{equipmentBonus.endurance})</span>
                  )}
                </span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🏃</span>
              <div className="stat-details">
                <span className="stat-name">Stamina</span>
                <span className="stat-value">
                  {player.stats.stamina + equipmentBonus.stamina}
                  {equipmentBonus.stamina > 0 && (
                    <span className="stat-bonus-text"> (+{equipmentBonus.stamina})</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="xp-section">
            <div className="xp-bar">
              <div className="xp-fill" style={{ width: `${xpProgress}%` }}></div>
            </div>
            <p className="xp-text">{player.stats.experience} / {xpForNextLevel} XP</p>
          </div>
        </div>

        {/* Equipped Items */}
        <div className="card equipped-card">
          <h2>⚔️ Equipment</h2>
          <div className="equipment-slots">
            <div className="equipment-slot">
              <span className="slot-label">Weapon</span>
              {player.equippedItems.weapon ? (
                <div className="equipped-item">
                  <ItemIcon 
                    icon={player.equippedItems.weapon.icon}
                    spriteSheet={player.equippedItems.weapon.spriteSheet}
                    spriteIndex={player.equippedItems.weapon.spriteIndex}
                    size="small"
                    className="item-icon"
                  />
                  <div className="item-details">
                    <span className="item-name">{player.equippedItems.weapon.name}</span>
                    <button 
                      onClick={() => unequipItem('weapon')} 
                      className="btn-unequip"
                      title="Unequip"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="empty-slot">Empty</div>
              )}
            </div>
            <div className="equipment-slot">
              <span className="slot-label">Armor</span>
              {player.equippedItems.armor ? (
                <div className="equipped-item">
                  <ItemIcon 
                    icon={player.equippedItems.armor.icon}
                    spriteSheet={player.equippedItems.armor.spriteSheet}
                    spriteIndex={player.equippedItems.armor.spriteIndex}
                    size="small"
                    className="item-icon"
                  />
                  <div className="item-details">
                    <span className="item-name">{player.equippedItems.armor.name}</span>
                    <button 
                      onClick={() => unequipItem('armor')} 
                      className="btn-unequip"
                      title="Unequip"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="empty-slot">Empty</div>
              )}
            </div>
            <div className="equipment-slot">
              <span className="slot-label">Accessory</span>
              {player.equippedItems.accessory ? (
                <div className="equipped-item">
                  <ItemIcon 
                    icon={player.equippedItems.accessory.icon}
                    spriteSheet={player.equippedItems.accessory.spriteSheet}
                    spriteIndex={player.equippedItems.accessory.spriteIndex}
                    size="small"
                    className="item-icon"
                  />
                  <div className="item-details">
                    <span className="item-name">{player.equippedItems.accessory.name}</span>
                    <button 
                      onClick={() => unequipItem('accessory')} 
                      className="btn-unequip"
                      title="Unequip"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="empty-slot">Empty</div>
              )}
            </div>
          </div>
          <button 
            onClick={() => setShowInventory(true)} 
            className="rs-button"
            style={{ marginTop: '1rem', width: '100%', padding: '0.75rem', fontSize: '1.2rem' }}
          >
            🎒 Open Inventory ({player.inventory.length})
          </button>
        </div>

        {/* Health & Potions */}
        <div className="card health-card">
          <h2>❤️ Health & Potions</h2>
          <div className="health-section">
            <div className="health-bar-container">
              <div className="health-bar">
                <div 
                  className="health-fill" 
                  style={{ width: `${(player.health / player.maxHealth) * 100}%` }}
                ></div>
              </div>
              <p className="health-text">{player.health} / {player.maxHealth} HP</p>
            </div>
            
            <div className="potions-section">
              <div className="info-row">
                <span>🧪 Health Potions:</span>
                <strong>{player.healthPotions || 0}</strong>
              </div>
              <button 
                onClick={useHealthPotion} 
                className="rs-button"
                disabled={!player.healthPotions || player.healthPotions <= 0 || player.health >= player.maxHealth}
                style={{ marginTop: '0.5rem', width: '100%' }}
              >
                Use Potion (Restore 50% HP)
              </button>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#888' }}>
                💡 Earn potions by setting PRs!
              </p>
            </div>
          </div>
        </div>

        {/* Dungeon Status */}
        <div className="card dungeon-card">
          <h2>🏰 Dungeon Status</h2>
          <div className="dungeon-info">
            <div className="info-row">
              <span>Available Runs:</span>
              <strong className="highlight">{availableDungeons}</strong>
            </div>
            <div className="info-row">
              <span>Workouts Logged:</span>
              <strong>{player.workoutLogs.length}</strong>
            </div>
            <div className="info-row">
              <span>Total PRs:</span>
              <strong>{Object.keys(player.personalRecords).length}</strong>
            </div>
          </div>
          
          {availableDungeons > 0 ? (
            <button onClick={startDungeon} className="btn-dungeon">
              🗝️ Enter Dungeon
            </button>
          ) : (
            <div className="locked-message">
              Complete a workout to unlock a dungeon run!
            </div>
          )}
        </div>

        {/* Progress Chart */}
        <ProgressChart />
      </div>

      {/* Inventory Modal */}
      {showInventory && (
        <div className="inventory-modal">
          <div className="modal-content rs-panel">
            <div className="modal-header">
              <h3 className="rs-text-gold">🎒 Inventory</h3>
              <button onClick={() => setShowInventory(false)} className="btn-close">×</button>
            </div>

            {player.inventory.length === 0 ? (
              <p className="empty-inventory">Your inventory is empty. Complete dungeons to collect loot!</p>
            ) : (
              <div className="inventory-grid">
                {player.inventory.map((item, idx) => (
                  <div key={idx} className={`inventory-item rarity-${item.rarity}`}>
                    <div className="item-header">
                      <ItemIcon 
                        icon={item.icon}
                        spriteSheet={item.spriteSheet}
                        spriteIndex={item.spriteIndex}
                        size="large"
                        className="item-icon-large"
                      />
                      <div className="item-info-block">
                        <span className="item-name-large">{item.name}</span>
                        <span className={`item-rarity rarity-${item.rarity}`}>{item.rarity}</span>
                        <span className="item-type">{item.type}</span>
                      </div>
                    </div>
                    <p className="item-description">{item.description}</p>
                    {item.statBonus && (
                      <div className="item-stats">
                        {Object.entries(item.statBonus).map(([stat, bonus]) => (
                          <span key={stat} className="stat-bonus">
                            +{bonus} {stat}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <button 
                        onClick={() => {
                          equipItem(item);
                          setShowInventory(false);
                        }} 
                        className="rs-button rs-button-primary"
                        style={{ flex: 1, padding: '0.5rem', fontSize: '1.1rem' }}
                      >
                        ⚔️ Equip
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Drop ${item.name}? This action cannot be undone!`)) {
                            dropItem(item.id);
                          }
                        }} 
                        className="rs-button"
                        style={{ padding: '0.5rem', fontSize: '1.1rem', background: '#8B0000', borderColor: '#660000' }}
                        title="Drop item permanently"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Level Up Modal */}
      {showLevelUp && gameState?.levelUpInfo && (
        <LevelUpModal
          newLevel={gameState.levelUpInfo.newLevel}
          oldStats={gameState.levelUpInfo.oldStats}
          newStats={gameState.levelUpInfo.newStats}
          onClose={() => {
            setShowLevelUp(false);
            clearLevelUpInfo();
          }}
        />
      )}
    </div>
  );
};
