import { useState, useEffect } from 'react';
import { DEMO_GAME_STATE } from '../../data/demoHero';
import { ItemIcon } from '../ItemSprite';
import '../../styles/runescape.css';
import '../Dashboard/Dashboard.css';
import './DemoDashboard.css';

// Stat tooltip descriptions
const STAT_TOOLTIPS: Record<string, { title: string; description: string }> = {
  strength: { title: '💪 Strength', description: 'Direct attack damage - each point adds 1 damage' },
  power: { title: '⚡ Power', description: 'Critical hit chance - 5% per point (crits deal 75% more damage)' },
  endurance: { title: '🛡️ Endurance', description: 'Max health and defense - adds 5 HP and 1 defense per point' },
  stamina: { title: '🏃 Stamina', description: 'Defense and dungeon efficiency - reduces empty rooms, increases treasure chance' },
};

interface DemoDashboardProps {
  onStartTour: () => void;
}

export const DemoDashboard = ({ onStartTour }: DemoDashboardProps) => {
  const [activeStatTooltip, setActiveStatTooltip] = useState<string | null>(null);
  
  const { player, availableDungeons } = DEMO_GAME_STATE;
  const xpForNextLevel = Math.floor(150 * Math.pow(player.stats.level, 1.5));
  const xpProgress = (player.stats.experience / xpForNextLevel) * 100;

  // Start tour automatically after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onStartTour();
    }, 800);
    return () => clearTimeout(timer);
  }, [onStartTour]);

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
          equipmentBonus[stat as keyof typeof equipmentBonus] += bonus as number;
        }
      });
    }
  });

  return (
    <>
      {/* Demo Navigation - matches real layout */}
      <nav className="main-nav" style={{ borderTop: 'none' }}>
        <div className="nav-links">
          <button className="active">🏠 Dashboard</button>
          <button disabled title="Demo mode">💪 Log Workout</button>
          <button disabled title="Demo mode">📅 History</button>
          <button disabled title="Demo mode" className="feedback-btn">📝 Feedback</button>
        </div>
      </nav>

      <main className="main-content">
        <div className="dashboard">
          {/* Dashboard Header - matches real Dashboard */}
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

            {/* Equipped Items - matches real Dashboard */}
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
                      </div>
                    </div>
                  ) : (
                    <div className="empty-slot">Empty</div>
                  )}
                </div>
              </div>
              <button 
                className="rs-button"
                disabled
                style={{ marginTop: '1rem', width: '100%', padding: '0.75rem', fontSize: '1.2rem', opacity: 0.6 }}
              >
                🎒 Open Inventory ({player.inventory.length})
              </button>
            </div>

            {/* Health & Potions - matches real Dashboard */}
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
                    className="rs-button"
                    disabled
                    style={{ marginTop: '0.5rem', width: '100%', opacity: 0.6 }}
                  >
                    Use Potion (Restore 50% HP)
                  </button>
                  <p style={{ fontSize: '1.15rem', marginTop: '0.75rem', color: '#10b981', fontWeight: 700 }}>
                    💡 Earn potions by setting PRs!
                  </p>
                </div>
              </div>
            </div>

            {/* Dungeon Status - matches real Dashboard */}
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
                  <strong>3</strong>
                </div>
              </div>
              
              {availableDungeons > 0 ? (
                <button className="btn-dungeon" disabled style={{ opacity: 0.8 }}>
                  🗝️ Enter Dungeon (Demo)
                </button>
              ) : (
                <div className="locked-message">
                  Complete a workout to unlock a dungeon run!
                </div>
              )}
            </div>

            {/* Demo Progress Chart Placeholder */}
            <div className="card progress-card">
              <h2>📈 Progress Over Time</h2>
              <div className="demo-chart-placeholder">
                <div className="chart-bars">
                  <div className="chart-bar" style={{ height: '40%' }}></div>
                  <div className="chart-bar" style={{ height: '55%' }}></div>
                  <div className="chart-bar" style={{ height: '45%' }}></div>
                  <div className="chart-bar" style={{ height: '70%' }}></div>
                  <div className="chart-bar" style={{ height: '65%' }}></div>
                  <div className="chart-bar" style={{ height: '80%' }}></div>
                  <div className="chart-bar" style={{ height: '75%' }}></div>
                </div>
                <p className="chart-label">Your workout progress will appear here!</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
