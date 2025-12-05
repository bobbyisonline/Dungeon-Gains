import React from 'react';
import './WipModal.css';

interface WipModalProps {
  open: boolean;
  onClose: () => void;
}

export const WipModal: React.FC<WipModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="wip-modal">
        <h2>🚧 Work In Progress 🚧</h2>
        <p>
          This app is still under active development.<br />
          Any and all feedback is <strong>greatly appreciated</strong>!
        </p>
        <button className="wip-close-btn" onClick={onClose}>Got it!</button>
      </div>
    </div>
  );
};
