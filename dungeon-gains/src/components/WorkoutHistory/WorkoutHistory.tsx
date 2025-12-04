import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import type { WorkoutLog } from '../../types';
import './WorkoutHistory.css';

export const WorkoutHistory = () => {
  const { gameState } = useGame();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (!gameState) return null;

  const { player } = gameState;

  // Get workouts for a specific date
  const getWorkoutsForDate = (date: Date): WorkoutLog[] => {
    const dateStr = date.toISOString().split('T')[0];
    return player.workoutLogs.filter(log => {
      const logDate = new Date(log.date).toISOString().split('T')[0];
      return logDate === dateStr;
    });
  };

  // Check if a date has workouts
  const hasWorkout = (date: Date): boolean => {
    return getWorkoutsForDate(date).length > 0;
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  const selectedWorkouts = selectedDate
    ? getWorkoutsForDate(new Date(selectedDate))
    : [];

  return (
    <div className="workout-history">
      <h2>📅 Workout History</h2>

      <div className="history-container">
        <div className="calendar-section">
          <div className="calendar-header">
            <button onClick={previousMonth} className="rs-button calendar-nav">◀</button>
            <h3 className="month-title">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button onClick={nextMonth} className="rs-button calendar-nav">▶</button>
          </div>

          <div className="calendar-grid">
            {dayNames.map(day => (
              <div key={day} className="calendar-day-name">
                {day}
              </div>
            ))}
            {calendarDays.map((date, idx) => {
              if (!date) {
                return <div key={`empty-${idx}`} className="calendar-day empty"></div>;
              }

              const hasWorkoutOnDate = hasWorkout(date);
              const dateStr = date.toISOString().split('T')[0];
              const isSelected = selectedDate === dateStr;
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={idx}
                  className={`calendar-day ${hasWorkoutOnDate ? 'has-workout' : ''} ${
                    isSelected ? 'selected' : ''
                  } ${isToday ? 'today' : ''}`}
                  onClick={() => {
                    if (hasWorkoutOnDate) {
                      setSelectedDate(dateStr);
                    }
                  }}
                >
                  <span className="day-number">{date.getDate()}</span>
                  {hasWorkoutOnDate && <span className="workout-indicator">💪</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="workout-details-section">
          {!selectedDate ? (
            <div className="no-selection">
              <p>📋 Select a day with a workout to view details</p>
              <p className="hint">Days with 💪 have logged workouts</p>
            </div>
          ) : selectedWorkouts.length === 0 ? (
            <div className="no-selection">
              <p>No workouts on this day</p>
            </div>
          ) : (
            <div className="workout-details">
              <h3 className="details-title">
                Workout Details
                <span className="details-date">
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </h3>

              {selectedWorkouts.map((workout, workoutIdx) => (
                <div key={workout.id} className="workout-summary">
                  {selectedWorkouts.length > 1 && (
                    <h4>Workout #{workoutIdx + 1}</h4>
                  )}
                  
                  <div className="exercises-summary">
                    {workout.exercises.map((exercise, exIdx) => (
                      <div key={exIdx} className="exercise-row">
                        <div className="exercise-name">
                          <span className="exercise-icon">🏋️</span>
                          {exercise.name}
                        </div>
                        <div className="exercise-stats">
                          {exercise.weight && (
                            <span className="stat-badge">
                              {exercise.weight} lbs × {exercise.sets} sets × {exercise.reps} reps
                            </span>
                          )}
                          {exercise.time && (
                            <span className="stat-badge">
                              {(exercise.time / 60).toFixed(1)} minutes
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="workout-stats">
                    <div className="stat-item">
                      <span className="stat-label">Total Exercises:</span>
                      <span className="stat-value">{workout.exercises.length}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Dungeon Unlocked:</span>
                      <span className="stat-value">{workout.completed ? '✅ Yes' : '❌ No'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
