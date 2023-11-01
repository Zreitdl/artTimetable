import React, { useState } from 'react';

import { AppContext } from '../../utils/AppContext';
import { AppDataModel } from '../../utils/appModels';

interface Props {
  children: React.ReactNode;
}
function AppContextProvider({ children } : Props) {
  const [appData, setData] = useState<AppDataModel>(JSON.parse(localStorage.getItem("artTimeTableData") ?? '{"students": [], "projects": [], "classRooms": []}'));

  const updateData = (newData: AppDataModel) => {
    localStorage.setItem("artTimeTableData", JSON.stringify(newData));
    setData(newData);
  };

  return (
    <AppContext.Provider value={{ appData, updateData }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;