/**
 * Innerbloom — Navigation Store
 * 
 * Simple routing / screen management
 */

import { create } from 'zustand';

const useNavigationStore = create((set, get) => ({
  currentScreen: 'welcome', // welcome | onboarding | checkin | home | session | insights | rescue | reflection
  previousScreen: null,
  screenHistory: [],
  
  navigate: (screen) => {
    const current = get().currentScreen;
    set({
      currentScreen: screen,
      previousScreen: current,
      screenHistory: [...get().screenHistory.slice(-10), current],
    });
  },
  
  goBack: () => {
    const history = get().screenHistory;
    if (history.length > 0) {
      const prev = history[history.length - 1];
      set({
        currentScreen: prev,
        previousScreen: get().currentScreen,
        screenHistory: history.slice(0, -1),
      });
    }
  },
}));

export default useNavigationStore;
