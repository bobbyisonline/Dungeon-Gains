import React, { useState } from 'react';
import './TutorialModal.css';

interface TutorialSlide {
  title: string;
  content: string;
  image?: string;
}

interface TutorialModalProps {
  open: boolean;
  onClose: () => void;
}

const tutorialSlides: TutorialSlide[] = [
  {
    title: "🏋️ Log Your First Workout",
    content: "Looking to complete a dungeon? First, log a workout. You can just log a sample workout to try it out!",
    image: "/tutorial-workout.png"
  },
  {
    title: "⚔️ Battle Through Dungeons",
    content: "After entering the dungeon, you'll battle through enemies and collect loot.",
    image: "/tutorial-dungeon.png"
  },
  {
    title: "🛡️ Grow Your Character",
    content: "After the dungeon is complete, equip your hard-earned loot and watch your stats grow! Dive back in and track another workout to gain another dungeon run pass. Don't forget to rest!",
    image: "/tutorial-equip.png"
  }
];

export const TutorialModal: React.FC<TutorialModalProps> = ({ open, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!open) return null;

  const nextSlide = () => {
    if (currentSlide < tutorialSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const slide = tutorialSlides[currentSlide];
  const isLastSlide = currentSlide === tutorialSlides.length - 1;

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-modal">
        <div className="tutorial-header">
          <h2>🎮 Welcome to Dungeon Gains!</h2>
          <button className="tutorial-close" onClick={handleClose}>×</button>
        </div>

        <div className="tutorial-content">
          <div className="tutorial-slide">
          {slide.image && (
            <div className="tutorial-image">
              <img
                src={slide.image}
                alt={slide.title}
                onError={(e) => {
                  // Hide image if it fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
          <h3>{slide.title}</h3>
          <p>{slide.content}</p>
        </div>

          <div className="tutorial-navigation">
            <button
              className="tutorial-nav-btn"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              ← Previous
            </button>

            <div className="tutorial-dots">
              {tutorialSlides.map((_, index) => (
                <span
                  key={index}
                  className={`tutorial-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>

            {!isLastSlide ? (
              <button className="tutorial-nav-btn" onClick={nextSlide}>
                Next →
              </button>
            ) : (
              <button className="tutorial-acknowledge-btn" onClick={handleClose}>
                Sounds good!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};