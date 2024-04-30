import { createContext, useContext, useState } from "react";
import LoadingSplashScreen from "../components/SplashScreens/LoadingSplashScreen";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading && <LoadingSplashScreen />}
    </LoadingContext.Provider>
  );
};
