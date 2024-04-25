import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useInput } from "../../context/InputContext";
import Ingredients from "../Ingredients/Ingredients";
import Moods from "../Moods/Moods";
import Symptoms from "../Symptoms/Symptoms";

const InputForm = () => {
  // for calendar
  const location = useLocation();
  const [date, setDate] = useState(() => {
    const query = new URLSearchParams(location.search);
    return query.get("date") || new Date().toISOString().slice(0, 10);
  });

  const navigate = useNavigate();

  // Methods and states from context
  const {
    upsertInput,
    selectedIngredients,
    selectedMoods,
    selectedSymptoms,
    fetchIngredients,
    fetchMoods,
    fetchSymptoms,
    setSelectedIngredients,
    setSelectedMoods,
    setSelectedSymptoms,
  } = useInput();

  // All Ingredients list > used in ingredients form
  // ?? OK WORKING
  useEffect(() => {
    fetchIngredients();
    fetchMoods();
    fetchSymptoms();
  }, [fetchIngredients, fetchMoods, fetchSymptoms]);

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
      setSelectedIngredients([]);
      setSelectedMoods([]);
      setSelectedSymptoms([]);
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

        {/* INGREDIENTS */}
        <Ingredients />

        {/* MOODS */}
        <Moods />

        {/* SYMPTOMS */}
        <Symptoms />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default InputForm;
