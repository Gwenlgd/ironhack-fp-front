const fetchIngredients = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await heikoApi.get("http://localhost:5005/ingredients");
    setIngredients(response.data); // Assuming the server responds with an array of ingredients
  } catch (error) {
    console.error("Failed to fetch ingredients:", error);
    setError("Failed to load ingredients");
  } finally {
    setLoading(false);
  }
};

// fetch input from user with name of ingredient

const fetchIngredientSuggestions = useCallback(async (query) => {
  setLoading(true);
  setError(null);
  try {
    const response = await heikoApi.get(
      `/api/ingredients?name=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    setIngredientSuggestions(data);
  } catch (error) {
    console.error("Failed to fetch ingredient suggestions", error);
    setError("Failed to fetch ingredient suggestions");
  } finally {
    setLoading(false);
  }
}, []);
