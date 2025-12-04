# Sprite System Setup Guide

## ✅ What's Been Implemented

1. **Sprite CSS System** (`src/styles/sprites.css`)
   - Handles 4x4 grid layout (64x64 pixel sprites)
   - Pixelated rendering for crisp retro look
   - Three size variants: small (32px), normal (64px), large (96px)
   - Background-position classes for all 15 sword positions

2. **ItemIcon Component** (`src/components/ItemSprite.tsx`)
   - Unified component that handles both sprites and emoji fallbacks
   - Automatically uses sprites when `spriteSheet` and `spriteIndex` are provided
   - Falls back to emoji icons when sprite data is missing

3. **Type Updates** (`src/types/index.ts`)
   - Added `spriteSheet?: string` field to Item interface
   - Added `spriteIndex?: number` field to Item interface

4. **Weapon Data Updates** (`src/utils/dungeonGenerator.ts`)
   - All 11 common swords now have sprite data mapped
   - Sprite indices match the grid positions (0-10)

5. **Component Integration**
   - Dashboard equipment slots now use ItemIcon
   - Dashboard inventory modal now uses ItemIcon
   - DungeonCrawler loot display now uses ItemIcon

## 📋 Final Steps to Complete

### 1. Save the Sprite Sheet
Save your `common-swords.png` image to:
```
public/sprites/common-swords.png
```

### 2. Verify Grid Mapping
The current mapping assumes sprites are ordered left-to-right, top-to-bottom:
```
Row 0: [0]  [1]  [2]  [3]
Row 1: [4]  [5]  [6]  [7]
Row 2: [8]  [9]  [10] [11]
Row 3: [12] [13] [14] [empty]
```

If your swords are in a different order, update the `spriteIndex` values in `dungeonGenerator.ts` to match.

### 3. Test It Out
1. Start the dev server: `npm run dev`
2. Complete a dungeon and collect a common sword
3. Check the inventory to see if the sprite appears
4. If sprites don't show, open browser DevTools and check:
   - Network tab: Is `common-swords.png` loading?
   - Console: Any CSS/image errors?
   - Elements tab: Inspect the sprite div - is background-position correct?

## 🎨 Adding More Sprite Sheets

When you have sprite sheets for rare/legendary swords, axes, bows, etc:

1. Save them to `public/sprites/` (e.g., `rare-swords.png`, `common-axes.png`)

2. Add CSS classes to `src/styles/sprites.css`:
```css
.sprite-rare-swords {
  background-image: url('/sprites/rare-swords.png');
}
```

3. Update weapon data in `dungeonGenerator.ts`:
```typescript
{ 
  name: 'Frostline Sabre', 
  // ... other properties
  spriteSheet: 'rare-swords', 
  spriteIndex: 0 
}
```

## 🔧 Troubleshooting

**Sprites not showing?**
- Check file path: Must be `public/sprites/common-swords.png`
- Check browser console for 404 errors
- Verify sprite sheet dimensions match CSS (256x256 for 4x4 grid of 64px sprites)

**Sprites blurry?**
- Make sure `image-rendering: pixelated` is applied
- Check that sprite sheet is pixel-perfect (no anti-aliasing)

**Wrong sprite appearing?**
- Double-check `spriteIndex` matches the grid position
- Remember: indices start at 0, not 1
- Verify background-position values in CSS (multiples of -64px)

## 📦 Future Enhancements

- **Sprite sheets for all weapon types** (axes, bows, hammers, etc.)
- **Armor sprite sheets** (helmets, chest pieces, boots, etc.)
- **Animated sprites** for attacks/damage
- **Hover effects** to make items pop
- **Sprite variants** for different quality levels
