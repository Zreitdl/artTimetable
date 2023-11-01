export interface Student {
  name: string;
  projects: string[];
  restrictionsHours: string;
  id: string;
}

export interface  AppDataModel {
  students: Student[];
  projects: string[];
  classRooms: string[];
  timeRange: string;
}