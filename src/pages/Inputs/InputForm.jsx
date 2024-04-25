import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useInput } from "../../context/InputContext";
import Ingredients from "../Ingredients/Ingredients";
import Moods from "../Moods/Moods";
import Symptoms from "../Symptoms/Symptoms";

// Possible to show in form what's already selected by user if input for this date already existing?
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
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
