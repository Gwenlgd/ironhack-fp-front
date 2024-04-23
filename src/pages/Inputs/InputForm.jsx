import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../context/InputContext";
import heikoApi from "../../service/myApi";

const InputForm = () => {
  const [date, setDate] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [moods, setMoods] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const navigate = useNavigate();

  // Methods and states from context
  const {
    upsertInput,
    addIngredient,
    // removeIngredient,
    selectedIngredients,
    ingredientsList,
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

  // All Ingredients list > used in ingredients form
  // ?? OK WORKING
  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

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
    setInputValue(inputValue);
  };

  // const handleIngredientRemove = (ingredientId) => {
  //   removeIngredient(ingredientId); // Remove ingredient from selection
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
                // <li
                //   key={ingredient._id}
                //   onClick={() => handleIngredientSelect(ingredient)}
                // >
                //   {ingredient.name}
                // </li>
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
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul>
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
