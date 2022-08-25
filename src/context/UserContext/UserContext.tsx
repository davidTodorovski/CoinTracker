import { createContext, useContext } from "react";
import { UserContextType } from "./UserContextProvider";

export const UserContext = createContext({} as UserContextType);

export const useUser = () => useContext(UserContext);
