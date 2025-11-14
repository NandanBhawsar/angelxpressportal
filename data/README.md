# Mock Dataset for AngelXpress Teacher Portal

This directory contains auto-generated mock data for development and testing purposes.

## Dataset Overview

The dataset includes realistic data for a full year (2025) with:

- **35 Students** with Indian names across Classes 1-8
- **9,135 Attendance Records** (weekdays only, Jan-Dec 2025)
- **2,622 Homework Records** with submission status
- **1,653 Weekly Performance Notes** (one per student per week)
- **146 Class Session Logs** with lesson topics and teacher notes

## Files Generated

### JSON Files (Structured Data)
- `students.json` - Complete student profiles
- `attendance.json` - Daily attendance records
- `homework.json` - Homework assignments and submissions
- `weeklyPerformance.json` - Weekly performance scores and comments
- `classSessions.json` - Class session logs

### CSV Files (Spreadsheet Compatible)
- `students.csv` - Student data in CSV format
- `attendance.csv` - Attendance data in CSV format
- `homework.csv` - Homework data in CSV format
- `weeklyPerformance.csv` - Performance data in CSV format
- `classSessions.csv` - Session logs in CSV format

## Data Structure

### Students
```json
{
  "id": "STU001",
  "name": "Meera Verma",
  "age": 11,
  "grade": "Class 6",
  "background": "Family background description",
  "strengths": ["Leadership skills", "Helps other students"],
  "weaknesses": ["Needs improvement in reading"],
  "createdAt": "2024-12-01T00:00:00.000Z"
}
```

### Attendance Records
```json
{
  "id": "ATT000001",
  "studentId": "STU001",
  "studentName": "Meera Verma",
  "date": "2025-01-01",
  "status": "Present",
  "reason": null
}
```
**Status values:** `Present`, `Absent`, `Late`

### Homework
```json
{
  "id": "HW000001",
  "studentId": "STU001",
  "studentName": "Meera Verma",
  "title": "Mathematics Assignment",
  "description": "Complete the mathematics exercises from chapter 1",
  "subject": "Mathematics",
  "assignedDate": "2025-01-01",
  "dueDate": "2025-01-03",
  "submittedDate": "2025-01-02",
  "status": "submitted",
  "remark": "Completed on time"
}
```
**Status values:** `assigned`, `submitted`, `pending`

### Weekly Performance
```json
{
  "id": "PERF000001",
  "studentId": "STU001",
  "studentName": "Meera Verma",
  "weekStartDate": "2025-01-05",
  "score": 7,
  "comment": "Excellent performance this week!"
}
```
**Score range:** 1-10 (mostly 7-10 for realistic data)

### Class Sessions
```json
{
  "id": "SESS000001",
  "date": "2025-01-01",
  "subject": "Mathematics",
  "lessonTopic": "Addition and Subtraction",
  "teacherNotes": "Taught Addition and Subtraction to students. Most students understood the concept well.",
  "type": "classwork"
}
```
**Type values:** `classwork`, `activity`, `assessment`

## Regenerating Data

To regenerate the mock dataset:

```bash
node scripts/generateMockData.js
```

This will overwrite all existing data files with fresh mock data.

## Data Characteristics

- **Dates:** All data spans from 2025-01-01 to 2025-12-31
- **Weekdays Only:** Attendance and sessions only on weekdays (Monday-Friday)
- **Realistic Patterns:**
  - ~75% attendance rate (Present)
  - ~15% absent rate
  - ~10% late rate
  - ~60% homework submission rate
  - Performance scores mostly 7-10 (realistic for NGO learning center)

## Usage in Application

You can import this data into your application:

```javascript
import students from './data/students.json';
import attendance from './data/attendance.json';
import homework from './data/homework.json';
import weeklyPerformance from './data/weeklyPerformance.json';
import classSessions from './data/classSessions.json';
```

Or load it dynamically:

```javascript
const response = await fetch('/data/students.json');
const students = await response.json();
```

## Notes

- All data is fictional and generated for development purposes
- Student names are randomly generated Indian names
- Dates follow realistic school calendar (weekdays only)
- Data is consistent across all files (student IDs match)
- Ready for use in charts, tables, and analytics

