import { createContext, useState, useContext } from "react";
import LoadingSplashScreen from "../components/SplashScreens/LoadingSplashScreen";

const LoadingContext = createContext();

export function useLoading() {
  return useContext(LoadingContext);
}

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading && <LoadingSplashScreen />}
    </LoadingContext.Provider>
  );
}
