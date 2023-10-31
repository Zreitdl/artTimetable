export interface Student {
  name: string;
  projects: string[];
  restrictionHours: number[]
}

export interface  AppDataModel {
  students: Student[];
  projects: string[];
  classRooms: string[];
}