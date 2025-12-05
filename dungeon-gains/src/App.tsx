import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Analytics } from '@vercel/analytics/react';
import { GameProvider, useGame } from './context/GameContext';
import { CharacterCreation } from './components/CharacterCreation/CharacterCreation';
import { Dashboard } from './components/Dashboard/Dashboard';
import { WorkoutLogger } from './components/WorkoutLogger/WorkoutLogger';
import { DungeonCrawler } from './components/DungeonCrawler/DungeonCrawler';
import { WorkoutHistory } from './components/WorkoutHistory/WorkoutHistory';
import { FeedbackModal } from './components/FeedbackModal/FeedbackModal';
import './styles/sprites.css';
import './App.css';

type View = 'dashboard' | 'workout' | 'history';

function GameContent() {
  const { gameState, isLoadingGame } = useGame();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [showFeedback, setShowFeedback] = useState(false);

  if (isLoadingGame) {
    return (
      <div className="rs-panel" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
        <h2>⚔️ Loading Your Adventure...</h2>
        <p style={{ fontSize: '1.2rem', margin: '2rem 0' }}>
          Retrieving your character data...
        </p>
      </div>
    );
  }

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
      case 'history':
        return <WorkoutHistory />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      {!gameState.currentDungeon && (
        <nav className="main-nav" style={{ borderTop: 'none' }}>
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
            <button 
              className={currentView === 'history' ? 'active' : ''}
              onClick={() => setCurrentView('history')}
            >
              📅 History
            </button>
            <button 
              onClick={() => setShowFeedback(true)}
              className="feedback-btn"
            >
              📝 Feedback
            </button>
          </div>
        </nav>
      )}
      
      <main className="main-content">
        {renderView()}
      </main>

      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
}

function App() {
  const [guestMode, setGuestMode] = useState(false);

  return (
    <div className="app-container">
      <nav className="main-nav">
        <div className="nav-brand">
          <h1>⚔️ Dungeon Gains</h1>
        </div>
        <div className="nav-auth">
          <SignedOut>
            {!guestMode && <SignInButton mode="modal" />}
            {guestMode && <button onClick={() => setGuestMode(false)} className="rs-button" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>🔐 Sign In</button>}
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      
      <SignedOut>
        {!guestMode ? (
          <main className="main-content">
            <div className="rs-panel" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
              <h2>🎮 Welcome to Dungeon Gains!</h2>
              <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
                Transform your workouts into epic RPG adventures. Track your lifts, battle monsters, 
                and watch your character grow stronger as you do!
              </p>
              <p style={{ marginBottom: '2rem', color: 'var(--rs-gold)' }}>
                Please sign in to create your hero and start your journey.
              </p>
              <SignInButton mode="modal">
                <button className="rs-button" style={{ fontSize: '1.2rem', padding: '1rem 2rem', marginBottom: '1rem' }}>
                  🗡️ Sign In to Start
                </button>
              </SignInButton>
              
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(102, 126, 234, 0.1)', border: '2px solid rgba(102, 126, 234, 0.3)', borderRadius: '8px' }}>
                <p style={{ color: '#cbd5e0', marginBottom: '1rem', fontSize: '1rem' }}>
                  🎯 Just testing? Want to try it out first?
                </p>
                <button 
                  onClick={() => setGuestMode(true)} 
                  className="rs-button"
                  style={{ fontSize: '1rem', padding: '0.75rem 1.5rem', background: 'rgba(102, 126, 234, 0.2)', border: '2px solid #667eea' }}
                >
                  👤 Play as Guest
                </button>
                <p style={{ color: '#9ca3af', marginTop: '0.75rem', fontSize: '0.9rem' }}>
                  Progress saved locally only. Sign in anytime to sync to cloud!
                </p>
              </div>
            </div>
          </main>
        ) : (
          <GameProvider>
            <GameContent />
          </GameProvider>
        )}
      </SignedOut>

      <SignedIn>
        <GameProvider>
          <GameContent />
        </GameProvider>
      </SignedIn>
      
      <Analytics />
    </div>
  );
}

export default App;
