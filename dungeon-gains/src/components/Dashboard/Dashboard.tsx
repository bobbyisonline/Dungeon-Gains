import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { ItemIcon } from '../ItemSprite';
import { LevelUpModal } from '../LevelUpModal/LevelUpModal';
import { ProgressChart } from '../ProgressChart/ProgressChart';
import { Toast } from '../Toast/Toast';
import '../../styles/runescape.css';
import './Dashboard.css';

// Stat tooltip descriptions
const STAT_TOOLTIPS: Record<string, { title: string; description: string }> = {
  strength: { title: '💪 Strength', description: 'Direct attack damage - each point adds 1 damage' },
  power: { title: '⚡ Power', description: 'Critical hit chance - 5% per point (crits deal 75% more damage)' },
  endurance: { title: '🛡️ Endurance', description: 'Max health and defense - adds 5 HP and 1 defense per point' },
  stamina: { title: '🏃 Stamina', description: 'Defense and dungeon efficiency - reduces empty rooms, increases treasure chance' },
};

export const Dashboard = () => {
  const { gameState, startDungeon, equipItem, unequipItem, dropItem, useHealthPotion, clearLevelUpInfo } = useGame();
  const [showInventory, setShowInventory] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [selectedEquippedItem, setSelectedEquippedItem] = useState<any>(null);
  const [compareItem, setCompareItem] = useState<any>(null);
  const [inventorySortBy, setInventorySortBy] = useState<'name' | 'rarity' | 'type'>('name');
  const [activeStatTooltip, setActiveStatTooltip] = useState<string | null>(null);
  const [showWelcomeToast, setShowWelcomeToast] = useState(() => {
    // Show welcome toast only if user hasn't seen it
    return !localStorage.getItem('dungeon_gains_welcome_toast_seen');
  });
  const [tutorialClosed, setTutorialClosed] = useState(() => {
    // Check if tutorial has been closed
    return !!localStorage.getItem('dungeon_gains_tutorial_seen');
  });

  // Listen for tutorial being closed (check periodically since it's managed in App.tsx)
  useEffect(() => {
    if (!tutorialClosed) {
      const checkTutorial = setInterval(() => {
        if (localStorage.getItem('dungeon_gains_tutorial_seen')) {
          setTutorialClosed(true);
          clearInterval(checkTutorial);
        }
      }, 500);
      return () => clearInterval(checkTutorial);
    }
  }, [tutorialClosed]);

  // Check for level-up modal
  useEffect(() => {
    if (gameState?.levelUpInfo) {
      setShowLevelUp(true);
    }
  }, [gameState?.levelUpInfo]);

  if (!gameState) return null;
  
  const { player, availableDungeons } = gameState;
  
  // Determine if we should show the welcome toast (only after tutorial is closed)
  const shouldShowWelcomeToast = showWelcomeToast && 
    tutorialClosed &&
    !player.firstDungeonCompleted && 
    availableDungeons > 0;

  const handleWelcomeToastClose = () => {
    localStorage.setItem('dungeon_gains_welcome_toast_seen', 'true');
    setShowWelcomeToast(false);
  };

  const handleWelcomeToastAction = () => {
    localStorage.setItem('dungeon_gains_welcome_toast_seen', 'true');
    setShowWelcomeToast(false);
    startDungeon();
  };
  const xpForNextLevel = Math.floor(150 * Math.pow(player.stats.level, 1.5));
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
                <button 
                  className="stat-name stat-name-btn" 
                  title="Direct attack damage - each point adds 1 damage"
                  onClick={() => setActiveStatTooltip(activeStatTooltip === 'strength' ? null : 'strength')}
                >
                  Strength ℹ️
                </button>
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
                <button 
                  className="stat-name stat-name-btn" 
                  title="Critical hit chance - 5% per point (crits deal 75% more damage)"
                  onClick={() => setActiveStatTooltip(activeStatTooltip === 'power' ? null : 'power')}
                >
                  Power ℹ️
                </button>
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
                <button 
                  className="stat-name stat-name-btn" 
                  title="Max health and defense - adds 5 HP and 1 defense per point"
                  onClick={() => setActiveStatTooltip(activeStatTooltip === 'endurance' ? null : 'endurance')}
                >
                  Endurance ℹ️
                </button>
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
                <button 
                  className="stat-name stat-name-btn" 
                  title="Defense and dungeon efficiency - reduces empty rooms, increases treasure chance"
                  onClick={() => setActiveStatTooltip(activeStatTooltip === 'stamina' ? null : 'stamina')}
                >
                  Stamina ℹ️
                </button>
                <span className="stat-value">
                  {player.stats.stamina + equipmentBonus.stamina}
                  {equipmentBonus.stamina > 0 && (
                    <span className="stat-bonus-text"> (+{equipmentBonus.stamina})</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Stat Tooltip Popup */}
          {activeStatTooltip && STAT_TOOLTIPS[activeStatTooltip] && (
            <div className="stat-tooltip-popup" onClick={() => setActiveStatTooltip(null)}>
              <div className="stat-tooltip-content">
                <strong>{STAT_TOOLTIPS[activeStatTooltip].title}</strong>
                <p>{STAT_TOOLTIPS[activeStatTooltip].description}</p>
                <span className="tap-dismiss">Tap to dismiss</span>
              </div>
            </div>
          )}

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
                    onClick={() => setSelectedEquippedItem(player.equippedItems.weapon)}
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
                    onClick={() => setSelectedEquippedItem(player.equippedItems.armor)}
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
                    onClick={() => setSelectedEquippedItem(player.equippedItems.accessory)}
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
              <p style={{ fontSize: '1.15rem', marginTop: '0.75rem', color: '#10b981', fontWeight: 700 }}>
                💡 Earn potions by setting PRs!
              </p>
              <p style={{ fontSize: '1rem', marginTop: '0.5rem', color: '#ffd700', fontWeight: 600 }}>
                Ran out of health in the dastardly dungeons?<br />
                Good news – your health will automatically restore at the beginning of each day. Get back out there!
              </p>
            </div>
          </div>
        </div>

        {/* Dungeon Status */}
        <div className={`card dungeon-card ${availableDungeons > 0 ? 'has-runs' : ''}`}>
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
              <strong>
                {(() => {
                  // Count PRs that have been earned (exist in workout logs)
                  if (player.workoutLogs.length === 0) return 0;
                  
                  const prExerciseIds = new Set<string>();
                  player.workoutLogs.forEach(log => {
                    log.exercises.forEach(exercise => {
                      const pr = player.personalRecords[exercise.id];
                      if (pr) {
                        // Check if this workout matches or beats the current PR
                        const isCurrentPR = exercise.category === 'cardio'
                          ? exercise.time === pr.value
                          : exercise.weight === pr.value;
                        if (isCurrentPR) {
                          prExerciseIds.add(exercise.id);
                        }
                      }
                    });
                  });
                  
                  return prExerciseIds.size;
                })()}
              </strong>
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
              <>
                <div className="inventory-sort-controls">
                  <span style={{ color: '#cbd5e0', fontWeight: 600 }}>Sort by:</span>
                  <button 
                    onClick={() => setInventorySortBy('name')}
                    className={`sort-btn ${inventorySortBy === 'name' ? 'active' : ''}`}
                  >
                    Name
                  </button>
                  <button 
                    onClick={() => setInventorySortBy('rarity')}
                    className={`sort-btn ${inventorySortBy === 'rarity' ? 'active' : ''}`}
                  >
                    Rarity
                  </button>
                  <button 
                    onClick={() => setInventorySortBy('type')}
                    className={`sort-btn ${inventorySortBy === 'type' ? 'active' : ''}`}
                  >
                    Type
                  </button>
                </div>
                <div className="inventory-grid">
                  {(() => {
                    // Group items by name to stack duplicates
                    const itemGroups = new Map<string, { item: any; items: any[]; count: number }>();
                    player.inventory.forEach(item => {
                      const key = item.name;
                      if (itemGroups.has(key)) {
                        const group = itemGroups.get(key)!;
                        group.items.push(item);
                        group.count++;
                      } else {
                        itemGroups.set(key, { item, items: [item], count: 1 });
                      }
                    });

                    // Convert to array and sort
                    const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
                    const sortedGroups = Array.from(itemGroups.values()).sort((a, b) => {
                      if (inventorySortBy === 'rarity') {
                        const rarityDiff = (rarityOrder[b.item.rarity as keyof typeof rarityOrder] || 0) - 
                                          (rarityOrder[a.item.rarity as keyof typeof rarityOrder] || 0);
                        if (rarityDiff !== 0) return rarityDiff;
                        return a.item.name.localeCompare(b.item.name);
                      } else if (inventorySortBy === 'type') {
                        const typeDiff = a.item.type.localeCompare(b.item.type);
                        if (typeDiff !== 0) return typeDiff;
                        return a.item.name.localeCompare(b.item.name);
                      }
                      // Default: sort by name
                      return a.item.name.localeCompare(b.item.name);
                    });

                    return sortedGroups.map((group, idx) => (
                    <div key={idx} className={`inventory-item rarity-${group.item.rarity}`}>
                      <div className="item-header">
                        <ItemIcon 
                          icon={group.item.icon}
                          spriteSheet={group.item.spriteSheet}
                          spriteIndex={group.item.spriteIndex}
                          size="large"
                          className="item-icon-large"
                        />
                        <div className="item-info-block">
                          <span className="item-name-large">
                            {group.item.name}
                            {group.count > 1 && <span className="item-count"> x{group.count}</span>}
                          </span>
                          <span className={`item-rarity rarity-${group.item.rarity}`}>{group.item.rarity}</span>
                          <span className="item-type">{group.item.type}</span>
                        </div>
                      </div>
                      <p className="item-description">{group.item.description}</p>
                      {group.item.statBonus && (
                        <div className="item-stats">
                          {Object.entries(group.item.statBonus).map(([stat, bonus]) => (
                            <span key={stat} className="stat-bonus">
                              +{String(bonus)} {stat}
                            </span>
                          ))}
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button 
                          onClick={() => {
                            equipItem(group.item);
                            setShowInventory(false);
                          }} 
                          className="rs-button rs-button-primary"
                          style={{ flex: 1, padding: '0.5rem', fontSize: '1.1rem' }}
                        >
                          ⚔️ Equip
                        </button>
                        <button 
                          onClick={() => setCompareItem(group.item)} 
                          className="rs-button"
                          style={{ padding: '0.5rem', fontSize: '1.1rem', background: '#3b82f6', borderColor: '#2563eb' }}
                          title="Compare to equipped"
                          disabled={!player.equippedItems[group.item.type as 'weapon' | 'armor' | 'accessory']}
                        >
                          ⚖️
                        </button>
                        <button 
                          onClick={() => {
                            const confirmMsg = group.count > 1 
                              ? `Drop one ${group.item.name}? (You have ${group.count})`
                              : `Drop ${group.item.name}? This action cannot be undone!`;
                            if (window.confirm(confirmMsg)) {
                              dropItem(group.items[0].id);
                            }
                          }} 
                          className="rs-button"
                          style={{ padding: '0.5rem', fontSize: '1.1rem', background: '#8B0000', borderColor: '#660000' }}
                          title={group.count > 1 ? `Drop one (${group.count} total)` : 'Drop item permanently'}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ));
                })()}
              </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Equipped Item Details Modal */}
      {selectedEquippedItem && (
        <div className="inventory-modal">
          <div className="modal-content rs-panel">
            <div className="modal-header">
              <h3 className="rs-text-gold">⚔️ Equipped Item Details</h3>
              <button onClick={() => setSelectedEquippedItem(null)} className="btn-close">×</button>
            </div>

            <div className="inventory-grid">
              <div className={`inventory-item rarity-${selectedEquippedItem.rarity}`}>
                <div className="item-header">
                  <ItemIcon 
                    icon={selectedEquippedItem.icon}
                    spriteSheet={selectedEquippedItem.spriteSheet}
                    spriteIndex={selectedEquippedItem.spriteIndex}
                    size="large"
                    className="item-icon-large"
                  />
                  <div className="item-info-block">
                    <span className="item-name-large">{selectedEquippedItem.name}</span>
                    <span className={`item-rarity rarity-${selectedEquippedItem.rarity}`}>{selectedEquippedItem.rarity}</span>
                    <span className="item-type">{selectedEquippedItem.type}</span>
                  </div>
                </div>
                <p className="item-description">{selectedEquippedItem.description}</p>
                {selectedEquippedItem.statBonus && (
                  <div className="item-stats">
                    {Object.entries(selectedEquippedItem.statBonus).map(([stat, bonus]) => (
                      <span key={stat} className="stat-bonus">
                        +{String(bonus)} {stat}
                      </span>
                    ))}
                  </div>
                )}
                <button 
                  onClick={() => {
                    unequipItem(selectedEquippedItem.type as 'weapon' | 'armor' | 'accessory');
                    setSelectedEquippedItem(null);
                  }} 
                  className="rs-button"
                  style={{ marginTop: '0.5rem', width: '100%', padding: '0.5rem', fontSize: '1.1rem' }}
                >
                  Unequip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Item Comparison Modal */}
      {compareItem && (
        <div className="inventory-modal">
          <div className="modal-content rs-panel" style={{ maxWidth: '900px' }}>
            <div className="modal-header">
              <h3 className="rs-text-gold">⚖️ Item Comparison</h3>
              <button onClick={() => setCompareItem(null)} className="btn-close">×</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {/* New Item (from inventory) */}
              <div>
                <h4 style={{ textAlign: 'center', color: '#10b981', marginBottom: '1rem' }}>New Item</h4>
                <div className={`inventory-item rarity-${compareItem.rarity}`}>
                  <div className="item-header">
                    <ItemIcon 
                      icon={compareItem.icon}
                      spriteSheet={compareItem.spriteSheet}
                      spriteIndex={compareItem.spriteIndex}
                      size="large"
                      className="item-icon-large"
                    />
                    <div className="item-info-block">
                      <span className="item-name-large">{compareItem.name}</span>
                      <span className={`item-rarity rarity-${compareItem.rarity}`}>{compareItem.rarity}</span>
                      <span className="item-type">{compareItem.type}</span>
                    </div>
                  </div>
                  <p className="item-description">{compareItem.description}</p>
                  {compareItem.statBonus && (
                    <div className="item-stats">
                      {Object.entries(compareItem.statBonus).map(([stat, bonus]) => (
                        <span key={stat} className="stat-bonus">
                          +{String(bonus)} {stat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Currently Equipped Item */}
              <div>
                <h4 style={{ textAlign: 'center', color: '#ef4444', marginBottom: '1rem' }}>Currently Equipped</h4>
                {(() => {
                  const equippedItem = player.equippedItems[compareItem.type as 'weapon' | 'armor' | 'accessory'];
                  if (!equippedItem) {
                    return <p style={{ textAlign: 'center', color: '#9ca3af', marginTop: '2rem' }}>Nothing equipped</p>;
                  }
                  return (
                    <div className={`inventory-item rarity-${equippedItem.rarity}`}>
                      <div className="item-header">
                        <ItemIcon 
                          icon={equippedItem.icon}
                          spriteSheet={equippedItem.spriteSheet}
                          spriteIndex={equippedItem.spriteIndex}
                          size="large"
                          className="item-icon-large"
                        />
                        <div className="item-info-block">
                          <span className="item-name-large">{equippedItem.name}</span>
                          <span className={`item-rarity rarity-${equippedItem.rarity}`}>{equippedItem.rarity}</span>
                          <span className="item-type">{equippedItem.type}</span>
                        </div>
                      </div>
                      <p className="item-description">{equippedItem.description}</p>
                      {equippedItem.statBonus && (
                        <div className="item-stats">
                          {Object.entries(equippedItem.statBonus).map(([stat, bonus]) => (
                            <span key={stat} className="stat-bonus">
                              +{String(bonus)} {stat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button 
                onClick={() => {
                  equipItem(compareItem);
                  setCompareItem(null);
                  setShowInventory(false);
                }} 
                className="rs-button rs-button-primary"
                style={{ flex: 1, padding: '0.75rem', fontSize: '1.2rem' }}
              >
                ⚔️ Equip New Item
              </button>
              <button 
                onClick={() => setCompareItem(null)} 
                className="rs-button"
                style={{ padding: '0.75rem', fontSize: '1.2rem' }}
              >
                Cancel
              </button>
            </div>
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

      {/* Welcome Toast for new players */}
      <Toast
        show={shouldShowWelcomeToast}
        icon="🎁"
        title="Welcome Gift: Free Dungeon Pass!"
        message="Test your skills in your first dungeon crawl and earn loot!"
        buttonText="Enter Dungeon"
        onButtonClick={handleWelcomeToastAction}
        onClose={handleWelcomeToastClose}
        duration={15000}
      />
    </div>
  );
};
