import { createContext } from 'react';

import { TIME_RANGE } from '../config/constants';

import { AppDataModel } from './appModels';

export interface AppContextModel {
  appData: AppDataModel,
  updateData: (newData: AppDataModel) => void;
}

export const AppContext = createContext<AppContextModel>({appData: { students: [], projects: [], classRooms: [], timeRange: TIME_RANGE.toString()}, updateData: () => {}});