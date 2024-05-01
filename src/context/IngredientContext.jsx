import { createContext, useContext, useState, useCallback } from "react";
import heikoApi from "../service/myApi";

const IngredientContext = createContext();

export const useIngredients = () => useContext(IngredientContext);

const IngredientProvider = ({ children }) => {
  const [ingredientsListSearch, setIngredientsListSearch] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetching all ingredients
  const fetchIngredients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await heikoApi.get("/ingredients");
      setIngredientsListSearch(response.data);
    } catch (error) {
      console.error("Failed to fetch ingredients", error);
      setError("Failed to fetch ingredients");
    } finally {
      setLoading(false);
    }
  }, []);

  // Adding an ingredient to selected list
  const addIngredientSearch = useCallback((ingredient) => {
    setSelectedIngredients((prev) => [...prev, ingredient]);
  }, []);

  // Removing an ingredient from selected list
  const removeIngredient = useCallback((ingredientId) => {
    setSelectedIngredients((prev) =>
      prev.filter((ing) => ing._id !== ingredientId)
    );
  }, []);

  // Fetching search results
  const fetchSearchResults = useCallback(async (searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await heikoApi.get(
        `/ingredients?search=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Data fetched:", data);
      setIngredientsListSearch(data);
    } catch (err) {
      console.error("Fetching error: ", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <IngredientContext.Provider
      value={{
        ingredientsListSearch,
        selectedIngredients,
        addIngredientSearch,
        removeIngredient,
        fetchIngredients,
        fetchSearchResults,
        loading,
        error,
      }}
    >
      {children}
    </IngredientContext.Provider>
  );
};

export { IngredientProvider };
