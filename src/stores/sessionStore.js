/**
 * Innerbloom — Session Store
 * 
 * Manages affirmation sessions:
 * - Session history
 * - Liked / skipped / saved affirmations
 * - Streaks
 * - Feedback data for the decision engine
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSessionStore = create(
  persist(
    (set, get) => ({
      // Session data
      sessions: [], // { id, timestamp, mood, energy, affirmationIds, feedback, duration }
      currentSession: null,
      currentAffirmationIndex: 0,
      sessionAffirmations: [],
      
      // Feedback collections
      likedAffirmations: [], // { affirmationId, timestamp, mood }
      savedAffirmations: [], // { affirmationId, timestamp, mood }
      skippedAffirmations: [], // { affirmationId, timestamp, mood }
      neededThis: [], // { affirmationId, timestamp, mood }
      tooIntense: [], // { affirmationId, timestamp, mood }
      notMe: [], // { affirmationId, timestamp, mood }
      
      // Streaks
      currentStreak: 0,
      longestStreak: 0,
      lastSessionDate: null,
      totalSessions: 0,
      
      // Actions
      startSession: (affirmations, mood, energy) => set({
        currentSession: {
          id: Date.now().toString(),
          startTime: new Date().toISOString(),
          mood,
          energy,
        },
        sessionAffirmations: affirmations,
        currentAffirmationIndex: 0,
      }),
      
      nextAffirmation: () => set((state) => ({
        currentAffirmationIndex: Math.min(
          state.currentAffirmationIndex + 1,
          state.sessionAffirmations.length - 1
        ),
      })),
      
      prevAffirmation: () => set((state) => ({
        currentAffirmationIndex: Math.max(0, state.currentAffirmationIndex - 1),
      })),
      
      recordFeedback: (affirmationId, type, mood) => {
        const entry = { affirmationId, timestamp: new Date().toISOString(), mood };
        set((state) => {
          const updates = {};
          switch (type) {
            case 'liked':
              updates.likedAffirmations = [...state.likedAffirmations.slice(-200), entry];
              break;
            case 'saved':
              updates.savedAffirmations = [...state.savedAffirmations.slice(-200), entry];
              break;
            case 'skipped':
              updates.skippedAffirmations = [...state.skippedAffirmations.slice(-200), entry];
              break;
            case 'needed-this':
              updates.neededThis = [...state.neededThis.slice(-200), entry];
              break;
            case 'too-intense':
              updates.tooIntense = [...state.tooIntense.slice(-200), entry];
              break;
            case 'not-me':
              updates.notMe = [...state.notMe.slice(-200), entry];
              break;
          }
          return updates;
        });
      },
      
      completeSession: () => {
        const state = get();
        const session = {
          ...state.currentSession,
          endTime: new Date().toISOString(),
          affirmationIds: state.sessionAffirmations.map(a => a.id),
          affirmationsViewed: state.currentAffirmationIndex + 1,
        };
        
        // Calculate streak
        const today = new Date().toDateString();
        const lastDate = state.lastSessionDate;
        let newStreak = state.currentStreak;
        
        if (lastDate) {
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          if (lastDate === today) {
            // Same day, no streak change
          } else if (lastDate === yesterday) {
            newStreak += 1;
          } else {
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }
        
        set({
          sessions: [...state.sessions.slice(-50), session],
          currentSession: null,
          sessionAffirmations: [],
          currentAffirmationIndex: 0,
          currentStreak: newStreak,
          longestStreak: Math.max(state.longestStreak, newStreak),
          lastSessionDate: today,
          totalSessions: state.totalSessions + 1,
        });
      },
      
      isSessionActive: () => get().currentSession !== null,
      
      getCurrentAffirmation: () => {
        const state = get();
        return state.sessionAffirmations[state.currentAffirmationIndex] || null;
      },
      
      getSessionProgress: () => {
        const state = get();
        if (state.sessionAffirmations.length === 0) return 0;
        return (state.currentAffirmationIndex + 1) / state.sessionAffirmations.length;
      },
      
      // Check streak status for today
      hasSessionToday: () => {
        const lastDate = get().lastSessionDate;
        if (!lastDate) return false;
        return lastDate === new Date().toDateString();
      },
      
      getStreakMessage: () => {
        const state = get();
        if (state.currentStreak === 0) return "Every journey begins with one moment.";
        if (state.currentStreak === 1) return "You showed up for yourself today.";
        if (state.currentStreak <= 3) return `${state.currentStreak} days of choosing yourself.`;
        if (state.currentStreak <= 7) return `${state.currentStreak} days of consistency. That takes quiet strength.`;
        if (state.currentStreak <= 14) return `${state.currentStreak} days. You're building something beautiful.`;
        if (state.currentStreak <= 30) return `${state.currentStreak} days. This is becoming part of who you are.`;
        return `${state.currentStreak} days. You've made self-care a practice, not a promise.`;
      },
    }),
    {
      name: 'innerbloom-sessions',
    }
  )
);

export default useSessionStore;
