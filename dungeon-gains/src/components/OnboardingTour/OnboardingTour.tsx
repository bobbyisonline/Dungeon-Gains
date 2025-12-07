import { useCallback } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import './OnboardingTour.css';

interface OnboardingTourProps {
  onComplete: () => void;
}

export const useOnboardingTour = ({ onComplete }: OnboardingTourProps) => {
  const startTour = useCallback(() => {
    // Detect mobile
    const isMobile = window.innerWidth <= 768;

    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shepherd-theme-custom',
        scrollTo: { behavior: 'smooth', block: 'center' },
        cancelIcon: {
          enabled: true,
        },
      },
    });

    // Handle X button press - treat as skip tour
    tour.on('cancel', () => {
      onComplete();
    });

    // Step 1: Welcome
    tour.addStep({
      id: 'welcome',
      title: '⚔️ Welcome!',
      text: `
        <p>Transform your workouts into epic RPG adventures!</p>
        <p>Let me show you around.</p>
      `,
      buttons: [
        {
          text: 'Skip',
          action: () => {
            tour.cancel();
          },
          classes: 'shepherd-button-secondary',
        },
        {
          text: "Let's Go! →",
          action: tour.next,
          classes: 'shepherd-button-primary',
        },
      ],
    });

    // Step 2: Character Stats
    tour.addStep({
      id: 'stats',
      title: '📊 Stats',
      text: isMobile
        ? `<p>Your stats grow as you workout! Each exercise type boosts a different stat.</p>`
        : `
        <p>These stats grow as you workout!</p>
        <ul>
          <li><strong>💪 Strength</strong> - Bench builds attack</li>
          <li><strong>⚡ Power</strong> - Squats boost crits</li>
          <li><strong>🛡️ Endurance</strong> - OHP adds defense</li>
          <li><strong>🏃 Stamina</strong> - Cardio helps loot</li>
        </ul>
      `,
      attachTo: {
        element: '.stats-card',
        on: isMobile ? 'bottom' : 'right',
      },
      buttons: [
        { text: '← Back', action: tour.back, classes: 'shepherd-button-secondary' },
        { text: 'Next →', action: tour.next, classes: 'shepherd-button-primary' },
      ],
    });

    // Step 3: Health & Potions
    tour.addStep({
      id: 'health',
      title: '❤️ Health',
      text: isMobile
        ? `<p>Health carries over between dungeons. Set PRs to earn potions! 🧪</p>`
        : `
        <p>Your health carries over between dungeon runs!</p>
        <p>Set <strong>Personal Records</strong> to earn health potions. 🧪</p>
      `,
      attachTo: {
        element: '.health-card',
        on: isMobile ? 'bottom' : 'right',
      },
      buttons: [
        { text: '← Back', action: tour.back, classes: 'shepherd-button-secondary' },
        { text: 'Next →', action: tour.next, classes: 'shepherd-button-primary' },
      ],
    });

    // Step 4: Equipment
    tour.addStep({
      id: 'equipment',
      title: '⚔️ Equipment',
      text: isMobile
        ? `<p>Swipe to see your gear! Find loot in dungeon treasure chests.</p>`
        : `
        <p>Equip weapons, armor, and accessories to boost your stats!</p>
        <p>Find loot in dungeon treasure chests.</p>
      `,
      attachTo: {
        element: '.equipped-card',
        on: isMobile ? 'top' : 'left',
      },
      buttons: [
        { text: '← Back', action: tour.back, classes: 'shepherd-button-secondary' },
        { text: 'Next →', action: tour.next, classes: 'shepherd-button-primary' },
      ],
    });

    // Step 5: Dungeon Runs
    tour.addStep({
      id: 'dungeon',
      title: '🏰 Dungeons',
      text: isMobile
        ? `<p>Complete workouts to unlock dungeon runs. Battle monsters and level up!</p>`
        : `
        <p>This is where the adventure happens!</p>
        <p><strong>Complete a workout</strong> to earn a dungeon run.</p>
      `,
      attachTo: {
        element: '.dungeon-card',
        on: 'top',
      },
      buttons: [
        { text: '← Back', action: tour.back, classes: 'shepherd-button-secondary' },
        { text: 'Next →', action: tour.next, classes: 'shepherd-button-primary' },
      ],
    });

    // Step 6: Navigation - Log Workout
    tour.addStep({
      id: 'nav-workout',
      title: '💪 Log Workout',
      text: `<p>Tap here to log your exercises and unlock dungeon runs!</p>`,
      attachTo: {
        element: '.nav-links button:nth-child(2)',
        on: 'bottom',
      },
      buttons: [
        { text: '← Back', action: tour.back, classes: 'shepherd-button-secondary' },
        { text: 'Next →', action: tour.next, classes: 'shepherd-button-primary' },
      ],
    });

    // Step 7: Completion
    tour.addStep({
      id: 'complete',
      title: '🎉 Ready!',
      text: `
        <p>Create your hero and start your fitness journey!</p>
        <p><strong>Your first dungeon run is free!</strong> 🎁</p>
      `,
      buttons: [
        {
          text: '⚔️ Create My Hero!',
          action: () => {
            tour.complete();
            onComplete();
          },
          classes: 'shepherd-button-primary shepherd-button-large',
        },
      ],
    });

    tour.start();

    return tour;
  }, [onComplete]);

  return { startTour };
};
