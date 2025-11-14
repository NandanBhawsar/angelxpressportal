import type { Student, AttendanceRecord, Homework, ClassSession, Note } from '@/types';

// Cache for loaded data
let studentsDataCache: any[] | null = null;
let attendanceDataCache: any[] | null = null;
let homeworkDataCache: any[] | null = null;
let classSessionsDataCache: any[] | null = null;
let weeklyPerformanceDataCache: any[] | null = null;

// Load data - works in both server and client
function loadDataFile(filename: string): any[] {
  try {
    if (typeof window === 'undefined') {
      // Server-side: use fs
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(process.cwd(), 'data', filename);
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } else {
      // Client-side: data should be pre-loaded or use API
      // For now return empty, will be loaded via useEffect
      return [];
    }
  } catch (e) {
    console.warn(`Could not load ${filename}. Make sure to run: node scripts/generateMockData.js`, e);
    return [];
  }
}

// Get students data
function getStudentsData(): any[] {
  if (studentsDataCache === null) {
    studentsDataCache = loadDataFile('students.json');
  }
  return studentsDataCache;
}

// Get attendance data
function getAttendanceData(): any[] {
  if (attendanceDataCache === null) {
    attendanceDataCache = loadDataFile('attendance.json');
  }
  return attendanceDataCache;
}

// Get homework data
function getHomeworkData(): any[] {
  if (homeworkDataCache === null) {
    homeworkDataCache = loadDataFile('homework.json');
  }
  return homeworkDataCache;
}

// Get class sessions data
function getClassSessionsData(): any[] {
  if (classSessionsDataCache === null) {
    classSessionsDataCache = loadDataFile('classSessions.json');
  }
  return classSessionsDataCache;
}

// Get weekly performance data
function getWeeklyPerformanceData(): any[] {
  if (weeklyPerformanceDataCache === null) {
    weeklyPerformanceDataCache = loadDataFile('weeklyPerformance.json');
  }
  return weeklyPerformanceDataCache;
}

interface GeneratedStudent {
  id: string;
  name: string;
  age: number;
  grade: string;
  background: string;
  strengths: string[];
  weaknesses: string[];
  createdAt: string;
}

interface GeneratedAttendance {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  reason: string | null;
}

interface GeneratedHomework {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  description: string;
  subject: string;
  assignedDate: string;
  dueDate: string;
  submittedDate: string | null;
  status: 'assigned' | 'submitted' | 'pending';
  remark: string;
}

interface GeneratedClassSession {
  id: string;
  date: string;
  subject: string;
  lessonTopic: string;
  teacherNotes: string;
  type: 'classwork' | 'activity' | 'assessment';
}

interface GeneratedPerformance {
  id: string;
  studentId: string;
  studentName: string;
  weekStartDate: string;
  score: number;
  comment: string;
}

// Transform generated students to app format
export function loadStudents(): Student[] {
  const students = getStudentsData() as GeneratedStudent[];
  const attendance = getAttendanceData() as GeneratedAttendance[];
  const homework = getHomeworkData() as GeneratedHomework[];
  const performance = getWeeklyPerformanceData() as GeneratedPerformance[];

  return students.map((student) => {
    // Get attendance for this student
    const studentAttendance: AttendanceRecord[] = attendance
      .filter((a) => a.studentId === student.id)
      .map((a) => ({
        id: a.id,
        studentId: a.studentId,
        date: a.date,
        status: a.status,
        reason: a.reason || undefined,
      }));

    // Get homework for this student
    const studentHomework: Homework[] = homework
      .filter((h) => h.studentId === student.id)
      .map((h) => ({
        id: h.id,
        studentId: h.studentId,
        title: h.title,
        description: h.description,
        assignedDate: h.assignedDate,
        dueDate: h.dueDate,
        status: h.status,
        submittedDate: h.submittedDate || undefined,
      }));

    // Convert performance notes to app notes format
    const studentNotes: Note[] = performance
      .filter((p) => p.studentId === student.id)
      .slice(0, 20) // Limit to recent 20 notes
      .map((p) => ({
        id: p.id,
        studentId: p.studentId,
        content: `Week of ${p.weekStartDate}: Score ${p.score}/10 - ${p.comment}`,
        createdAt: p.weekStartDate,
        createdBy: 'Teacher',
      }));

    // Determine flags based on attendance pattern
    const flags: string[] = [];
    const absentCount = studentAttendance.filter((a) => a.status === 'Absent').length;
    const totalAttendance = studentAttendance.length;
    const absentRate = totalAttendance > 0 ? absentCount / totalAttendance : 0;

    if (absentRate > 0.3) {
      flags.push('Irregular attendance');
    }

    // Randomly assign some emotional tags based on performance
    const avgScore = performance
      .filter((p) => p.studentId === student.id)
      .reduce((sum, p) => sum + p.score, 0) / Math.max(1, performance.filter((p) => p.studentId === student.id).length);

    const emotionalTags: string[] = [];
    if (avgScore < 6) {
      emotionalTags.push('Needs help');
    }
    if (absentRate > 0.2) {
      emotionalTags.push('Distracted');
    }
    if (avgScore >= 8) {
      emotionalTags.push('Active');
    }
    if (avgScore < 7 && avgScore >= 5) {
      emotionalTags.push('Low confidence');
    }

    return {
      id: student.id,
      name: student.name,
      age: student.age,
      grade: student.grade,
      background: student.background,
      strengths: student.strengths,
      weaknesses: student.weaknesses,
      emotionalTags: emotionalTags as any,
      flags: flags as any,
      attendance: studentAttendance,
      homework: studentHomework,
      testScores: [], // Can be added later if needed
      media: [],
      notes: studentNotes,
      createdAt: student.createdAt,
    };
  });
}

// Load attendance records
export function loadAttendanceRecords(): AttendanceRecord[] {
  const attendance = getAttendanceData() as GeneratedAttendance[];
  return attendance.map((a) => ({
    id: a.id,
    studentId: a.studentId,
    date: a.date,
    status: a.status,
    reason: a.reason || undefined,
  }));
}

// Load homework
export function loadHomework(): Homework[] {
  const homework = getHomeworkData() as GeneratedHomework[];
  return homework.map((h) => ({
    id: h.id,
    studentId: h.studentId,
    title: h.title,
    description: h.description,
    assignedDate: h.assignedDate,
    dueDate: h.dueDate,
    status: h.status,
    submittedDate: h.submittedDate || undefined,
  }));
}

// Load class sessions
export function loadClassSessions(): ClassSession[] {
  const sessions = getClassSessionsData() as GeneratedClassSession[];
  return sessions.map((s) => ({
    id: s.id,
    date: s.date,
    subject: s.subject,
    topics: [s.lessonTopic],
    observations: s.teacherNotes,
  }));
}

// Load weekly performance
export function loadWeeklyPerformance() {
  return getWeeklyPerformanceData() as GeneratedPerformance[];
}

