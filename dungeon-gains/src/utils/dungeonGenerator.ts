import type { Dungeon, DungeonRoom, Enemy, Item } from '../types';

// Loot tables by rarity
const COMMON_WEAPONS: Omit<Item, 'id'>[] = [
  // Swords (12 with sprite data)
  { name: 'Iron Shortsword', type: 'weapon', rarity: 'common', statBonus: { strength: 2 }, description: 'A basic iron blade', icon: '🗡️', spriteSheet: 'common-swords', spriteIndex: 0 },
  { name: 'Old Guard Blade', type: 'weapon', rarity: 'common', statBonus: { endurance: 3 }, description: 'Worn but reliable', icon: '🗡️', spriteSheet: 'common-swords', spriteIndex: 1 },
  { name: 'Rusted Longsword', type: 'weapon', rarity: 'common', statBonus: { strength: 1 }, description: 'Seen better days', icon: '🗡️', spriteSheet: 'common-swords', spriteIndex: 2 },
  { name: "Traveler's Edge", type: 'weapon', rarity: 'common', statBonus: { stamina: 2 }, description: 'Light and portable', icon: '🗡️', spriteSheet: 'common-swords', spriteIndex: 3 },
  { name: 'Steel Cutlass', type: 'weapon', rarity: 'common', statBonus: { power: 1 }, description: 'A seafarer\'s weapon', icon: '🗡️', spriteSheet: 'common-swords', spriteIndex: 4 },
  { name: 'Weathered Broadsword', type: 'weapon', rarity: 'common', statBonus: { strength: 3 }, description: 'Battle-scarred', icon: '🗡️', spriteSheet: 'common-swords', spriteIndex: 5 },
  { name: 'Copper Falchion', type: 'weapon', rarity: 'common', statBonus: { endurance: 2 }, description: 'Curved copper blade', icon: '🗡️', spriteSheet: 'common-swords', spriteIndex: 6 },
  { name: 'Training Sword', type: 'weapon', rarity: 'common', statBonus: { strength: 1 }, description: 'For practice only', icon: '🗡️', spriteSheet: 'common-swords', spriteIndex: 7 },
  { name: 'Tempered Rapier', type: 'weapon', rarity: 'common', statBonus: { stamina: 2 }, description: 'Quick and precise', icon: '🗡️', spriteSheet: 'common-swords', spriteIndex: 8 },
  { name: 'Dull Saber', type: 'weapon', rarity: 'common', statBonus: { strength: 1 }, description: 'Needs sharpening', icon: '🗡️', spriteSheet: 'common-swords', spriteIndex: 9 },
  { name: 'Plain Arming Sword', type: 'weapon', rarity: 'common', statBonus: { strength: 2 }, description: 'Standard issue', icon: '🗡️', spriteSheet: 'common-swords', spriteIndex: 10 },
  { name: 'Ironleaf Shortsabre', type: 'weapon', rarity: 'common', statBonus: { endurance: 2 }, description: 'Leaf-shaped guard', icon: '🗡️', spriteSheet: 'common-swords', spriteIndex: 11 },
  // Axes (12)
  { name: 'Timber Hatchet', type: 'weapon', rarity: 'common', statBonus: { strength: 2 }, description: 'Woodcutter\'s tool', icon: '🪓', spriteSheet: 'common-axes', spriteIndex: 0 },
  { name: "Woodcutter's Axe", type: 'weapon', rarity: 'common', statBonus: { endurance: 3 }, description: 'Heavy and durable', icon: '🪓', spriteSheet: 'common-axes', spriteIndex: 1 },
  { name: 'Iron Splitter', type: 'weapon', rarity: 'common', statBonus: { strength: 2 }, description: 'Splits more than wood', icon: '🪓', spriteSheet: 'common-axes', spriteIndex: 2 },
  { name: 'Quarry Hew Axe', type: 'weapon', rarity: 'common', statBonus: { endurance: 2 }, description: 'For breaking stone', icon: '🪓', spriteSheet: 'common-axes', spriteIndex: 3 },
  { name: 'Rusted Handaxe', type: 'weapon', rarity: 'common', statBonus: { strength: 1 }, description: 'Small but sharp', icon: '🪓', spriteSheet: 'common-axes', spriteIndex: 4 },
  { name: "Traveler's Chopper", type: 'weapon', rarity: 'common', statBonus: { strength: 2 }, description: 'Compact and practical', icon: '🪓', spriteSheet: 'common-axes', spriteIndex: 5 },
  { name: 'Simple Waraxe', type: 'weapon', rarity: 'common', statBonus: { strength: 3 }, description: 'Basic battle axe', icon: '🪓', spriteSheet: 'common-axes', spriteIndex: 6 },
  { name: 'Bent Haft Axe', type: 'weapon', rarity: 'common', statBonus: { endurance: 1 }, description: 'Crooked but functional', icon: '🪓', spriteSheet: 'common-axes', spriteIndex: 7 },
  { name: 'Bronze Hewblade', type: 'weapon', rarity: 'common', statBonus: { strength: 2 }, description: 'Ancient bronze edge', icon: '🪓', spriteSheet: 'common-axes', spriteIndex: 8 },
  { name: 'Old Logging Axe', type: 'weapon', rarity: 'common', statBonus: { strength: 3 }, description: 'From the deep woods', icon: '🪓', spriteSheet: 'common-axes', spriteIndex: 9 },
  { name: 'Steel Camp Axe', type: 'weapon', rarity: 'common', statBonus: { endurance: 2 }, description: 'Adventurer\'s companion', icon: '🪓', spriteSheet: 'common-axes', spriteIndex: 10 },
  { name: 'Field Butcher', type: 'weapon', rarity: 'common', statBonus: { strength: 2 }, description: 'Practical and deadly', icon: '🪓', spriteSheet: 'common-axes', spriteIndex: 11 },
  // Bows (12)
  { name: 'Worn Hunting Bow', type: 'weapon', rarity: 'common', statBonus: { stamina: 2 }, description: 'Seen many hunts', icon: '🏹', spriteSheet: 'common-bows', spriteIndex: 0 },
  { name: 'Oak Shortbow', type: 'weapon', rarity: 'common', statBonus: { stamina: 1 }, description: 'Simple oak wood', icon: '🏹', spriteSheet: 'common-bows', spriteIndex: 1 },
  { name: 'Twine-Lashed Bow', type: 'weapon', rarity: 'common', statBonus: { power: 1 }, description: 'Hastily strung', icon: '🏹', spriteSheet: 'common-bows', spriteIndex: 2 },
  { name: 'Forest Stalker Bow', type: 'weapon', rarity: 'common', statBonus: { stamina: 2 }, description: 'Silent hunter', icon: '🏹', spriteSheet: 'common-bows', spriteIndex: 3 },
  { name: 'Simple Recurve Bow', type: 'weapon', rarity: 'common', statBonus: { stamina: 1 }, description: 'Basic design', icon: '🏹', spriteSheet: 'common-bows', spriteIndex: 4 },
  { name: 'Ashwood Bow', type: 'weapon', rarity: 'common', statBonus: { stamina: 2 }, description: 'Flexible ash wood', icon: '🏹', spriteSheet: 'common-bows', spriteIndex: 5 },
  { name: 'Yew Trail Bow', type: 'weapon', rarity: 'common', statBonus: { power: 1 }, description: 'Classic yew construction', icon: '🏹', spriteSheet: 'common-bows', spriteIndex: 6 },
  { name: "Beginner's Longbow", type: 'weapon', rarity: 'common', statBonus: { stamina: 2 }, description: 'For learning archers', icon: '🏹', spriteSheet: 'common-bows', spriteIndex: 7 },
  { name: 'Copper Fittings Bow', type: 'weapon', rarity: 'common', statBonus: { stamina: 1 }, description: 'Metal-reinforced', icon: '🏹', spriteSheet: 'common-bows', spriteIndex: 8 },
  { name: "Scout's Line Bow", type: 'weapon', rarity: 'common', statBonus: { stamina: 2 }, description: 'Light and quick', icon: '🏹', spriteSheet: 'common-bows', spriteIndex: 9 },
  { name: 'Woven Branch Bow', type: 'weapon', rarity: 'common', statBonus: { stamina: 1 }, description: 'Natural materials', icon: '🏹', spriteSheet: 'common-bows', spriteIndex: 10 },
  { name: 'Practice Range Bow', type: 'weapon', rarity: 'common', statBonus: { stamina: 1 }, description: 'Training equipment', icon: '🏹', spriteSheet: 'common-bows', spriteIndex: 11 },
];

const COMMON_ARMOR: Omit<Item, 'id'>[] = [
  { name: 'Cloth Armor', type: 'armor', rarity: 'common', statBonus: { endurance: 2 }, description: 'Simple protective gear', icon: '👕' },
];

const COMMON_ACCESSORIES: Omit<Item, 'id'>[] = [
  { name: 'Leather Gloves', type: 'accessory', rarity: 'common', statBonus: { power: 1 }, description: 'Workout gloves', icon: '🧤' },
];

const UNCOMMON_ITEMS: Omit<Item, 'id'>[] = [
  { name: 'Iron Sword', type: 'weapon', rarity: 'uncommon', statBonus: { strength: 4 }, description: 'A reliable blade', icon: '⚔️' },
  { name: 'Leather Armor', type: 'armor', rarity: 'uncommon', statBonus: { endurance: 4 }, description: 'Sturdy protection', icon: '🦺' },
  { name: 'Running Shoes', type: 'accessory', rarity: 'uncommon', statBonus: { stamina: 3 }, description: 'Light and fast', icon: '👟' },
];

const RARE_WEAPONS: Omit<Item, 'id'>[] = [
  // Swords (12)
  { name: 'Frostline Sabre', type: 'weapon', rarity: 'rare', statBonus: { endurance: 4, stamina: 1 }, description: 'Chills enemies to the bone', icon: '🗡️', spriteSheet: 'rare-swords', spriteIndex: 0 },
  { name: 'Emberbrand', type: 'weapon', rarity: 'rare', statBonus: { strength: 5, power: 1 }, description: 'Burns with inner fire', icon: '🗡️', spriteSheet: 'rare-swords', spriteIndex: 1 },
  { name: 'Nightshade Blade', type: 'weapon', rarity: 'rare', statBonus: { stamina: 3, power: 2 }, description: 'Silent as shadows', icon: '🗡️', spriteSheet: 'rare-swords', spriteIndex: 2 },
  { name: 'Stormpiercer', type: 'weapon', rarity: 'rare', statBonus: { strength: 5, endurance: 1 }, description: 'Cuts through the storm', icon: '🗡️', spriteSheet: 'rare-swords', spriteIndex: 3 },
  { name: 'Gleaming Edge', type: 'weapon', rarity: 'rare', statBonus: { endurance: 4, strength: 1 }, description: 'Never dulls', icon: '🗡️', spriteSheet: 'rare-swords', spriteIndex: 4 },
  { name: 'Wildersteel Katana', type: 'weapon', rarity: 'rare', statBonus: { stamina: 6 }, description: 'Folded steel perfection', icon: '🗡️', spriteSheet: 'rare-swords', spriteIndex: 5 },
  { name: 'Moonstrike Falchion', type: 'weapon', rarity: 'rare', statBonus: { strength: 5, stamina: 1 }, description: 'Blessed by moonlight', icon: '🗡️', spriteSheet: 'rare-swords', spriteIndex: 6 },
  { name: 'Runebound Sword', type: 'weapon', rarity: 'rare', statBonus: { strength: 3, power: 3 }, description: 'Etched with ancient runes', icon: '🗡️', spriteSheet: 'rare-swords', spriteIndex: 7 },
  { name: 'Silverthorn Rapier', type: 'weapon', rarity: 'rare', statBonus: { stamina: 4, endurance: 1 }, description: 'Swift as thorns', icon: '🗡️', spriteSheet: 'rare-swords', spriteIndex: 8 },
  { name: 'Shatterpoint Claymore', type: 'weapon', rarity: 'rare', statBonus: { strength: 6, endurance: 1 }, description: 'Breaks enemy defenses', icon: '🗡️', spriteSheet: 'rare-swords', spriteIndex: 9 },
  { name: "Dancer's Twinblade", type: 'weapon', rarity: 'rare', statBonus: { stamina: 5, power: 2 }, description: 'Flows like water', icon: '🗡️', spriteSheet: 'rare-swords', spriteIndex: 10 },
  { name: 'Starwarden Edge', type: 'weapon', rarity: 'rare', statBonus: { strength: 4, endurance: 3 }, description: 'Forged from starlight', icon: '🗡️', spriteSheet: 'rare-swords', spriteIndex: 11 },
  // Axes (12)
  { name: 'Frostbite Axe', type: 'weapon', rarity: 'rare', statBonus: { endurance: 5, strength: 2 }, description: 'Frozen edge', icon: '🪓', spriteSheet: 'rare-axes', spriteIndex: 0 },
  { name: 'Embercleave', type: 'weapon', rarity: 'rare', statBonus: { strength: 6, power: 1 }, description: 'Molten fury', icon: '🪓', spriteSheet: 'rare-axes', spriteIndex: 1 },
  { name: 'Thunder Hew', type: 'weapon', rarity: 'rare', statBonus: { strength: 5, endurance: 2 }, description: 'Strikes like lightning', icon: '🪓', spriteSheet: 'rare-axes', spriteIndex: 2 },
  { name: 'Bonecracker', type: 'weapon', rarity: 'rare', statBonus: { strength: 6, endurance: 1 }, description: 'Shatters bone', icon: '🪓', spriteSheet: 'rare-axes', spriteIndex: 3 },
  { name: "Widow's Edge", type: 'weapon', rarity: 'rare', statBonus: { strength: 4, stamina: 2 }, description: 'Leaves no survivors', icon: '🪓', spriteSheet: 'rare-axes', spriteIndex: 4 },
  { name: 'Stormcarver', type: 'weapon', rarity: 'rare', statBonus: { strength: 7, endurance: 1 }, description: 'Cleaves the sky', icon: '🪓', spriteSheet: 'rare-axes', spriteIndex: 5 },
  { name: 'Silverback Battleaxe', type: 'weapon', rarity: 'rare', statBonus: { strength: 5, endurance: 3 }, description: 'Mountain gorilla strength', icon: '🪓', spriteSheet: 'rare-axes', spriteIndex: 6 },
  { name: 'Spiritwood Chopper', type: 'weapon', rarity: 'rare', statBonus: { strength: 4, endurance: 2 }, description: 'Enchanted timber', icon: '🪓', spriteSheet: 'rare-axes', spriteIndex: 7 },
  { name: 'Razorpeak Axe', type: 'weapon', rarity: 'rare', statBonus: { strength: 6, power: 1 }, description: 'Sharpest edge', icon: '🪓', spriteSheet: 'rare-axes', spriteIndex: 8 },
  { name: 'Runeflare Hewblade', type: 'weapon', rarity: 'rare', statBonus: { strength: 4, power: 3 }, description: 'Magic-infused steel', icon: '🪓', spriteSheet: 'rare-axes', spriteIndex: 9 },
  { name: 'Oathbreaker Axe', type: 'weapon', rarity: 'rare', statBonus: { strength: 7, endurance: 1 }, description: 'Betrayer\'s weapon', icon: '🪓', spriteSheet: 'rare-axes', spriteIndex: 10 },
  { name: 'Stonehowl Cleaver', type: 'weapon', rarity: 'rare', statBonus: { strength: 5, endurance: 2 }, description: 'Echoes through mountains', icon: '🪓', spriteSheet: 'rare-axes', spriteIndex: 11 },
  // Bows (12)
  { name: 'Froststring Bow', type: 'weapon', rarity: 'rare', statBonus: { stamina: 5, endurance: 2 }, description: 'Ice-cold precision', icon: '🏹', spriteSheet: 'rare-bows', spriteIndex: 0 },
  { name: 'Emberflight Longbow', type: 'weapon', rarity: 'rare', statBonus: { stamina: 4, power: 3 }, description: 'Arrows of flame', icon: '🏹', spriteSheet: 'rare-bows', spriteIndex: 1 },
  { name: 'Gale Whisper Bow', type: 'weapon', rarity: 'rare', statBonus: { stamina: 6, power: 1 }, description: 'Wind guides the arrow', icon: '🏹', spriteSheet: 'rare-bows', spriteIndex: 2 },
  { name: 'Shadowbranch Recurve', type: 'weapon', rarity: 'rare', statBonus: { stamina: 5, power: 2 }, description: 'Hidden in darkness', icon: '🏹', spriteSheet: 'rare-bows', spriteIndex: 3 },
  { name: 'Stormcall Bow', type: 'weapon', rarity: 'rare', statBonus: { stamina: 4, power: 3 }, description: 'Thunder with each shot', icon: '🏹', spriteSheet: 'rare-bows', spriteIndex: 4 },
  { name: 'Verdant Hunter Bow', type: 'weapon', rarity: 'rare', statBonus: { stamina: 5, endurance: 2 }, description: 'Nature\'s huntsman', icon: '🏹', spriteSheet: 'rare-bows', spriteIndex: 5 },
  { name: 'Silverwind Bow', type: 'weapon', rarity: 'rare', statBonus: { stamina: 4, power: 3 }, description: 'Swift as silver', icon: '🏹', spriteSheet: 'rare-bows', spriteIndex: 6 },
  { name: 'Runebow of Echoes', type: 'weapon', rarity: 'rare', statBonus: { stamina: 6, endurance: 1 }, description: 'Each shot reverberates', icon: '🏹', spriteSheet: 'rare-bows', spriteIndex: 7 },
  { name: 'Starfall Fletcher', type: 'weapon', rarity: 'rare', statBonus: { stamina: 5, power: 2 }, description: 'Arrows from the heavens', icon: '🏹', spriteSheet: 'rare-bows', spriteIndex: 8 },
  { name: 'Moonshade Bow', type: 'weapon', rarity: 'rare', statBonus: { stamina: 5, endurance: 2 }, description: 'Lunar-blessed', icon: '🏹', spriteSheet: 'rare-bows', spriteIndex: 9 },
  { name: 'Shiverpine Bow', type: 'weapon', rarity: 'rare', statBonus: { stamina: 6, power: 1 }, description: 'Cold as winter', icon: '🏹', spriteSheet: 'rare-bows', spriteIndex: 10 },
  { name: 'Cloudrider Bow', type: 'weapon', rarity: 'rare', statBonus: { stamina: 4, power: 3 }, description: 'Rides the wind', icon: '🏹', spriteSheet: 'rare-bows', spriteIndex: 11 },
];

const RARE_ARMOR: Omit<Item, 'id'>[] = [
  { name: 'Chainmail', type: 'armor', rarity: 'rare', statBonus: { endurance: 6, stamina: 2 }, description: 'Heavy but protective', icon: '🛡️' },
];

const RARE_ACCESSORIES: Omit<Item, 'id'>[] = [
  { name: 'Power Belt', type: 'accessory', rarity: 'rare', statBonus: { power: 5 }, description: 'Weightlifting belt of champions', icon: '🔗' },
];

const EPIC_ITEMS: Omit<Item, 'id'>[] = [
  { name: 'Dragon Slayer', type: 'weapon', rarity: 'epic', statBonus: { strength: 10, power: 5 }, description: 'Legendary weapon of heroes', icon: '⚔️' },
  { name: 'Plate Mail', type: 'armor', rarity: 'epic', statBonus: { endurance: 10, strength: 3 }, description: 'Armor of the ancients', icon: '🛡️' },
  { name: 'Phoenix Feather', type: 'accessory', rarity: 'epic', statBonus: { stamina: 8, endurance: 4 }, description: 'Never tire again', icon: '🪶' },
];

const LEGENDARY_WEAPONS: Omit<Item, 'id'>[] = [
  // Swords (12)
  { name: 'Sunbreaker Greatsword', type: 'weapon', rarity: 'legendary', statBonus: { strength: 12, endurance: 3 }, description: 'Shatters the dawn itself', icon: '⚔️', spriteSheet: 'legendary-swords', spriteIndex: 0 },
  { name: 'Blood Oath Claymore', type: 'weapon', rarity: 'legendary', statBonus: { strength: 11, endurance: 4 }, description: 'Sworn in blood', icon: '⚔️', spriteSheet: 'legendary-swords', spriteIndex: 1 },
  { name: 'Eclipsing Moonblade', type: 'weapon', rarity: 'legendary', statBonus: { stamina: 10, power: 5 }, description: 'Darkens the sky', icon: '⚔️', spriteSheet: 'legendary-swords', spriteIndex: 2 },
  { name: 'Kingsbane', type: 'weapon', rarity: 'legendary', statBonus: { strength: 8, power: 7 }, description: 'Slayer of tyrants', icon: '⚔️', spriteSheet: 'legendary-swords', spriteIndex: 3 },
  { name: 'The Last Crusader', type: 'weapon', rarity: 'legendary', statBonus: { strength: 9, endurance: 6 }, description: 'Final holy warrior', icon: '⚔️', spriteSheet: 'legendary-swords', spriteIndex: 4 },
  { name: 'Phoenix Edge', type: 'weapon', rarity: 'legendary', statBonus: { strength: 13, stamina: 3 }, description: 'Reborn in flames', icon: '⚔️', spriteSheet: 'legendary-swords', spriteIndex: 5 },
  { name: 'Soulcarver', type: 'weapon', rarity: 'legendary', statBonus: { stamina: 10, strength: 5 }, description: 'Cuts through spirit itself', icon: '⚔️', spriteSheet: 'legendary-swords', spriteIndex: 6 },
  { name: "Valkyrie's Judgment", type: 'weapon', rarity: 'legendary', statBonus: { strength: 12, power: 4 }, description: 'Decides who lives', icon: '⚔️', spriteSheet: 'legendary-swords', spriteIndex: 7 },
  { name: 'Titanfall Saber', type: 'weapon', rarity: 'legendary', statBonus: { strength: 9, endurance: 6 }, description: 'Brings down giants', icon: '⚔️', spriteSheet: 'legendary-swords', spriteIndex: 8 },
  { name: 'Sword of the First Flame', type: 'weapon', rarity: 'legendary', statBonus: { strength: 10, endurance: 5 }, description: 'Primordial fire', icon: '⚔️', spriteSheet: 'legendary-swords', spriteIndex: 9 },
  { name: "Lightbringer's Final Word", type: 'weapon', rarity: 'legendary', statBonus: { strength: 11, stamina: 4 }, description: 'Last hope against darkness', icon: '⚔️', spriteSheet: 'legendary-swords', spriteIndex: 10 },
  { name: 'Epochsplitter', type: 'weapon', rarity: 'legendary', statBonus: { strength: 9, power: 6 }, description: 'Cleaves through time itself', icon: '⚔️', spriteSheet: 'legendary-swords', spriteIndex: 11 },
  // Axes (12)
  { name: 'Titan Cleaver', type: 'weapon', rarity: 'legendary', statBonus: { strength: 14, endurance: 3 }, description: 'Fells gods themselves', icon: '🪓', spriteSheet: 'legendary-axes', spriteIndex: 0 },
  { name: 'Worldsplitter', type: 'weapon', rarity: 'legendary', statBonus: { strength: 10, endurance: 5 }, description: 'Cracks the earth', icon: '🪓', spriteSheet: 'legendary-axes', spriteIndex: 1 },
  { name: 'Doomforged Axe', type: 'weapon', rarity: 'legendary', statBonus: { strength: 13, endurance: 3 }, description: 'Forged in apocalypse', icon: '🪓', spriteSheet: 'legendary-axes', spriteIndex: 2 },
  { name: 'Dragonmaw Crusher', type: 'weapon', rarity: 'legendary', statBonus: { strength: 14, power: 2 }, description: 'Dragon jaw fashioned into weapon', icon: '🪓', spriteSheet: 'legendary-axes', spriteIndex: 3 },
  { name: 'Glacier Rend', type: 'weapon', rarity: 'legendary', statBonus: { strength: 9, endurance: 6 }, description: 'Splits frozen mountains', icon: '🪓', spriteSheet: 'legendary-axes', spriteIndex: 4 },
  { name: 'Hellfire Fel-Axe', type: 'weapon', rarity: 'legendary', statBonus: { strength: 13, power: 3 }, description: 'Demon-forged devastation', icon: '🪓', spriteSheet: 'legendary-axes', spriteIndex: 5 },
  { name: 'Eternal Mountainbreaker', type: 'weapon', rarity: 'legendary', statBonus: { strength: 8, endurance: 7 }, description: 'Sunders stone peaks', icon: '🪓', spriteSheet: 'legendary-axes', spriteIndex: 6 },
  { name: 'Bloodroot Executioner', type: 'weapon', rarity: 'legendary', statBonus: { strength: 11, endurance: 4 }, description: 'Grows stronger with each kill', icon: '🪓', spriteSheet: 'legendary-axes', spriteIndex: 7 },
  { name: "Stormfather's Axe", type: 'weapon', rarity: 'legendary', statBonus: { strength: 12, endurance: 3 }, description: 'Commands the tempest', icon: '🪓', spriteSheet: 'legendary-axes', spriteIndex: 8 },
  { name: 'Godsplitter', type: 'weapon', rarity: 'legendary', statBonus: { strength: 15 }, description: 'Deicide made manifest', icon: '🪓', spriteSheet: 'legendary-axes', spriteIndex: 9 },
  { name: 'Reaper of Kings', type: 'weapon', rarity: 'legendary', statBonus: { strength: 10, power: 5 }, description: 'Claims royal souls', icon: '🪓', spriteSheet: 'legendary-axes', spriteIndex: 10 },
  { name: 'Earthshatter Colossus', type: 'weapon', rarity: 'legendary', statBonus: { strength: 9, endurance: 6 }, description: 'Trembles the world', icon: '🪓', spriteSheet: 'legendary-axes', spriteIndex: 11 },
  // Bows (12)
  { name: 'Dragonsong Bow', type: 'weapon', rarity: 'legendary', statBonus: { stamina: 12, power: 3 }, description: 'Sings with dragon power', icon: '🏹', spriteSheet: 'legendary-bows', spriteIndex: 0 },
  { name: 'The Sunpiercer', type: 'weapon', rarity: 'legendary', statBonus: { stamina: 9, power: 6 }, description: 'Arrow that pierced the sun', icon: '🏹', spriteSheet: 'legendary-bows', spriteIndex: 1 },
  { name: 'Nightfall Requiem', type: 'weapon', rarity: 'legendary', statBonus: { stamina: 13, power: 2 }, description: 'Final song of darkness', icon: '🏹', spriteSheet: 'legendary-bows', spriteIndex: 2 },
  { name: 'Skybreaker Bow', type: 'weapon', rarity: 'legendary', statBonus: { stamina: 11, endurance: 4 }, description: 'Shatters the heavens', icon: '🏹', spriteSheet: 'legendary-bows', spriteIndex: 3 },
  { name: 'Wrath of the Eclipse', type: 'weapon', rarity: 'legendary', statBonus: { stamina: 14, power: 1 }, description: 'Moon devours sun', icon: '🏹', spriteSheet: 'legendary-bows', spriteIndex: 4 },
  { name: 'Celestial Raincaller', type: 'weapon', rarity: 'legendary', statBonus: { stamina: 10, power: 5 }, description: 'Arrows fall like stars', icon: '🏹', spriteSheet: 'legendary-bows', spriteIndex: 5 },
  { name: 'Oathbound Bow of Ages', type: 'weapon', rarity: 'legendary', statBonus: { stamina: 11, endurance: 4 }, description: 'Ancient eternal promise', icon: '🏹', spriteSheet: 'legendary-bows', spriteIndex: 6 },
  { name: "Lifetaker's Whisper", type: 'weapon', rarity: 'legendary', statBonus: { stamina: 12, power: 3 }, description: 'Silent death', icon: '🏹', spriteSheet: 'legendary-bows', spriteIndex: 7 },
  { name: "Titan's Breath Longbow", type: 'weapon', rarity: 'legendary', statBonus: { stamina: 9, endurance: 6 }, description: 'Exhaled by giants', icon: '🏹', spriteSheet: 'legendary-bows', spriteIndex: 8 },
  { name: 'Phoenix Galebow', type: 'weapon', rarity: 'legendary', statBonus: { stamina: 13, power: 2 }, description: 'Wind of rebirth', icon: '🏹', spriteSheet: 'legendary-bows', spriteIndex: 9 },
  { name: 'Bow of the Eternal Hunt', type: 'weapon', rarity: 'legendary', statBonus: { stamina: 14, endurance: 1 }, description: 'Never-ending pursuit', icon: '🏹', spriteSheet: 'legendary-bows', spriteIndex: 10 },
  { name: "Horizon's Final Arrow", type: 'weapon', rarity: 'legendary', statBonus: { stamina: 10, power: 5 }, description: 'Pierces the edge of reality', icon: '🏹', spriteSheet: 'legendary-bows', spriteIndex: 11 },
];

const LEGENDARY_ARMOR: Omit<Item, 'id'>[] = [
  { name: 'Divine Armor', type: 'armor', rarity: 'legendary', statBonus: { endurance: 15, stamina: 10 }, description: 'Blessed by the gods', icon: '✨' },
];

const LEGENDARY_ACCESSORIES: Omit<Item, 'id'>[] = [
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
    // Legendary
    const legendaryPools = [LEGENDARY_WEAPONS, LEGENDARY_ARMOR, LEGENDARY_ACCESSORIES];
    const pool = legendaryPools[Math.floor(Math.random() * legendaryPools.length)];
    itemPool = pool;
  } else if (roll < 15 + rarityBonus) {
    // Epic
    itemPool = EPIC_ITEMS;
  } else if (roll < 35 + rarityBonus * 1.5) {
    // Rare
    const rarePools = [RARE_WEAPONS, RARE_ARMOR, RARE_ACCESSORIES];
    const pool = rarePools[Math.floor(Math.random() * rarePools.length)];
    itemPool = pool;
  } else if (roll < 65) {
    // Uncommon
    itemPool = UNCOMMON_ITEMS;
  } else {
    // Common
    const commonPools = [COMMON_WEAPONS, COMMON_ARMOR, COMMON_ACCESSORIES];
    const pool = commonPools[Math.floor(Math.random() * commonPools.length)];
    itemPool = pool;
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
