// Переменные
let rooms = ["301", "4a1", "4a2"];
let projects = [
  { name: "Тихий дон", students: ["Воронина", "Кобылян", "Якушев"] },
  { name: "Процесс", students: ["Горенштейн", "Кобылян", "Якушев"] },
  {
    name: "Испанский час",
    students: ["Чурикова", "Гаркуша", "Якушев", "Горенштейн"],
  },
  { name: "Роделинда", students: ["Гололобов", "Царева", "Горенштейн"] },
];

let timeRange = [17, 18, 19];
let students = [
  { name: "Воронина", restrictions: [], projects: ["Тихий дон"] },
  { name: "Кобылян", restrictions: [], projects: ["Тихий дон", "Процесс"] },
  { name: "Якушев", restrictions: [], projects: ["Тихий дон", "Процесс"] },
  {
    name: "Горенштейн",
    restrictions: [],
    projects: ["Процесс", "Испанский час", "Роделинда"],
  },
  { name: "Чурикова", restrictions: [], projects: ["Испанский час"] },
  { name: "Гаркуша", restrictions: [], projects: ["Испанский час"] },
  { name: "Гололобов", restrictions: [], projects: ["Роделинда"] },
  { name: "Царева", restrictions: [], projects: ["Роделинда"] },
];

// Функция для проверки, является ли комбинация проектов допустимой
function isCombinationValid(combination) {
  const studentsInCombination = combination.flatMap(
    (project) => project.students
  );
  const uniqueStudents = new Set(studentsInCombination);
  return studentsInCombination.length === uniqueStudents.size;
}

// // Главная функция
// export function generateTimetable() {
//   const combinations = generateCombinations(projects, rooms.length);
//   const bestCombination = distributeStudents(projects, combinations);
//   printResults(bestCombination);
// }

function distributeProjects(currentProjectIndex, currentAssignment) {
  if (currentProjectIndex === projects.length) {
    // Все проекты размещены, вывести результат
    // console.log(currentAssignment);
    assignments.push(currentAssignment.slice());
    return;
  }

  const currentProject = projects[currentProjectIndex];

  for (const time of timeRange) {
    for (const room of rooms) {
      const roomOccupied = currentAssignment.some(
        (assignment) => assignment.room === room && assignment.time === time
      );

      if (!roomOccupied) {
        const availableStudents = currentProject.students.filter(
          (studentName) => {
            const student = students.find(
              (student) => student.name === studentName
            );

            return (
              (student.restrictions.length === 0 ||
                !student.restrictions.includes(time)) &&
              !currentAssignment.some(
                (assignment) =>
                  assignment.students.includes(studentName) &&
                  assignment.time === time
              )
            );
          }
        );

        if (availableStudents.length === currentProject.students.length) {
          // Все студенты могут участвовать в проекте в заданное время
          const assignment = currentAssignment.slice();
          assignment.push({
            project: currentProject.name,
            time: time,
            room: room,
            students: currentProject.students,
          });

          distributeProjects(currentProjectIndex + 1, assignment);
        }
      }
    }
  }
}

let assignments = [];

// Главная функция
export function generateTimetable() {
  distributeProjects(0, []);
}

function calculateWindows(assignment) {
  // Рассчитайте количество окон между проектами у студентов в данном распределении
  let windowCount = 0;

  const studentAssignments = {};

  for (const projectAssignment of assignment) {
    for (const student of projectAssignment.students) {
      if (!studentAssignments[student]) {
        studentAssignments[student] = [];
      }
      studentAssignments[student].push(projectAssignment.time);
    }
  }

  for (const student in studentAssignments) {
    const studentTimes = studentAssignments[student];
    studentTimes.sort();

    for (let i = 1; i < studentTimes.length; i++) {
      if (studentTimes[i] - studentTimes[i - 1] > 1) {
        windowCount += studentTimes[i] - studentTimes[i - 1] - 1;
      }
    }
  }

  return windowCount;
}

export function findBestAssignment() {
  let bestAssignment = null;
  let bestWindowCount = Infinity;

  for (const assignment of assignments) {
    const windowCount = calculateWindows(assignment);

    if (windowCount < bestWindowCount) {
      bestWindowCount = windowCount;
      bestAssignment = assignment;
    }
  }

  console.log("Самое оптимальное распределение:");
  console.log(bestAssignment);
  console.log("Количество окон: " + bestWindowCount);

  return [bestAssignment, bestWindowCount];
}

export function generateTimetableFromAppData(appData) {
  students = appData.students.map((student) => {
    const studentRestrictions = !student.restrictionsHours ? [] : student.restrictionsHours
      .split(",")
      .map((m) => +m);
    return { ...student, restrictions: studentRestrictions };
  });
  console.log(students, "students");
  timeRange = appData.timeRange.split(",").map((m) => +m);
  console.log("timerange", timeRange);
  projects = appData.projects.map((project) => {
    const projectStudents = students
      .filter((f) => (f.projects ? f.projects.includes(project) : false))
      .map((m) => m.name);
    return { name: project, students: projectStudents };
  });
  console.log(projects, "projects");
  rooms = appData.classRooms;

  console.log(rooms, 'rooms');

  assignments = [];
  generateTimetable();
  const [bestAssignment, bestWindowCount] = findBestAssignment();
  return [assignments, bestAssignment, bestWindowCount];
}
