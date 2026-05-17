InnerBloom

InnerBloom is a wellness-focused emotional support application that creates adaptive affirmation experiences based on user emotional context.

Users can perform emotional check-ins, track mood history, enter rescue sessions, and receive personalized emotional guidance.

Installation

Clone repository:

git clone <repo-url>

Install dependencies:

npm install

Run development server:

npm run dev

Build:

npm run build

Preview:

npm run preview
AI Logs

No AI functionality was integrated into the product because the project requirements did not benefit from generative AI behavior.

The application uses a deterministic emotional decision engine that adapts content based on emotional context and user state.

AI assistance was used only during development for ideation, debugging assistance, and workflow acceleration.

Code Quality Notes
Modular folder separation
Reusable component design
State isolation through Zustand
Separation of business logic from UI components
Centralized decision engine
Persistent state handling
Scalable architecture for future feature additions
Reflection
Easy
Setting up Vite and Tailwind environment
Creating reusable screen components
Zustand integration for state management
Routing logic through screen switching
Medium
Designing mood-driven UI transitions
Managing persistent emotional history
Structuring modular store architecture
Creating reusable animations and components
Hard
Designing the emotional decision engine
Scoring affirmations across multiple contextual variables
Handling rescue scenarios and emotional edge cases
Balancing personalization without external AI systems
Challenges Faced
Mapping emotional states to meaningful content.
Preventing repetitive affirmation experiences.
Building adaptive logic while avoiding unnecessary complexity.
Maintaining emotional continuity across sessions.
Designing an interface that feels calm and supportive.
Future Improvements
Authentication
Cloud synchronization
Analytics dashboard
Journal support
Voice interactions
Optional AI-assisted emotional coaching
Multi-device sync
Loom Walkthrough Script

Hi, this is InnerBloom.

InnerBloom is an emotionally adaptive wellness application designed to personalize emotional support sessions.

Users begin with onboarding and emotional check-ins where mood, intensity, and energy levels are captured.

Based on this context, a custom decision engine dynamically selects affirmations and experiences.

The application also includes rescue mode, reflections, emotional history tracking, and adaptive interfaces.

The project was built using React, Zustand, Vite, Tailwind, and Framer Motion.

The biggest challenge was creating personalization logic without relying on external AI APIs.

Thank you.
