import { motion } from 'framer-motion';
import { getThemeForMood } from '../../theme/moodThemes';
import useEmotionalStore from '../../stores/emotionalStore';

export default function MoodBackground() {
  const { currentMood, isRescueMode } = useEmotionalStore();
  const theme = getThemeForMood(currentMood, isRescueMode);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${theme.bg}`}
        animate={{ opacity: 1 }}
        transition={{ duration: theme.transitionSpeed }}
      />
      
      {/* Ambient orb 1 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '600px', height: '600px',
          top: '-200px', right: '-100px',
          background: `radial-gradient(circle, ${theme.glow}, transparent 70%)`,
          filter: `blur(${60 + theme.blur * 10}px)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: theme.breathDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Ambient orb 2 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '400px', height: '400px',
          bottom: '-100px', left: '-50px',
          background: `radial-gradient(circle, rgba(${theme.accentRgb}, 0.06), transparent 70%)`,
          filter: `blur(${80 + theme.blur * 10}px)`,
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: theme.breathDuration + 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Rescue mode extra orb */}
      {isRescueMode && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '800px', height: '800px',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(${theme.accentRgb}, 0.04), transparent 60%)`,
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          initial={{ opacity: 0 }}
        />
      )}
    </div>
  );
}
