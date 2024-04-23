import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../context/InputContext";
import heikoApi from "../../service/myApi";

const InputForm = () => {
  const [date, setDate] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
  const [moods, setMoods] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const navigate = useNavigate();
  const { upsertInput, setInputsData } = useInput();

  useEffect(() => {
    const fetchMoodsAndSymptoms = async () => {
      try {
        const [moodsResponse, symptomsResponse] = await Promise.all([
          heikoApi.get("/moods"),
          heikoApi.get("/symptoms"),
        ]);
        setMoods(moodsResponse.data);
        setSymptoms(symptomsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchMoodsAndSymptoms();
  }, []);

  const handleIngredientSearch = async (value) => {
    setIngredient(value);
    if (!value) {
      setIngredientSuggestions([]);
      return;
    }
    try {
      const response = await heikoApi.get(`/api/ingredients/search?q=${value}`);
      setIngredientSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching ingredients", error);
    }
  };

  const handleIngredientSelect = (ingredient) => {
    setIngredient(ingredient);
    setIngredientSuggestions([]);
  };

  const handleMoodChange = (moodId) => {
    console.log("Toggling mood:", moodId);

    setSelectedMoods((prev) => {
      if (prev.includes(moodId)) {
        return prev.filter((id) => id !== moodId);
      } else {
        return [...prev, moodId];
      }
    });
  };

  const handleSymptomChange = (symptomId) => {
    setSelectedSymptoms((prev) => {
      if (prev.includes(symptomId)) {
        return prev.filter((id) => id !== symptomId);
      } else {
        return [...prev, symptomId];
      }
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputData = {
      date,
      ingredient: [ingredient],
      moods: selectedMoods,
      symptoms: selectedSymptoms,
    };

    try {
      const savedInput = await upsertInput(inputData);
      alert("Input saved successfully!");
      setInputsData((prevInputs) => [...prevInputs, savedInput]);
      navigate("/inputs");
    } catch (error) {
      console.error("Error submitting input:", error);
      alert("Failed to save input: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          value={ingredient}
          onChange={(e) => handleIngredientSearch(e.target.value)}
          list="ingredients-suggestions"
          placeholder="Start typing..."
        />
        {ingredientSuggestions.length > 0 && (
          <ul id="ingredients-suggestions">
            {ingredientSuggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleIngredientSelect(suggestion.name)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <fieldset>
        <legend>Moods</legend>
        {moods.map((mood) => (
          <label key={mood.id}>
            <input
              type="checkbox"
              checked={selectedMoods.includes(mood.id)}
              onChange={() => handleMoodChange(mood.id)}
            />
            {mood.name}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Symptoms</legend>
        {symptoms.map((symptom) => (
          <label key={symptom.id}>
            <input
              type="checkbox"
              checked={selectedSymptoms.includes(symptom.id)}
              onChange={() => handleSymptomChange(symptom.id)}
            />
            {symptom.name}
          </label>
        ))}
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
