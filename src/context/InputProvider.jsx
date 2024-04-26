import { useState, useCallback, useEffect } from "react";
import heikoApi from "../service/myApi";
import { InputContext } from "./InputContext";

const InputProvider = ({ children }) => {
  const [oneInput, oneInputData] = useState(null);
  const [inputsData, setInputsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // For get all
  const [ingredientsList, setIngredientsList] = useState([]);
  const [moods, setMoods] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  // Selected elements
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // Loading inputs before to avoid bug when new input
  useEffect(() => {
    fetchAllInputs();
  }, []);

  // ? INPUTS
  // get one input :
  const fetchInput = useCallback(async (inputId) => {
    // ! useCallback : to avoid infinite loop when fetchInput
    setLoading(true);
    setError(null);
    try {
      const response = await heikoApi.get(`/inputs/${inputId}`);
      oneInputData(response.data);
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

  //? Delete input from Inputs Page

  const deleteInput = useCallback(async (inputId) => {
    setLoading(true);
    setError(null);
    try {
      await heikoApi.delete(`/inputs/${inputId}`);
      setInputsData((currentInputs) =>
        currentInputs.filter((input) => input._id !== inputId)
      );
      console.log("Input deleted successfully");
    } catch (error) {
      console.error("Failed to delete input", error);
      setError("Failed to delete input");
    } finally {
      setLoading(false);
    }
  }, []);

  // ? END INPUTS

  // ? INGREDIENTS :

  // Function to add an ingredient to the selected list
  const addIngredient = useCallback((ingredient) => {
    setSelectedIngredients((prev) => [...prev, ingredient]);
  }, []);

  // fetch ingredients for search bar when user creating input :
  const fetchIngredients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await heikoApi.get("/ingredients");
      setIngredientsList(response.data);
    } catch (error) {
      console.error("Failed to fetch ingredients", error);
      setError("Failed to fetch ingredients");
      setIngredientsList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ? END INGREDIENTS

  // ? MOODS

  // get all moods
  const fetchMoods = useCallback(async () => {
    setLoading(true);
    try {
      const response = await heikoApi.get("/moods");
      setMoods(response.data);
    } catch (error) {
      console.error("Failed to fetch moods", error);
      setError("Failed to fetch moods");
    } finally {
      setLoading(false);
    }
  }, []);
  // ? END MOODS

  // ? SYMPTOMS

  // get all symptoms

  const fetchSymptoms = useCallback(async () => {
    setLoading(true);
    try {
      const response = await heikoApi.get("/symptoms");
      setSymptoms(response.data);
    } catch (error) {
      console.error("Failed to fetch symptoms", error);
      setError("Failed to fetch symptoms");
    } finally {
      setLoading(false);
    }
  }, []);
  // ? END SYMPTOMS

  // ? REMOVE FUNCTION
  // ! work on every pages ?
  // ? remove ingredient from inputPage
  const handleRemoveItem = useCallback(
    (id, type) => {
      const stateMap = {
        ingredient: [selectedIngredients, setSelectedIngredients],
      };

      const [state, setState] = stateMap[type] || [];

      if (!setState) {
        console.error("Error handleRemoveItem: Unhandled type", type);
        return;
      }

      setState((prev) =>
        prev.filter((item) =>
          type === "ingredient" ? item._id !== id : item !== id
        )
      );
    },
    [selectedIngredients]
  );

  //!! not working
  const removeIngredientFromInput = useCallback(
    async (inputId, ingredientId) => {
      setLoading(true);
      try {
        await heikoApi.delete(`/inputs/${inputId}/ingredients/${ingredientId}`);
        setInputsData((currentData) => ({
          ...currentData,
          ingredient: currentData.ingredient.filter(
            (item) => item._id !== ingredientId
          ),
        }));
      } catch (error) {
        console.error("Failed to remove ingredient", error);
        setError("Failed to remove ingredient");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <InputContext.Provider
      value={{
        inputsData,
        oneInput,
        oneInputData,
        setInputsData,
        fetchInput,
        fetchAllInputs,
        upsertInput,
        addIngredient,
        ingredientsList,
        moods,
        symptoms,
        fetchIngredients,
        fetchMoods,
        fetchSymptoms,
        selectedIngredients,
        setSelectedIngredients,
        selectedMoods,
        setSelectedMoods,
        selectedSymptoms,
        setSelectedSymptoms,
        handleRemoveItem,
        removeIngredientFromInput,
        deleteInput,
        loading,
        error,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};

export { InputProvider };
