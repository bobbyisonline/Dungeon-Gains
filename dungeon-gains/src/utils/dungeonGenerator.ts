import type { Dungeon, DungeonRoom, Enemy, Item } from '../types';

// Loot tables by rarity
const COMMON_ITEMS: Omit<Item, 'id'>[] = [
  { name: 'Wooden Sword', type: 'weapon', rarity: 'common', statBonus: { strength: 2 }, description: 'A basic training sword', icon: '🗡️' },
  { name: 'Cloth Armor', type: 'armor', rarity: 'common', statBonus: { endurance: 2 }, description: 'Simple protective gear', icon: '👕' },
  { name: 'Leather Gloves', type: 'accessory', rarity: 'common', statBonus: { power: 1 }, description: 'Workout gloves', icon: '🧤' },
];

const UNCOMMON_ITEMS: Omit<Item, 'id'>[] = [
  { name: 'Iron Sword', type: 'weapon', rarity: 'uncommon', statBonus: { strength: 4 }, description: 'A reliable blade', icon: '⚔️' },
  { name: 'Leather Armor', type: 'armor', rarity: 'uncommon', statBonus: { endurance: 4 }, description: 'Sturdy protection', icon: '🦺' },
  { name: 'Running Shoes', type: 'accessory', rarity: 'uncommon', statBonus: { stamina: 3 }, description: 'Light and fast', icon: '👟' },
];

const RARE_ITEMS: Omit<Item, 'id'>[] = [
  { name: 'Steel Blade', type: 'weapon', rarity: 'rare', statBonus: { strength: 6, power: 2 }, description: 'Masterfully forged', icon: '🗡️' },
  { name: 'Chainmail', type: 'armor', rarity: 'rare', statBonus: { endurance: 6, stamina: 2 }, description: 'Heavy but protective', icon: '🛡️' },
  { name: 'Power Belt', type: 'accessory', rarity: 'rare', statBonus: { power: 5 }, description: 'Weightlifting belt of champions', icon: '🔗' },
];

const EPIC_ITEMS: Omit<Item, 'id'>[] = [
  { name: 'Dragon Slayer', type: 'weapon', rarity: 'epic', statBonus: { strength: 10, power: 5 }, description: 'Legendary weapon of heroes', icon: '⚔️' },
  { name: 'Plate Mail', type: 'armor', rarity: 'epic', statBonus: { endurance: 10, strength: 3 }, description: 'Armor of the ancients', icon: '🛡️' },
  { name: 'Phoenix Feather', type: 'accessory', rarity: 'epic', statBonus: { stamina: 8, endurance: 4 }, description: 'Never tire again', icon: '🪶' },
];

const LEGENDARY_ITEMS: Omit<Item, 'id'>[] = [
  { name: 'Excalibur', type: 'weapon', rarity: 'legendary', statBonus: { strength: 15, power: 10 }, description: 'The sword of legends', icon: '⚔️' },
  { name: 'Divine Armor', type: 'armor', rarity: 'legendary', statBonus: { endurance: 15, stamina: 10 }, description: 'Blessed by the gods', icon: '✨' },
  { name: 'Crown of Victory', type: 'accessory', rarity: 'legendary', statBonus: { strength: 8, power: 8, endurance: 8, stamina: 8 }, description: 'For true champions', icon: '👑' },
];

// Enemy templates
const ENEMY_TEMPLATES = [
  { name: 'Goblin', baseHealth: 30, baseAttack: 8, baseDefense: 2, icon: '👺' },
  { name: 'Skeleton', baseHealth: 40, baseAttack: 10, baseDefense: 3, icon: '💀' },
  { name: 'Orc', baseHealth: 60, baseAttack: 15, baseDefense: 5, icon: '👹' },
  { name: 'Dark Knight', baseHealth: 80, baseAttack: 20, baseDefense: 8, icon: '🗡️' },
  { name: 'Dragon', baseHealth: 150, baseAttack: 30, baseDefense: 15, icon: '🐉' },
];

// Generate random item with ID
export const generateItem = (difficulty: number): Item => {
  const roll = Math.random() * 100;
  let itemPool: Omit<Item, 'id'>[];
  
  // Higher difficulty = better loot chances
  const rarityBonus = difficulty * 5;
  
  if (roll < 5 + rarityBonus * 0.5) {
    itemPool = LEGENDARY_ITEMS;
  } else if (roll < 15 + rarityBonus) {
    itemPool = EPIC_ITEMS;
  } else if (roll < 35 + rarityBonus * 1.5) {
    itemPool = RARE_ITEMS;
  } else if (roll < 65) {
    itemPool = UNCOMMON_ITEMS;
  } else {
    itemPool = COMMON_ITEMS;
  }
  
  const baseItem = itemPool[Math.floor(Math.random() * itemPool.length)];
  
  return {
    ...baseItem,
    id: `item_${Date.now()}_${Math.random()}`,
  };
};

// Generate enemy based on difficulty
export const generateEnemy = (difficulty: number, isBoss: boolean = false): Enemy => {
  const template = ENEMY_TEMPLATES[Math.min(difficulty, ENEMY_TEMPLATES.length - 1)];
  const multiplier = isBoss ? 2.5 : 1;
  
  const health = Math.floor(template.baseHealth * difficulty * multiplier * (Math.random() * 0.2 + 0.9));
  
  return {
    id: `enemy_${Date.now()}_${Math.random()}`,
    name: isBoss ? `${template.name} Boss` : template.name,
    health,
    maxHealth: health,
    attack: Math.floor(template.baseAttack * difficulty * multiplier),
    defense: Math.floor(template.baseDefense * difficulty * multiplier),
    icon: template.icon,
  };
};

// Generate a complete dungeon
export const generateDungeon = (difficulty: number): Dungeon => {
  const numRooms = 5 + Math.floor(difficulty / 2); // More rooms at higher difficulty
  const rooms: DungeonRoom[] = [];
  
  for (let i = 0; i < numRooms; i++) {
    const isBossRoom = i === numRooms - 1;
    const roll = Math.random();
    
    let roomType: DungeonRoom['type'];
    let enemy: Enemy | undefined;
    let loot: Item[] | undefined;
    
    if (isBossRoom) {
      roomType = 'boss';
      enemy = generateEnemy(difficulty, true);
      loot = [generateItem(difficulty), generateItem(difficulty)]; // Boss drops 2 items
    } else if (roll < 0.6) {
      roomType = 'enemy';
      enemy = generateEnemy(difficulty);
      // Regular enemies don't drop loot - only treasure chests and bosses
    } else if (roll < 0.8) {
      roomType = 'treasure';
      loot = [generateItem(difficulty)];
    } else {
      roomType = 'empty';
    }
    
    rooms.push({
      id: `room_${i}`,
      type: roomType,
      enemy,
      loot,
      cleared: false,
    });
  }
  
  return {
    id: `dungeon_${Date.now()}`,
    rooms,
    currentRoomIndex: 0,
    completed: false,
    difficulty,
  };
};

// Get loot from a room
export const collectLoot = (room: DungeonRoom): Item[] => {
  const loot = room.loot || [];
  room.loot = undefined;
  return loot;
};
