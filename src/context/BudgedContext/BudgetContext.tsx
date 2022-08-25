import { createContext, useContext } from "react";
import { BudgetContextType } from "./BudgetContextProvider";

export const BudgetContext = createContext({} as BudgetContextType);

export const useBudgetContext = () => useContext(BudgetContext);
