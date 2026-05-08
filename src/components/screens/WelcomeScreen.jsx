import { motion } from 'framer-motion';
import useNavigationStore from '../../stores/navigationStore';
import useProfileStore from '../../stores/profileStore';
import PageTransition from '../shared/PageTransition';
import BreathingOrb from '../shared/BreathingOrb';

export default function WelcomeScreen() {
  const navigate = useNavigationStore(s => s.navigate);
  const isOnboarded = useProfileStore(s => s.isOnboarded);

  const handleBegin = () => {
    navigate(isOnboarded ? 'checkin' : 'onboarding');
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Logo orb */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <BreathingOrb size={160} showLabel={false} />
        </motion.div>

        {/* Brand */}
        <motion.h1
          className="text-display text-4xl md:text-5xl font-light mt-10 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
          Innerbloom
        </motion.h1>

        <motion.p
          className="text-sm md:text-base mb-12"
          style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Your emotional co-pilot
        </motion.p>

        {/* Emotional promise */}
        <motion.p
          className="text-body-serif text-base md:text-lg mb-12 max-w-xs"
          style={{ color: 'rgba(255,255,255,0.55)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          An emotionally adaptive space that learns how to speak to you — 
          gently, wisely, and exactly when you need it.
        </motion.p>

        {/* CTA */}
        <motion.button
          id="welcome-begin-btn"
          className="btn-primary w-full max-w-xs"
          onClick={handleBegin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isOnboarded ? 'Continue Your Journey' : 'Begin'}
        </motion.button>

        {isOnboarded && (
          <motion.button
            className="btn-ghost mt-3 text-xs"
            onClick={() => navigate('home')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            Skip to Home
          </motion.button>
        )}

        {/* Footer whisper */}
        <motion.p
          className="text-micro mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          Everything stays on your device. Always private.
        </motion.p>
      </div>
    </PageTransition>
  );
}
