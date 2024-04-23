import { useState, useCallback } from "react";
import heikoApi from "../service/myApi";
import { InputContext } from "./InputContext";

const InputProvider = ({ children }) => {
  const [inputsData, setInputsData] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // get one input :
  const fetchInput = useCallback(async (inputId) => {
    // ! useCallback : to avoid infinite loop when fetchInput
    setLoading(true);
    setError(null);
    try {
      const response = await heikoApi.get(`/inputs/${inputId}`);
      setInputsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch input", error);
      setError("Failed to fetch input");
    } finally {
      setLoading(false);
    }
  }, []);

  // get all inputs :

  const fetchAllInputs = useCallback(async () => {
    // ! useCallback : to avoid infinite loop when fetchAllsInputs
    setLoading(true);
    setError(null);
    try {
      const response = await heikoApi.get(`/inputs`);
      setInputsData(response.data);
    } catch (error) {
      console.error("Failed to fetch inputs", error);
      setError("Failed to fetch inputs");
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new input or update an existing input
  const upsertInput = useCallback(async (inputData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await heikoApi.post(`/inputs/upsert`, inputData);
      setInputsData((prevInputs) => {
        const existingIndex = prevInputs.findIndex(
          (input) => input._id === response.data._id
        );
        if (existingIndex > -1) {
          const newInputs = [...prevInputs];
          newInputs[existingIndex] = response.data;
          return newInputs;
        } else {
          return [...prevInputs, response.data];
        }
      });
      console.log("Upsert successful", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to upsert input", error);
      setError("Failed to upsert input");
    } finally {
      setLoading(false);
    }
  }, []);

  // For Ingredients :

  // Function to add an ingredient to the selected list
  const addIngredient = useCallback((ingredient) => {
    setSelectedIngredients((prev) => [...prev, ingredient]);
  }, []);

  // Function to remove an ingredient from the selected list
  const removeIngredient = useCallback((ingredientId) => {
    setSelectedIngredients((prev) =>
      prev.filter((ingredient) => ingredient._id !== ingredientId)
    );
  }, []);

  // fetch ingredients when user creating input :
  const fetchIngredients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await heikoApi.get("/ingredients?limit=50"); // Assuming the API supports a limit query
      setIngredients(response.data);
    } catch (error) {
      console.error("Failed to fetch ingredients", error);
      setError("Failed to fetch ingredients");
      setIngredients([]);
    } finally {
      setLoading(false);
    }
  }, []);
  // fetch input from user with name of ingredient

  const fetchInputIngredient = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await heikoApi.get(
        `/api/ingredients?name=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setIngredients(data);
    } catch (error) {
      console.error("Failed to fetch ingredient suggestions", error);
      setError("Failed to fetch ingredient suggestions");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <InputContext.Provider
      value={{
        inputsData,
        setInputsData,
        fetchInput,
        fetchAllInputs,
        upsertInput,
        // fetchIngredientSuggestions,
        fetchInputIngredient,
        addIngredient,
        removeIngredient,
        fetchIngredients,
        selectedIngredients,
        ingredientSuggestions,
        ingredients,
        loading,
        error,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};

export { InputProvider };
