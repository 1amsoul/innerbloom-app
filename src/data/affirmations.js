/**
 * Innerbloom — Affirmation Content Database
 * 
 * Each affirmation is tagged with metadata for the decision engine:
 * - mood: primary emotional state match
 * - energy: low / medium / high
 * - intensity: 1-5 (how emotionally heavy)
 * - tone: gentle / warm / wise / direct
 * - bestTime: morning / afternoon / evening / night / any
 * - category: grounding / reassurance / empowerment / reflection / release / acceptance
 * - contraindications: moods where this should NOT appear
 */

const affirmations = [
  // === GROUNDING ===
  {
    id: 'g1',
    text: "You are here. That is enough.",
    mood: ['anxious', 'stressed', 'overwhelmed'],
    energy: 'low',
    intensity: 1,
    tone: 'gentle',
    bestTime: ['evening', 'night'],
    category: 'grounding',
    contraindications: ['motivated'],
    why: "Short grounding phrases help anchor you when your mind is racing."
  },
  {
    id: 'g2',
    text: "Your body is safe. Your breath is steady. This moment will pass.",
    mood: ['anxious', 'panic'],
    energy: 'low',
    intensity: 2,
    tone: 'gentle',
    bestTime: ['any'],
    category: 'grounding',
    contraindications: [],
    why: "Body-awareness affirmations activate your parasympathetic nervous system."
  },
  {
    id: 'g3',
    text: "Not everything that weighs on you is yours to carry.",
    mood: ['stressed', 'overwhelmed', 'tired'],
    energy: 'low',
    intensity: 3,
    tone: 'wise',
    bestTime: ['evening', 'night'],
    category: 'grounding',
    contraindications: [],
    why: "Boundary-setting reminders help release emotional weight."
  },
  {
    id: 'g4',
    text: "You don't need to solve everything before you rest.",
    mood: ['anxious', 'stressed', 'overwhelmed'],
    energy: 'low',
    intensity: 2,
    tone: 'warm',
    bestTime: ['evening', 'night'],
    category: 'grounding',
    contraindications: ['motivated'],
    why: "Permission-based affirmations reduce the pressure to perform."
  },
  {
    id: 'g5',
    text: "The ground beneath you hasn't moved. You are still standing.",
    mood: ['anxious', 'sad', 'lost'],
    energy: 'low',
    intensity: 2,
    tone: 'wise',
    bestTime: ['any'],
    category: 'grounding',
    contraindications: [],
    why: "Physical metaphors create a felt sense of stability."
  },
  {
    id: 'g6',
    text: "Breathe in slowly. You are not behind. You are exactly where recovery begins.",
    mood: ['anxious', 'overwhelmed', 'burnout'],
    energy: 'low',
    intensity: 2,
    tone: 'gentle',
    bestTime: ['morning', 'evening'],
    category: 'grounding',
    contraindications: [],
    why: "Breath-linked affirmations help regulate your nervous system."
  },

  // === REASSURANCE ===
  {
    id: 'r1',
    text: "You are doing better than you think. The evidence is quiet, but it's there.",
    mood: ['self-doubt', 'sad', 'lost'],
    energy: 'medium',
    intensity: 3,
    tone: 'warm',
    bestTime: ['morning', 'afternoon'],
    category: 'reassurance',
    contraindications: [],
    why: "Counter-narrative affirmations challenge the inner critic."
  },
  {
    id: 'r2',
    text: "Your worth isn't measured by your productivity today.",
    mood: ['burnout', 'tired', 'self-doubt'],
    energy: 'low',
    intensity: 2,
    tone: 'gentle',
    bestTime: ['evening', 'night'],
    category: 'reassurance',
    contraindications: ['motivated'],
    why: "Decoupling worth from output helps release performance anxiety."
  },
  {
    id: 'r3',
    text: "You have survived every difficult day so far. That track record is undefeated.",
    mood: ['anxious', 'self-doubt', 'sad'],
    energy: 'medium',
    intensity: 3,
    tone: 'direct',
    bestTime: ['any'],
    category: 'reassurance',
    contraindications: [],
    why: "Evidence-based reassurance creates confidence from your own history."
  },
  {
    id: 'r4',
    text: "Healing isn't linear. A hard day doesn't erase your progress.",
    mood: ['sad', 'self-doubt', 'overwhelmed'],
    energy: 'low',
    intensity: 3,
    tone: 'wise',
    bestTime: ['evening', 'night'],
    category: 'reassurance',
    contraindications: [],
    why: "Progress reframing helps prevent all-or-nothing thinking."
  },
  {
    id: 'r5',
    text: "You don't need to have it all figured out. Clarity comes in motion.",
    mood: ['lost', 'anxious', 'self-doubt'],
    energy: 'medium',
    intensity: 2,
    tone: 'warm',
    bestTime: ['morning'],
    category: 'reassurance',
    contraindications: [],
    why: "Releasing the need for certainty opens space for exploration."
  },
  {
    id: 'r6',
    text: "The people who truly matter aren't counting your mistakes.",
    mood: ['self-doubt', 'anxious', 'lonely'],
    energy: 'medium',
    intensity: 3,
    tone: 'warm',
    bestTime: ['any'],
    category: 'reassurance',
    contraindications: [],
    why: "Social reassurance helps quiet the fear of judgment."
  },

  // === EMPOWERMENT ===
  {
    id: 'e1',
    text: "You have the capacity to hold hard things and still move forward.",
    mood: ['motivated', 'calm', 'recovering'],
    energy: 'high',
    intensity: 3,
    tone: 'direct',
    bestTime: ['morning', 'afternoon'],
    category: 'empowerment',
    contraindications: ['tired', 'burnout'],
    why: "Capacity affirmations build emotional resilience narratives."
  },
  {
    id: 'e2',
    text: "Your next chapter doesn't need to look like anyone else's.",
    mood: ['motivated', 'lost', 'self-doubt'],
    energy: 'medium',
    intensity: 3,
    tone: 'wise',
    bestTime: ['morning'],
    category: 'empowerment',
    contraindications: [],
    why: "Comparison release creates space for authentic direction."
  },
  {
    id: 'e3',
    text: "The courage to begin again is already inside you.",
    mood: ['motivated', 'recovering', 'lost'],
    energy: 'high',
    intensity: 3,
    tone: 'warm',
    bestTime: ['morning', 'afternoon'],
    category: 'empowerment',
    contraindications: ['tired'],
    why: "Renewal affirmations support fresh starts without shame."
  },
  {
    id: 'e4',
    text: "You are not starting over. You are starting from experience.",
    mood: ['motivated', 'recovering', 'self-doubt'],
    energy: 'medium',
    intensity: 3,
    tone: 'wise',
    bestTime: ['morning'],
    category: 'empowerment',
    contraindications: [],
    why: "Reframing setbacks as experience builds self-trust."
  },
  {
    id: 'e5',
    text: "Today doesn't have to be perfect. It just has to be yours.",
    mood: ['motivated', 'calm', 'anxious'],
    energy: 'medium',
    intensity: 2,
    tone: 'warm',
    bestTime: ['morning'],
    category: 'empowerment',
    contraindications: [],
    why: "Ownership without perfection reduces morning anxiety."
  },
  {
    id: 'e6',
    text: "The version of you that you're becoming would be proud of today's effort.",
    mood: ['motivated', 'recovering'],
    energy: 'high',
    intensity: 4,
    tone: 'direct',
    bestTime: ['evening'],
    category: 'empowerment',
    contraindications: ['tired', 'burnout'],
    why: "Future-self connection creates meaningful motivation."
  },

  // === REFLECTION ===
  {
    id: 'ref1',
    text: "What you feel right now is information, not identity.",
    mood: ['anxious', 'sad', 'overwhelmed'],
    energy: 'medium',
    intensity: 3,
    tone: 'wise',
    bestTime: ['any'],
    category: 'reflection',
    contraindications: [],
    why: "Emotional differentiation prevents over-identification with feelings."
  },
  {
    id: 'ref2',
    text: "You've grown in ways that aren't visible yet. Trust the roots.",
    mood: ['self-doubt', 'lost', 'sad'],
    energy: 'low',
    intensity: 3,
    tone: 'warm',
    bestTime: ['evening', 'night'],
    category: 'reflection',
    contraindications: [],
    why: "Invisible progress affirmations honor unseen emotional work."
  },
  {
    id: 'ref3',
    text: "The fact that you're trying to understand yourself means you're already ahead.",
    mood: ['lost', 'self-doubt', 'calm'],
    energy: 'medium',
    intensity: 2,
    tone: 'warm',
    bestTime: ['any'],
    category: 'reflection',
    contraindications: [],
    why: "Self-awareness validation rewards the act of introspection."
  },
  {
    id: 'ref4',
    text: "Some endings are just the silence before a better beginning.",
    mood: ['sad', 'lost', 'recovering'],
    energy: 'medium',
    intensity: 4,
    tone: 'wise',
    bestTime: ['evening', 'night'],
    category: 'reflection',
    contraindications: [],
    why: "Transition framing helps process endings with hope."
  },

  // === RELEASE ===
  {
    id: 'rel1',
    text: "Let go of the version of today that you planned. Accept the one that showed up.",
    mood: ['stressed', 'overwhelmed', 'anxious'],
    energy: 'low',
    intensity: 3,
    tone: 'wise',
    bestTime: ['evening'],
    category: 'release',
    contraindications: [],
    why: "Expectation release reduces the gap between hoped and actual."
  },
  {
    id: 'rel2',
    text: "You can put it down now. You're allowed to stop holding everything.",
    mood: ['stressed', 'burnout', 'tired', 'overwhelmed'],
    energy: 'low',
    intensity: 2,
    tone: 'gentle',
    bestTime: ['evening', 'night'],
    category: 'release',
    contraindications: ['motivated'],
    why: "Permission to release is essential during emotional exhaustion."
  },
  {
    id: 'rel3',
    text: "Not every thought deserves your attention. You can let this one pass.",
    mood: ['anxious', 'stressed', 'overwhelmed'],
    energy: 'medium',
    intensity: 2,
    tone: 'gentle',
    bestTime: ['any'],
    category: 'release',
    contraindications: [],
    why: "Thought defusion techniques from ACT help create mental space."
  },
  {
    id: 'rel4',
    text: "You don't owe anyone an explanation for taking care of yourself.",
    mood: ['burnout', 'stressed', 'tired'],
    energy: 'low',
    intensity: 3,
    tone: 'direct',
    bestTime: ['any'],
    category: 'release',
    contraindications: [],
    why: "Boundary reinforcement supports self-care without guilt."
  },

  // === ACCEPTANCE ===
  {
    id: 'a1',
    text: "Some days the bravest thing you can do is simply rest.",
    mood: ['tired', 'burnout', 'sad'],
    energy: 'low',
    intensity: 1,
    tone: 'gentle',
    bestTime: ['evening', 'night'],
    category: 'acceptance',
    contraindications: ['motivated'],
    why: "Rest as courage reframes inactivity as intentional care."
  },
  {
    id: 'a2',
    text: "You are allowed to be a work in progress and still be worthy of love.",
    mood: ['self-doubt', 'lonely', 'sad'],
    energy: 'medium',
    intensity: 4,
    tone: 'warm',
    bestTime: ['any'],
    category: 'acceptance',
    contraindications: [],
    why: "Unconditional worth statements challenge conditional self-love."
  },
  {
    id: 'a3',
    text: "Your sensitivity is not a flaw. It's how you stay connected to what matters.",
    mood: ['overwhelmed', 'sad', 'lonely'],
    energy: 'medium',
    intensity: 3,
    tone: 'warm',
    bestTime: ['any'],
    category: 'acceptance',
    contraindications: [],
    why: "Sensitivity reframing transforms perceived weakness into strength."
  },
  {
    id: 'a4',
    text: "It's okay to not be okay. That truth alone takes strength.",
    mood: ['sad', 'overwhelmed', 'anxious'],
    energy: 'low',
    intensity: 2,
    tone: 'gentle',
    bestTime: ['any'],
    category: 'acceptance',
    contraindications: [],
    why: "Emotional honesty reduces the burden of performing wellness."
  },

  // === RESCUE-SPECIFIC (shorter, softer) ===
  {
    id: 'rescue1',
    text: "Breathe. You are safe.",
    mood: ['panic', 'anxious'],
    energy: 'low',
    intensity: 1,
    tone: 'gentle',
    bestTime: ['any'],
    category: 'grounding',
    contraindications: [],
    rescue: true,
    why: "Ultra-short grounding statements cut through panic."
  },
  {
    id: 'rescue2',
    text: "This feeling is temporary. You are not.",
    mood: ['panic', 'anxious', 'overwhelmed'],
    energy: 'low',
    intensity: 1,
    tone: 'gentle',
    bestTime: ['any'],
    category: 'grounding',
    contraindications: [],
    rescue: true,
    why: "Temporal perspective helps separate you from the moment."
  },
  {
    id: 'rescue3',
    text: "You've been here before. You made it through.",
    mood: ['panic', 'anxious', 'overwhelmed'],
    energy: 'low',
    intensity: 2,
    tone: 'warm',
    bestTime: ['any'],
    category: 'reassurance',
    contraindications: [],
    rescue: true,
    why: "Past survival evidence creates immediate reassurance."
  },
  {
    id: 'rescue4',
    text: "Right now, just be. Nothing else is required.",
    mood: ['panic', 'burnout', 'overwhelmed'],
    energy: 'low',
    intensity: 1,
    tone: 'gentle',
    bestTime: ['any'],
    category: 'grounding',
    contraindications: [],
    rescue: true,
    why: "Removing all expectations creates immediate relief."
  },
  {
    id: 'rescue5',
    text: "Your heart is still beating. That's your body choosing you.",
    mood: ['panic', 'anxious', 'sad'],
    energy: 'low',
    intensity: 2,
    tone: 'warm',
    bestTime: ['any'],
    category: 'grounding',
    contraindications: [],
    rescue: true,
    why: "Body-connection statements create an anchor point."
  },
  {
    id: 'rescue6',
    text: "Slow down. Soften. You don't need to fight this.",
    mood: ['panic', 'anxious', 'stressed'],
    energy: 'low',
    intensity: 1,
    tone: 'gentle',
    bestTime: ['any'],
    category: 'release',
    contraindications: [],
    rescue: true,
    why: "Counter-resistance prompts help release emotional tension."
  },
  {
    id: 'rescue7',
    text: "You are more than this moment.",
    mood: ['panic', 'sad', 'overwhelmed'],
    energy: 'low',
    intensity: 1,
    tone: 'wise',
    bestTime: ['any'],
    category: 'grounding',
    contraindications: [],
    rescue: true,
    why: "Identity beyond circumstance creates psychological space."
  },
  {
    id: 'rescue8',
    text: "Place your hand on your chest. Feel that rhythm. It's yours.",
    mood: ['panic', 'anxious'],
    energy: 'low',
    intensity: 1,
    tone: 'gentle',
    bestTime: ['any'],
    category: 'grounding',
    contraindications: [],
    rescue: true,
    why: "Somatic engagement activates calming neural pathways."
  },
];

export default affirmations;

export const moodOptions = [
  { id: 'anxious', label: 'Anxious', emoji: '😰', color: '#94a3b8', description: 'Racing thoughts, worry, restlessness' },
  { id: 'stressed', label: 'Stressed', emoji: '😤', color: '#a78bfa', description: 'Overwhelmed, tense, pressured' },
  { id: 'sad', label: 'Sad', emoji: '😢', color: '#7c9cbf', description: 'Heavy, tearful, down' },
  { id: 'tired', label: 'Tired', emoji: '😴', color: '#c4a882', description: 'Exhausted, drained, low energy' },
  { id: 'lonely', label: 'Lonely', emoji: '🥀', color: '#d4a0a0', description: 'Disconnected, isolated, yearning' },
  { id: 'self-doubt', label: 'Self-Doubt', emoji: '🪞', color: '#9ca3af', description: 'Not enough, imposter, uncertain' },
  { id: 'motivated', label: 'Motivated', emoji: '🔥', color: '#f59e0b', description: 'Energized, ready, determined' },
  { id: 'calm', label: 'Calm', emoji: '🌿', color: '#7dd3c0', description: 'Peaceful, centered, present' },
  { id: 'overwhelmed', label: 'Overwhelmed', emoji: '🌊', color: '#6b8db5', description: 'Too much, can\'t process, flooded' },
  { id: 'lost', label: 'Lost', emoji: '🧭', color: '#8b8fa3', description: 'Directionless, confused, searching' },
  { id: 'burnout', label: 'Burned Out', emoji: '🕯️', color: '#a08d76', description: 'Empty, depleted, nothing left' },
  { id: 'recovering', label: 'Recovering', emoji: '🌱', color: '#86c7a3', description: 'Healing, emerging, rebuilding' },
];

export const energyLevels = [
  { id: 'low', label: 'Low Energy', description: 'Drained, need rest', icon: '🌙' },
  { id: 'medium', label: 'Moderate', description: 'Steady, present', icon: '☁️' },
  { id: 'high', label: 'High Energy', description: 'Energized, active', icon: '☀️' },
];

export const toneOptions = [
  { id: 'gentle', label: 'Gentle', description: 'Soft, nurturing, quiet', icon: '🕊️' },
  { id: 'warm', label: 'Warm', description: 'Caring, encouraging, kind', icon: '🤗' },
  { id: 'wise', label: 'Wise', description: 'Reflective, thoughtful, deep', icon: '🦉' },
  { id: 'direct', label: 'Direct', description: 'Clear, honest, grounding', icon: '⚡' },
];

export const struggleOptions = [
  { id: 'overthinking', label: 'Overthinking', icon: '🧠' },
  { id: 'burnout', label: 'Burnout', icon: '🔥' },
  { id: 'self-doubt', label: 'Self-Doubt', icon: '🪞' },
  { id: 'anxiety', label: 'Anxiety', icon: '😰' },
  { id: 'loneliness', label: 'Loneliness', icon: '🥀' },
  { id: 'lack-of-motivation', label: 'Lack of Motivation', icon: '🐌' },
  { id: 'grief', label: 'Grief', icon: '🌧️' },
  { id: 'anger', label: 'Anger', icon: '🌋' },
  { id: 'perfectionism', label: 'Perfectionism', icon: '🎯' },
  { id: 'insomnia', label: 'Sleep Issues', icon: '🌙' },
];

export const goalOptions = [
  { id: 'peace', label: 'Inner Peace', icon: '🕊️' },
  { id: 'confidence', label: 'Self-Confidence', icon: '💪' },
  { id: 'resilience', label: 'Resilience', icon: '🌳' },
  { id: 'self-love', label: 'Self-Love', icon: '💛' },
  { id: 'clarity', label: 'Mental Clarity', icon: '🔮' },
  { id: 'rest', label: 'Permission to Rest', icon: '☁️' },
  { id: 'motivation', label: 'Motivation', icon: '🚀' },
  { id: 'connection', label: 'Feeling Connected', icon: '🤝' },
];

export const rescueScenarios = [
  { id: 'panic', label: 'Panic Attack', icon: '💨', description: 'Overwhelming fear, racing heart', mood: 'panic' },
  { id: 'overthinking', label: 'Can\'t Stop Thinking', icon: '🌀', description: 'Spiraling thoughts, mental loop', mood: 'anxious' },
  { id: 'burnout-crisis', label: 'Burnout Crash', icon: '🕯️', description: 'Completely empty, can\'t continue', mood: 'burnout' },
  { id: 'rejection', label: 'Rejection', icon: '💔', description: 'Feeling unwanted, not enough', mood: 'sad' },
  { id: 'pre-event', label: 'Pre-Event Anxiety', icon: '🎤', description: 'Interview, presentation, meeting', mood: 'anxious' },
  { id: 'insomnia', label: 'Can\'t Sleep', icon: '🌙', description: 'Mind won\'t quiet, restless', mood: 'anxious' },
];
