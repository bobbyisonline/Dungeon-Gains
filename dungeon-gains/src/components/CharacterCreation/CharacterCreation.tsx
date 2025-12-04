import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import '../../styles/runescape.css';
import './CharacterCreation.css';

export const CharacterCreation = () => {
  const { createCharacter } = useGame();
  const [name, setName] = useState('');
  const [benchPress, setBenchPress] = useState(135);
  const [squat, setSquat] = useState(185);
  const [overheadPress, setOverheadPress] = useState(95);
  const [mileTime, setMileTime] = useState(8.5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createCharacter(name, benchPress, squat, overheadPress, mileTime);
    }
  };

  return (
    <div className="character-creation">
      <div className="creation-container rs-panel">
        <h1 className="rs-text-gold">⚔️ Create Your Hero ⚔️</h1>
        <p className="subtitle">Enter your current fitness stats to generate your character</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Hero Name</label>
            <input
              className="rs-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your hero's name"
              required
            />
          </div>

          <div className="stats-grid">
            <div className="form-group">
              <label>💪 Bench Press (lbs)</label>
              <input
                className="rs-input"
                type="number"
                value={benchPress}
                onChange={(e) => setBenchPress(Number(e.target.value))}
                min="0"
              />
              <span className="stat-hint">→ Strength</span>
            </div>

            <div className="form-group">
              <label>🦵 Squat (lbs)</label>
              <input
                className="rs-input"
                type="number"
                value={squat}
                onChange={(e) => setSquat(Number(e.target.value))}
                min="0"
              />
              <span className="stat-hint">→ Power</span>
            </div>

            <div className="form-group">
              <label>🏋️ Overhead Press (lbs)</label>
              <input
                className="rs-input"
                type="number"
                value={overheadPress}
                onChange={(e) => setOverheadPress(Number(e.target.value))}
                min="0"
              />
              <span className="stat-hint">→ Endurance</span>
            </div>

            <div className="form-group">
              <label>🏃 Mile Time (minutes)</label>
              <input
                className="rs-input"
                type="number"
                step="0.1"
                value={mileTime}
                onChange={(e) => setMileTime(Number(e.target.value))}
                min="4"
                max="20"
              />
              <span className="stat-hint">→ Stamina</span>
            </div>
          </div>

          <button type="submit" className="rs-button rs-button-primary">Begin Your Journey</button>
        </form>
      </div>
    </div>
  );
};
