# AngelXpress Teacher & Student Portal

A comprehensive gamified learning platform for NGO teachers and students, built with Next.js, React, and TailwindCSS.

## Features

### Teacher Portal
- Student Management
- Attendance Tracking
- Class Sessions & Lesson Planning
- Homework Assignment
- Test Creation & Grading
- Event Management
- Volunteer Management
- Resource Tracking
- Communication Tools
- Analytics & Insights

### Student Portal
- Interactive Quizzes with Real-time Scoring
- Video & Article Tutorials
- Attendance Check-in
- Progress Tracking
- Leaderboards (Weekly, Monthly, All-Time)
- Badge Collection System
- XP & Level System
- Learning Streaks
- Gamified UI with Glassmorphism Design

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **State Management**: Zustand
- **Icons**: Lucide React
- **Charts**: Chart.js & react-chartjs-2
- **Notifications**: react-hot-toast

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for GitHub Pages deployment. The GitHub Actions workflow automatically builds and deploys the site when you push to the `main` branch.

### Manual Deployment

1. Build the static export:
```bash
npm run build
```

2. The `out` directory contains the static files ready for deployment.

## Project Structure

```
angelxpress-teacher-portal/
├── app/                    # Next.js app directory
│   ├── dashboard/          # Teacher dashboard
│   ├── students/           # Student management
│   ├── student/            # Student portal pages
│   │   ├── dashboard/      # Student dashboard
│   │   ├── quizzes/        # Quiz library & player
│   │   ├── tutorials/      # Tutorial library & viewer
│   │   ├── attendance/     # Attendance tracking
│   │   ├── leaderboard/    # Leaderboards
│   │   ├── badges/         # Badge collection
│   │   └── profile/        # Student profile
│   └── login/              # Dual portal login
├── components/              # React components
│   ├── Layout/             # Layout components
│   └── UI/                 # UI components (Glassmorphism buttons)
├── lib/                     # Utilities & store
│   ├── store.ts            # Zustand state management
│   └── mockData.ts         # Mock data
└── types/                   # TypeScript types
```

## Features in Detail

### Gamification System
- **XP System**: Earn XP by completing quizzes, tutorials, and daily check-ins
- **Levels**: Progress through 20 levels based on XP
- **Badges**: Unlock 30+ different badges for achievements
- **Streaks**: Maintain daily learning streaks
- **Leaderboards**: Compete with other students

### Glassmorphism UI
- Modern glassmorphism button components
- 5 color variants (Primary, XP, Level-Up, Danger, Reward)
- Smooth animations and hover effects
- Game-inspired design

### Quiz System
- Multiple choice questions
- Timer countdown
- Real-time progress tracking
- Score calculation
- Answer review
- XP rewards based on performance

### Tutorial System
- Video and article content
- Play/pause controls
- Progress tracking
- Completion detection
- XP rewards

## Contributing

This is a private project for AngelXpress NGO. For contributions, please contact the project maintainers.

## License

Private - All rights reserved

## Support

For issues or questions, please contact the development team.
