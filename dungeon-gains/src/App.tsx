import { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { CharacterCreation } from './components/CharacterCreation/CharacterCreation';
import { Dashboard } from './components/Dashboard/Dashboard';
import { WorkoutLogger } from './components/WorkoutLogger/WorkoutLogger';
import { DungeonCrawler } from './components/DungeonCrawler/DungeonCrawler';
import './styles/sprites.css';
import './App.css';

type View = 'dashboard' | 'workout' | 'dungeon' | 'inventory';

function GameContent() {
  const { gameState, resetGame } = useGame();
  const [currentView, setCurrentView] = useState<View>('dashboard');

  if (!gameState) {
    return <CharacterCreation />;
  }

  const renderView = () => {
    if (gameState.currentDungeon) {
      return <DungeonCrawler />;
    }

    switch (currentView) {
      case 'workout':
        return <WorkoutLogger />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <nav className="main-nav">
        <div className="nav-brand">
          <h1>⚔️ Dungeon Gains</h1>
        </div>
        {!gameState.currentDungeon && (
          <div className="nav-links">
            <button 
              className={currentView === 'dashboard' ? 'active' : ''}
              onClick={() => setCurrentView('dashboard')}
            >
              🏠 Dashboard
            </button>
            <button 
              className={currentView === 'workout' ? 'active' : ''}
              onClick={() => setCurrentView('workout')}
            >
              💪 Log Workout
            </button>
            <button onClick={resetGame} className="btn-reset">
              🔄 Reset
            </button>
          </div>
        )}
      </nav>
      
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;
