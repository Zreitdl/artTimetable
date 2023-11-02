import { AppDataModel } from "./appModels";

// Переменные
// let rooms = ["301", "4a1", "4a2"];
// let projects = [
//   { name: "Тихий дон" },
//   { name: "Процесс" },
//   {
//     name: "Испанский час",
//     students: ["Чурикова"],
//   },
//   { name: "Роделинда" },
// ];

// let timeRange = [17, 18, 19];
// let students = [
//   { name: "Воронина", restrictions: [], projects: ["Тихий дон"] },
//   { name: "Кобылян", restrictions: [], projects: ["Тихий дон", "Процесс"] },
//   { name: "Якушев", restrictions: [], projects: ["Тихий дон", "Процесс"] },
//   {
//     name: "Горенштейн",
//     restrictions: [],
//     projects: ["Процесс", "Испанский час", "Роделинда"],
//   },
//   { name: "Чурикова", restrictions: [], projects: ["Испанский час"] },
//   { name: "Гаркуша", restrictions: [], projects: ["Испанский час"] },
//   { name: "Гололобов", restrictions: [], projects: ["Роделинда"] },
//   { name: "Царева", restrictions: [], projects: ["Роделинда"] },
// ];

export interface ProjectAssignment {
  project: string;
  time: number;
  room: string;
  students: string[];
}

export const generateTimetableFromAppData = (appData: AppDataModel) => {
  const students = appData.students.map((student) => {
    const studentRestrictions = !student.restrictionsHours
      ? []
      : student.restrictionsHours.split(",").map((m) => +m);
    return { ...student, restrictions: studentRestrictions };
  });
  // console.log(students, "students");

  const timeRange = appData.timeRange.split(",").map((m) => +m);
  // console.log("timerange", timeRange);

  const projects = appData.projects.map((project) => {
    const projectStudents = students
      .filter((f) => (f.projects ? f.projects.includes(project) : false))
      .map((m) => m.name);
    return { name: project, students: projectStudents };
  });
  // console.log(projects, "projects");

  const rooms = [...appData.classRooms];
  // console.log(rooms, "rooms");

  let assignments: ProjectAssignment[][] = [];
  let randomAssignment: ProjectAssignment[] = [];
  distributeProjects(0, []);
  const { bestAssignment, bestWindowCount } = findBestAssignment(assignments);
  return { assignments, bestAssignment, bestWindowCount, randomAssignment };

  function distributeProjects(
    currentProjectIndex: number,
    currentAssignment: ProjectAssignment[]
  ) {
    if (currentAssignment.length > randomAssignment.length) {
      randomAssignment = currentAssignment;
    }

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
          (assignment: any) =>
            assignment.room === room && assignment.time === time
        );

        if (!roomOccupied) {
          const availableStudents = currentProject.students.filter(
            (studentName) => {
              const student = students.find(
                (student) => student.name === studentName
              );

              return (
                (student?.restrictions.length === 0 ||
                  !student?.restrictions.includes(time)) &&
                !currentAssignment.some(
                  (assignment: any) =>
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
              time,
              room,
              students: currentProject.students,
            });

            distributeProjects(currentProjectIndex + 1, assignment);
          }
        }
      }
    }
  }
};

function calculateWindows(assignment: ProjectAssignment[]) {
  // Рассчитайте количество окон между проектами у студентов в данном распределении
  let windowCount = 0;

  const studentAssignments = new Map<string, number[]>();

  for (const projectAssignment of assignment) {
    for (const student of projectAssignment.students) {
      let currentValue = studentAssignments.get(student) || [];
      currentValue.push(projectAssignment.time);
      studentAssignments.set(student, currentValue);
    }
  }

  studentAssignments.forEach((studentTimes) => {
    // const studentTimes = studentAssignments[student];
    studentTimes.sort();

    for (let i = 1; i < studentTimes.length; i++) {
      if (studentTimes[i] - studentTimes[i - 1] > 1) {
        windowCount += studentTimes[i] - studentTimes[i - 1] - 1;
      }
    }
  });

  return windowCount;
}

function findBestAssignment(assignments: ProjectAssignment[][]) {
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

  return { bestAssignment, bestWindowCount };
}
