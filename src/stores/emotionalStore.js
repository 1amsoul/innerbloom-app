/**
 * Innerbloom — Emotional State Store
 * 
 * Manages the current emotional context:
 * - Current mood + energy
 * - Mood history over time
 * - Today's check-in status
 * - Rescue mode state
 * - Emotional adaptation triggers
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useEmotionalStore = create(
  persist(
    (set, get) => ({
      // Current state
      currentMood: null,
      currentEnergy: 'medium',
      moodIntensity: 3, // 1-5
      isRescueMode: false,
      rescueScenario: null,
      
      // Today's check-in
      todayCheckedIn: false,
      lastCheckIn: null,
      
      // History
      moodHistory: [], // { mood, energy, intensity, timestamp, dayOfWeek, timeOfDay }
      
      // Session tracking
      currentSessionMood: null,
      
      // Actions
      setMood: (mood) => {
        const now = new Date();
        const entry = {
          mood,
          energy: get().currentEnergy,
          intensity: get().moodIntensity,
          timestamp: now.toISOString(),
          dayOfWeek: now.getDay(),
          timeOfDay: getTimeOfDay(now),
        };
        
        set((state) => ({
          currentMood: mood,
          todayCheckedIn: true,
          lastCheckIn: now.toISOString(),
          moodHistory: [...state.moodHistory.slice(-100), entry], // Keep last 100
        }));
      },
      
      setEnergy: (energy) => set({ currentEnergy: energy }),
      setMoodIntensity: (intensity) => set({ moodIntensity: intensity }),
      
      enterRescueMode: (scenario) => set({ 
        isRescueMode: true, 
        rescueScenario: scenario,
        currentMood: scenario?.mood || 'anxious',
        currentEnergy: 'low',
        moodIntensity: 5,
      }),
      
      exitRescueMode: () => set({ 
        isRescueMode: false, 
        rescueScenario: null,
      }),
      
      setSessionMood: (mood) => set({ currentSessionMood: mood }),
      
      // Derived data
      getRecentMoods: () => {
        const history = get().moodHistory;
        const week = 7 * 24 * 60 * 60 * 1000;
        const weekAgo = Date.now() - week;
        return history.filter(h => new Date(h.timestamp).getTime() > weekAgo);
      },
      
      getDominantMood: () => {
        const recent = get().getRecentMoods();
        if (recent.length === 0) return null;
        
        const counts = {};
        recent.forEach(h => {
          counts[h.mood] = (counts[h.mood] || 0) + 1;
        });
        
        return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
      },
      
      getMoodTrend: () => {
        const recent = get().getRecentMoods();
        if (recent.length < 3) return 'neutral';
        
        const heavyMoods = ['anxious', 'stressed', 'sad', 'overwhelmed', 'burnout', 'panic'];
        const last3 = recent.slice(-3);
        const heavyCount = last3.filter(h => heavyMoods.includes(h.mood)).length;
        
        if (heavyCount >= 2) return 'heavy';
        if (heavyCount === 0) return 'light';
        return 'mixed';
      },
      
      isTodayCheckedIn: () => {
        const lastCheckIn = get().lastCheckIn;
        if (!lastCheckIn) return false;
        const today = new Date().toDateString();
        return new Date(lastCheckIn).toDateString() === today;
      },
    }),
    {
      name: 'innerbloom-emotional',
    }
  )
);

function getTimeOfDay(date) {
  const hour = date.getHours();
  if (hour < 6) return 'night';
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  if (hour < 21) return 'evening';
  return 'night';
}

export default useEmotionalStore;
