import { motion } from 'framer-motion';
import useSessionStore from '../../stores/sessionStore';
import useNavigationStore from '../../stores/navigationStore';
import useEmotionalStore from '../../stores/emotionalStore';
import PageTransition from '../shared/PageTransition';
import { getThemeForMood } from '../../theme/moodThemes';

export default function ReflectionScreen() {
  const session = useSessionStore();
  const emotional = useEmotionalStore();
  const navigate = useNavigationStore(s => s.navigate);
  const theme = getThemeForMood(emotional.currentMood, emotional.isRescueMode);

  const streakMsg = session.getStreakMessage();

  const reflections = [
    "Take a moment before you go.",
    "How does this feel right now?",
    "Let it settle.",
  ];

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        {/* Completion mark */}
        <motion.div
          className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
          style={{
            background: `rgba(${theme.accentRgb}, 0.08)`,
            border: `1px solid rgba(${theme.accentRgb}, 0.15)`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.span
            className="text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ✓
          </motion.span>
        </motion.div>

        <motion.h2
          className="text-display text-2xl md:text-3xl font-light mb-4"
          style={{ color: 'rgba(255,255,255,0.92)' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Session Complete
        </motion.h2>

        <motion.p
          className="text-body-serif text-sm mb-8"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {streakMsg}
        </motion.p>

        {/* Reflective prompts */}
        <div className="space-y-3 mb-10">
          {reflections.map((text, i) => (
            <motion.p
              key={i}
              className="text-xs"
              style={{ color: 'rgba(255,255,255,0.3)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.3, duration: 0.5 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="glass-soft p-5 mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-light" style={{ color: `rgba(${theme.accentRgb}, 0.8)` }}>
                {session.totalSessions}
              </p>
              <p className="text-micro mt-1">Sessions</p>
            </div>
            <div>
              <p className="text-xl font-light" style={{ color: `rgba(${theme.accentRgb}, 0.8)` }}>
                {session.currentStreak}
              </p>
              <p className="text-micro mt-1">Day Streak</p>
            </div>
            <div>
              <p className="text-xl font-light" style={{ color: `rgba(${theme.accentRgb}, 0.8)` }}>
                {session.savedAffirmations.length + session.neededThis.length}
              </p>
              <p className="text-micro mt-1">Saved</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-3 max-w-xs mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.button
            id="reflection-home-btn"
            className="btn-primary w-full"
            onClick={() => navigate('home')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Return Home
          </motion.button>
          <motion.button
            className="btn-ghost w-full"
            onClick={() => navigate('insights')}
            whileTap={{ scale: 0.98 }}
          >
            View Insights
          </motion.button>
        </motion.div>
      </div>
    </PageTransition>
  );
}
