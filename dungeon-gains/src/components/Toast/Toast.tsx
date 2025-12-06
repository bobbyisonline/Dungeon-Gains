import { useState, useEffect } from 'react';
import './Toast.css';

interface ToastProps {
  show: boolean;
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  onClose: () => void;
  duration?: number; // Auto-dismiss after this many ms (0 = never)
  icon?: string;
}

export const Toast: React.FC<ToastProps> = ({
  show,
  title,
  message,
  buttonText,
  onButtonClick,
  onClose,
  duration = 10000,
  icon = '🎁'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (show) {
      // Small delay to trigger CSS transition
      setTimeout(() => setIsVisible(true), 50);
      
      // Auto-dismiss after duration (if set)
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [show, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsLeaving(false);
      onClose();
    }, 300); // Match CSS transition duration
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    handleClose();
  };

  if (!show && !isVisible) return null;

  return (
    <div className={`toast-container ${isVisible && !isLeaving ? 'toast-visible' : ''} ${isLeaving ? 'toast-leaving' : ''}`}>
      <div className="toast-content">
        <span className="toast-icon">{icon}</span>
        <div className="toast-text">
          <h4 className="toast-title">{title}</h4>
          <p className="toast-message">{message}</p>
        </div>
        <div className="toast-actions">
          {buttonText && (
            <button className="toast-button" onClick={handleButtonClick}>
              {buttonText}
            </button>
          )}
          <button className="toast-close" onClick={handleClose}>✕</button>
        </div>
      </div>
    </div>
  );
};
