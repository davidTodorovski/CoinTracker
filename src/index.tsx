import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/UserContext/UserContextProvider";
import BudgetContextProvider from "./context/BudgedContext/BudgetContextProvider";
import MuiThemeProvider from "./utils/MuiThemeProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MuiThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <BudgetContextProvider>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </BudgetContextProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </MuiThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
