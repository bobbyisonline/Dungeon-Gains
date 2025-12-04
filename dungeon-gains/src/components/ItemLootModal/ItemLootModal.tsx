import type { Item } from '../../types';
import { ItemIcon } from '../ItemSprite';
import './ItemLootModal.css';

interface ItemLootModalProps {
  item: Item;
  onClose: () => void;
}

export const ItemLootModal = ({ item, onClose }: ItemLootModalProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#9ca3af';
      case 'rare': return '#3b82f6';
      case 'legendary': return '#f59e0b';
      default: return '#9ca3af';
    }
  };

  const formatStatBonus = (statBonus?: Partial<Record<string, number>>) => {
    if (!statBonus) return [];
    return Object.entries(statBonus).map(([stat, value]) => ({
      stat: stat.charAt(0).toUpperCase() + stat.slice(1),
      value: `+${value}`
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="item-loot-modal" onClick={(e) => e.stopPropagation()}>
        <div className="loot-flash"></div>
        
        <h2 className="loot-title">You found a treasure!</h2>
        
        <div className="loot-item-display">
          <ItemIcon 
            icon={item.icon}
            spriteSheet={item.spriteSheet}
            spriteIndex={item.spriteIndex}
            size="large"
            className="loot-sprite"
          />
        </div>

        <h3 
          className="loot-item-name" 
          style={{ color: getRarityColor(item.rarity) }}
        >
          {item.name}
        </h3>
        
        <div className="loot-rarity-badge" style={{ 
          background: getRarityColor(item.rarity),
          boxShadow: `0 0 20px ${getRarityColor(item.rarity)}80`
        }}>
          {item.rarity.toUpperCase()}
        </div>

        <p className="loot-description">{item.description}</p>

        {item.statBonus && (
          <div className="loot-stats">
            <h4>Stat Bonuses:</h4>
            <div className="stat-bonuses-grid">
              {formatStatBonus(item.statBonus).map((bonus, idx) => (
                <div key={idx} className="stat-bonus-item">
                  <span className="bonus-stat">{bonus.stat}</span>
                  <span className="bonus-value">{bonus.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={onClose} className="rs-button loot-continue-btn">
          Continue ⚔️
        </button>
      </div>
    </div>
  );
};
