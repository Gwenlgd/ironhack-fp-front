import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../context/InputContext";
import heikoApi from "../../service/myApi";

const InputForm = () => {
  const [date, setDate] = useState("");
  const [inputValue, setInputValue] = useState("");
  // const [ingredients, setIngredients] = useState([]);
  const [moods, setMoods] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const navigate = useNavigate();

  // Methods and states from context
  const {
    upsertInput,
    // fetchIngredientSuggestions,
    ingredientSuggestions,
    fetchInputIngredient,
    addIngredient,
    // removeIngredient,
    selectedIngredients,
    ingredients,
    fetchIngredients,
  } = useInput();

  useEffect(() => {
    // !! add fetchMoodsandSymptoms to InputProvider
    const fetchMoodsAndSymptoms = async () => {
      try {
        const [moodsResponse, symptomsResponse] = await Promise.all([
          //!! see to put it inside context
          heikoApi.get("/moods"),
          heikoApi.get("/symptoms"),
        ]);
        setMoods(moodsResponse.data);
        setSymptoms(symptomsResponse.data);
        console.log("Fetched moods:", moodsResponse.data);
        console.log("Fetched symptoms:", symptomsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchMoodsAndSymptoms();
  }, []);

  useEffect(() => {
    fetchIngredients(); // This will fetch 50 ingredients from the backend
  }, [fetchIngredients]);

  // For INGREDIENTS FORM
  useEffect(() => {
    if (inputValue) {
      const timer = setTimeout(() => {
        fetchInputIngredient(inputValue);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [inputValue, fetchInputIngredient]);

  const handleIngredientSelect = (ingredient) => {
    addIngredient(ingredient); // Add selected ingredient to context
    setInputValue(""); // Clear the input field after selection
  };

  // const handleIngredientRemove = (ingredientId) => {
  //   removeIngredient(ingredientId); // Remove ingredient from selection
  // };

  // const handleInputIngrChange = (e) => {
  //   const newValue = e.target.value;
  //   console.log(e.target.value);
  //   setInputValue(newValue);
  //   handleInputIngrChange(newValue);
  // };

  // useEffect(() => {
  //   if (inputValue) {
  //     const timer = setTimeout(() => {
  //       fetchIngredientSuggestions(inputValue);
  //     }, 300);
  //     return () => clearTimeout(timer);
  //   }
  // }, [inputValue, fetchIngredientSuggestions]);

  // const handleIngredientSearch = async (value) => {
  //   if (!value) {
  //     setIngredientSuggestions([]);
  //     return;
  //   }
  //   fetchIngredientSuggestions(value);
  // };

  // const handleIngredientSelect = (ingredient) => {
  //   setIngredients((prev) => [...prev, ingredient]);
  //   setInputValue("");
  // };

  // END - ingredients form

  // !! REMOVE THE CONSOLE.LOGS
  const handleMoodChange = (id) => {
    console.log("Changing mood selection for ID:", id);

    setSelectedMoods((prev) => {
      console.log("Previous selectedMoods:", prev);

      if (prev.includes(id)) {
        const newMoods = prev.filter((item) => item !== id);
        console.log("New selectedMoods after removal:", newMoods);
        return newMoods;
      } else {
        const newMoods = [...prev, id];
        console.log("New selectedMoods after addition:", newMoods);
        return newMoods;
      }
    });
  };
  // !! need to add _id instead of id??
  const handleSymptomChange = (id) => {
    setSelectedSymptoms((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = {
      date,
      ingredients: selectedIngredients,
      moods: selectedMoods,
      symptoms: selectedSymptoms,
    };

    try {
      await upsertInput(inputData);
      alert("Input saved successfully!");
      navigate("/inputs");
    } catch (error) {
      console.error("Error submitting input:", error);
      alert("Failed to save input: " + error.message);
    }
  };

  return (
    <>
      <h2>List ingredients</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>{ingredient.name}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        {/* DATE */}
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && inputValue) {
                const selected = ingredientSuggestions.find(
                  (ing) => ing.name === inputValue
                );
                if (selected) handleIngredientSelect(selected);
                e.preventDefault(); // Prevent form submission on Enter
              }
            }}
            list="ingredients-suggestions"
            placeholder="Start typing..."
          />
          {ingredientSuggestions.length > 0 ? (
            <datalist id="ingredients-suggestions">
              {ingredientSuggestions.map((ingredient) => (
                <option key={ingredient._id} value={ingredient.name} />
              ))}
            </datalist>
          ) : (
            <p>No ingredients found.</p>
          )}
        </div>

        {/* MOODS */}
        <fieldset>
          <legend>Moods</legend>
          {moods.map((mood) => (
            <label key={mood._id}>
              <input
                type="checkbox"
                checked={selectedMoods.includes(mood._id)}
                onChange={() => handleMoodChange(mood._id)}
              />
              {mood.name}
            </label>
          ))}
        </fieldset>

        {/* SYMPTOMS */}
        <fieldset>
          <legend>Symptoms</legend>
          {symptoms.map((symptom) => (
            <label key={symptom._id}>
              <input
                type="checkbox"
                checked={selectedSymptoms.includes(symptom._id)}
                onChange={() => handleSymptomChange(symptom._id)}
              />
              {symptom.name}
            </label>
          ))}
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default InputForm;
