export interface Student {
  name: string;
  projects: string[];
  availableHours: string;
  id: string;
}

export interface  AppDataModel {
  students: Student[];
  projects: string[];
  classRooms: string[];
}