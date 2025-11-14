import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  Student,
  AttendanceRecord,
  Homework,
  TestScore,
  ClassSession,
  LessonPlan,
  Worksheet,
  Test,
  Event,
  Volunteer,
  VolunteerHour,
  Resource,
  LendingRecord,
  Announcement,
  Message,
  DonationNeed,
  Language,
} from '@/types';

interface AppState {
  // Auth
  isAuthenticated: boolean;
  currentUser: string;
  login: (username: string) => void;
  logout: () => void;

  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Students
  students: Student[];
  addStudent: (student: Omit<Student, 'id' | 'createdAt'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  // Attendance
  attendanceRecords: AttendanceRecord[];
  markAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  updateAttendance: (id: string, updates: Partial<AttendanceRecord>) => void;

  // Homework
  homework: Homework[];
  addHomework: (hw: Omit<Homework, 'id'>) => void;
  updateHomework: (id: string, updates: Partial<Homework>) => void;
  deleteHomework: (id: string) => void;

  // Test Scores
  testScores: TestScore[];
  addTestScore: (score: Omit<TestScore, 'id'>) => void;
  updateTestScore: (id: string, updates: Partial<TestScore>) => void;

  // Classes
  classSessions: ClassSession[];
  addClassSession: (session: Omit<ClassSession, 'id'>) => void;
  updateClassSession: (id: string, updates: Partial<ClassSession>) => void;

  // Lesson Plans
  lessonPlans: LessonPlan[];
  addLessonPlan: (plan: Omit<LessonPlan, 'id' | 'generatedAt'>) => void;

  // Worksheets
  worksheets: Worksheet[];
  addWorksheet: (worksheet: Omit<Worksheet, 'id' | 'generatedAt'>) => void;

  // Tests
  tests: Test[];
  addTest: (test: Omit<Test, 'id' | 'createdAt'>) => void;
  updateTest: (id: string, updates: Partial<Test>) => void;
  deleteTest: (id: string) => void;

  // Events
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'createdAt'>) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;

  // Volunteers
  volunteers: Volunteer[];
  addVolunteer: (volunteer: Omit<Volunteer, 'id'>) => void;
  addVolunteerHour: (hour: Omit<VolunteerHour, 'id'>) => void;

  // Resources
  resources: Resource[];
  addResource: (resource: Omit<Resource, 'id' | 'lendingRecords'>) => void;
  updateResource: (id: string, updates: Partial<Resource>) => void;
  addLendingRecord: (record: Omit<LendingRecord, 'id'>) => void;
  updateLendingRecord: (id: string, updates: Partial<LendingRecord>) => void;

  // Announcements
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;

  // Messages
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'createdAt' | 'read'>) => void;
  markMessageRead: (id: string) => void;

  // Donation Needs
  donationNeeds: DonationNeed[];
  addDonationNeed: (need: Omit<DonationNeed, 'id'>) => void;
  updateDonationNeed: (id: string, updates: Partial<DonationNeed>) => void;
  deleteDonationNeed: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      isAuthenticated: false,
      currentUser: '',
      login: (username) => set({ isAuthenticated: true, currentUser: username }),
      logout: () => set({ isAuthenticated: false, currentUser: '' }),

      // Theme
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // Language
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // Students
      students: [],
      addStudent: (student) =>
        set((state) => ({
          students: [
            ...state.students,
            {
              ...student,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateStudent: (id, updates) =>
        set((state) => ({
          students: state.students.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        })),
      deleteStudent: (id) =>
        set((state) => ({
          students: state.students.filter((s) => s.id !== id),
        })),

      // Attendance
      attendanceRecords: [],
      markAttendance: (record) =>
        set((state) => ({
          attendanceRecords: [
            ...state.attendanceRecords,
            { ...record, id: Date.now().toString() },
          ],
        })),
      updateAttendance: (id, updates) =>
        set((state) => ({
          attendanceRecords: state.attendanceRecords.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        })),

      // Homework
      homework: [],
      addHomework: (hw) =>
        set((state) => ({
          homework: [...state.homework, { ...hw, id: Date.now().toString() }],
        })),
      updateHomework: (id, updates) =>
        set((state) => ({
          homework: state.homework.map((h) => (h.id === id ? { ...h, ...updates } : h)),
        })),
      deleteHomework: (id) =>
        set((state) => ({
          homework: state.homework.filter((h) => h.id !== id),
        })),

      // Test Scores
      testScores: [],
      addTestScore: (score) =>
        set((state) => ({
          testScores: [...state.testScores, { ...score, id: Date.now().toString() }],
        })),
      updateTestScore: (id, updates) =>
        set((state) => ({
          testScores: state.testScores.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        })),

      // Classes
      classSessions: [],
      addClassSession: (session) =>
        set((state) => ({
          classSessions: [...state.classSessions, { ...session, id: Date.now().toString() }],
        })),
      updateClassSession: (id, updates) =>
        set((state) => ({
          classSessions: state.classSessions.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),

      // Lesson Plans
      lessonPlans: [],
      addLessonPlan: (plan) =>
        set((state) => ({
          lessonPlans: [
            ...state.lessonPlans,
            { ...plan, id: Date.now().toString(), generatedAt: new Date().toISOString() },
          ],
        })),

      // Worksheets
      worksheets: [],
      addWorksheet: (worksheet) =>
        set((state) => ({
          worksheets: [
            ...state.worksheets,
            { ...worksheet, id: Date.now().toString(), generatedAt: new Date().toISOString() },
          ],
        })),

      // Tests
      tests: [],
      addTest: (test) =>
        set((state) => ({
          tests: [...state.tests, { ...test, id: Date.now().toString(), createdAt: new Date().toISOString() }],
        })),
      updateTest: (id, updates) =>
        set((state) => ({
          tests: state.tests.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteTest: (id) =>
        set((state) => ({
          tests: state.tests.filter((t) => t.id !== id),
        })),

      // Events
      events: [],
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, { ...event, id: Date.now().toString(), createdAt: new Date().toISOString() }],
        })),
      updateEvent: (id, updates) =>
        set((state) => ({
          events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        })),

      // Volunteers
      volunteers: [],
      addVolunteer: (volunteer) =>
        set((state) => ({
          volunteers: [
            ...state.volunteers,
            { ...volunteer, id: Date.now().toString() },
          ],
        })),
      addVolunteerHour: (hour) =>
        set((state) => {
          const newHour = { ...hour, id: Date.now().toString() };
          return {
            volunteers: state.volunteers.map((v) =>
              v.id === hour.volunteerId
                ? {
                    ...v,
                    hours: [...v.hours, newHour],
                    totalHours: v.totalHours + hour.hours,
                  }
                : v
            ),
          };
        }),

      // Resources
      resources: [],
      addResource: (resource) =>
        set((state) => ({
          resources: [...state.resources, { ...resource, id: Date.now().toString(), lendingRecords: [] }],
        })),
      updateResource: (id, updates) =>
        set((state) => ({
          resources: state.resources.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        })),
      addLendingRecord: (record) =>
        set((state) => {
          const newRecord = { ...record, id: Date.now().toString() };
          return {
            resources: state.resources.map((r) =>
              r.id === record.resourceId
                ? { ...r, lendingRecords: [...r.lendingRecords, newRecord] }
                : r
            ),
          };
        }),
      updateLendingRecord: (id, updates) =>
        set((state) => ({
          resources: state.resources.map((r) => ({
            ...r,
            lendingRecords: r.lendingRecords.map((l) =>
              l.id === id ? { ...l, ...updates } : l
            ),
          })),
        })),

      // Announcements
      announcements: [],
      addAnnouncement: (announcement) =>
        set((state) => ({
          announcements: [
            ...state.announcements,
            {
              ...announcement,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),
      updateAnnouncement: (id, updates) =>
        set((state) => ({
          announcements: state.announcements.map((a) =>
            a.id === id
              ? { ...a, ...updates, updatedAt: new Date().toISOString() }
              : a
          ),
        })),
      deleteAnnouncement: (id) =>
        set((state) => ({
          announcements: state.announcements.filter((a) => a.id !== id),
        })),

      // Messages
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            { ...message, id: Date.now().toString(), createdAt: new Date().toISOString(), read: false },
          ],
        })),
      markMessageRead: (id) =>
        set((state) => ({
          messages: state.messages.map((m) => (m.id === id ? { ...m, read: true } : m)),
        })),

      // Donation Needs
      donationNeeds: [],
      addDonationNeed: (need) =>
        set((state) => ({
          donationNeeds: [...state.donationNeeds, { ...need, id: Date.now().toString() }],
        })),
      updateDonationNeed: (id, updates) =>
        set((state) => ({
          donationNeeds: state.donationNeeds.map((n) => (n.id === id ? { ...n, ...updates } : n)),
        })),
      deleteDonationNeed: (id) =>
        set((state) => ({
          donationNeeds: state.donationNeeds.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'angelxpress-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        darkMode: state.darkMode,
        language: state.language,
        students: state.students,
        attendanceRecords: state.attendanceRecords,
        homework: state.homework,
        testScores: state.testScores,
        classSessions: state.classSessions,
        lessonPlans: state.lessonPlans,
        worksheets: state.worksheets,
        tests: state.tests,
        events: state.events,
        volunteers: state.volunteers,
        resources: state.resources,
        announcements: state.announcements,
        messages: state.messages,
        donationNeeds: state.donationNeeds,
      }),
    }
  )
);

