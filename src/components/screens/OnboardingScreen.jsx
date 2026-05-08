import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import useProfileStore from '../../stores/profileStore';
import useNavigationStore from '../../stores/navigationStore';
import PageTransition from '../shared/PageTransition';
import { struggleOptions, goalOptions, toneOptions } from '../../data/affirmations';

const steps = ['name', 'struggles', 'goals', 'tone', 'ready'];

function StepIndicator({ current, total }) {
  return (
    <div className="flex gap-2 mb-12">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="h-1 rounded-full"
          style={{
            width: i === current ? '32px' : '12px',
            background: i <= current ? 'rgba(129,140,248,0.6)' : 'rgba(255,255,255,0.08)',
          }}
          animate={{ width: i === current ? 32 : 12 }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </div>
  );
}

function SelectionCard({ item, selected, onToggle, multi = true }) {
  const isSelected = multi ? selected.includes(item.id) : selected === item.id;
  return (
    <motion.button
      onClick={() => onToggle(item.id)}
      className="glass-card p-4 text-left flex items-start gap-3 w-full"
      style={{
        borderColor: isSelected ? 'rgba(129,140,248,0.3)' : undefined,
        background: isSelected ? 'rgba(129,140,248,0.08)' : undefined,
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      layout
    >
      <span className="text-xl mt-0.5">{item.icon || item.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>{item.label}</p>
        {item.description && (
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.description}</p>
        )}
      </div>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
          style={{ background: 'rgba(129,140,248,0.3)' }}
        >
          <span className="text-xs">✓</span>
        </motion.div>
      )}
    </motion.button>
  );
}

export default function OnboardingScreen() {
  const profile = useProfileStore();
  const navigate = useNavigationStore(s => s.navigate);
  const [step, setStep] = useState(0);
  const [nameInput, setNameInput] = useState(profile.name || '');

  const toggleStruggle = (id) => {
    const current = profile.struggles;
    if (current.includes(id)) profile.setStruggles(current.filter(s => s !== id));
    else if (current.length < 4) profile.setStruggles([...current, id]);
  };

  const toggleGoal = (id) => {
    const current = profile.goals;
    if (current.includes(id)) profile.setGoals(current.filter(g => g !== id));
    else if (current.length < 3) profile.setGoals([...current, id]);
  };

  const nextStep = () => {
    if (step === 0 && nameInput.trim()) profile.setName(nameInput.trim());
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const complete = () => {
    profile.completeOnboarding();
    navigate('checkin');
  };

  const canProceed = () => {
    switch (steps[step]) {
      case 'name': return nameInput.trim().length > 0;
      case 'struggles': return profile.struggles.length > 0;
      case 'goals': return profile.goals.length > 0;
      case 'tone': return true;
      case 'ready': return true;
      default: return true;
    }
  };

  const stepContent = {
    name: (
      <div className="w-full max-w-sm">
        <h2 className="text-display text-2xl md:text-3xl font-light mb-3"
          style={{ color: 'rgba(255,255,255,0.92)' }}>
          What should we call you?
        </h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Just a first name. Something that feels like you.
        </p>
        <input
          id="onboarding-name-input"
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Your name"
          className="w-full bg-transparent border-b border-white/10 pb-3 text-xl font-light 
                     focus:outline-none focus:border-white/25 transition-colors
                     placeholder:text-white/20"
          style={{ color: 'rgba(255,255,255,0.9)' }}
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && canProceed() && nextStep()}
        />
      </div>
    ),
    struggles: (
      <div className="w-full max-w-md">
        <h2 className="text-display text-2xl md:text-3xl font-light mb-2"
          style={{ color: 'rgba(255,255,255,0.92)' }}>
          What weighs on you?
        </h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Choose up to 4. This helps Innerbloom understand what to prioritize.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {struggleOptions.map(item => (
            <SelectionCard
              key={item.id}
              item={item}
              selected={profile.struggles}
              onToggle={toggleStruggle}
            />
          ))}
        </div>
      </div>
    ),
    goals: (
      <div className="w-full max-w-md">
        <h2 className="text-display text-2xl md:text-3xl font-light mb-2"
          style={{ color: 'rgba(255,255,255,0.92)' }}>
          What are you seeking?
        </h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Choose up to 3. These shape the direction of your journey.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {goalOptions.map(item => (
            <SelectionCard
              key={item.id}
              item={item}
              selected={profile.goals}
              onToggle={toggleGoal}
            />
          ))}
        </div>
      </div>
    ),
    tone: (
      <div className="w-full max-w-md">
        <h2 className="text-display text-2xl md:text-3xl font-light mb-2"
          style={{ color: 'rgba(255,255,255,0.92)' }}>
          How should Innerbloom speak to you?
        </h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Choose the voice that feels most natural.
        </p>
        <div className="flex flex-col gap-3">
          {toneOptions.map(item => (
            <SelectionCard
              key={item.id}
              item={item}
              selected={profile.preferredTone}
              onToggle={(id) => profile.setPreferredTone(id)}
              multi={false}
            />
          ))}
        </div>
      </div>
    ),
    ready: (
      <div className="w-full max-w-sm text-center">
        <motion.div
          className="text-5xl mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🌱
        </motion.div>
        <h2 className="text-display text-2xl md:text-3xl font-light mb-3"
          style={{ color: 'rgba(255,255,255,0.92)' }}>
          {profile.name ? `Welcome, ${profile.name}` : 'Welcome'}
        </h2>
        <p className="text-body-serif text-sm mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Innerbloom will adapt to how you feel — changing its tone, pacing, and atmosphere 
          to match your emotional state.
        </p>
        <p className="text-body-serif text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Everything stays private. There are no wrong answers.
        </p>
      </div>
    ),
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg flex flex-col items-center">
        <StepIndicator current={step} total={steps.length} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[step]}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center"
          >
            {stepContent[steps[step]]}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3 mt-10 w-full max-w-sm">
          {step > 0 && (
            <motion.button
              className="btn-ghost flex-1"
              onClick={prevStep}
              whileTap={{ scale: 0.98 }}
            >
              Back
            </motion.button>
          )}
          <motion.button
            id="onboarding-next-btn"
            className="btn-primary flex-1"
            onClick={steps[step] === 'ready' ? complete : nextStep}
            disabled={!canProceed()}
            style={{ opacity: canProceed() ? 1 : 0.4 }}
            whileHover={canProceed() ? { scale: 1.02 } : {}}
            whileTap={canProceed() ? { scale: 0.98 } : {}}
          >
            {steps[step] === 'ready' ? "Let's Begin" : 'Continue'}
          </motion.button>
        </div>
      </div>
    </PageTransition>
  );
}
