const fs = require('fs');
const path = require('path');

// Indian names for students
const firstNames = [
  'Priya', 'Rahul', 'Anjali', 'Arjun', 'Kavya', 'Vikram', 'Sneha', 'Rohan',
  'Meera', 'Aditya', 'Divya', 'Karan', 'Pooja', 'Siddharth', 'Neha', 'Aryan',
  'Shreya', 'Ravi', 'Ananya', 'Kunal', 'Isha', 'Manish', 'Tanvi', 'Amit',
  'Sakshi', 'Nikhil', 'Riya', 'Vishal', 'Kritika', 'Harsh', 'Aishwarya', 'Raj',
  'Swati', 'Deepak', 'Nisha', 'Abhishek', 'Pallavi', 'Sagar', 'Jyoti', 'Rohit'
];

const lastNames = [
  'Sharma', 'Kumar', 'Patel', 'Singh', 'Gupta', 'Verma', 'Reddy', 'Mehta',
  'Joshi', 'Malhotra', 'Agarwal', 'Iyer', 'Nair', 'Desai', 'Rao', 'Chopra',
  'Kapoor', 'Shah', 'Bansal', 'Goyal', 'Arora', 'Saxena', 'Tiwari', 'Mishra'
];

const subjects = ['Mathematics', 'English', 'Science', 'Hindi', 'Social Studies', 'Art', 'Physical Education'];
const topics = [
  'Addition and Subtraction', 'Multiplication Tables', 'Reading Comprehension', 'Grammar Basics',
  'Plants and Animals', 'Our Body', 'Indian History', 'Geography Basics', 'Drawing and Coloring',
  'Story Writing', 'Number Patterns', 'Fractions', 'Poetry', 'Weather and Climate',
  'Community Helpers', 'Shapes and Colors', 'Alphabet Practice', 'Basic Science Experiments'
];

const teacherComments = [
  'Shows great improvement in understanding concepts.',
  'Needs more practice with homework assignments.',
  'Very active and participates well in class.',
  'Should focus more on reading skills.',
  'Excellent performance this week!',
  'Needs extra attention in mathematics.',
  'Creative and shows good problem-solving skills.',
  'Attendance needs improvement.',
  'Making steady progress in all subjects.',
  'Should practice more at home.',
  'Very attentive and asks good questions.',
  'Needs help with time management.',
  'Shows enthusiasm for learning.',
  'Good teamwork skills demonstrated.',
  'Requires additional support in reading.'
];

// Generate random Indian name
function generateIndianName() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

// Generate dates between start and end
function generateDates(startDate, endDate) {
  const dates = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      dates.push(new Date(d).toISOString().split('T')[0]);
    }
  }
  return dates;
}

// Get all Mondays in 2025
function getMondaysInYear(year) {
  const mondays = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === 1) { // Monday
      mondays.push(new Date(d).toISOString().split('T')[0]);
    }
  }
  return mondays;
}

// Generate student profiles
function generateStudents(count = 35) {
  const students = [];
  const usedNames = new Set();
  
  for (let i = 1; i <= count; i++) {
    let name;
    do {
      name = generateIndianName();
    } while (usedNames.has(name));
    usedNames.add(name);
    
    const grade = Math.floor(Math.random() * 8) + 1; // Classes 1-8
    const age = 5 + grade + Math.floor(Math.random() * 2); // Age roughly matches grade
    
    students.push({
      id: `STU${String(i).padStart(3, '0')}`,
      name: name,
      age: age,
      grade: `Class ${grade}`,
      background: [
        'Lives with parents, father works as daily wage laborer',
        'Single parent household, mother works in nearby factory',
        'Lives with extended family, both parents work in city',
        'Stays with grandmother, parents work in another state',
        'Both parents work, lives with siblings',
        'Lives in nearby slum area, parents work as domestic help',
        'Family runs small shop, helps after school',
        'Parents work in construction, lives in temporary housing'
      ][Math.floor(Math.random() * 8)],
      strengths: [
        'Good at Math',
        'Creative and artistic',
        'Excellent reader',
        'Helps other students',
        'Good memory',
        'Leadership skills',
        'Quick learner'
      ].sort(() => 0.5 - Math.random()).slice(0, 2),
      weaknesses: [
        'Needs improvement in reading',
        'Struggles with Math word problems',
        'Needs to focus more',
        'Time management',
        'Needs practice in writing',
        'Shy, needs confidence building'
      ].sort(() => 0.5 - Math.random()).slice(0, 2),
      createdAt: '2024-12-01T00:00:00.000Z'
    });
  }
  
  return students;
}

// Generate attendance records
function generateAttendance(students, dates) {
  const attendance = [];
  let recordId = 1;
  
  students.forEach(student => {
    dates.forEach(date => {
      const rand = Math.random();
      let status;
      let reason = null;
      
      if (rand < 0.75) { // 75% present
        status = 'Present';
      } else if (rand < 0.90) { // 15% absent
        status = 'Absent';
        reason = [
          'Sick',
          'Family emergency',
          'Transportation issue',
          'No reason provided'
        ][Math.floor(Math.random() * 4)];
      } else { // 10% late
        status = 'Late';
        reason = [
          'Transportation delay',
          'Overslept',
          'Family issue',
          'Weather'
        ][Math.floor(Math.random() * 4)];
      }
      
      attendance.push({
        id: `ATT${String(recordId++).padStart(6, '0')}`,
        studentId: student.id,
        studentName: student.name,
        date: date,
        status: status,
        reason: reason
      });
    });
  });
  
  return attendance;
}

// Generate homework submissions
function generateHomework(students, dates) {
  const homework = [];
  let hwId = 1;
  
  // Generate homework roughly 3 times per week
  const homeworkDates = dates.filter((_, idx) => idx % 2 === 0 && Math.random() > 0.3);
  
  homeworkDates.forEach(date => {
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const assignedStudents = students.filter(() => Math.random() > 0.3); // 70% get homework
    
    assignedStudents.forEach(student => {
      const rand = Math.random();
      let status;
      let submittedDate = null;
      
      if (rand < 0.60) { // 60% submitted
        status = 'submitted';
        const dueDate = new Date(date);
        dueDate.setDate(dueDate.getDate() + 2);
        submittedDate = new Date(dueDate.getTime() - Math.random() * 2 * 24 * 60 * 60 * 1000)
          .toISOString().split('T')[0];
      } else if (rand < 0.85) { // 25% pending
        status = 'pending';
      } else { // 15% assigned but not yet due
        status = 'assigned';
      }
      
      const dueDate = new Date(date);
      dueDate.setDate(dueDate.getDate() + 2);
      
      homework.push({
        id: `HW${String(hwId++).padStart(6, '0')}`,
        studentId: student.id,
        studentName: student.name,
        title: `${subject} Assignment`,
        description: `Complete the ${subject.toLowerCase()} exercises from chapter ${Math.floor(Math.random() * 5) + 1}`,
        subject: subject,
        assignedDate: date,
        dueDate: dueDate.toISOString().split('T')[0],
        submittedDate: submittedDate,
        status: status,
        remark: status === 'submitted' 
          ? 'Completed on time' 
          : status === 'pending' 
          ? 'Not submitted yet' 
          : 'Assigned'
      });
    });
  });
  
  return homework;
}

// Generate weekly performance notes
function generateWeeklyPerformance(students, mondays) {
  const performance = [];
  let perfId = 1;
  
  mondays.forEach(weekStart => {
    students.forEach(student => {
      // 90% chance of having a performance note each week
      if (Math.random() > 0.1) {
        const score = Math.floor(Math.random() * 4) + 7; // Score between 7-10 (mostly good)
        const comment = teacherComments[Math.floor(Math.random() * teacherComments.length)];
        
        performance.push({
          id: `PERF${String(perfId++).padStart(6, '0')}`,
          studentId: student.id,
          studentName: student.name,
          weekStartDate: weekStart,
          score: score,
          comment: comment
        });
      }
    });
  });
  
  return performance;
}

// Generate class session logs
function generateClassSessions(dates) {
  const sessions = [];
  let sessionId = 1;
  
  // Generate sessions for about 60% of school days
  const sessionDates = dates.filter(() => Math.random() > 0.4);
  
  sessionDates.forEach(date => {
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const type = ['classwork', 'activity', 'assessment'][Math.floor(Math.random() * 3)];
    
    const notes = [
      `Taught ${topic} to students. Most students understood the concept well.`,
      `Conducted ${type} on ${topic}. Students were engaged and participated actively.`,
      `Covered ${topic} in ${subject}. Some students needed extra explanation.`,
      `${type} session on ${topic}. Good participation from all students.`,
      `Taught ${topic}. Used visual aids to help students understand better.`,
      `${type} on ${topic}. Students showed interest and asked questions.`
    ][Math.floor(Math.random() * 6)];
    
    sessions.push({
      id: `SESS${String(sessionId++).padStart(6, '0')}`,
      date: date,
      subject: subject,
      lessonTopic: topic,
      teacherNotes: notes,
      type: type
    });
  });
  
  return sessions;
}

// Convert to CSV
function toCSV(data, headers) {
  const rows = [headers.join(',')];
  data.forEach(item => {
    const row = headers.map(header => {
      const value = item[header];
      if (value === null || value === undefined) return '';
      if (Array.isArray(value)) return `"${value.join('; ')}"`;
      if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
      return value;
    });
    rows.push(row.join(','));
  });
  return rows.join('\n');
}

// Main execution
console.log('Generating mock dataset...');

const students = generateStudents(35);
const dates = generateDates('2025-01-01', '2025-12-31');
const mondays = getMondaysInYear(2025);

const attendance = generateAttendance(students, dates);
const homework = generateHomework(students, dates);
const performance = generateWeeklyPerformance(students, mondays);
const classSessions = generateClassSessions(dates);

// Create output directory
const outputDir = path.join(__dirname, '../data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Save JSON files
fs.writeFileSync(
  path.join(outputDir, 'students.json'),
  JSON.stringify(students, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, 'attendance.json'),
  JSON.stringify(attendance, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, 'homework.json'),
  JSON.stringify(homework, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, 'weeklyPerformance.json'),
  JSON.stringify(performance, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, 'classSessions.json'),
  JSON.stringify(classSessions, null, 2)
);

// Save CSV files
fs.writeFileSync(
  path.join(outputDir, 'students.csv'),
  toCSV(students, ['id', 'name', 'age', 'grade', 'background', 'strengths', 'weaknesses', 'createdAt'])
);

fs.writeFileSync(
  path.join(outputDir, 'attendance.csv'),
  toCSV(attendance, ['id', 'studentId', 'studentName', 'date', 'status', 'reason'])
);

fs.writeFileSync(
  path.join(outputDir, 'homework.csv'),
  toCSV(homework, ['id', 'studentId', 'studentName', 'title', 'description', 'subject', 'assignedDate', 'dueDate', 'submittedDate', 'status', 'remark'])
);

fs.writeFileSync(
  path.join(outputDir, 'weeklyPerformance.csv'),
  toCSV(performance, ['id', 'studentId', 'studentName', 'weekStartDate', 'score', 'comment'])
);

fs.writeFileSync(
  path.join(outputDir, 'classSessions.csv'),
  toCSV(classSessions, ['id', 'date', 'subject', 'lessonTopic', 'teacherNotes', 'type'])
);

console.log('✅ Mock dataset generated successfully!');
console.log(`📊 Generated:`);
console.log(`   - ${students.length} students`);
console.log(`   - ${attendance.length} attendance records`);
console.log(`   - ${homework.length} homework records`);
console.log(`   - ${performance.length} weekly performance notes`);
console.log(`   - ${classSessions.length} class session logs`);
console.log(`\n📁 Files saved to: ${outputDir}`);
console.log(`   - students.json & students.csv`);
console.log(`   - attendance.json & attendance.csv`);
console.log(`   - homework.json & homework.csv`);
console.log(`   - weeklyPerformance.json & weeklyPerformance.csv`);
console.log(`   - classSessions.json & classSessions.csv`);

