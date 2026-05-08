import { motion } from 'framer-motion';
import { useMemo } from 'react';
import useEmotionalStore from '../../stores/emotionalStore';
import useSessionStore from '../../stores/sessionStore';
import useProfileStore from '../../stores/profileStore';
import useNavigationStore from '../../stores/navigationStore';
import PageTransition from '../shared/PageTransition';
import BreathingOrb from '../shared/BreathingOrb';
import { getThemeForMood } from '../../theme/moodThemes';
import { selectAffirmations, generateInsights } from '../../engine/decisionEngine';
import { moodOptions } from '../../data/affirmations';

export default function HomeScreen() {
  const emotional = useEmotionalStore();
  const session = useSessionStore();
  const profile = useProfileStore();
  const navigate = useNavigationStore(s => s.navigate);
  const theme = getThemeForMood(emotional.currentMood, emotional.isRescueMode);

  const moodData = moodOptions.find(m => m.id === emotional.currentMood);
  const streakMsg = session.getStreakMessage();
  const hasToday = session.hasSessionToday();

  const insights = useMemo(() => 
    generateInsights(emotional.moodHistory, session.sessions, session.likedAffirmations),
    [emotional.moodHistory.length, session.sessions.length, session.likedAffirmations.length]
  );
  const topInsight = insights[0];

  const startSession = () => {
    const ctx = {
      mood: emotional.currentMood,
      energy: emotional.currentEnergy,
      intensity: emotional.moodIntensity,
      preferredTone: profile.preferredTone,
      struggles: profile.struggles,
      recentlyShown: session.sessions.flatMap(s => s.affirmationIds || []).slice(-20),
      likedIds: session.likedAffirmations.map(l => l.affirmationId),
      skippedIds: session.skippedAffirmations.map(s => s.affirmationId),
      tooIntenseIds: session.tooIntense.map(t => t.affirmationId),
      notMeIds: session.notMe.map(n => n.affirmationId),
      neededThisIds: session.neededThis.map(n => n.affirmationId),
      moodHistory: emotional.moodHistory,
    };
    const affirmations = selectAffirmations(ctx, 5);
    session.startSession(affirmations, emotional.currentMood, emotional.currentEnergy);
    navigate('session');
  };

  return (
    <PageTransition className="min-h-screen flex flex-col px-6 py-8 md:py-12">
      <div className="max-w-lg mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="text-micro mb-1">Innerbloom</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {profile.name ? `Welcome back, ${profile.name}` : 'Welcome back'}
            </p>
          </div>
          <motion.button
            id="home-settings-btn"
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            onClick={() => navigate('checkin')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Re-check in"
          >
            <span className="text-xs">⟳</span>
          </motion.button>
        </motion.div>

        {/* Current State */}
        <motion.div
          className="glass-card p-6 mb-6 text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            {moodData && <span className="text-3xl">{moodData.emoji}</span>}
            <div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Current state</p>
              <p className="text-display text-lg font-medium" style={{ color: `rgba(${theme.accentRgb}, 0.9)` }}>
                {moodData?.label || 'Unknown'}
              </p>
            </div>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {emotional.currentEnergy} energy · intensity {emotional.moodIntensity}/5
          </p>
        </motion.div>

        {/* Primary action — breathing orb + start */}
        <motion.div
          className="flex flex-col items-center my-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <BreathingOrb size={130} showLabel={true} />
          
          <motion.button
            id="home-start-session-btn"
            className="btn-primary mt-8 px-10"
            onClick={startSession}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {hasToday ? 'Another Session' : 'Begin Session'}
          </motion.button>
        </motion.div>

        {/* Streak */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-body-serif text-xs italic" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {streakMsg}
          </p>
          {session.currentStreak > 0 && (
            <p className="text-micro mt-1">
              {session.currentStreak} day{session.currentStreak !== 1 ? 's' : ''} consistent
            </p>
          )}
        </motion.div>

        {/* Insight preview */}
        {topInsight && (
          <motion.button
            id="home-insight-preview"
            className="glass-card p-5 mb-4 w-full text-left"
            onClick={() => navigate('insights')}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg">{topInsight.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {topInsight.title}
                </p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {topInsight.text.substring(0, 80)}…
                </p>
              </div>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>→</span>
            </div>
          </motion.button>
        )}

        {/* Bottom actions */}
        <motion.div
          className="mt-auto pt-6 flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            id="home-rescue-btn"
            className="btn-rescue flex-1"
            onClick={() => navigate('rescue')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🆘 Rescue Mode
          </motion.button>
          <motion.button
            id="home-insights-btn"
            className="btn-ghost flex-1"
            onClick={() => navigate('insights')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ✨ Insights
          </motion.button>
        </motion.div>
      </div>
    </PageTransition>
  );
}
