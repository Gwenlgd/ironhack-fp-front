import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useInput } from "../../context/InputContext";

const InputForm = () => {
  // for calendar
  const location = useLocation();
  const [date, setDate] = useState(() => {
    const query = new URLSearchParams(location.search);
    return query.get("date") || new Date().toISOString().slice(0, 10);
  });

  const [inputValue, setInputValue] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const navigate = useNavigate();

  // Methods and states from context
  const {
    upsertInput,
    addIngredient,
    selectedIngredients,
    ingredientsList,
    moods,
    symptoms,
    fetchIngredients,
    fetchMoods,
    fetchSymptoms,
    handleRemoveItem,
  } = useInput();

  // All Ingredients list > used in ingredients form
  // ?? OK WORKING
  useEffect(() => {
    fetchIngredients();
    fetchMoods();
    fetchSymptoms();
  }, [fetchIngredients, fetchMoods, fetchSymptoms]);

  // Filtering the list when user type
  // ?? OK WORKING
  useEffect(() => {
    setFilteredIngredients(
      ingredientsList.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, ingredientsList]);

  const handleInputIngrChange = (e) => {
    setInputValue(e.target.value);
  };

  // Selection of the ingredient when clicking on the ingredient in the list
  // ?? OK WORKING
  const handleIngredientSelect = (ingredient) => {
    addIngredient(ingredient);
    setInputValue("");
  };

  // END - FORM PART INGREDIENTS

  // !! TO CHECK
  const handleMoodChange = (id) => {
    console.log("Changing mood selection for ID:", id);

    setSelectedMoods((prev) => {
      console.log("Previous selectedMoods:", prev);

      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
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
      navigate(`/inputs`);
    } catch (error) {
      console.error("Error submitting input:", error);
      alert("Failed to save input: " + error.message);
    }
  };

  return (
    <>
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

        <div className="ingredients-input">
          <label htmlFor="ingredient-search">Ingredients</label>
          <input
            type="text"
            id="ingredient-search"
            value={inputValue}
            onChange={handleInputIngrChange}
            autoComplete="off"
          />
          {inputValue && (
            <ul>
              {filteredIngredients.map((ingredient) => (
                <li
                  key={ingredient._id}
                  onClick={(e) => handleIngredientSelect(ingredient, e)}
                >
                  {ingredient.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3>Selected Ingredients:</h3>
          <ul>
            {selectedIngredients.map((ingredient, index) => (
              <li key={ingredient._id || index}>
                {ingredient.name}

                <button
                  onClick={() => handleRemoveItem(ingredient._id, "ingredient")}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* MOODS */}
        <fieldset className="checkbox-group">
          <legend className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Moods
          </legend>
          <div className="grid w-full gap-6 md:grid-cols-3">
            {moods.map((mood) => (
              <label key={mood._id} className="checkbox-wrapper">
                <input
                  className="checkbox-input"
                  type="checkbox"
                  checked={selectedMoods.includes(mood._id)}
                  onChange={() => handleMoodChange(mood._id)}
                />
                <span className="checkbox-tile">
                  <span className="checkbox-label">{mood.name}</span>
                </span>
              </label>
            ))}
          </div>
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
