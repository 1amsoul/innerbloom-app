import { motion } from 'framer-motion';
import { useMemo } from 'react';
import useEmotionalStore from '../../stores/emotionalStore';
import useSessionStore from '../../stores/sessionStore';
import useNavigationStore from '../../stores/navigationStore';
import PageTransition from '../shared/PageTransition';
import { getThemeForMood } from '../../theme/moodThemes';
import { generateInsights } from '../../engine/decisionEngine';
import { moodOptions } from '../../data/affirmations';

function MoodTimeline({ history }) {
  const recent = history.slice(-14);
  if (recent.length === 0) return null;
  
  const moodColors = {};
  moodOptions.forEach(m => { moodColors[m.id] = m.color; });

  return (
    <div className="glass-soft p-5">
      <p className="text-micro mb-4">Recent Emotional Rhythm</p>
      <div className="flex items-end gap-1.5 h-20">
        {recent.map((entry, i) => {
          const color = moodColors[entry.mood] || '#818cf8';
          const height = 20 + (entry.intensity || 3) * 12;
          return (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm relative group cursor-default"
              style={{ background: color, opacity: 0.6, minWidth: '8px' }}
              initial={{ height: 0 }}
              animate={{ height }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
              title={`${entry.mood} — ${new Date(entry.timestamp).toLocaleDateString()}`}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block
                            bg-black/80 text-[0.6rem] px-2 py-1 rounded whitespace-nowrap z-10"
                   style={{ color: 'rgba(255,255,255,0.8)' }}>
                {entry.mood}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[0.6rem]" style={{ color: 'rgba(255,255,255,0.2)' }}>
          {recent.length > 0 ? new Date(recent[0].timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
        </span>
        <span className="text-[0.6rem]" style={{ color: 'rgba(255,255,255,0.2)' }}>today</span>
      </div>
    </div>
  );
}

export default function InsightsScreen() {
  const emotional = useEmotionalStore();
  const session = useSessionStore();
  const navigate = useNavigationStore(s => s.navigate);
  const theme = getThemeForMood(emotional.currentMood, emotional.isRescueMode);

  const insights = useMemo(() =>
    generateInsights(emotional.moodHistory, session.sessions, session.likedAffirmations),
    [emotional.moodHistory.length, session.sessions.length, session.likedAffirmations.length]
  );

  return (
    <PageTransition className="min-h-screen flex flex-col px-6 py-8 md:py-12">
      <div className="max-w-lg mx-auto w-full">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-micro mb-1">Emotional Insights</p>
            <h1 className="text-display text-xl font-light" style={{ color: 'rgba(255,255,255,0.92)' }}>
              Your inner landscape
            </h1>
          </div>
          <motion.button
            className="btn-ghost text-xs px-3 py-2"
            onClick={() => navigate('home')}
            whileTap={{ scale: 0.95 }}
          >
            ← Home
          </motion.button>
        </motion.div>

        {/* Mood Timeline */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <MoodTimeline history={emotional.moodHistory} />
        </motion.div>

        {/* Insight Cards */}
        <div className="space-y-4 mb-8">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              className="glass-card p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{insight.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    {insight.title}
                  </p>
                  <p className="text-body-serif text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {insight.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Session Stats */}
        <motion.div
          className="glass-soft p-5 mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-micro mb-4">Your journey so far</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-light" style={{ color: `rgba(${theme.accentRgb}, 0.8)` }}>
                {session.totalSessions}
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Total Sessions</p>
            </div>
            <div>
              <p className="text-2xl font-light" style={{ color: `rgba(${theme.accentRgb}, 0.8)` }}>
                {session.longestStreak}
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Longest Streak</p>
            </div>
            <div>
              <p className="text-2xl font-light" style={{ color: `rgba(${theme.accentRgb}, 0.8)` }}>
                {emotional.moodHistory.length}
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Check-Ins</p>
            </div>
            <div>
              <p className="text-2xl font-light" style={{ color: `rgba(${theme.accentRgb}, 0.8)` }}>
                {session.savedAffirmations.length + session.neededThis.length}
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Saved Moments</p>
            </div>
          </div>
        </motion.div>

        {/* Saved affirmations hint */}
        {session.neededThis.length > 0 && (
          <motion.div
            className="glass-card p-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              💛 You've marked {session.neededThis.length} affirmation{session.neededThis.length > 1 ? 's' : ''} as "needed this"
            </p>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
