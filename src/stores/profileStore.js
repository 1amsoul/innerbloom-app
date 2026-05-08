/**
 * Innerbloom — User Profile Store
 * 
 * Manages persistent user identity:
 * - Onboarding completion state
 * - Emotional struggles
 * - Goals
 * - Preferred tone
 * - Session style preferences
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProfileStore = create(
  persist(
    (set, get) => ({
      // Onboarding state
      isOnboarded: false,
      onboardingStep: 0,
      
      // Profile data
      name: '',
      struggles: [],
      goals: [],
      preferredTone: 'warm',
      sessionStyle: 'guided', // guided | freeform
      energyPattern: 'morning', // morning | evening | variable
      
      // Actions
      setName: (name) => set({ name }),
      setStruggles: (struggles) => set({ struggles }),
      setGoals: (goals) => set({ goals }),
      setPreferredTone: (tone) => set({ preferredTone: tone }),
      setSessionStyle: (style) => set({ sessionStyle: style }),
      setEnergyPattern: (pattern) => set({ energyPattern: pattern }),
      
      nextOnboardingStep: () => set((state) => ({ onboardingStep: state.onboardingStep + 1 })),
      prevOnboardingStep: () => set((state) => ({ onboardingStep: Math.max(0, state.onboardingStep - 1) })),
      completeOnboarding: () => set({ isOnboarded: true }),
      
      resetProfile: () => set({
        isOnboarded: false,
        onboardingStep: 0,
        name: '',
        struggles: [],
        goals: [],
        preferredTone: 'warm',
        sessionStyle: 'guided',
        energyPattern: 'morning',
      }),
    }),
    {
      name: 'innerbloom-profile',
    }
  )
);

export default useProfileStore;
