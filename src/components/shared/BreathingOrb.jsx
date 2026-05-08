import { motion } from 'framer-motion';
import { getThemeForMood } from '../../theme/moodThemes';
import useEmotionalStore from '../../stores/emotionalStore';

export default function BreathingOrb({ size = 200, showLabel = true }) {
  const { currentMood, isRescueMode } = useEmotionalStore();
  const theme = getThemeForMood(currentMood, isRescueMode);
  const dur = theme.breathDuration;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1px solid rgba(${theme.accentRgb}, 0.15)`,
          }}
          animate={{
            scale: [0.85, 1.15, 0.85],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Middle ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: size * 0.1,
            background: `radial-gradient(circle, rgba(${theme.accentRgb}, 0.08), transparent)`,
          }}
          animate={{
            scale: [0.9, 1.12, 0.9],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
        
        {/* Inner glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: size * 0.25,
            background: `radial-gradient(circle, rgba(${theme.accentRgb}, 0.15), rgba(${theme.accentRgb}, 0.03))`,
          }}
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        
        {/* Core dot */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: size * 0.4,
            background: `rgba(${theme.accentRgb}, 0.3)`,
            boxShadow: `0 0 ${size * 0.3}px rgba(${theme.accentRgb}, 0.2)`,
          }}
          animate={{
            scale: [0.95, 1.05, 0.95],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
      </div>
      
      {showLabel && (
        <motion.p
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: `rgba(${theme.accentRgb}, 0.5)` }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
        >
          breathe
        </motion.p>
      )}
    </div>
  );
}
