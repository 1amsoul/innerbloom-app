import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import useEmotionalStore from '../../stores/emotionalStore';
import useSessionStore from '../../stores/sessionStore';
import useProfileStore from '../../stores/profileStore';
import useNavigationStore from '../../stores/navigationStore';
import PageTransition from '../shared/PageTransition';
import BreathingOrb from '../shared/BreathingOrb';
import WordReveal from '../shared/WordReveal';
import { getThemeForMood } from '../../theme/moodThemes';
import { selectAffirmations } from '../../engine/decisionEngine';
import { rescueScenarios } from '../../data/affirmations';

function ScenarioSelect({ onSelect }) {
  return (
    <div className="w-full max-w-md">
      <motion.h2
        className="text-display text-xl md:text-2xl font-light mb-2 text-center"
        style={{ color: 'rgba(255,255,255,0.85)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        What's happening right now?
      </motion.h2>
      <motion.p
        className="text-xs text-center mb-8"
        style={{ color: 'rgba(255,255,255,0.35)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Choose what feels closest. The app will adapt completely.
      </motion.p>

      <div className="grid grid-cols-2 gap-3">
        {rescueScenarios.map((scenario, i) => (
          <motion.button
            key={scenario.id}
            id={`rescue-scenario-${scenario.id}`}
            className="glass-card p-4 text-left"
            onClick={() => onSelect(scenario)}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(239,68,68,0.15)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-xl block mb-2">{scenario.icon}</span>
            <p className="text-xs font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {scenario.label}
            </p>
            <p className="text-[0.65rem]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {scenario.description}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function RescueSession({ scenario }) {
  const emotional = useEmotionalStore();
  const sessionStore = useSessionStore();
  const profile = useProfileStore();
  const navigate = useNavigationStore(s => s.navigate);
  const theme = getThemeForMood(null, true);

  const [phase, setPhase] = useState('breathe'); // breathe | affirm
  const [affirmations, setAffirmations] = useState([]);
  const [affIndex, setAffIndex] = useState(0);
  const [breathCount, setBreathCount] = useState(0);

  useEffect(() => {
    const ctx = {
      mood: scenario.mood,
      energy: 'low',
      intensity: 5,
      preferredTone: profile.preferredTone,
      struggles: profile.struggles,
      isRescue: true,
      recentlyShown: [],
      likedIds: sessionStore.likedAffirmations.map(l => l.affirmationId),
      neededThisIds: sessionStore.neededThis.map(n => n.affirmationId),
      skippedIds: [], tooIntenseIds: [], notMeIds: [],
      moodHistory: emotional.moodHistory,
    };
    setAffirmations(selectAffirmations(ctx, 4));
  }, [scenario]);

  useEffect(() => {
    let timeoutId;
    if (phase === 'breathe') {
      const timer = setInterval(() => {
        setBreathCount(c => {
          if (c >= 2) {
            clearInterval(timer);
            timeoutId = setTimeout(() => setPhase('affirm'), 500);
            return c;
          }
          return c + 1;
        });
      }, 8000);
      return () => {
        clearInterval(timer);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [phase]);

  const currentAff = affirmations[affIndex];

  const nextAff = useCallback(() => {
    if (affIndex < affirmations.length - 1) {
      setAffIndex(i => i + 1);
    } else {
      emotional.exitRescueMode();
      navigate('home');
    }
  }, [affIndex, affirmations.length]);

  const exitRescue = () => {
    emotional.exitRescueMode();
    navigate('home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Dark overlay */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ background: 'rgba(0,0,0,0.4)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <div className="relative z-10 max-w-md w-full text-center">
        <AnimatePresence mode="wait">
          {phase === 'breathe' && (
            <motion.div
              key="breathe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <motion.p
                className="text-xs mb-8"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Let's slow everything down
              </motion.p>

              <BreathingOrb size={220} showLabel={true} />

              <motion.p
                className="text-body-serif text-lg mt-10"
                style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                Breathe with the orb
              </motion.p>

              <motion.button
                className="text-xs mt-8"
                style={{ color: 'rgba(255,255,255,0.2)' }}
                onClick={() => setPhase('affirm')}
                whileHover={{ color: 'rgba(255,255,255,0.4)' }}
              >
                skip to affirmations →
              </motion.button>
            </motion.div>
          )}

          {phase === 'affirm' && currentAff && (
            <motion.div
              key={`affirm-${affIndex}`}
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center"
            >
              <motion.div
                className="w-2 h-2 rounded-full mb-10"
                style={{ background: `rgba(${theme.accentRgb}, 0.4)` }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="text-body-serif text-2xl md:text-3xl leading-relaxed"
                   style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 300 }}>
                <WordReveal text={currentAff.text} />
              </div>

              <motion.div
                className="flex gap-3 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                <motion.button
                  className="btn-ghost px-6"
                  onClick={() => {
                    sessionStore.recordFeedback(currentAff.id, 'needed-this', scenario.mood);
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  💛 Needed this
                </motion.button>
                <motion.button
                  className="btn-primary px-6"
                  onClick={nextAff}
                  whileTap={{ scale: 0.97 }}
                >
                  {affIndex < affirmations.length - 1 ? 'Next' : 'I\'m okay now'}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exit */}
        <motion.button
          className="fixed top-6 right-6 text-xs z-20"
          style={{ color: 'rgba(255,255,255,0.2)' }}
          onClick={exitRescue}
          whileHover={{ color: 'rgba(255,255,255,0.5)' }}
        >
          Exit rescue
        </motion.button>
      </div>
    </div>
  );
}

export default function RescueScreen() {
  const emotional = useEmotionalStore();
  const navigate = useNavigationStore(s => s.navigate);
  const [selectedScenario, setSelectedScenario] = useState(null);

  const handleSelect = (scenario) => {
    setSelectedScenario(scenario);
    emotional.enterRescueMode(scenario);
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <AnimatePresence mode="wait">
        {!selectedScenario ? (
          <motion.div
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            <ScenarioSelect onSelect={handleSelect} />
            <motion.button
              className="btn-ghost mt-8 text-xs"
              onClick={() => navigate('home')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ← Back to Home
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="session"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            <RescueSession scenario={selectedScenario} />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
