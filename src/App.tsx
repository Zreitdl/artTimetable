// import { getCurrentUserData } from "./utils/firebaseFunctions";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import routes from "./config/routes";

import './App.css';
import "./global.module.scss";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
          {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <route.component />
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;
