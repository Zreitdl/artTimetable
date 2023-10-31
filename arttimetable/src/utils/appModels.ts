export interface Student {
  name: string;
  projects: string[];
}

export interface  AppDataModel {
  students: Student[];
  projects: string[];
  classRooms: string[];
}