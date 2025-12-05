import { useState } from 'react';
import './FeedbackModal.css';

interface FeedbackModalProps {
  onClose: () => void;
}

export const FeedbackModal = ({ onClose }: FeedbackModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mvgeqwya', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        alert('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="feedback-modal rs-panel" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn">×</button>
        
        {submitted ? (
          <div className="feedback-success">
            <h2 className="rs-text-gold">✅ Thank You!</h2>
            <p>Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <h2 className="rs-text-gold">📝 Send Feedback</h2>
            <p className="feedback-subtitle">Help us improve Dungeon Gains! Share your thoughts, report bugs, or suggest features.</p>
            
            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="form-group">
                <label htmlFor="name">Name (Optional)</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="rs-input"
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email (Optional)</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="rs-input"
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Feedback Type</label>
                <select id="type" name="type" className="rs-input" required>
                  <option value="bug">🐛 Bug Report</option>
                  <option value="feature">💡 Feature Request</option>
                  <option value="improvement">✨ Improvement Suggestion</option>
                  <option value="general">💬 General Feedback</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="rs-input feedback-textarea"
                  placeholder="Tell us what's on your mind..."
                  required
                  rows={6}
                />
              </div>

              <button 
                type="submit" 
                className="rs-button rs-button-primary"
                disabled={submitting}
              >
                {submitting ? '⏳ Sending...' : '📤 Submit Feedback'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
