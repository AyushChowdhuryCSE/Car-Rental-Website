import { createContext, useContext } from "react";

// Create the context
export const AppContext = createContext();

// Create a custom hook for easy consumption of the context
export const useAppContext = () => {
    return useContext(AppContext);
};
