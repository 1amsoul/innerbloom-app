import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useRef, useEffect } from 'react';
import useSessionStore from '../../stores/sessionStore';
import useEmotionalStore from '../../stores/emotionalStore';
import useProfileStore from '../../stores/profileStore';
import useNavigationStore from '../../stores/navigationStore';
import PageTransition from '../shared/PageTransition';
import WordReveal from '../shared/WordReveal';
import { getThemeForMood } from '../../theme/moodThemes';
import { generateWhyExplanation } from '../../engine/decisionEngine';

export default function SessionScreen() {
  const sessionStore = useSessionStore();
  const emotional = useEmotionalStore();
  const profile = useProfileStore();
  const navigate = useNavigationStore(s => s.navigate);
  const theme = getThemeForMood(emotional.currentMood, emotional.isRescueMode);

  const [showWhy, setShowWhy] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(null);
  const [isRevealing, setIsRevealing] = useState(true);
  const feedbackTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  const currentAff = sessionStore.getCurrentAffirmation();
  const progress = sessionStore.getSessionProgress();
  const total = sessionStore.sessionAffirmations.length;
  const index = sessionStore.currentAffirmationIndex;

  const whyReasons = currentAff ? generateWhyExplanation(currentAff, {
    mood: emotional.currentMood,
    preferredTone: profile.preferredTone,
    moodHistory: emotional.moodHistory,
  }) : [];

  const giveFeedback = useCallback((type) => {
    if (currentAff) {
      sessionStore.recordFeedback(currentAff.id, type, emotional.currentMood);
      setFeedbackGiven(type);
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = setTimeout(() => setFeedbackGiven(null), 1200);
    }
  }, [currentAff, emotional.currentMood, sessionStore]);

  const goNext = useCallback(() => {
    if (index < total - 1) {
      sessionStore.nextAffirmation();
      setShowWhy(false);
      setIsRevealing(true);
      setFeedbackGiven(null);
    } else {
      sessionStore.completeSession();
      navigate('reflection');
    }
  }, [index, total, sessionStore, navigate]);

  const goPrev = useCallback(() => {
    if (index > 0) {
      sessionStore.prevAffirmation();
      setShowWhy(false);
      setIsRevealing(true);
      setFeedbackGiven(null);
    }
  }, [index, sessionStore]);

  const skip = useCallback(() => {
    if (currentAff) {
      sessionStore.recordFeedback(currentAff.id, 'skipped', emotional.currentMood);
    }
    goNext();
  }, [currentAff, goNext]);

  if (!currentAff) {
    return (
      <PageTransition className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>No session active.</p>
          <motion.button className="btn-primary mt-4" onClick={() => navigate('home')}>
            Return Home
          </motion.button>
        </div>
      </PageTransition>
    );
  }

  const feedbackBtns = [
    { type: 'needed-this', label: 'Needed this', icon: '💛' },
    { type: 'liked', label: 'Save', icon: '🔖' },
    { type: 'too-intense', label: 'Too much', icon: '😮‍💨' },
    { type: 'not-me', label: 'Not me', icon: '🚫' },
  ];

  return (
    <PageTransition className="min-h-screen flex flex-col px-6 py-8">
      <div className="max-w-lg mx-auto w-full flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-8">
          <motion.button
            className="text-xs"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            onClick={() => { sessionStore.completeSession(); navigate('home'); }}
            whileHover={{ color: 'rgba(255,255,255,0.6)' }}
          >
            ✕
          </motion.button>
          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: `rgba(${theme.accentRgb}, 0.5)` }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {index + 1}/{total}
          </span>
        </div>

        {/* Affirmation area */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAff.id}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: theme.transitionSpeed * 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center max-w-md"
            >
              {/* Category tag */}
              <motion.p
                className="text-micro mb-6"
                style={{ color: `rgba(${theme.accentRgb}, 0.5)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentAff.category}
              </motion.p>

              {/* Affirmation text with word reveal */}
              <div className={`text-body-serif ${theme.fontSize} leading-relaxed`}
                   style={{ 
                     color: `rgba(255,255,255,${theme.textOpacity})`, 
                     fontWeight: theme.fontWeight,
                     letterSpacing: theme.spacing === 'tight' ? '-0.02em' : theme.spacing === 'spacious' ? '0.04em' : 'normal'
                   }}>
                <WordReveal
                  text={currentAff.text}
                  onComplete={() => setIsRevealing(false)}
                />
              </div>

              {/* Tone badge */}
              <motion.p
                className="text-xs mt-6"
                style={{ color: 'rgba(255,255,255,0.25)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isRevealing ? 0 : 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {currentAff.tone} · intensity {currentAff.intensity}/5
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Feedback row */}
        <motion.div
          className="flex justify-center gap-2 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isRevealing ? 0 : 1, y: isRevealing ? 10 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {feedbackBtns.map(fb => (
            <motion.button
              key={fb.type}
              id={`session-fb-${fb.type}`}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl"
              style={{
                background: feedbackGiven === fb.type ? 'rgba(129,140,248,0.1)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${feedbackGiven === fb.type ? 'rgba(129,140,248,0.2)' : 'rgba(255,255,255,0.04)'}`,
              }}
              onClick={() => giveFeedback(fb.type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-base">{fb.icon}</span>
              <span className="text-[0.6rem]" style={{ color: 'rgba(255,255,255,0.4)' }}>{fb.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Why this message */}
        <motion.div className="mb-4">
          <motion.button
            id="session-why-btn"
            className="text-xs mx-auto block"
            style={{ color: `rgba(${theme.accentRgb}, 0.4)` }}
            onClick={() => setShowWhy(!showWhy)}
            whileHover={{ color: `rgba(${theme.accentRgb}, 0.7)` }}
          >
            {showWhy ? 'Hide reasoning' : 'Why this message?'}
          </motion.button>

          <AnimatePresence>
            {showWhy && (
              <motion.div
                className="glass-soft p-4 mt-3 mx-auto max-w-sm"
                initial={{ opacity: 0, height: 0, y: -5 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -5 }}
                transition={{ duration: 0.4 }}
              >
                {whyReasons.map((reason, i) => (
                  <motion.p
                    key={i}
                    className="text-xs mb-2 last:mb-0"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <span style={{ color: `rgba(${theme.accentRgb}, 0.5)` }}>•</span> {reason}
                  </motion.p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-3">
          <motion.button
            className="btn-ghost flex-1"
            onClick={index > 0 ? goPrev : skip}
            whileTap={{ scale: 0.97 }}
          >
            {index > 0 ? '← Previous' : 'Skip'}
          </motion.button>
          <motion.button
            id="session-next-btn"
            className="btn-primary flex-1"
            onClick={goNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {index < total - 1 ? 'Next →' : 'Complete ✓'}
          </motion.button>
        </div>
      </div>
    </PageTransition>
  );
}
