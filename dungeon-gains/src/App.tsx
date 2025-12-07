import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Analytics } from '@vercel/analytics/react';
import { GameProvider, useGame } from './context/GameContext';
import { CharacterCreation } from './components/CharacterCreation/CharacterCreation';
import { Dashboard } from './components/Dashboard/Dashboard';
import { WorkoutLogger } from './components/WorkoutLogger/WorkoutLogger';
import { DungeonCrawler } from './components/DungeonCrawler/DungeonCrawler';
import { WorkoutHistory } from './components/WorkoutHistory/WorkoutHistory';
import { FeedbackModal } from './components/FeedbackModal/FeedbackModal';
import { useOnboardingTour } from './components/OnboardingTour/OnboardingTour';
import './styles/sprites.css';
import './App.css';
import { DemoDashboard } from './components/DemoDashboard/DemoDashboard';

function GameContent() {
  const { gameState, isLoadingGame } = useGame();
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Effect to handle dungeon state and navigation
  useEffect(() => {
    if (!gameState) return;
    
    if (gameState.currentDungeon && location.pathname !== '/dungeon') {
      navigate('/dungeon');
    } else if (!gameState.currentDungeon && location.pathname === '/dungeon') {
      navigate('/');
    }
  }, [gameState?.currentDungeon, navigate, location.pathname]);

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

  // Hide nav during dungeon
  const inDungeon = location.pathname === '/dungeon';

  return (
    <>
      {!inDungeon && (
        <nav className="main-nav" style={{ borderTop: 'none' }}>
          <div className="nav-links">
            <NavLink 
              to="/"
              className={({ isActive }) => isActive ? 'active' : ''}
              end
            >
              🏠 Dashboard
            </NavLink>
            <NavLink 
              to="/workout"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              💪 Log Workout
            </NavLink>
            <NavLink 
              to="/history"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              📅 History
            </NavLink>
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
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workout" element={<WorkoutLogger />} />
          <Route path="/history" element={<WorkoutHistory />} />
          <Route path="/dungeon" element={gameState.currentDungeon ? <DungeonCrawler /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
}

function App() {
  const [demoMode, setDemoMode] = useState(() => {
    // Start in demo mode if user hasn't completed the onboarding tour
    return !localStorage.getItem('dungeon_gains_onboarding_completed');
  });

  const handleTourComplete = () => {
    localStorage.setItem('dungeon_gains_onboarding_completed', 'true');
    setDemoMode(false);
  };

  // Initialize the onboarding tour
  const { startTour } = useOnboardingTour({ onComplete: handleTourComplete });

  return (
    <div className="app-container">
      <nav className="main-nav">
        <div className="nav-brand">
          <h1>⚔️ Dungeon Gains</h1>
        </div>
        <div className="nav-auth">
          <SignedOut>
            {demoMode ? (
              <button onClick={handleTourComplete} className="rs-button" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                🎮 Start Playing
              </button>
            ) : (
              <SignInButton mode="modal" />
            )}
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      
      <SignedOut>
        {demoMode ? (
          <DemoDashboard onStartTour={startTour} />
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
