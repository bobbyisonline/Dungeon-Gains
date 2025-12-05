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
  // Helmets
  { name: 'Rusty Iron Full Helm', type: 'armor', rarity: 'common', statBonus: { endurance: 1 }, description: 'Worn but functional', icon: '🪖', spriteSheet: 'common-armor', spriteIndex: 0 },
  { name: "Squire's Steel Med Helm", type: 'armor', rarity: 'common', statBonus: { strength: 1 }, description: 'Training helmet', icon: '🪖', spriteSheet: 'common-armor', spriteIndex: 1 },
  { name: 'Leather Coif', type: 'armor', rarity: 'common', statBonus: { stamina: 1 }, description: 'Light head protection', icon: '🪖', spriteSheet: 'common-armor', spriteIndex: 2 },
  { name: 'Bronze Barbute', type: 'armor', rarity: 'common', statBonus: { endurance: 1 }, description: 'Classic design', icon: '🪖', spriteSheet: 'common-armor', spriteIndex: 3 },
  { name: 'Town Guard Kettle Hat', type: 'armor', rarity: 'common', statBonus: { strength: 1 }, description: 'Militia standard issue', icon: '🪖', spriteSheet: 'common-armor', spriteIndex: 4 },
  { name: 'Studded Leather Cap', type: 'armor', rarity: 'common', statBonus: { stamina: 1 }, description: 'Reinforced headwear', icon: '🪖', spriteSheet: 'common-armor', spriteIndex: 5 },
  // Body Armor
  { name: 'Infantry Chainmail', type: 'armor', rarity: 'common', statBonus: { endurance: 2 }, description: 'Basic chain protection', icon: '🛡️', spriteSheet: 'common-armor', spriteIndex: 6 },
  { name: 'Hardened Leather Cuirass', type: 'armor', rarity: 'common', statBonus: { stamina: 2 }, description: 'Boiled leather armor', icon: '🛡️', spriteSheet: 'common-armor', spriteIndex: 7 },
  { name: 'Militia Platebody', type: 'armor', rarity: 'common', statBonus: { endurance: 3 }, description: 'Heavy protection', icon: '🛡️', spriteSheet: 'common-armor', spriteIndex: 8 },
  { name: 'Padded Gambeson', type: 'armor', rarity: 'common', statBonus: { stamina: 2 }, description: 'Quilted defense', icon: '🛡️', spriteSheet: 'common-armor', spriteIndex: 9 },
  { name: 'Bronze Scale Mail', type: 'armor', rarity: 'common', statBonus: { strength: 2 }, description: 'Ancient armor style', icon: '🛡️', spriteSheet: 'common-armor', spriteIndex: 10 },
  { name: "Miner's Tunic", type: 'armor', rarity: 'common', statBonus: { strength: 1, stamina: 1 }, description: 'Tough work clothes', icon: '🛡️', spriteSheet: 'common-armor', spriteIndex: 11 },
];

const COMMON_ACCESSORIES: Omit<Item, 'id'>[] = [
  { name: 'Red Gem Amulet', type: 'accessory', rarity: 'common', statBonus: { power: 1 }, description: 'Simple ruby pendant', icon: '📿', spriteSheet: 'common-accessories', spriteIndex: 0 },
  { name: 'Iron Ring', type: 'accessory', rarity: 'common', statBonus: { strength: 1 }, description: 'Simple iron band', icon: '💍', spriteSheet: 'common-accessories', spriteIndex: 1 },
  { name: 'Simple Leather Boots', type: 'accessory', rarity: 'common', statBonus: { stamina: 1 }, description: 'Basic footwear', icon: '👢', spriteSheet: 'common-accessories', spriteIndex: 2 },
  { name: 'Leather Tunic', type: 'accessory', rarity: 'common', statBonus: { endurance: 1 }, description: 'Simple protection', icon: '👔', spriteSheet: 'common-accessories', spriteIndex: 3 },
  { name: 'Leather Pouch', type: 'accessory', rarity: 'common', statBonus: { stamina: 1 }, description: 'Holds supplies', icon: '👝', spriteSheet: 'common-accessories', spriteIndex: 4 },
  { name: 'Plain Scroll', type: 'accessory', rarity: 'common', statBonus: { power: 1 }, description: 'Basic incantation', icon: '📜', spriteSheet: 'common-accessories', spriteIndex: 5 },
  { name: 'Copper Brooch', type: 'accessory', rarity: 'common', statBonus: { endurance: 1 }, description: 'Tarnished pin', icon: '📎', spriteSheet: 'common-accessories', spriteIndex: 6 },
  { name: 'Leather Gloves', type: 'accessory', rarity: 'common', statBonus: { strength: 1 }, description: 'Worn work gloves', icon: '🧤', spriteSheet: 'common-accessories', spriteIndex: 7 },
  { name: 'Bone Necklace', type: 'accessory', rarity: 'common', statBonus: { power: 1 }, description: 'Tribal charm', icon: '🦴', spriteSheet: 'common-accessories', spriteIndex: 8 },
  { name: 'Red Potion Vial', type: 'accessory', rarity: 'common', statBonus: { strength: 1 }, description: 'Weak tonic', icon: '🧪', spriteSheet: 'common-accessories', spriteIndex: 9 },
  { name: 'Brown Feather', type: 'accessory', rarity: 'common', statBonus: { stamina: 1 }, description: 'Light as air', icon: '🪶', spriteSheet: 'common-accessories', spriteIndex: 10 },
  { name: 'Leather Belt', type: 'accessory', rarity: 'common', statBonus: { endurance: 1 }, description: 'Sturdy waistband', icon: '🔗', spriteSheet: 'common-accessories', spriteIndex: 11 },
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
  // Helmets
  { name: 'Drake-scale Greathelm', type: 'armor', rarity: 'rare', statBonus: { strength: 4, endurance: 2 }, description: 'Forged from dragon scales', icon: '🪖', spriteSheet: 'rare-armor', spriteIndex: 0 },
  { name: 'Crystalline Visor', type: 'armor', rarity: 'rare', statBonus: { power: 4 }, description: 'Magically infused', icon: '🪖', spriteSheet: 'rare-armor', spriteIndex: 1 },
  { name: 'Runed Knight Helm', type: 'armor', rarity: 'rare', statBonus: { power: 3, endurance: 3 }, description: 'Enchanted protection', icon: '🪖', spriteSheet: 'rare-armor', spriteIndex: 2 },
  { name: 'Obsidian Sentinel Helm', type: 'armor', rarity: 'rare', statBonus: { endurance: 6 }, description: 'Volcanic hardness', icon: '🪖', spriteSheet: 'rare-armor', spriteIndex: 3 },
  { name: 'Verdant Cowl', type: 'armor', rarity: 'rare', statBonus: { stamina: 5 }, description: 'Nature\'s blessing', icon: '🪖', spriteSheet: 'rare-armor', spriteIndex: 4 },
  { name: "Executioner's Iron Hood", type: 'armor', rarity: 'rare', statBonus: { strength: 5 }, description: 'Intimidating presence', icon: '🪖', spriteSheet: 'rare-armor', spriteIndex: 5 },
  // Body Armor
  { name: "Gilded Champion's Plate", type: 'armor', rarity: 'rare', statBonus: { strength: 4, endurance: 4 }, description: 'For true heroes', icon: '🛡️', spriteSheet: 'rare-armor', spriteIndex: 6 },
  { name: "Bone-Lord's Ribcage", type: 'armor', rarity: 'rare', statBonus: { power: 5, stamina: 2 }, description: 'Necromantic power', icon: '🛡️', spriteSheet: 'rare-armor', spriteIndex: 7 },
  { name: 'Crimson Ronin Do-maru', type: 'armor', rarity: 'rare', statBonus: { stamina: 4, strength: 3 }, description: 'Eastern warrior armor', icon: '🛡️', spriteSheet: 'rare-armor', spriteIndex: 8 },
  { name: 'Frostburn Mail', type: 'armor', rarity: 'rare', statBonus: { power: 4, endurance: 3 }, description: 'Ice and fire combined', icon: '🛡️', spriteSheet: 'rare-armor', spriteIndex: 9 },
  { name: 'Abyssal Cultist Robe-Top', type: 'armor', rarity: 'rare', statBonus: { power: 7 }, description: 'Dark rituals enhance power', icon: '🛡️', spriteSheet: 'rare-armor', spriteIndex: 10 },
  { name: 'Griffin-Hide Tunic', type: 'armor', rarity: 'rare', statBonus: { stamina: 6, endurance: 2 }, description: 'Mythical beast leather', icon: '🛡️', spriteSheet: 'rare-armor', spriteIndex: 11 },
];

const RARE_ACCESSORIES: Omit<Item, 'id'>[] = [
  { name: 'Silver Sapphire Amulet', type: 'accessory', rarity: 'rare', statBonus: { power: 3 }, description: 'Elegant blue pendant', icon: '💎', spriteSheet: 'rare-accessories', spriteIndex: 0 },
  { name: 'Gold Sapphire Ring', type: 'accessory', rarity: 'rare', statBonus: { power: 2, stamina: 1 }, description: 'Ornate gemstone ring', icon: '💍', spriteSheet: 'rare-accessories', spriteIndex: 1 },
  { name: 'Reinforced Leather Boots', type: 'accessory', rarity: 'rare', statBonus: { stamina: 3 }, description: 'Sturdy footwear', icon: '👢', spriteSheet: 'rare-accessories', spriteIndex: 2 },
  { name: 'Ornate Tome', type: 'accessory', rarity: 'rare', statBonus: { power: 4 }, description: 'Ancient knowledge', icon: '📖', spriteSheet: 'rare-accessories', spriteIndex: 3 },
  { name: 'Gilded Blue Pouch', type: 'accessory', rarity: 'rare', statBonus: { stamina: 2, strength: 1 }, description: 'Enchanted bag', icon: '👝', spriteSheet: 'rare-accessories', spriteIndex: 4 },
  { name: 'Runic Scroll', type: 'accessory', rarity: 'rare', statBonus: { power: 3, endurance: 1 }, description: 'Powerful incantation', icon: '📜', spriteSheet: 'rare-accessories', spriteIndex: 5 },
  { name: 'Ornate Silver Brooch', type: 'accessory', rarity: 'rare', statBonus: { endurance: 3 }, description: 'Protective clasp', icon: '📎', spriteSheet: 'rare-accessories', spriteIndex: 6 },
  { name: 'Chainmail Gloves', type: 'accessory', rarity: 'rare', statBonus: { strength: 2, endurance: 1 }, description: 'Metal gauntlets', icon: '🧤', spriteSheet: 'rare-accessories', spriteIndex: 7 },
  { name: 'Wooden Totem Mask', type: 'accessory', rarity: 'rare', statBonus: { strength: 3 }, description: 'Tribal power', icon: '🗿', spriteSheet: 'rare-accessories', spriteIndex: 8 },
  { name: 'Blue Potion Vial', type: 'accessory', rarity: 'rare', statBonus: { power: 3 }, description: 'Magical elixir', icon: '🧪', spriteSheet: 'rare-accessories', spriteIndex: 9 },
  { name: 'Striped Feather', type: 'accessory', rarity: 'rare', statBonus: { stamina: 3 }, description: 'Swift movement', icon: '🪶', spriteSheet: 'rare-accessories', spriteIndex: 10 },
  { name: 'Gilded Belt', type: 'accessory', rarity: 'rare', statBonus: { endurance: 3 }, description: 'Golden waistband', icon: '🔗', spriteSheet: 'rare-accessories', spriteIndex: 11 },
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
  // Helmets
  { name: 'Crown of the Sun-Emperor', type: 'armor', rarity: 'legendary', statBonus: { power: 10, stamina: 5 }, description: 'Solar majesty', icon: '👑', spriteSheet: 'legendary-armor', spriteIndex: 0 },
  { name: 'Skull of Eternal Torment', type: 'armor', rarity: 'legendary', statBonus: { power: 8, strength: 8 }, description: 'Cursed with dark power', icon: '💀', spriteSheet: 'legendary-armor', spriteIndex: 1 },
  { name: "Seraphim's Halo-Helm", type: 'armor', rarity: 'legendary', statBonus: { power: 12 }, description: 'Divine radiance', icon: '😇', spriteSheet: 'legendary-armor', spriteIndex: 2 },
  { name: "Tempest Caller's Gale-Hood", type: 'armor', rarity: 'legendary', statBonus: { power: 8, stamina: 8 }, description: 'Commands storms', icon: '🌪️', spriteSheet: 'legendary-armor', spriteIndex: 3 },
  { name: 'Event Horizon Greathelm', type: 'armor', rarity: 'legendary', statBonus: { power: 10, endurance: 5 }, description: 'Void incarnate', icon: '🕳️', spriteSheet: 'legendary-armor', spriteIndex: 4 },
  { name: "Arcanist's Floating Crown", type: 'armor', rarity: 'legendary', statBonus: { power: 15 }, description: 'Ultimate magical power', icon: '🔮', spriteSheet: 'legendary-armor', spriteIndex: 5 },
  // Body Armor
  { name: 'Titan-Core Magma Mail', type: 'armor', rarity: 'legendary', statBonus: { strength: 12, endurance: 8 }, description: 'Molten core armor', icon: '🌋', spriteSheet: 'legendary-armor', spriteIndex: 6 },
  { name: "Voidwalker's Astral Plate", type: 'armor', rarity: 'legendary', statBonus: { endurance: 10, power: 8 }, description: 'Cosmic protection', icon: '✨', spriteSheet: 'legendary-armor', spriteIndex: 7 },
  { name: "Demonlord's Maw-Plate", type: 'armor', rarity: 'legendary', statBonus: { strength: 15 }, description: 'Infernal might', icon: '😈', spriteSheet: 'legendary-armor', spriteIndex: 8 },
  { name: 'Glacial Behemoth Armor', type: 'armor', rarity: 'legendary', statBonus: { endurance: 20 }, description: 'Absolute defense', icon: '🧊', spriteSheet: 'legendary-armor', spriteIndex: 9 },
  { name: 'Soul-Prison Wraithcage', type: 'armor', rarity: 'legendary', statBonus: { stamina: 10, power: 8 }, description: 'Binds spirits', icon: '👻', spriteSheet: 'legendary-armor', spriteIndex: 10 },
  { name: 'Aegis of Pure Radiance', type: 'armor', rarity: 'legendary', statBonus: { endurance: 12, power: 8 }, description: 'Holy barrier', icon: '🛡️', spriteSheet: 'legendary-armor', spriteIndex: 11 },
];

const LEGENDARY_ACCESSORIES: Omit<Item, 'id'>[] = [
  { name: 'Spiked Ruby Amulet', type: 'accessory', rarity: 'legendary', statBonus: { strength: 8 }, description: 'Raw power incarnate', icon: '💎', spriteSheet: 'legendary-accessories', spriteIndex: 0 },
  { name: 'Halo Ring', type: 'accessory', rarity: 'legendary', statBonus: { power: 8 }, description: 'Divine blessing', icon: '💍', spriteSheet: 'legendary-accessories', spriteIndex: 1 },
  { name: 'Cosmic Boots', type: 'accessory', rarity: 'legendary', statBonus: { stamina: 10 }, description: 'Walk among stars', icon: '👢', spriteSheet: 'legendary-accessories', spriteIndex: 2 },
  { name: 'Ancient Runic Tome', type: 'accessory', rarity: 'legendary', statBonus: { power: 12 }, description: 'Ultimate arcane knowledge', icon: '📖', spriteSheet: 'legendary-accessories', spriteIndex: 3 },
  { name: 'Magma Pouch', type: 'accessory', rarity: 'legendary', statBonus: { strength: 5, power: 5 }, description: 'Molten core energy', icon: '🌋', spriteSheet: 'legendary-accessories', spriteIndex: 4 },
  { name: 'Radiant Scroll', type: 'accessory', rarity: 'legendary', statBonus: { power: 8, endurance: 4 }, description: 'Blessed incantation', icon: '📜', spriteSheet: 'legendary-accessories', spriteIndex: 5 },
  { name: 'Phoenix Feather', type: 'accessory', rarity: 'legendary', statBonus: { stamina: 6, power: 6 }, description: 'Eternal rebirth', icon: '🔥', spriteSheet: 'legendary-accessories', spriteIndex: 6 },
  { name: 'Lightning Gloves', type: 'accessory', rarity: 'legendary', statBonus: { power: 8, strength: 4 }, description: 'Storm-wielder gauntlets', icon: '⚡', spriteSheet: 'legendary-accessories', spriteIndex: 7 },
  { name: 'Celestial Shield Ward', type: 'accessory', rarity: 'legendary', statBonus: { endurance: 12 }, description: 'Impenetrable barrier', icon: '🛡️', spriteSheet: 'legendary-accessories', spriteIndex: 8 },
  { name: 'Golden Elixir Vial', type: 'accessory', rarity: 'legendary', statBonus: { endurance: 10 }, description: 'Immortality essence', icon: '🧪', spriteSheet: 'legendary-accessories', spriteIndex: 9 },
  { name: 'Magma Belt', type: 'accessory', rarity: 'legendary', statBonus: { endurance: 8, strength: 4 }, description: 'Volcanic fortitude', icon: '🔥', spriteSheet: 'legendary-accessories', spriteIndex: 10 },
  { name: 'Demon Head Icon', type: 'accessory', rarity: 'legendary', statBonus: { power: 10, strength: 5 }, description: 'Infernal dominion', icon: '😈', spriteSheet: 'legendary-accessories', spriteIndex: 11 },
];

// Enemy templates with level ranges and sprites
interface EnemyTemplate {
  name: string;
  baseHealth: number;
  baseAttack: number;
  baseDefense: number;
  icon: string;
  minLevel: number;  // Minimum player level to encounter
  maxLevel: number;  // Maximum player level before too weak
  spriteIndex: number;
}

const ENEMY_TEMPLATES: EnemyTemplate[] = [
  // Early game (Levels 1-5) - Should still challenge level 1-3 characters
  { name: 'Sewer Slime', baseHealth: 15, baseAttack: 5, baseDefense: 0, icon: '🟢', minLevel: 1, maxLevel: 5, spriteIndex: 0 },
  { name: 'Cellar Rat', baseHealth: 20, baseAttack: 7, baseDefense: 0, icon: '🐀', minLevel: 1, maxLevel: 6, spriteIndex: 1 },
  { name: 'Goblin Scout', baseHealth: 30, baseAttack: 10, baseDefense: 1, icon: '👺', minLevel: 2, maxLevel: 8, spriteIndex: 2 },
  
  // Mid-early game (Levels 4-10) - Should threaten mid-level characters
  { name: 'Restless Skeleton', baseHealth: 40, baseAttack: 13, baseDefense: 1, icon: '💀', minLevel: 4, maxLevel: 11, spriteIndex: 3 },
  { name: 'Shambling Zombie', baseHealth: 50, baseAttack: 16, baseDefense: 2, icon: '🧟', minLevel: 5, maxLevel: 12, spriteIndex: 4 },
  { name: 'Orc Warrior', baseHealth: 65, baseAttack: 20, baseDefense: 3, icon: '👹', minLevel: 7, maxLevel: 15, spriteIndex: 5 },
  
  // Mid game (Levels 10-18) - Dangerous encounters
  { name: 'Crypt Ghoul', baseHealth: 85, baseAttack: 25, baseDefense: 5, icon: '👻', minLevel: 10, maxLevel: 18, spriteIndex: 6 },
  { name: 'Rock Golem', baseHealth: 100, baseAttack: 28, baseDefense: 8, icon: '🗿', minLevel: 12, maxLevel: 20, spriteIndex: 7 },
  { name: 'Lesser Demon', baseHealth: 120, baseAttack: 33, baseDefense: 6, icon: '😈', minLevel: 15, maxLevel: 23, spriteIndex: 8 },
  
  // Late game (Levels 18+) - Deadly threats
  { name: 'Black Knight', baseHealth: 140, baseAttack: 40, baseDefense: 10, icon: '⚔️', minLevel: 18, maxLevel: 28, spriteIndex: 9 },
  { name: 'Necromancer', baseHealth: 130, baseAttack: 45, baseDefense: 8, icon: '🧙', minLevel: 20, maxLevel: 30, spriteIndex: 10 },
  { name: 'Red Dragon', baseHealth: 200, baseAttack: 55, baseDefense: 15, icon: '🐉', minLevel: 22, maxLevel: 30, spriteIndex: 11 },
];

// Generate random item with level-based rarity scaling
export const generateItem = (playerLevel: number): Item => {
  const roll = Math.random() * 100;
  let itemPool: Omit<Item, 'id'>[];
  
  // Level-based rarity chances (RPG-style loot system)
  // Legendary: Only drops after level 10, max 2% at level 30+
  const legendaryChance = playerLevel >= 10 ? Math.min(2, (playerLevel - 10) * 0.1) : 0;
  
  // Rare: Starts at 5% (level 1), increases to 25% at level 15+
  const rareChance = Math.min(25, 5 + (playerLevel * 1.3));
  
  // Common: Makes up the rest (95% at level 1, 73% at level 30)
  // Level 1: 0% legendary, 5% rare, 95% common
  // Level 5: 0% legendary, 11.5% rare, 88.5% common
  // Level 10: 0% legendary, 18% rare, 82% common
  // Level 15: 0.5% legendary, 25% rare, 74.5% common
  // Level 30+: 2% legendary, 25% rare, 73% common
  
  if (roll < legendaryChance) {
    // Legendary - ultra rare
    const legendaryPools = [LEGENDARY_WEAPONS, LEGENDARY_ARMOR, LEGENDARY_ACCESSORIES];
    const pool = legendaryPools[Math.floor(Math.random() * legendaryPools.length)];
    itemPool = pool;
  } else if (roll < legendaryChance + rareChance) {
    // Rare - uncommon
    const rarePools = [RARE_WEAPONS, RARE_ARMOR, RARE_ACCESSORIES];
    const pool = rarePools[Math.floor(Math.random() * rarePools.length)];
    itemPool = pool;
  } else {
    // Common - most frequent
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

// Generate enemy based on difficulty (now uses player level)
export const generateEnemy = (difficulty: number, isBoss: boolean = false): Enemy => {
  // Filter enemies that are appropriate for this level
  const validEnemies = ENEMY_TEMPLATES.filter(
    e => difficulty >= e.minLevel && difficulty <= e.maxLevel
  );
  
  // If no valid enemies (shouldn't happen), fall back to first enemy
  const enemyPool = validEnemies.length > 0 ? validEnemies : [ENEMY_TEMPLATES[0]];
  
  // Select random enemy from valid pool
  const template = enemyPool[Math.floor(Math.random() * enemyPool.length)];
  
  // Boss multiplier - scales with difficulty (weaker at low levels)
  // Level 1-5: 2.0x, Level 10: 2.8x, Level 20+: 3.5x
  const bossMultiplier = isBoss ? Math.min(3.5, 2.0 + (difficulty * 0.08)) : 1;
  
  // Progressive difficulty scaling that's gentler at low levels but brutal at high levels
  // Level 1: 1.0x (base difficulty for new players)
  // Level 2: 1.15x
  // Level 3: 1.3x
  // Level 5: 1.6x
  // Level 10: 2.6x
  // Level 15: 3.6x
  // Level 20+: 4.6x+
  const difficultyMultiplier = difficulty <= 1 
    ? 1.0  // First dungeon at base difficulty
    : 1.0 + Math.pow(difficulty - 1, 1.3) * 0.15;  // Exponential scaling after level 1
  
  // Scale health with some randomness (increased variance for tougher encounters)
  const health = Math.floor(template.baseHealth * bossMultiplier * difficultyMultiplier * (Math.random() * 0.3 + 0.85));
  
  return {
    id: `enemy_${Date.now()}_${Math.random()}`,
    name: isBoss ? `${template.name} Boss` : template.name,
    health,
    maxHealth: health,
    attack: Math.floor(template.baseAttack * bossMultiplier * difficultyMultiplier),
    defense: Math.floor(template.baseDefense * bossMultiplier * difficultyMultiplier),
    icon: template.icon,
    spriteSheet: 'enemy-sprites',
    spriteIndex: template.spriteIndex,
  };
};

// Generate a complete dungeon
export const generateDungeon = (difficulty: number, playerStamina: number = 0): Dungeon => {
  const numRooms = 5 + Math.floor(difficulty / 2); // More rooms at higher difficulty
  const rooms: DungeonRoom[] = [];
  
  // Stamina improves dungeon efficiency:
  // - Reduces empty room chance (base 20% down to 5% at high stamina)
  // - Increases treasure room chance slightly
  const staminaBonus = Math.min(playerStamina * 0.01, 0.15); // Max 15% bonus at 15+ stamina
  const emptyRoomChance = Math.max(0.05, 0.2 - staminaBonus); // 20% -> 5%
  const treasureChance = 0.2 + (staminaBonus * 0.5); // 20% -> 27.5%
  
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
    } else if (roll < 0.6 + treasureChance) {
      roomType = 'treasure';
      loot = [generateItem(difficulty)];
    } else if (roll >= 1 - emptyRoomChance) {
      roomType = 'empty';
    } else {
      // Fill remaining probability with enemy rooms
      roomType = 'enemy';
      enemy = generateEnemy(difficulty);
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
