# Combat Balance Update

## Changes Made

### 1. Defense-Based Damage System
Previously, damage was calculated without considering enemy defense, making early enemies too tanky for level 1 players.

**Old System:**
- Player Damage = (Strength + Power + Weapon Bonus) × variance (90-110%)
- Enemy Damage = Enemy Attack × (1 - Player Defense%)

**New System:**
- **Player Damage** = MAX(1, (Strength + Power + Weapon Bonus) - Enemy Defense) × variance (90-110%)
- **Enemy Damage** = MAX(1, Enemy Attack - Player Defense)

### 2. Example Calculations

#### Level 1 Player vs Cellar Rat Boss
**Player Stats:**
- Strength: 1
- Power: 1
- Defense (Endurance): 1
- Total Attack: 2

**Cellar Rat Boss (2.5x multiplier):**
- Health: 25 × 2.5 = 62.5 → 63 HP (with variance)
- Attack: 2 × 2.5 = 5
- Defense: 1 × 2.5 = 2.5 → 2

**OLD Combat:**
- Player deals: ~2 damage per hit (no defense reduction)
- Enemy deals: 5 - (1% reduction) ≈ 5 damage per hit
- **Player needs ~31 hits to win, dies in ~22 hits** ❌

**NEW Combat:**
- Player deals: MAX(1, 2 - 2) × 0.9-1.1 = **1 damage per hit** minimum
- Enemy deals: MAX(1, 5 - 1) = **4 damage per hit**
- Still challenging but player has more time to learn mechanics ✓

#### Level 1 Player vs Sewer Slime (Regular)
**Sewer Slime:**
- Health: 20
- Attack: 1
- Defense: 0

**NEW Combat:**
- Player deals: MAX(1, 2 - 0) × 0.9-1.1 = **2 damage per hit**
- Enemy deals: MAX(1, 1 - 1) = **1 damage per hit**
- Player needs ~10 hits, taking only 10 damage total ✓ (Much more fair!)

### 3. Death System
**Added:**
- Death Modal with "You Died" screen
- Player cannot continue dungeon after death
- No rewards when dying (0 health, 0 enemies)
- "Return Home" button to exit dungeon safely

**Disabled When Dead:**
- ⚔️ Attack button
- 📦 Open Chest button
- Continue to Next Room button
- Dungeon completion screen

### 4. Progression Benefits

As players level up (+1 all stats per level):

**Level 5 Player:**
- Strength: 5, Power: 5 = 10 attack
- Defense: 5
- vs Cellar Rat Boss (atk 5, def 2): deals 8 damage, takes 0 damage!
- vs Orc Warrior Boss (atk 15, def 10): deals 0→1 damage, takes 10 damage

**Level 10 Player:**
- Strength: 10, Power: 10 = 20 attack
- Defense: 10
- vs Orc Warrior Boss (atk 15, def 10): deals 10 damage, takes 5 damage
- vs Crypt Ghoul Boss (atk 20, def 12): deals 8 damage, takes 10 damage

## Design Philosophy

1. **Defense Matters**: Low-defense enemies (Slime, Rat) are much easier to defeat
2. **Minimum Damage**: Always deal at least 1 damage to prevent impossible fights
3. **Natural Gating**: High-defense enemies naturally appear at higher levels
4. **Death Consequences**: Players must restart dungeon on death (no exploit)
5. **Risk vs Reward**: Higher level dungeons are harder but give better loot

## Files Changed

- `src/utils/gameLogic.ts`: Updated damage calculations
  - `calculatePlayerDamage()` now accepts `enemyDefense` parameter
  - `calculateDamageReduction()` renamed to `calculatePlayerDefense()`
  
- `src/components/DungeonCrawler/DungeonCrawler.tsx`: Combat logic & death handling
  - Added `isDead` state
  - Updated `attackEnemy()` to use defense stats
  - Added `handleDeath()` function
  - Disabled buttons when dead
  - Integrated DeathModal component
  
- `src/components/DeathModal/DeathModal.tsx`: New death screen component
- `src/components/DeathModal/DeathModal.css`: Death modal styling

## Balance Notes

- Early enemies (0-2 defense) are beatable by level 1 players
- Mid enemies (3-5 defense) require levels 5-7
- Late enemies (6-8 defense) require levels 10-15
- Endgame enemies (9+ defense) require level 20+
- Boss multiplier (2.5x) makes defense especially important
