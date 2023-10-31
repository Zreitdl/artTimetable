import { createContext } from 'react';

import { AppDataModel } from './appModels';

export interface AppContextModel {
  appData: AppDataModel,
  updateData: (newData: AppDataModel) => void;
}

export const AppContext = createContext<AppContextModel>({appData: { students: [], projects: [], classRooms: []}, updateData: () => {}});