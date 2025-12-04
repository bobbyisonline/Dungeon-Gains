# Enemy System - Level-Based Progression

## Overview
The game now features 12 unique enemies with level-based spawning. Enemies appear based on player level, creating natural progression from weak early-game foes to powerful endgame bosses.

## Enemy Roster

### Early Game (Levels 1-8)
| Enemy | Level Range | Attack | Health | Sprite Index |
|-------|-------------|--------|--------|--------------|
| Sewer Slime | 1-5 | 1 | 20 | 0 |
| Cellar Rat | 1-6 | 2 | 30 | 1 |
| Goblin Scout | 2-8 | 3 | 40 | 2 |

### Mid-Early Game (Levels 4-15)
| Enemy | Level Range | Attack | Health | Sprite Index |
|-------|-------------|--------|--------|--------------|
| Restless Skeleton | 4-11 | 4 | 50 | 3 |
| Shambling Zombie | 5-12 | 5 | 60 | 4 |
| Orc Warrior | 7-15 | 6 | 80 | 5 |

### Mid Game (Levels 10-23)
| Enemy | Level Range | Attack | Health | Sprite Index |
|-------|-------------|--------|--------|--------------|
| Crypt Ghoul | 10-18 | 8 | 100 | 6 |
| Rock Golem | 12-20 | 9 | 120 | 7 |
| Lesser Demon | 15-23 | 11 | 140 | 8 |

### Late Game (Levels 18+)
| Enemy | Level Range | Attack | Health | Sprite Index |
|-------|-------------|--------|--------|--------------|
| Black Knight | 18-28 | 13 | 160 | 9 |
| Necromancer | 20-30 | 15 | 180 | 10 |
| Red Dragon | 25-99 | 20 | 200 | 11 |

## Spawning Logic

### Level-Based Filtering
Enemies spawn based on the **dungeon difficulty level**, which equals the **player's level** (not scaled up).

```typescript
const validEnemies = ENEMY_TEMPLATES.filter(
  e => difficulty >= e.minLevel && difficulty <= e.maxLevel
);
```

### Example Spawns
- **Level 1 Player**: Can encounter Sewer Slime or Cellar Rat
- **Level 5 Player**: Can encounter Sewer Slime, Cellar Rat, Goblin Scout, Restless Skeleton, or Shambling Zombie
- **Level 15 Player**: Can encounter Orc Warrior, Crypt Ghoul, Rock Golem, or Lesser Demon
- **Level 25+ Player**: Can encounter Black Knight, Necromancer, or Red Dragon

## Boss Mechanics
- Boss enemies are 2.5x stronger than regular enemies
- Bosses appear in the final room of each dungeon
- Boss name format: `"[Enemy Name] Boss"` (e.g., "Red Dragon Boss")
- Bosses drop 2 items instead of 1

## Sprite System
- Sprite sheet: `enemy-sprites.png` (4×3 grid, 256px × 192px)
- Display size: 96px × 96px (large variant)
- Each enemy has a unique sprite index (0-11)
- CSS class: `.sprite-enemy-sprites`

## Balance Philosophy
1. **Progressive Difficulty**: Enemies get stronger as you level up
2. **Overlapping Ranges**: Multiple enemy types can appear at each level for variety
3. **Natural Gating**: High-level enemies only appear when you're ready for them
4. **Endgame Boss**: Red Dragon available from level 25 onwards as ultimate challenge

## Technical Implementation

### Enemy Template Interface
```typescript
interface EnemyTemplate {
  name: string;
  icon: string;
  baseHealth: number;
  baseAttack: number;
  baseDefense: number;
  minLevel: number;
  maxLevel: number;
  spriteIndex: number;
}
```

### Enemy Interface
```typescript
interface Enemy {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  icon: string;
  spriteSheet?: string;
  spriteIndex?: number;
}
```

## Future Enhancements
- XP scaling curve (harder to level up at high levels)
- Enemy special abilities
- Elemental damage types
- Enemy AI patterns
- Rare enemy variants
