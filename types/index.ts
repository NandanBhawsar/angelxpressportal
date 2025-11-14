export interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  background: string;
  strengths: string[];
  weaknesses: string[];
  emotionalTags: EmotionalTag[];
  flags: StudentFlag[];
  attendance: AttendanceRecord[];
  homework: Homework[];
  testScores: TestScore[];
  media: MediaFile[];
  notes: Note[];
  createdAt: string;
}

export type EmotionalTag = 'Distracted' | 'Low confidence' | 'Active' | 'Upset' | 'Needs help';

export type StudentFlag = 'Needs counselling' | 'Needs materials' | 'Irregular attendance';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  reason?: string;
}

export interface Homework {
  id: string;
  studentId: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  status: 'assigned' | 'submitted' | 'pending';
  submittedDate?: string;
}

export interface TestScore {
  id: string;
  studentId: string;
  testName: string;
  subject: string;
  score: number;
  maxScore: number;
  date: string;
}

export interface MediaFile {
  id: string;
  studentId: string;
  type: 'audio' | 'video' | 'image';
  url: string;
  name: string;
  uploadedAt: string;
}

export interface Note {
  id: string;
  studentId: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export interface ClassSession {
  id: string;
  date: string;
  subject: string;
  topics: string[];
  observations: string;
  template?: SessionTemplate;
}

export type SessionTemplate = {
  warmup: string;
  teaching: string;
  reflection: string;
};

export interface LessonPlan {
  id: string;
  subject: string;
  grade: string;
  topics: string[];
  duration: number;
  objectives: string[];
  activities: string[];
  materials: string[];
  generatedAt: string;
}

export interface Worksheet {
  id: string;
  title: string;
  subject: string;
  grade: string;
  questions: WorksheetQuestion[];
  generatedAt: string;
}

export interface WorksheetQuestion {
  id: string;
  type: 'mcq' | 'short' | 'long';
  question: string;
  options?: string[];
  correctAnswer?: string;
}

export interface Test {
  id: string;
  title: string;
  subject: string;
  grade: string;
  questions: TestQuestion[];
  maxScore: number;
  createdAt: string;
}

export interface TestQuestion {
  id: string;
  type: 'mcq' | 'short' | 'long';
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  description: string;
  studentIds: string[];
  materials: string[];
  photos: string[];
  createdAt: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  hours: VolunteerHour[];
  totalHours: number;
}

export interface VolunteerHour {
  id: string;
  volunteerId: string;
  date: string;
  hours: number;
  activity: string;
  description: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'book' | 'stationery' | 'tablet' | 'other';
  status: 'available' | 'lent' | 'damaged';
  lendingRecords: LendingRecord[];
}

export interface LendingRecord {
  id: string;
  resourceId: string;
  studentId?: string;
  volunteerId?: string;
  issueDate: string;
  returnDate?: string;
  notes: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface DonationNeed {
  id: string;
  item: string;
  quantity: number;
  priority: 'high' | 'medium' | 'low';
  description: string;
  status: 'pending' | 'fulfilled';
}

export type Language = 'en' | 'hi' | 'mr';

