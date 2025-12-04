# ⚔️ Dungeon Gains

A gamified fitness tracking app that combines workout logging with retro dungeon crawler mechanics. Transform your real-world fitness gains into epic adventures!

## 🎮 Concept

**Dungeon Gains** turns your workout routine into an RPG adventure. Your character's stats are directly tied to your real-life fitness metrics, and every workout you complete unlocks a dungeon run filled with enemies, loot, and rewards.

### Key Features

- **📊 Stat-Based Character System**: Your starting character stats are calculated from your actual lifts and cardio performance
  - Bench Press → Strength
  - Squat → Power
  - Overhead Press → Endurance
  - Mile Time → Stamina

- **💪 Workout Logging**: Track exercises with weight, sets, reps, or time
  - Log bench press, squats, overhead press, and cardio
  - **NEW**: Browse hundreds of exercises from API Ninjas database
  - Filter by muscle group (biceps, triceps, chest, back, legs, etc.)
  - Add accessory exercises to your routine
  - Automatic XP gain for completed workouts
  - Each completed workout unlocks a dungeon run

- **🏆 Personal Records (PRs)**: Hit a new PR to earn permanent stat buffs
  - Beat your previous best to level up your character
  - PRs provide permanent increases to relevant stats

- **🏰 Procedural Dungeon Crawler**: Complete dungeons to earn loot
  - Turn-based combat system
  - Randomized rooms with enemies, treasure, and bosses
  - Difficulty scales with your character level

- **⚔️ Loot & Equipment System**: Find weapons, armor, and accessories
  - 5 rarity tiers: Common, Uncommon, Rare, Epic, Legendary
  - Equipment provides stat bonuses
  - Build your perfect loadout

## 🚀 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety and better DX
- **Vite** - Lightning-fast build tool
- **CSS Modules** - Scoped component styling
- **Local Storage** - Client-side save system

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/bobbyisonline/Dungeon-Gains.git

# Navigate to the project
cd Dungeon-Gains/dungeon-gains

# Install dependencies
npm install

# (Optional) Set up API key for exercise database
# Copy .env.example to .env and add your API Ninjas key
cp .env.example .env
# Get your free API key at: https://api-ninjas.com/

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to start your adventure!

**Note**: The exercise database browser is optional. The app works fully without an API key, but you'll only have access to the 4 preset exercises (bench, squat, overhead press, running).

## 🎮 How to Play

1. **Create Your Character**
   - Enter your hero's name
   - Input your current fitness stats (bench, squat, overhead press, mile time)
   - Your character stats are automatically generated

2. **Log Your Workouts**
   - Add exercises from the workout logger
   - Track weight, sets, reps (or time for cardio)
   - Complete the workout to unlock a dungeon run

3. **Conquer Dungeons**
   - Enter an unlocked dungeon from the dashboard
   - Battle through procedurally generated rooms
   - Defeat enemies and collect loot
   - Face the boss at the end

4. **Level Up & Get Stronger**
   - Earn XP from workouts to level up
   - Hit PRs to gain permanent stat buffs
   - Equip better gear from dungeon rewards
   - Tackle higher difficulty dungeons

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── CharacterCreation/
│   ├── Dashboard/
│   ├── WorkoutLogger/
│   └── DungeonCrawler/
├── context/            # React Context for state management
├── types/              # TypeScript type definitions
├── utils/              # Game logic and helpers
│   ├── gameLogic.ts    # Stats, combat, progression
│   ├── dungeonGenerator.ts  # Procedural generation
│   └── storage.ts      # Local storage utilities
└── App.tsx             # Main application component
```

## 🎨 Design Philosophy

- **Retro Runescape Aesthetic**: Classic MMORPG-inspired UI with pixel fonts and beveled borders
- **VT323 & Press Start 2P Fonts**: Authentic retro gaming typography
- **Brown/Gold Color Palette**: Inspired by classic Runescape interface
- **Beveled Panel Design**: 3D-effect borders with highlights and shadows
- **Mobile Responsive**: Fully functional on desktop and mobile devices
- **Clear Feedback**: Visual indicators for all actions and progress

## 🔮 Future Enhancements

- [x] More exercise types and categories (API integration complete!)
- [ ] Achievement system
- [ ] Multiple save slots
- [ ] Export/import save data
- [ ] Multiplayer leaderboards
- [ ] More enemy types and bosses
- [ ] Crafting system
- [ ] Daily challenges
- [ ] Backend integration for cloud saves

## 📝 License

MIT License - feel free to use this project for your own portfolio or fork it to add features!

## 👨‍💻 Author

**Bobby**
- GitHub: [@bobbyisonline](https://github.com/bobbyisonline)

## 🙏 Acknowledgments

This project was created as a portfolio piece to demonstrate:
- React & TypeScript proficiency
- State management patterns
- Game mechanics implementation
- UI/UX design skills
- Clean code architecture

---

**Made with 💪 and ⚔️**
Dungeon Gains is a React + TypeScript workout tracker fused with a retro dungeon crawler. Log lifts and runs, earn loot, and boost your character’s stats. PRs grant permanent buffs, and each workout unlocks a randomized dungeon run powered by your real-world progress.
