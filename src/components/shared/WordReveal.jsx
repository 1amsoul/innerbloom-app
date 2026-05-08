import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getThemeForMood } from '../../theme/moodThemes';
import useEmotionalStore from '../../stores/emotionalStore';

export default function WordReveal({ text, onComplete, className = '' }) {
  const { currentMood, isRescueMode } = useEmotionalStore();
  const theme = getThemeForMood(currentMood, isRescueMode);
  const words = text.split(' ');
  const [visibleCount, setVisibleCount] = useState(0);
  const delay = theme.animationDuration * 120; // ms per word based on mood

  useEffect(() => {
    let isMounted = true;
    setVisibleCount(0);
    let completeTimer = null;
    
    const timers = words.map((_, i) =>
      setTimeout(() => {
        if (isMounted) {
          setVisibleCount(i + 1);
          if (i === words.length - 1 && onComplete) {
            completeTimer = setTimeout(() => {
              if (isMounted) onComplete();
            }, 600);
          }
        }
      }, delay * (i + 1))
    );
    
    return () => {
      isMounted = false;
      timers.forEach(clearTimeout);
      if (completeTimer) clearTimeout(completeTimer);
    };
  }, [text, delay, onComplete, words.length]);

  return (
    <p className={`${className} leading-relaxed`}>
      {words.map((word, i) => (
        <motion.span
          key={`${text}-${i}`}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={i < visibleCount ? {
            opacity: 1, y: 0, filter: 'blur(0px)'
          } : {}}
          transition={{
            duration: theme.animationDuration * 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
