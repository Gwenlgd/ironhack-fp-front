import { createContext, useContext, useState } from "react";
import heikoApi from "../service/myApi";

const IngredientContext = createContext();

export const useIngredients = () => useContext(IngredientContext);

export const IngredientProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);

  const fetchSearchResults = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://yourapi.com/ingredients?search=${encodeURIComponent(
          searchTerm
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setIngredients(data); // Assuming the API returns an array of ingredients
    } catch (err) {
      setError(err.message);
      console.error("Fetching error: ", err.message);
    }
  };

  return (
    <IngredientContext.Provider
      value={{ ingredients, error, fetchSearchResults }}
    >
      {children}
    </IngredientContext.Provider>
  );
};
