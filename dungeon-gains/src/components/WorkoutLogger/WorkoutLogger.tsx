import { useState, useEffect } from 'react';
import type { Exercise, WorkoutLog } from '../../types';
import { useGame } from '../../context/GameContext';
import { fetchExercises, mapMuscleToStat, mapMuscleToCategory, type APIExercise } from '../../services/exerciseApi';
import '../../styles/runescape.css';
import './WorkoutLogger.css';

const EXERCISE_PRESETS = [
  { id: 'bench', name: 'Bench Press', category: 'bench' as const, statType: 'strength' as const },
  { id: 'squat', name: 'Squat', category: 'squat' as const, statType: 'power' as const },
  { id: 'ohp', name: 'Overhead Press', category: 'overhead' as const, statType: 'endurance' as const },
  { id: 'deadlift', name: 'Deadlift', category: 'squat' as const, statType: 'stamina' as const },
];

export const WorkoutLogger = () => {
  const { logWorkout, gameState } = useGame();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedPreset, setSelectedPreset] = useState(EXERCISE_PRESETS[0]);
  const [weight, setWeight] = useState(135);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [time, setTime] = useState(8.5);
  
  // API Exercise Browser
  const [showBrowser, setShowBrowser] = useState(false);
  const [apiExercises, setApiExercises] = useState<APIExercise[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState('biceps');
  const [loading, setLoading] = useState(false);
  
  // Exercise editing
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (showBrowser && apiExercises.length === 0) {
      loadExercises();
    }
  }, [showBrowser]);

  const loadExercises = async () => {
    setLoading(true);
    const results = await fetchExercises({ muscle: selectedMuscle });
    setApiExercises(results);
    setLoading(false);
  };

  const addExercise = () => {
    const newExercise: Exercise = {
      id: selectedPreset.id,
      name: selectedPreset.name,
      category: selectedPreset.category,
      statType: selectedPreset.statType,
      weight,
      sets,
      reps,
    };

    setExercises([...exercises, { ...newExercise, id: `${newExercise.id}_${Date.now()}` }]);
  };

  const addApiExercise = (apiEx: APIExercise) => {
    const category = mapMuscleToCategory(apiEx.muscle);
    const statType = mapMuscleToStat(apiEx.muscle);
    
    const newExercise: Exercise = {
      id: `api_${Date.now()}`,
      name: apiEx.name,
      category,
      statType,
      muscle: apiEx.muscle,
      weight: 50, // Default weight
      sets: 3,
      reps: 10,
    };

    setExercises([...exercises, newExercise]);
    setShowBrowser(false);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
    setEditingIndex(null);
  };

  const updateExercise = (index: number, field: string, value: number) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const completeWorkout = () => {
    if (exercises.length === 0) return;

    const workout: WorkoutLog = {
      id: `workout_${Date.now()}`,
      date: new Date().toISOString(),
      exercises,
      completed: true,
      dungeonCompleted: false,
    };

    logWorkout(workout);
    setExercises([]);
    alert('🎉 Workout logged! You unlocked a dungeon run!');
  };

  const isCardio = false; // No cardio presets anymore

  return (
    <div className="workout-logger">
      <h2>📋 Log Workout</h2>
      
      <div className="logger-container">
        <div className="add-exercise-section">
          <h3>Add Exercise</h3>
          
          <div className="form-group">
            <label>Exercise</label>
            <select 
              value={selectedPreset.id}
              onChange={(e) => setSelectedPreset(EXERCISE_PRESETS.find(p => p.id === e.target.value)!)}
            >
              {EXERCISE_PRESETS.map(preset => (
                <option key={preset.id} value={preset.id}>{preset.name}</option>
              ))}
            </select>
          </div>

          {!isCardio ? (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Weight (lbs)</label>
                  <input 
                    type="number" 
                    value={weight} 
                    onChange={(e) => setWeight(Number(e.target.value))}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Sets</label>
                  <input 
                    type="number" 
                    value={sets} 
                    onChange={(e) => setSets(Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>Reps</label>
                  <input 
                    type="number" 
                    value={reps} 
                    onChange={(e) => setReps(Number(e.target.value))}
                    min="1"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="form-group">
              <label>Time (minutes)</label>
              <input 
                type="number" 
                step="0.1"
                value={time} 
                onChange={(e) => setTime(Number(e.target.value))}
                min="1"
              />
            </div>
          )}

          <button onClick={addExercise} className="btn-secondary">+ Add to Workout</button>
          <button onClick={() => setShowBrowser(!showBrowser)} className="btn-secondary" style={{ marginTop: '0.5rem' }}>
            📚 Browse More Exercises
          </button>
        </div>

        <div className="exercises-list">
          <h3>Today's Workout</h3>
          {exercises.length === 0 ? (
            <p className="empty-state">No exercises added yet</p>
          ) : (
            <>
              {exercises.map((ex, idx) => (
                <div key={idx} className="exercise-item">
                  {editingIndex === idx ? (
                    <div className="exercise-edit">
                      <strong>{ex.name}</strong>
                      {ex.category !== 'cardio' ? (
                        <div className="edit-inputs">
                          <div className="edit-field">
                            <label>Weight</label>
                            <input
                              type="number"
                              value={ex.weight}
                              onChange={(e) => updateExercise(idx, 'weight', Number(e.target.value))}
                              min="0"
                            />
                          </div>
                          <div className="edit-field">
                            <label>Sets</label>
                            <input
                              type="number"
                              value={ex.sets}
                              onChange={(e) => updateExercise(idx, 'sets', Number(e.target.value))}
                              min="1"
                            />
                          </div>
                          <div className="edit-field">
                            <label>Reps</label>
                            <input
                              type="number"
                              value={ex.reps}
                              onChange={(e) => updateExercise(idx, 'reps', Number(e.target.value))}
                              min="1"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="edit-inputs">
                          <div className="edit-field">
                            <label>Time (min)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={((ex.time || 0) / 60).toFixed(1)}
                              onChange={(e) => updateExercise(idx, 'time', Number(e.target.value) * 60)}
                              min="1"
                            />
                          </div>
                        </div>
                      )}
                      <div className="edit-actions">
                        <button onClick={() => setEditingIndex(null)} className="btn-edit-done">✓ Done</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="exercise-info">
                        <strong>{ex.name}</strong>
                        {ex.category !== 'cardio' ? (
                          <span>{ex.weight}lbs × {ex.sets} sets × {ex.reps} reps</span>
                        ) : (
                          <span>{((ex.time || 0) / 60).toFixed(1)} minutes</span>
                        )}
                      </div>
                      <div className="exercise-actions">
                        <button onClick={() => setEditingIndex(idx)} className="btn-edit">✎</button>
                        <button onClick={() => removeExercise(idx)} className="btn-remove">×</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              
              <button onClick={completeWorkout} className="btn-primary">
                Complete Workout & Unlock Dungeon
              </button>
            </>
          )}
        </div>

        {gameState && (
          <div className="available-dungeons">
            <p>🗝️ Available Dungeon Runs: <strong>{gameState.availableDungeons}</strong></p>
          </div>
        )}
      </div>

      {showBrowser && (
        <div className="exercise-browser-modal">
          <div className="modal-content rs-panel">
            <div className="modal-header">
              <h3 className="rs-text-gold">Exercise Database</h3>
              <button onClick={() => setShowBrowser(false)} className="btn-close">×</button>
            </div>
            
            <div className="browser-controls">
              <label>Target Muscle:</label>
              <select 
                className="rs-input"
                value={selectedMuscle} 
                onChange={(e) => setSelectedMuscle(e.target.value)}
              >
                <option value="biceps">Biceps</option>
                <option value="triceps">Triceps</option>
                <option value="chest">Chest</option>
                <option value="forearms">Forearms</option>
                <option value="lats">Lats</option>
                <option value="middle_back">Middle Back</option>
                <option value="lower_back">Lower Back</option>
                <option value="neck">Neck</option>
                <option value="quadriceps">Quadriceps</option>
                <option value="hamstrings">Hamstrings</option>
                <option value="calves">Calves</option>
                <option value="glutes">Glutes</option>
                <option value="abdominals">Abdominals</option>
                <option value="shoulders">Shoulders</option>
                <option value="traps">Traps</option>
              </select>
              <button onClick={loadExercises} className="rs-button" style={{ marginTop: '0.5rem' }}>
                🔍 Search
              </button>
            </div>

            {loading ? (
              <p className="loading-text">Loading exercises...</p>
            ) : (
              <div className="exercise-results">
                {apiExercises.length === 0 ? (
                  <p className="empty-state">No exercises found. Try searching!</p>
                ) : (
                  apiExercises.slice(0, 10).map((ex, idx) => (
                    <div key={idx} className="exercise-result-item">
                      <div className="result-info">
                        <strong>{ex.name}</strong>
                        <span className="result-meta">
                          {ex.muscle} • {ex.difficulty}
                        </span>
                      </div>
                      <button 
                        onClick={() => addApiExercise(ex)} 
                        className="rs-button rs-button-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '1.1rem' }}
                      >
                        +
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
