import React from 'react';
import './WorkoutLimitModal.css';

interface WorkoutLimitModalProps {
  open: boolean;
  onClose: () => void;
}

export const WorkoutLimitModal: React.FC<WorkoutLimitModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="workout-limit-modal">
        <h2>🏋️ Workout Logging Info</h2>
        <p style={{ fontSize: '1.1rem', color: '#e2e8f0', marginBottom: '2rem' }}>
          Eventually, you'll be limited to logging <strong>two workouts a day</strong> — we don't want you to overdo it!<br /><br />
          <span style={{ color: '#ffd700', fontWeight: 600 }}>
            During beta testing, though, workouts are unlimited.<br />
            Feel free to test through some dungeon runs!
          </span>
        </p>
        <button className="workout-limit-close-btn" onClick={onClose}>Got it!</button>
      </div>
    </div>
  );
};
