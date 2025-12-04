import React from 'react';
import './DeathModal.css';

interface DeathModalProps {
  onReturnHome: () => void;
}

export const DeathModal: React.FC<DeathModalProps> = ({ onReturnHome }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content death-modal">
        <div className="death-icon">💀</div>
        <h2>You Died</h2>
        <p>You were defeated in the dungeon...</p>
        <p className="death-message">Return home to rest and recover your strength.</p>
        <button onClick={onReturnHome} className="btn-return-home">
          Return Home
        </button>
      </div>
    </div>
  );
};
