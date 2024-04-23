import { createContext, useContext } from "react";

export const InputContext = createContext();

export const useInput = () => {
  const context = useContext(InputContext);
  if (context === undefined) {
    throw new Error('useInput must be used within an InputProvider');
  }
  return context;
};
