# AngelXpress Student Portal - Complete Design Document

**Version 1.0** | **Frontend-Only MVP** | **Gamified Learning Platform**

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [User Personas](#user-personas)
3. [Core Features](#core-features)
4. [Detailed UI/UX Flows](#detailed-uiux-flows)
5. [Gamification Mechanics](#gamification-mechanics)
6. [Data Model (Frontend-Only)](#data-model-frontend-only)
7. [Admin & Teacher Dashboard](#admin--teacher-dashboard)
8. [Security & Authentication](#security--authentication)
9. [Mobile-First UI Structure](#mobile-first-ui-structure)
10. [Tech Stack Recommendation](#tech-stack-recommendation)
11. [Scalability & Future-Proofing](#scalability--future-proofing)
12. [Implementation Roadmap](#implementation-roadmap)

---

## Executive Summary

### Vision
Create an engaging, gamified learning platform that motivates students through interactive quizzes, tutorials, progress tracking, and reward systems—all while operating entirely on the frontend with mock data.

### Key Objectives
- **Engagement**: Increase student participation through gamification
- **Learning**: Provide structured tutorials and assessments
- **Tracking**: Monitor attendance, progress, and performance
- **Motivation**: Reward achievements with badges, XP, and leaderboards
- **Accessibility**: Mobile-first design for low-resource environments

### Target Users
- **Primary**: School students (Classes 1-8)
- **Secondary**: Teachers and NGO administrators
- **Context**: NGO learning centers in India

---

## User Personas

### 1. Student Persona: "Priya" (Age 10, Class 5)

**Background:**
- Lives with grandmother, parents work in another city
- Attends AngelXpress learning center after school
- Limited access to technology at home
- Enjoys games and competitions

**Goals:**
- Learn new concepts in fun ways
- See her progress and achievements
- Compete with friends on leaderboards
- Earn badges and rewards

**Pain Points:**
- Traditional learning feels boring
- Hard to track what she's learned
- Wants recognition for efforts
- Limited time for learning

**Tech Comfort:**
- Basic smartphone usage
- Familiar with simple apps
- Needs intuitive interface

**Key Behaviors:**
- Checks progress daily
- Tries to maintain learning streaks
- Shares achievements with friends
- Prefers visual content over text

---

### 2. Teacher Persona: "Mr. Sharma" (Volunteer Teacher)

**Background:**
- Part-time volunteer at AngelXpress
- Teaches Mathematics and Science
- Has 2-3 hours per week for content creation
- Not highly technical

**Goals:**
- Create engaging quizzes quickly
- Track student progress easily
- Identify students who need help
- Upload educational content

**Pain Points:**
- Limited time for content creation
- Needs simple tools (not complex)
- Wants to see which students are active
- Needs quick insights

**Tech Comfort:**
- Basic computer skills
- Can use forms and simple interfaces
- Prefers step-by-step workflows

**Key Behaviors:**
- Creates quizzes weekly
- Reviews student performance reports
- Uploads tutorial videos/articles
- Checks attendance regularly

---

### 3. Admin Persona: "Ms. Patel" (NGO Coordinator)

**Background:**
- Manages multiple learning centers
- Needs overview of all activities
- Reports to donors and stakeholders
- Coordinates with teachers

**Goals:**
- Monitor overall platform usage
- Generate impact reports
- Manage student and teacher accounts
- Track engagement metrics

**Pain Points:**
- Needs quick overview dashboards
- Wants exportable reports
- Must see trends and patterns
- Needs to identify issues quickly

**Tech Comfort:**
- Comfortable with dashboards
- Understands charts and graphs
- Can analyze data

**Key Behaviors:**
- Reviews analytics weekly
- Generates monthly reports
- Manages user accounts
- Monitors system health

---

## Core Features

### 1. Quizzes Module

#### MCQ Quizzes
- **Question Types**: Multiple choice (4 options)
- **Timer**: Optional per question or per quiz
- **Instant Feedback**: Show correct answer immediately
- **Retry Logic**: Allow multiple attempts with different questions
- **Difficulty Levels**: Easy, Medium, Hard
- **Subjects**: Math, Science, English, Hindi, Social Studies

#### Open-Ended Quizzes
- **Question Types**: Short answer, Essay
- **Teacher Evaluation**: Teachers can grade manually
- **Rubric System**: Pre-defined scoring criteria
- **Submission Tracking**: Track submission status

#### Quiz Features
- **Randomization**: Shuffle questions and options
- **Progress Indicator**: Show question X of Y
- **Save & Resume**: Save progress mid-quiz
- **Results Summary**: Detailed score breakdown
- **Review Mode**: Review answers after completion

---

### 2. Tutorials Module

#### Content Types
- **Video Tutorials**: Embedded YouTube/Vimeo or uploaded videos
- **Interactive Articles**: Text with images, diagrams, examples
- **Slideshows**: Step-by-step presentations
- **Practice Exercises**: Embedded practice problems

#### Tutorial Features
- **Bookmarking**: Save for later
- **Progress Tracking**: Track completion percentage
- **Notes**: Students can take notes
- **Related Content**: Suggest related tutorials
- **Completion Certificate**: Award after finishing

#### Content Organization
- **By Subject**: Math, Science, English, etc.
- **By Grade**: Class 1-8
- **By Topic**: Specific topics within subjects
- **Recommended**: Based on student performance

---

### 3. Attendance Tracking

#### Features
- **Daily Check-in**: Students mark attendance
- **Visual Calendar**: Monthly view with attendance status
- **Streak Tracking**: Consecutive days of attendance
- **Statistics**: Attendance percentage, total days
- **Notifications**: Remind students to check in

#### Data Source
- **Mock Data**: Pre-populated attendance records
- **Local Storage**: Student's own attendance
- **Visual Indicators**: Green (present), Red (absent), Yellow (late)

---

### 4. Progress & Analytics

#### Progress Graphs
- **Score Trends**: Line chart showing improvement over time
- **Subject Performance**: Bar chart comparing subjects
- **Completion Rates**: Pie chart of completed vs pending
- **Time Spent**: Track learning hours

#### Progress Features
- **Weekly Reports**: Summary of week's activities
- **Monthly Reports**: Comprehensive monthly summary
- **Achievement Timeline**: Visual timeline of achievements
- **Comparison**: Compare with class average (anonymized)

---

### 5. Gamification System

#### XP (Experience Points) System
- **Quiz Completion**: 50-200 XP based on score
- **Tutorial Completion**: 100 XP per tutorial
- **Daily Check-in**: 25 XP
- **Perfect Quiz Score**: Bonus 50 XP
- **Streak Bonus**: Extra XP for maintaining streaks

#### Badges
- **Learning Badges**: Complete 10/25/50 tutorials
- **Quiz Master**: Score 100% on 5 quizzes
- **Streak Badges**: 7/30/100 day streaks
- **Subject Expert**: Master a subject
- **Early Bird**: Check in before 9 AM
- **Night Owl**: Complete quiz after 8 PM
- **Perfect Week**: 100% attendance for a week

#### Levels
- **Level 1-5**: Beginner (0-1000 XP)
- **Level 6-10**: Intermediate (1000-5000 XP)
- **Level 11-15**: Advanced (5000-15000 XP)
- **Level 16-20**: Expert (15000+ XP)

#### Streaks
- **Daily Learning Streak**: Complete at least one activity per day
- **Quiz Streak**: Complete quizzes daily
- **Tutorial Streak**: Watch tutorials daily
- **Attendance Streak**: Check in daily

#### Leaderboards
- **Weekly Leaderboard**: Top performers this week
- **Monthly Leaderboard**: Top performers this month
- **All-Time Leaderboard**: Overall top performers
- **Subject-Specific**: Leaderboards per subject
- **Class-Based**: Leaderboards within same class

#### Rewards System
- **Unlockable Content**: Unlock advanced tutorials at certain levels
- **Virtual Rewards**: Custom avatars, themes, profile decorations
- **Recognition**: Featured student of the week
- **Certificates**: Digital certificates for achievements

---

### 6. Personalized Learning Recommendations

#### Rule-Based Engine (Frontend)
- **Performance-Based**: Recommend content based on quiz scores
- **Weakness Identification**: Suggest tutorials for low-scoring topics
- **Progression Path**: Recommend next level content
- **Interest-Based**: Track preferred subjects and suggest similar

#### Recommendation Logic
```javascript
// Example rule-based recommendation
if (student.mathScore < 70) {
  recommend("Basic Math Tutorials");
}
if (student.completedTutorials.includes("addition")) {
  recommend("Subtraction Tutorial");
}
if (student.level >= 5) {
  recommend("Advanced Content");
}
```

---

## Detailed UI/UX Flows

### Flow 1: Student Login & Dashboard

#### Entry Point
- **URL**: `/student/login`
- **Screen**: Simple login form with student ID and password (mock)

#### Login Screen
```
┌─────────────────────────────┐
│   AngelXpress Student       │
│   Portal                    │
│                             │
│   [Student ID Input]        │
│   [Password Input]          │
│                             │
│   [Login Button]            │
│                             │
│   Forgot Password?          │
└─────────────────────────────┘
```

#### Post-Login: Dashboard
```
┌─────────────────────────────────────┐
│  Welcome, Priya!          [Profile] │
├─────────────────────────────────────┤
│  Level 5 • 2,450 XP • 🔥 7 Day     │
│  Streak                              │
├─────────────────────────────────────┤
│  Quick Actions:                      │
│  [Take Quiz] [Watch Tutorial]       │
│  [Check Attendance]                  │
├─────────────────────────────────────┤
│  Today's Recommendations:           │
│  • Math: Addition Basics            │
│  • Science: Plant Life Cycle        │
├─────────────────────────────────────┤
│  Recent Activity:                    │
│  ✓ Completed: Math Quiz (85%)      │
│  ✓ Watched: Science Tutorial        │
├─────────────────────────────────────┤
│  Leaderboard (This Week):            │
│  1. Rahul (3,200 XP) 🥇             │
│  2. Anjali (2,800 XP) 🥈            │
│  3. You (2,450 XP) 🥉                │
└─────────────────────────────────────┘
```

#### Navigation Structure
- **Bottom Navigation Bar** (Mobile):
  - Home (Dashboard)
  - Quizzes
  - Tutorials
  - Progress
  - Profile

- **Sidebar** (Desktop):
  - Dashboard
  - Quizzes
  - Tutorials
  - Attendance
  - Progress & Analytics
  - Leaderboards
  - Rewards & Badges
  - Profile

---

### Flow 2: Taking a Quiz

#### Entry Points
1. Dashboard → "Take Quiz" button
2. Quizzes page → Select quiz
3. Recommendation → Click recommended quiz

#### Quiz Selection Screen
```
┌─────────────────────────────────────┐
│  Available Quizzes                  │
├─────────────────────────────────────┤
│  🔍 [Search]  [Filter: All Subjects]│
├─────────────────────────────────────┤
│  📐 Mathematics                     │
│  ┌─────────────────────────────┐   │
│  │ Addition Basics             │   │
│  │ ⭐⭐⭐⭐☆ 10 questions        │   │
│  │ 🏆 50 XP • ⏱ 15 min        │   │
│  │ [Start Quiz]                │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Multiplication Tables       │   │
│  │ ⭐⭐⭐⭐⭐ 15 questions        │   │
│  │ 🏆 100 XP • ⏱ 20 min        │   │
│  │ [Start Quiz]                │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

#### Quiz Taking Screen
```
┌─────────────────────────────────────┐
│  Question 3 of 10    [⏱ 12:45]     │
├─────────────────────────────────────┤
│  What is 15 + 27?                   │
│                                     │
│  ○ 40                               │
│  ○ 42                               │
│  ○ 41                               │
│  ○ 43                               │
│                                     │
│  [← Previous]    [Next →]          │
│  [Submit Quiz]                      │
└─────────────────────────────────────┘
```

#### Quiz Results Screen
```
┌─────────────────────────────────────┐
│  Quiz Complete! 🎉                  │
├─────────────────────────────────────┤
│  Your Score: 8/10 (80%)             │
│  ⏱ Time: 12 minutes                 │
│                                     │
│  🏆 Earned: 150 XP                  │
│  📈 +5 to Math Score                │
│                                     │
│  [Review Answers]                   │
│  [Take Another Quiz]                 │
│  [Share Result]                     │
└─────────────────────────────────────┘
```

---

### Flow 3: Watching Tutorials

#### Tutorial Library Screen
```
┌─────────────────────────────────────┐
│  Tutorial Library                   │
├─────────────────────────────────────┤
│  [All] [Math] [Science] [English]  │
├─────────────────────────────────────┤
│  📹 Video Tutorials                 │
│  ┌─────────────────────────────┐   │
│  │ Addition Basics             │   │
│  │ ⏱ 15 min • 📊 85% watched  │   │
│  │ [Continue Watching]         │   │
│  └─────────────────────────────┘   │
│                                     │
│  📄 Interactive Articles            │
│  ┌─────────────────────────────┐   │
│  │ Plant Life Cycle            │   │
│  │ 📖 5 min read • ✓ Complete  │   │
│  │ [Read Again]                │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

#### Tutorial Player Screen
```
┌─────────────────────────────────────┐
│  [← Back]  Addition Basics          │
├─────────────────────────────────────┤
│                                     │
│      [Video Player]                 │
│                                     │
│  Progress: ████████░░ 80%           │
│                                     │
│  [⏮ Previous] [⏸ Pause] [⏭ Next]  │
│                                     │
│  Related Tutorials:                 │
│  • Subtraction Basics               │
│  • Multiplication Basics            │
└─────────────────────────────────────┘
```

#### Tutorial Completion
```
┌─────────────────────────────────────┐
│  Tutorial Complete! ✅               │
├─────────────────────────────────────┤
│  🏆 Earned: 100 XP                  │
│  📜 Certificate Unlocked            │
│                                     │
│  [Take Related Quiz]                │
│  [Continue Learning]                │
└─────────────────────────────────────┘
```

---

### Flow 4: Viewing Progress

#### Progress Dashboard
```
┌─────────────────────────────────────┐
│  My Progress                        │
├─────────────────────────────────────┤
│  Overall Score: 78%                 │
│  ████████████░░░░ 78%               │
│                                     │
│  Subject Performance:               │
│  Math:      ████████░░ 80%          │
│  Science:   ██████░░░░ 60%          │
│  English:   ██████████ 90%          │
│                                     │
│  [View Detailed Reports]            │
│  [Download Progress Report]          │
└─────────────────────────────────────┘
```

#### Progress Charts
- **Line Chart**: Score trends over time
- **Bar Chart**: Subject-wise comparison
- **Pie Chart**: Completion status
- **Heatmap**: Activity calendar

---

### Flow 5: Earning Badges

#### Badge Collection Screen
```
┌─────────────────────────────────────┐
│  My Badges                          │
├─────────────────────────────────────┤
│  Earned (12/30)                     │
│                                     │
│  🏆 Quiz Master      ✅ Earned      │
│  📚 Bookworm         ✅ Earned      │
│  🔥 Streak Master    ✅ Earned      │
│  ⭐ Perfect Score    ✅ Earned      │
│                                     │
│  Locked (18/30)                     │
│                                     │
│  🎯 Perfect Week     🔒 5/7 days    │
│  🌟 Subject Expert   🔒 80% needed  │
│  💎 Diamond Level    🔒 Level 15    │
└─────────────────────────────────────┘
```

#### Badge Unlock Animation
- **Trigger**: When badge is earned
- **Animation**: Badge flies in with confetti
- **Sound**: Celebration sound effect
- **Notification**: "New Badge Unlocked!"

---

### Flow 6: Leaderboards

#### Leaderboard Screen
```
┌─────────────────────────────────────┐
│  Leaderboard - This Week            │
├─────────────────────────────────────┤
│  [Weekly] [Monthly] [All-Time]      │
├─────────────────────────────────────┤
│  🥇 1. Rahul Kumar                  │
│     3,200 XP • Level 8              │
│                                     │
│  🥈 2. Anjali Patel                 │
│     2,800 XP • Level 7              │
│                                     │
│  🥉 3. You (Priya)                  │
│     2,450 XP • Level 5              │
│                                     │
│  4. Vikram Singh                    │
│     2,100 XP • Level 5              │
│                                     │
│  [View Full Leaderboard]            │
└─────────────────────────────────────┘
```

---

### Flow 7: Student Profile

#### Profile Screen
```
┌─────────────────────────────────────┐
│  [Edit]                             │
├─────────────────────────────────────┤
│  👤 Priya Sharma                    │
│  Class 5 • Student ID: STU001       │
│                                     │
│  Level 5 • 2,450/3,000 XP           │
│  ████████████░░░░ 82% to Level 6   │
│                                     │
│  🔥 Current Streak: 7 days          │
│  📊 Best Streak: 15 days            │
│                                     │
│  Achievements:                      │
│  🏆 12 Badges                       │
│  📚 25 Tutorials Completed          │
│  ✅ 18 Quizzes Taken                │
│                                     │
│  [View Full Profile]                │
└─────────────────────────────────────┘
```

---

## Gamification Mechanics

### XP System Formula

#### Base XP Values
```javascript
const XP_VALUES = {
  quizCompletion: 50,        // Base for completing quiz
  quizScoreBonus: (score) => score * 2,  // Bonus based on score
  tutorialCompletion: 100,    // Completing a tutorial
  dailyCheckIn: 25,          // Daily attendance
  perfectQuiz: 50,           // Bonus for 100% score
  streakBonus: (days) => days * 10,  // Bonus for streak
  firstAttempt: 25,          // Bonus for first attempt
};
```

#### XP Calculation Example
```javascript
// Quiz completion
function calculateQuizXP(score, isPerfect, isFirstAttempt) {
  let xp = XP_VALUES.quizCompletion;
  xp += XP_VALUES.quizScoreBonus(score);
  if (isPerfect) xp += XP_VALUES.perfectQuiz;
  if (isFirstAttempt) xp += XP_VALUES.firstAttempt;
  return xp;
}

// Example: Score 80%, perfect, first attempt
// = 50 + 160 + 50 + 25 = 285 XP
```

#### Level Progression
```javascript
const LEVEL_REQUIREMENTS = {
  1: 0,      // Starting level
  2: 500,    // 500 XP needed
  3: 1000,   // 1000 XP needed
  4: 2000,   // 2000 XP needed
  5: 3000,   // 3000 XP needed
  6: 5000,   // 5000 XP needed
  7: 7500,   // 7500 XP needed
  8: 10000,  // 10000 XP needed
  // ... continues
};

function getLevel(xp) {
  for (let level = 20; level >= 1; level--) {
    if (xp >= LEVEL_REQUIREMENTS[level]) {
      return level;
    }
  }
  return 1;
}
```

---

### Badge System

#### Complete Badge List

**Learning Badges:**
- 📚 **Bookworm**: Complete 10 tutorials
- 📖 **Scholar**: Complete 25 tutorials
- 🎓 **Academic**: Complete 50 tutorials
- 📚 **Master Learner**: Complete 100 tutorials

**Quiz Badges:**
- ✅ **Quiz Taker**: Complete 5 quizzes
- 🎯 **Quiz Master**: Complete 25 quizzes
- 🏆 **Quiz Champion**: Complete 50 quizzes
- ⭐ **Perfect Score**: Score 100% on any quiz
- 💯 **Perfect Streak**: Score 100% on 5 quizzes in a row

**Streak Badges:**
- 🔥 **Week Warrior**: 7-day streak
- 🌟 **Month Master**: 30-day streak
- 💎 **Century Club**: 100-day streak
- ⚡ **Consistency King**: 365-day streak

**Subject Badges:**
- 🔢 **Math Whiz**: Score 90%+ in 10 Math quizzes
- 🔬 **Science Star**: Score 90%+ in 10 Science quizzes
- 📝 **English Expert**: Score 90%+ in 10 English quizzes

**Special Badges:**
- 🌅 **Early Bird**: Check in before 9 AM (5 times)
- 🦉 **Night Owl**: Complete activity after 8 PM (5 times)
- 📅 **Perfect Week**: 100% attendance for a week
- 🚀 **Fast Learner**: Complete tutorial in < 5 minutes
- 🎨 **Creative**: Submit 5 open-ended quiz answers

**Level Badges:**
- 🌱 **Beginner**: Reach Level 5
- 🌿 **Intermediate**: Reach Level 10
- 🌳 **Advanced**: Reach Level 15
- 🏔️ **Expert**: Reach Level 20

---

### Streak System

#### Daily Learning Streak Logic
```javascript
function updateStreak(studentId, activityDate) {
  const lastActivity = getLastActivityDate(studentId);
  const today = new Date().toISOString().split('T')[0];
  
  if (isSameDay(lastActivity, today)) {
    // Already counted today
    return;
  }
  
  if (isConsecutiveDay(lastActivity, today)) {
    // Continue streak
    incrementStreak(studentId);
  } else {
    // Break streak, start new one
    resetStreak(studentId);
  }
  
  // Award streak bonus XP
  const streakDays = getCurrentStreak(studentId);
  if (streakDays % 7 === 0) {
    awardStreakBonus(studentId, streakDays);
  }
}
```

#### Streak Types
1. **Daily Learning Streak**: Any activity (quiz, tutorial, check-in)
2. **Quiz Streak**: Complete at least one quiz daily
3. **Tutorial Streak**: Watch at least one tutorial daily
4. **Attendance Streak**: Check in daily

---

### Leaderboard System

#### Leaderboard Types

**Weekly Leaderboard:**
- Resets every Monday
- Based on XP earned in current week
- Top 50 students

**Monthly Leaderboard:**
- Resets on 1st of each month
- Based on XP earned in current month
- Top 100 students

**All-Time Leaderboard:**
- Cumulative XP
- Never resets
- Top 200 students

**Subject-Specific Leaderboards:**
- Separate leaderboards per subject
- Based on subject-specific XP
- Top 20 per subject

**Class-Based Leaderboards:**
- Students compete within their class
- More relevant for younger students
- Top 10 per class

#### Leaderboard Calculation
```javascript
function calculateLeaderboard(type, period) {
  const students = getAllStudents();
  
  let scores = students.map(student => ({
    id: student.id,
    name: student.name,
    xp: getXPForPeriod(student.id, period),
    level: getLevel(student.xp),
    avatar: student.avatar,
  }));
  
  // Sort by XP (descending)
  scores.sort((a, b) => b.xp - a.xp);
  
  // Add rank
  scores = scores.map((student, index) => ({
    ...student,
    rank: index + 1,
  }));
  
  return scores.slice(0, getLimitForType(type));
}
```

---

### Rewards Unlock System

#### Unlock Logic
```javascript
const UNLOCK_REQUIREMENTS = {
  advancedTutorials: { level: 5 },
  expertQuizzes: { level: 10, badges: ['Quiz Master'] },
  premiumContent: { xp: 5000, badges: ['Scholar'] },
  customAvatar: { level: 3 },
  profileTheme: { level: 7 },
  certificate: { tutorials: 25 },
};

function checkUnlocks(student) {
  const unlocks = [];
  
  for (const [reward, requirements] of Object.entries(UNLOCK_REQUIREMENTS)) {
    if (meetsRequirements(student, requirements)) {
      if (!student.unlockedRewards.includes(reward)) {
        unlocks.push(reward);
        unlockReward(student.id, reward);
      }
    }
  }
  
  return unlocks;
}
```

#### Reward Types
- **Content Unlocks**: Advanced tutorials, expert quizzes
- **Visual Rewards**: Custom avatars, profile themes, badges
- **Certificates**: Digital certificates for achievements
- **Recognition**: Featured student, special mentions

---

### Motivational Feedback System

#### Feedback Types

**Immediate Feedback:**
- "Great job!" after correct answer
- "Keep trying!" after wrong answer
- "You're improving!" for better scores

**Progress Feedback:**
- "You're 50% to the next level!"
- "2 more days for your streak badge!"
- "You're in the top 10 this week!"

**Achievement Feedback:**
- "New badge unlocked!"
- "Level up!"
- "You've completed 10 tutorials!"

**Encouragement:**
- "You're doing great!"
- "Keep up the good work!"
- "You're making progress!"

---

## Data Model (Frontend-Only)

### JSON File Structure

#### 1. Students Data (`students.json`)
```json
{
  "students": [
    {
      "id": "STU001",
      "name": "Priya Sharma",
      "email": "priya@example.com",
      "password": "hashed_password",
      "class": "5",
      "age": 10,
      "avatar": "avatar_1.png",
      "createdAt": "2025-01-01T00:00:00Z",
      "profile": {
        "bio": "I love learning math!",
        "interests": ["math", "science"]
      }
    }
  ]
}
```

#### 2. Quizzes Data (`quizzes.json`)
```json
{
  "quizzes": [
    {
      "id": "QUIZ001",
      "title": "Addition Basics",
      "subject": "Mathematics",
      "grade": "5",
      "difficulty": "easy",
      "timeLimit": 900,
      "totalQuestions": 10,
      "totalXP": 200,
      "questions": [
        {
          "id": "Q1",
          "type": "mcq",
          "question": "What is 15 + 27?",
          "options": ["40", "42", "41", "43"],
          "correctAnswer": 1,
          "points": 10,
          "explanation": "15 + 27 = 42"
        },
        {
          "id": "Q2",
          "type": "open-ended",
          "question": "Explain addition in your own words.",
          "points": 20,
          "rubric": {
            "criteria": ["Understanding", "Clarity", "Examples"],
            "maxPoints": [10, 5, 5]
          }
        }
      ],
      "createdBy": "TEACHER001",
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

#### 3. Quiz Attempts (`quizAttempts.json`)
```json
{
  "attempts": [
    {
      "id": "ATTEMPT001",
      "studentId": "STU001",
      "quizId": "QUIZ001",
      "startedAt": "2025-01-15T10:00:00Z",
      "completedAt": "2025-01-15T10:15:00Z",
      "timeSpent": 900,
      "answers": [
        {
          "questionId": "Q1",
          "answer": 1,
          "isCorrect": true,
          "timeSpent": 45
        }
      ],
      "score": 80,
      "maxScore": 100,
      "xpEarned": 160,
      "isFirstAttempt": true
    }
  ]
}
```

#### 4. Tutorials Data (`tutorials.json`)
```json
{
  "tutorials": [
    {
      "id": "TUT001",
      "title": "Addition Basics",
      "subject": "Mathematics",
      "grade": "5",
      "type": "video",
      "content": {
        "videoUrl": "https://youtube.com/watch?v=...",
        "duration": 900,
        "thumbnail": "thumb_1.jpg"
      },
      "description": "Learn the basics of addition",
      "xpReward": 100,
      "createdBy": "TEACHER001",
      "createdAt": "2025-01-01T00:00:00Z",
      "tags": ["addition", "basics", "math"]
    },
    {
      "id": "TUT002",
      "title": "Plant Life Cycle",
      "subject": "Science",
      "grade": "5",
      "type": "article",
      "content": {
        "html": "<p>Plants go through...</p>",
        "readingTime": 300,
        "images": ["img1.jpg", "img2.jpg"]
      },
      "description": "Learn about plant life cycles",
      "xpReward": 100,
      "createdBy": "TEACHER001",
      "createdAt": "2025-01-01T00:00:00Z",
      "tags": ["plants", "life-cycle", "science"]
    }
  ]
}
```

#### 5. Tutorial Progress (`tutorialProgress.json`)
```json
{
  "progress": [
    {
      "id": "PROG001",
      "studentId": "STU001",
      "tutorialId": "TUT001",
      "progress": 85,
      "completed": false,
      "lastWatched": "2025-01-15T10:00:00Z",
      "notes": "Remember: carry over when sum > 9",
      "xpEarned": 0
    }
  ]
}
```

#### 6. Attendance Data (`attendance.json`)
```json
{
  "attendance": [
    {
      "id": "ATT001",
      "studentId": "STU001",
      "date": "2025-01-15",
      "status": "present",
      "checkInTime": "2025-01-15T09:00:00Z",
      "streakDay": 7
    }
  ]
}
```

#### 7. XP & Levels (`xpData.json`)
```json
{
  "xpRecords": [
    {
      "studentId": "STU001",
      "totalXP": 2450,
      "level": 5,
      "xpToNextLevel": 550,
      "xpHistory": [
        {
          "date": "2025-01-15",
          "xp": 150,
          "source": "quiz",
          "details": "Quiz: Addition Basics"
        }
      ],
      "badges": ["QUIZ_TAKER", "BOOKWORM", "WEEK_WARRIOR"],
      "unlockedRewards": ["custom_avatar", "profile_theme_1"]
    }
  ]
}
```

#### 8. Leaderboard Data (`leaderboards.json`)
```json
{
  "weekly": [
    {
      "rank": 1,
      "studentId": "STU002",
      "name": "Rahul Kumar",
      "xp": 3200,
      "level": 8,
      "avatar": "avatar_2.png"
    }
  ],
  "monthly": [],
  "allTime": []
}
```

---

### LocalStorage Structure

#### Student Session
```javascript
localStorage.setItem('studentSession', JSON.stringify({
  studentId: 'STU001',
  name: 'Priya Sharma',
  level: 5,
  xp: 2450,
  currentStreak: 7,
  lastActivity: '2025-01-15T10:00:00Z',
  preferences: {
    theme: 'light',
    notifications: true,
    language: 'en'
  }
}));
```

#### Quiz Progress (Temporary)
```javascript
sessionStorage.setItem('currentQuiz', JSON.stringify({
  quizId: 'QUIZ001',
  startedAt: '2025-01-15T10:00:00Z',
  answers: {},
  currentQuestion: 3,
  timeRemaining: 720
}));
```

---

### IndexedDB Structure (Optional)

#### Database Schema
```javascript
// Students DB
const studentDB = {
  name: 'AngelXpressStudents',
  version: 1,
  stores: {
    students: { keyPath: 'id' },
    quizAttempts: { keyPath: 'id', indexes: ['studentId', 'quizId'] },
    tutorialProgress: { keyPath: 'id', indexes: ['studentId', 'tutorialId'] },
    attendance: { keyPath: 'id', indexes: ['studentId', 'date'] },
    xpRecords: { keyPath: 'studentId' }
  }
};
```

---

## Admin & Teacher Dashboard

### Teacher Dashboard Features

#### 1. Content Creation

**Create Quiz:**
```
┌─────────────────────────────────────┐
│  Create New Quiz                    │
├─────────────────────────────────────┤
│  Title: [________________]          │
│  Subject: [Math ▼]                 │
│  Grade: [Class 5 ▼]                │
│  Difficulty: [Easy ▼]              │
│  Time Limit: [15] minutes           │
│                                     │
│  Questions:                         │
│  ┌─────────────────────────────┐   │
│  │ Q1: What is 15 + 27?        │   │
│  │ Type: [MCQ ▼]               │   │
│  │ Options:                     │   │
│  │   [ ] 40                      │   │
│  │   [✓] 42 (Correct)           │   │
│  │   [ ] 41                      │   │
│  │   [ ] 43                      │   │
│  │ Points: [10]                  │   │
│  │ [Delete]                      │   │
│  └─────────────────────────────┘   │
│                                     │
│  [+ Add Question]                   │
│  [Save Quiz] [Publish]              │
└─────────────────────────────────────┘
```

**Upload Tutorial:**
```
┌─────────────────────────────────────┐
│  Upload Tutorial                    │
├─────────────────────────────────────┤
│  Title: [________________]          │
│  Type: [Video ▼]                    │
│  Subject: [Math ▼]                  │
│  Grade: [Class 5 ▼]                 │
│                                     │
│  Content:                           │
│  [Upload Video] or [YouTube URL]    │
│                                     │
│  Description:                       │
│  [Text area...]                     │
│                                     │
│  XP Reward: [100]                   │
│                                     │
│  [Save] [Publish]                   │
└─────────────────────────────────────┘
```

#### 2. Student Management

**Student List:**
```
┌─────────────────────────────────────┐
│  Students                           │
├─────────────────────────────────────┤
│  [Search] [Filter] [+ Add Student]  │
├─────────────────────────────────────┤
│  Priya Sharma                       │
│  Class 5 • Level 5 • 2,450 XP      │
│  [View] [Edit] [Delete]             │
│                                     │
│  Rahul Kumar                        │
│  Class 6 • Level 8 • 3,200 XP      │
│  [View] [Edit] [Delete]             │
└─────────────────────────────────────┘
```

**Edit Student:**
- Update name, class, email
- Reset password
- Adjust XP/Level (admin only)
- View full progress history

#### 3. Performance Tracking

**Class Performance Dashboard:**
```
┌─────────────────────────────────────┐
│  Class 5 Performance                │
├─────────────────────────────────────┤
│  Average Score: 78%                 │
│  Active Students: 25/30             │
│  Average XP: 2,100                  │
│                                     │
│  Subject Performance:               │
│  Math:      ████████░░ 80%          │
│  Science:   ██████░░░░ 60%          │
│  English:   ██████████ 90%          │
│                                     │
│  Top Performers:                    │
│  1. Priya (2,450 XP)                │
│  2. Anjali (2,200 XP)               │
│  3. Vikram (2,100 XP)               │
│                                     │
│  [Export Report]                    │
└─────────────────────────────────────┘
```

**Analytics Charts:**
- Student engagement over time
- Quiz completion rates
- Tutorial watch rates
- Attendance trends
- Subject-wise performance
- XP distribution

#### 4. Quiz Evaluation (Open-Ended)

**Pending Evaluations:**
```
┌─────────────────────────────────────┐
│  Pending Evaluations (5)            │
├─────────────────────────────────────┤
│  Priya Sharma - Addition Quiz       │
│  Question: "Explain addition..."    │
│  Answer: "Addition is when we..."   │
│  [Grade: ___/20] [Submit]           │
│                                     │
│  Rahul Kumar - Science Quiz         │
│  [Grade: ___/20] [Submit]           │
└─────────────────────────────────────┘
```

---

### Admin Dashboard Features

#### 1. Platform Overview

**Dashboard:**
```
┌─────────────────────────────────────┐
│  Platform Overview                  │
├─────────────────────────────────────┤
│  Total Students: 150                │
│  Active This Week: 120              │
│  Total Quizzes: 45                  │
│  Total Tutorials: 80                │
│                                     │
│  Engagement Metrics:                │
│  Daily Active Users: 95             │
│  Avg Session Time: 25 min           │
│  Quiz Completion Rate: 78%          │
│                                     │
│  [View Detailed Analytics]          │
└─────────────────────────────────────┘
```

#### 2. User Management

- Create/edit/delete student accounts
- Create/edit/delete teacher accounts
- Assign teachers to classes
- Manage roles and permissions

#### 3. Content Moderation

- Review and approve quizzes
- Review and approve tutorials
- Flag inappropriate content
- Manage content categories

#### 4. Analytics & Reports

**Reports:**
- Weekly engagement report
- Monthly performance report
- Student progress reports
- Teacher activity reports
- Export to CSV/PDF

**Analytics:**
- User growth trends
- Content performance
- Engagement patterns
- Learning outcomes

---

## Security & Authentication

### Frontend Authentication Simulation

#### Login Flow
```javascript
// Mock authentication (no real backend)
function login(studentId, password) {
  const student = students.find(s => s.id === studentId);
  
  if (!student) {
    return { success: false, error: 'Student not found' };
  }
  
  // In real app, hash and compare password
  // For mock: simple string comparison
  if (student.password !== hashPassword(password)) {
    return { success: false, error: 'Invalid password' };
  }
  
  // Create session
  const session = {
    studentId: student.id,
    name: student.name,
    role: 'student',
    loginTime: new Date().toISOString(),
    token: generateMockToken(student.id)
  };
  
  localStorage.setItem('authSession', JSON.stringify(session));
  return { success: true, session };
}
```

#### Role-Based Access
```javascript
function checkAccess(userRole, requiredRole) {
  const roleHierarchy = {
    'student': 1,
    'teacher': 2,
    'admin': 3
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

// Usage
if (checkAccess(currentUser.role, 'teacher')) {
  // Show teacher features
}
```

#### Protected Routes
```javascript
// Route protection
function ProtectedRoute({ children, requiredRole }) {
  const session = getSession();
  
  if (!session) {
    redirect('/login');
    return null;
  }
  
  if (!checkAccess(session.role, requiredRole)) {
    return <AccessDenied />;
  }
  
  return children;
}
```

### Safe Storage

#### Session Management
```javascript
// Store session securely
localStorage.setItem('authSession', JSON.stringify({
  studentId: 'STU001',
  token: 'mock_token_123',
  expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
}));

// Check expiration
function isSessionValid() {
  const session = JSON.parse(localStorage.getItem('authSession'));
  return session && session.expiresAt > Date.now();
}
```

#### Data Validation
```javascript
// Validate all inputs
function validateQuizAnswer(answer, question) {
  if (question.type === 'mcq') {
    return typeof answer === 'number' && 
           answer >= 0 && 
           answer < question.options.length;
  }
  // ... other validations
}
```

---

## Mobile-First UI Structure

### Responsive Breakpoints

```css
/* Mobile First Approach */
/* Base: Mobile (320px+) */
.container {
  padding: 1rem;
  width: 100%;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    padding: 3rem;
  }
}
```

### Component Hierarchy

```
App
├── AuthProvider
│   ├── LoginPage
│   └── RegisterPage
├── StudentApp
│   ├── Layout
│   │   ├── MobileNav (bottom)
│   │   └── DesktopSidebar
│   ├── Dashboard
│   ├── Quizzes
│   │   ├── QuizList
│   │   ├── QuizPlayer
│   │   └── QuizResults
│   ├── Tutorials
│   │   ├── TutorialLibrary
│   │   ├── VideoPlayer
│   │   └── ArticleReader
│   ├── Progress
│   │   ├── ProgressDashboard
│   │   ├── Charts
│   │   └── Reports
│   ├── Leaderboards
│   ├── Rewards
│   │   ├── Badges
│   │   └── Unlocks
│   └── Profile
├── TeacherApp
│   ├── TeacherDashboard
│   ├── ContentCreation
│   ├── StudentManagement
│   └── Analytics
└── AdminApp
    ├── AdminDashboard
    ├── UserManagement
    ├── ContentModeration
    └── SystemAnalytics
```

### Mobile Navigation

**Bottom Navigation Bar:**
```
┌─────────────────────────────────────┐
│                                     │
│         [Main Content]              │
│                                     │
├─────────────────────────────────────┤
│  🏠    📝    📚    📊    👤         │
│ Home  Quiz  Tut.  Prog. Profile    │
└─────────────────────────────────────┘
```

### Touch-Friendly UI

**Button Sizes:**
- Minimum touch target: 44x44px
- Primary actions: 48x48px
- Comfortable spacing: 8px minimum

**Swipe Gestures:**
- Swipe left/right: Navigate questions
- Swipe down: Refresh content
- Long press: Context menu

---

## Tech Stack Recommendation

### Core Framework

**React 18+ with Next.js 14+**
- Server-side rendering (SSR) for better performance
- File-based routing
- API routes for mock backend
- Image optimization
- Built-in performance optimizations

### Styling

**TailwindCSS 3+**
- Utility-first CSS
- Responsive design utilities
- Dark mode support
- Custom theme configuration

**Framer Motion**
- Smooth animations
- Page transitions
- Micro-interactions
- Badge unlock animations

### Data Visualization

**Recharts**
- Lightweight and React-friendly
- Responsive charts
- Customizable
- Good mobile support

**Alternative: Chart.js with react-chartjs-2**
- More chart types
- Better for complex visualizations

### State Management

**Zustand**
- Lightweight
- Simple API
- Good TypeScript support
- Persist middleware for localStorage

### Data Storage

**LocalStorage**
- Simple key-value storage
- Persistent across sessions
- 5-10MB limit (sufficient for MVP)

**IndexedDB (Optional)**
- For larger datasets
- Better performance
- More complex queries

**JSON Files**
- Static data (quizzes, tutorials)
- Easy to edit
- Version control friendly

### Form Handling

**React Hook Form**
- Performance optimized
- Easy validation
- Good TypeScript support

### UI Components

**Headless UI**
- Accessible components
- Unstyled (use with Tailwind)
- Keyboard navigation

**Lucide React**
- Icon library
- Consistent design
- Tree-shakeable

### Development Tools

**TypeScript**
- Type safety
- Better IDE support
- Reduced bugs

**ESLint + Prettier**
- Code quality
- Consistent formatting

---

## Scalability & Future-Proofing

### Backend Integration Strategy

#### Phase 1: Frontend-Only (Current)
- All data in JSON files
- LocalStorage for user state
- Mock authentication
- No real API calls

#### Phase 2: Hybrid Approach
```javascript
// Environment-based data source
const DATA_SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE;

function fetchStudents() {
  if (DATA_SOURCE === 'api') {
    return fetch('/api/students').then(r => r.json());
  } else {
    return import('./data/students.json');
  }
}
```

#### Phase 3: Full Backend
- Replace all JSON imports with API calls
- Move authentication to backend
- Real database (PostgreSQL/MongoDB)
- User management system
- Content management system

### Migration Path

#### Step 1: API Abstraction Layer
```javascript
// Create API service layer
class DataService {
  async getStudents() {
    // Try API first, fallback to JSON
    try {
      return await api.get('/students');
    } catch {
      return await import('./data/students.json');
    }
  }
}
```

#### Step 2: Gradual Migration
1. Start with read-only data (quizzes, tutorials)
2. Move user data (students, progress)
3. Move write operations (quiz attempts, progress)
4. Finally move authentication

#### Step 3: Data Sync
```javascript
// Sync local data with backend
async function syncData() {
  const localData = getLocalData();
  const serverData = await fetchServerData();
  
  // Merge and resolve conflicts
  const merged = mergeData(localData, serverData);
  
  // Update both local and server
  updateLocalData(merged);
  await updateServerData(merged);
}
```

### Future Expansion

#### Features to Add
- **Social Features**: Student forums, study groups
- **Parent Portal**: Parents can track child's progress
- **Offline Mode**: Service workers for offline access
- **Push Notifications**: Remind students to learn
- **Multi-language**: Support for regional languages
- **Video Conferencing**: Live classes integration
- **AI Recommendations**: ML-based content suggestions
- **Adaptive Learning**: Personalized learning paths

#### Technical Improvements
- **Caching Strategy**: Implement proper caching
- **Performance**: Code splitting, lazy loading
- **Monitoring**: Error tracking, analytics
- **Testing**: Unit tests, integration tests
- **CI/CD**: Automated deployment

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Set up Next.js project with TypeScript
- [ ] Configure TailwindCSS and Framer Motion
- [ ] Create base layout and navigation
- [ ] Implement authentication (mock)
- [ ] Set up data models and JSON files
- [ ] Create student dashboard

### Phase 2: Core Features (Week 3-4)
- [ ] Quiz module (MCQ + open-ended)
- [ ] Tutorial module (video + article)
- [ ] Attendance tracking
- [ ] Progress tracking and charts
- [ ] Basic gamification (XP, levels)

### Phase 3: Gamification (Week 5-6)
- [ ] Badge system
- [ ] Streak tracking
- [ ] Leaderboards
- [ ] Rewards unlock system
- [ ] Achievement notifications

### Phase 4: Teacher/Admin (Week 7-8)
- [ ] Teacher dashboard
- [ ] Content creation (quizzes, tutorials)
- [ ] Student management
- [ ] Performance analytics
- [ ] Admin dashboard

### Phase 5: Polish (Week 9-10)
- [ ] Mobile optimization
- [ ] Animations and transitions
- [ ] Error handling
- [ ] Loading states
- [ ] User testing and feedback

### Phase 6: Testing & Launch (Week 11-12)
- [ ] Comprehensive testing
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Documentation
- [ ] Deployment

---

## Conclusion

This design document provides a comprehensive blueprint for building the AngelXpress Student Portal. The frontend-only approach allows for rapid development and testing, while the structure supports future backend integration.

### Key Success Factors
1. **Engagement**: Gamification keeps students motivated
2. **Simplicity**: Easy-to-use interface for all skill levels
3. **Performance**: Fast loading, smooth animations
4. **Mobile-First**: Works on low-end devices
5. **Scalable**: Ready for future expansion

### Next Steps
1. Review this document with stakeholders
2. Create detailed wireframes for each screen
3. Set up development environment
4. Begin Phase 1 implementation
5. Iterate based on user feedback

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Status**: Ready for Implementation

