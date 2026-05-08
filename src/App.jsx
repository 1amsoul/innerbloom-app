import { AnimatePresence } from 'framer-motion';
import useNavigationStore from './stores/navigationStore';
import useProfileStore from './stores/profileStore';
import useEmotionalStore from './stores/emotionalStore';
import MoodBackground from './components/shared/MoodBackground';
import WelcomeScreen from './components/screens/WelcomeScreen';
import OnboardingScreen from './components/screens/OnboardingScreen';
import CheckInScreen from './components/screens/CheckInScreen';
import HomeScreen from './components/screens/HomeScreen';
import SessionScreen from './components/screens/SessionScreen';
import ReflectionScreen from './components/screens/ReflectionScreen';
import InsightsScreen from './components/screens/InsightsScreen';
import RescueScreen from './components/screens/RescueScreen';

const screens = {
  welcome: WelcomeScreen,
  onboarding: OnboardingScreen,
  checkin: CheckInScreen,
  home: HomeScreen,
  session: SessionScreen,
  reflection: ReflectionScreen,
  insights: InsightsScreen,
  rescue: RescueScreen,
};

export default function App() {
  const currentScreen = useNavigationStore(s => s.currentScreen);
  const isOnboarded = useProfileStore(s => s.isOnboarded);
  const isTodayCheckedIn = useEmotionalStore(s => s.isTodayCheckedIn);
  
  const Screen = screens[currentScreen] || WelcomeScreen;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <MoodBackground />
      <AnimatePresence mode="wait">
        <Screen key={currentScreen} />
      </AnimatePresence>
    </div>
  );
}
