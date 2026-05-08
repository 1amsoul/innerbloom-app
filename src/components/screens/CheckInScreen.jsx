import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import useEmotionalStore from '../../stores/emotionalStore';
import useNavigationStore from '../../stores/navigationStore';
import PageTransition from '../shared/PageTransition';
import { moodOptions, energyLevels } from '../../data/affirmations';

export default function CheckInScreen() {
  const { setMood, setEnergy, setMoodIntensity } = useEmotionalStore();
  const navigate = useNavigationStore(s => s.navigate);
  const [phase, setPhase] = useState('mood'); // mood | energy | intensity
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedEnergy, setSelectedEnergy] = useState('medium');
  const [selectedIntensity, setSelectedIntensity] = useState(3);

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
    setTimeout(() => setPhase('energy'), 400);
  };

  const handleEnergySelect = (energyId) => {
    setSelectedEnergy(energyId);
    setTimeout(() => setPhase('intensity'), 400);
  };

  const handleComplete = () => {
    setMood(selectedMood);
    setEnergy(selectedEnergy);
    setMoodIntensity(selectedIntensity);
    navigate('home');
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {phase === 'mood' && (
            <motion.div
              key="mood"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <p className="text-micro mb-4">Daily Check-In</p>
              <h2 className="text-display text-2xl md:text-3xl font-light mb-2 text-center"
                style={{ color: 'rgba(255,255,255,0.92)' }}>
                How are you feeling?
              </h2>
              <p className="text-sm mb-10 text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                There are no wrong answers. Just honesty.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
                {moodOptions.map((mood, i) => (
                  <motion.button
                    key={mood.id}
                    id={`checkin-mood-${mood.id}`}
                    className="glass-card p-4 text-center flex flex-col items-center gap-2"
                    onClick={() => handleMoodSelect(mood.id)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.03, borderColor: `${mood.color}40` }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      borderColor: selectedMood === mood.id ? `${mood.color}50` : undefined,
                      background: selectedMood === mood.id ? `${mood.color}10` : undefined,
                    }}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      {mood.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'energy' && (
            <motion.div
              key="energy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <p className="text-micro mb-4">Energy Level</p>
              <h2 className="text-display text-2xl md:text-3xl font-light mb-2 text-center"
                style={{ color: 'rgba(255,255,255,0.92)' }}>
                Where's your energy?
              </h2>
              <p className="text-sm mb-10 text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                This helps calibrate the intensity of your session.
              </p>

              <div className="flex flex-col gap-4 w-full max-w-sm">
                {energyLevels.map(level => (
                  <motion.button
                    key={level.id}
                    id={`checkin-energy-${level.id}`}
                    className="glass-card p-5 text-left flex items-center gap-4"
                    onClick={() => handleEnergySelect(level.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      borderColor: selectedEnergy === level.id ? 'rgba(129,140,248,0.3)' : undefined,
                      background: selectedEnergy === level.id ? 'rgba(129,140,248,0.06)' : undefined,
                    }}
                  >
                    <span className="text-3xl">{level.icon}</span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>{level.label}</p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{level.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'intensity' && (
            <motion.div
              key="intensity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <p className="text-micro mb-4">Intensity</p>
              <h2 className="text-display text-2xl md:text-3xl font-light mb-2 text-center"
                style={{ color: 'rgba(255,255,255,0.92)' }}>
                How strongly do you feel it?
              </h2>
              <p className="text-sm mb-10 text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                1 is subtle, 5 is overwhelming.
              </p>

              <div className="flex gap-4 mb-12">
                {[1, 2, 3, 4, 5].map(n => (
                  <motion.button
                    key={n}
                    id={`checkin-intensity-${n}`}
                    className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-light"
                    onClick={() => setSelectedIntensity(n)}
                    style={{
                      background: selectedIntensity === n ? 'rgba(129,140,248,0.2)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${selectedIntensity === n ? 'rgba(129,140,248,0.3)' : 'rgba(255,255,255,0.06)'}`,
                      color: selectedIntensity === n ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {n}
                  </motion.button>
                ))}
              </div>

              <motion.button
                id="checkin-continue-btn"
                className="btn-primary w-full max-w-xs"
                onClick={handleComplete}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enter Innerbloom
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back */}
        {phase !== 'mood' && (
          <motion.button
            className="btn-ghost mt-4 mx-auto block text-xs"
            onClick={() => setPhase(phase === 'intensity' ? 'energy' : 'mood')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ← Back
          </motion.button>
        )}
      </div>
    </PageTransition>
  );
}
