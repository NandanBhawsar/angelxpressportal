import type { Student, Announcement, Volunteer, Resource, DonationNeed, AttendanceRecord, Homework, ClassSession } from '@/types';
import { loadStudents, loadAttendanceRecords, loadHomework, loadClassSessions } from './dataLoader';

// Load data from generated JSON files (server-side only)
// These will be empty arrays on client-side, data will be loaded via useEffect
let mockStudentsData: Student[] = [];
let mockAttendanceRecordsData: AttendanceRecord[] = [];
let mockHomeworkRecordsData: Homework[] = [];
let mockClassSessionsData: ClassSession[] = [];

// Only load on server-side
if (typeof window === 'undefined') {
  try {
    mockStudentsData = loadStudents();
    mockAttendanceRecordsData = loadAttendanceRecords();
    mockHomeworkRecordsData = loadHomework();
    mockClassSessionsData = loadClassSessions();
  } catch (e) {
    console.warn('Could not load mock data. Make sure data files exist.');
  }
}

export const mockStudents: Student[] = mockStudentsData;
export const mockAttendanceRecords = mockAttendanceRecordsData;
export const mockHomeworkRecords = mockHomeworkRecordsData;
export const mockClassSessions = mockClassSessionsData;

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Parent-Teacher Meeting',
    content: 'We will be conducting a parent-teacher meeting next week. Please confirm your availability.',
    author: 'Admin',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Sports Day Event',
    content: 'Annual sports day will be held on 15th of next month. All students are encouraged to participate.',
    author: 'Admin',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockVolunteers: Volunteer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    hours: [],
    totalHours: 0,
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    hours: [],
    totalHours: 0,
  },
];

export const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Mathematics Textbook - Grade 5',
    type: 'book',
    status: 'available',
    lendingRecords: [],
  },
  {
    id: '2',
    name: 'Tablet Device #1',
    type: 'tablet',
    status: 'lent',
    lendingRecords: [],
  },
  {
    id: '3',
    name: 'Stationery Kit',
    type: 'stationery',
    status: 'available',
    lendingRecords: [],
  },
];

export const mockDonationNeeds: DonationNeed[] = [
  {
    id: '1',
    item: 'Notebooks',
    quantity: 50,
    priority: 'high',
    description: 'Students need notebooks for daily classwork',
    status: 'pending',
  },
  {
    id: '2',
    item: 'Pencils and Pens',
    quantity: 100,
    priority: 'high',
    description: 'Basic writing materials required',
    status: 'pending',
  },
  {
    id: '3',
    item: 'Art Supplies',
    quantity: 20,
    priority: 'medium',
    description: 'Crayons, colors, and drawing papers',
    status: 'pending',
  },
];

