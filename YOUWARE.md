# Interactive Love Letter

A romantic interactive web application designed for a special Valentine's Day surprise.

## Features

- **Lock Screen**: A secure entry point requiring a special passcode (`081109`) with the hint "Finished this at 08:11:09 (MMDDYYHH)".
- **Reasons Why I Love You**: An interactive list revealing heartfelt reasons before the main letter.
- **Interactive Envelope**: A red envelope that opens with an animation upon clicking.
- **Heart Background**: Floating hearts animation for a romantic atmosphere.
- **Personalized Letter**: A heartfelt message written in Taglish.
- **Mobile Optimized**: Designed to look great on phone screens.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion (Animations)
- Lucide React (Icons)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Customization

- **Passcode**: Edit `PASSCODE` constant in `src/components/LockScreen.tsx`.
- **Reasons**: Edit `REASONS` array in `src/components/Reasons.tsx`.
- **Message**: Edit `LETTER_CONTENT` in `src/components/Letter.tsx`.
- **Images/Theme**: Modify Tailwind classes in respective components.
