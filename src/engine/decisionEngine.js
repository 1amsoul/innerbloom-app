import affirmations from '../data/affirmations';

function getAdjacentMoods(mood) {
  const map = {
    'anxious': ['stressed', 'overwhelmed', 'panic'],
    'stressed': ['anxious', 'overwhelmed', 'burnout'],
    'sad': ['lonely', 'lost', 'self-doubt'],
    'tired': ['burnout', 'overwhelmed'],
    'lonely': ['sad', 'lost'],
    'self-doubt': ['sad', 'anxious', 'lost'],
    'motivated': ['calm', 'recovering'],
    'calm': ['motivated', 'recovering'],
    'overwhelmed': ['anxious', 'stressed', 'burnout'],
    'lost': ['self-doubt', 'sad', 'lonely'],
    'burnout': ['tired', 'stressed', 'overwhelmed'],
    'recovering': ['calm', 'motivated'],
    'panic': ['anxious', 'overwhelmed'],
  };
  return map[mood] || [];
}

function getCurrentTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 6) return 'night';
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  if (hour < 21) return 'evening';
  return 'night';
}

function scoreAffirmation(aff, ctx) {
  let score = 0;
  const { mood, energy, intensity = 3, preferredTone, timeOfDay, recentlyShown = [],
    likedIds = [], skippedIds = [], tooIntenseIds = [], notMeIds = [], neededThisIds = [],
    isRescue = false, struggles = [] } = ctx;

  if (aff.mood.includes(mood)) score += 30;
  else if (aff.mood.some(m => getAdjacentMoods(mood).includes(m))) score += 12;
  else score -= 15;

  if (aff.contraindications?.includes(mood)) score -= 50;
  if (aff.energy === energy) score += 15;
  else if (Math.abs(['low','medium','high'].indexOf(aff.energy) - ['low','medium','high'].indexOf(energy)) === 1) score += 5;
  else score -= 8;

  const iDiff = Math.abs(aff.intensity - intensity);
  score += iDiff === 0 ? 10 : iDiff === 1 ? 5 : -iDiff * 3;

  if (aff.tone === preferredTone) score += 8;
  if (aff.bestTime.includes('any') || aff.bestTime.includes(timeOfDay)) score += 6;
  else score -= 3;

  if (isRescue) { if (aff.rescue) score += 40; else score -= 20; if (aff.intensity <= 2) score += 10; }
  else if (aff.rescue) score -= 10;

  if (recentlyShown.includes(aff.id)) score -= 25;
  if (likedIds.includes(aff.id)) score += 5;
  if (neededThisIds.includes(aff.id)) score += 8;
  if (skippedIds.includes(aff.id)) score -= 10;
  if (tooIntenseIds.includes(aff.id)) score -= 15;
  if (notMeIds.includes(aff.id)) score -= 20;

  const strugMap = {
    'overthinking': ['grounding','release'], 'burnout': ['acceptance','release'],
    'self-doubt': ['reassurance','empowerment'], 'anxiety': ['grounding','release'],
    'loneliness': ['acceptance','reassurance'], 'lack-of-motivation': ['empowerment','reflection'],
  };
  struggles.forEach(s => { if ((strugMap[s] || []).includes(aff.category)) score += 4; });

  return score;
}

export function selectAffirmations(context, count = 5) {
  const ctx = { ...context, timeOfDay: getCurrentTimeOfDay() };
  const scored = affirmations.map(a => ({ ...a, score: scoreAffirmation(a, ctx) }));
  scored.sort((a, b) => b.score - a.score);
  const selected = [];
  for (const aff of scored) {
    if (selected.length >= count) break;
    if (selected.filter(s => s.category === aff.category).length >= 2) continue;
    selected.push(aff);
  }
  return selected;
}

export function generateWhyExplanation(aff, ctx) {
  const reasons = [];
  if (aff.why) reasons.push(aff.why);
  const { mood, preferredTone, moodHistory = [] } = ctx;
  const moodLabels = { 'anxious':'anxious','stressed':'stressed','sad':'down','tired':'low on energy',
    'lonely':'disconnected','self-doubt':'uncertain','motivated':'energized','calm':'peaceful',
    'overwhelmed':'overwhelmed','lost':'searching','burnout':'burned out','recovering':'healing' };
  if (aff.mood.includes(mood)) reasons.push(`Chosen because you're feeling ${moodLabels[mood]||mood} right now.`);
  if (aff.tone === preferredTone) reasons.push(`Matches your preferred ${preferredTone} tone.`);
  const tod = getCurrentTimeOfDay();
  if (aff.bestTime.includes(tod)) reasons.push(`This resonates during ${tod}s.`);
  if (moodHistory.length > 5) {
    const heavy = ['anxious','stressed','sad','overwhelmed','burnout'];
    const recentHeavy = moodHistory.slice(-5).filter(h => heavy.includes(h.mood)).length;
    if (recentHeavy >= 3 && aff.category === 'grounding')
      reasons.push("Your recent patterns suggest grounding would help.");
  }
  return reasons.slice(0, 3);
}

export function generateInsights(moodHistory, sessions, likedAffirmations) {
  const insights = [];
  if (moodHistory.length < 3) {
    insights.push({ type:'welcome', title:'Your emotional story is just beginning',
      text:"As you check in more, Innerbloom will learn your patterns.", icon:'🌱' });
    return insights;
  }
  const week = 7*24*60*60*1000;
  const thisWeek = moodHistory.filter(h => Date.now() - new Date(h.timestamp).getTime() < week);
  const lastWeek = moodHistory.filter(h => { const t = Date.now()-new Date(h.timestamp).getTime(); return t>=week&&t<week*2; });
  const heavyM = ['anxious','stressed','sad','overwhelmed','burnout','panic','lonely'];
  const twHeavy = thisWeek.filter(h => heavyM.includes(h.mood)).length;
  const lwHeavy = lastWeek.filter(h => heavyM.includes(h.mood)).length;
  if (thisWeek.length >= 3) {
    if (twHeavy > thisWeek.length*0.6)
      insights.push({ type:'pattern', title:'This week felt heavier than usual',
        text:"You've been carrying a lot. That weight is real, and it's okay to move slowly.", icon:'🌧️', mood:'heavy' });
    else if (twHeavy < thisWeek.length*0.3)
      insights.push({ type:'pattern', title:"There's been lightness in your week",
        text:"Something has shifted. Your emotional rhythm is gentler right now.", icon:'🌤️', mood:'light' });
    if (lastWeek.length >= 3 && lwHeavy > twHeavy + 1)
      insights.push({ type:'trend', title:"You're trending lighter",
        text:"Compared to last week, your emotional load has eased.", icon:'📈', mood:'improving' });
  }
  const eveningE = thisWeek.filter(h => h.timeOfDay==='evening'||h.timeOfDay==='night');
  if (eveningE.length >= 2 && eveningE.filter(h=>heavyM.includes(h.mood)).length >= eveningE.length*0.7)
    insights.push({ type:'rhythm', title:'Evenings tend to be heavier',
      text:"You gravitate toward Innerbloom in the evening, often during harder moments.", icon:'🌙' });
  const moodCounts = {};
  thisWeek.forEach(h => { moodCounts[h.mood] = (moodCounts[h.mood]||0)+1; });
  const dominant = Object.entries(moodCounts).sort((a,b)=>b[1]-a[1])[0];
  if (dominant && dominant[1] >= 3) {
    const narr = { 'anxious':"Your mind has been busy. Anxiety carries \"what if\" weight.",
      'stressed':"Stress has been recurring. Not everything pressing is urgent.",
      'sad':"Sadness has been present. Sometimes feeling it fully is the bravest thing.",
      'calm':"You've found pockets of calm. That peace isn't accidental." };
    if (narr[dominant[0]])
      insights.push({ type:'dominant', title:`${dominant[0][0].toUpperCase()+dominant[0].slice(1)} has been most frequent`,
        text:narr[dominant[0]], icon:'💭', mood:dominant[0] });
  }
  if (likedAffirmations.length >= 3)
    insights.push({ type:'preference', title:'Your preferences are emerging',
      text:`You've resonated with ${likedAffirmations.length} affirmations. Innerbloom is learning.`, icon:'💫' });
  if (sessions.length >= 5)
    insights.push({ type:'commitment', title:'You keep showing up',
      text:`${sessions.length} sessions. Consistency is about the quiet decision to return.`, icon:'🌿' });
  return insights.slice(0, 5);
}
