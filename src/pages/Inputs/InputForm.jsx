import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useInput } from "../../context/InputContext";
import Ingredients from "../Ingredients/Ingredients";
import Moods from "../Moods/Moods";
import Symptoms from "../Symptoms/Symptoms";
import CategorySwitcher from "../../components/ButtonGroupBar/CategorySwitcher";

// Possible to show in form what's already selected by user if input for this date already existing?
const InputForm = () => {
  // for calendar
  const location = useLocation();
  const [date, setDate] = useState(() => {
    const query = new URLSearchParams(location.search);
    return query.get("date") || new Date().toISOString().slice(0, 10);
  });

  const navigate = useNavigate();

  const [currentCategory, setCurrentCategory] = useState("ingredients");

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
      // alert("Input saved successfully!");
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
        <div className="relative main-content mt-36 mb-6 max-w-sm mx-auto">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="text-center font-bold text-green bg-whitee border border-periwinkle text-gray-900 text-lg shadow-custom rounded-lg focus:outline-none block w-full ps-10 p-2.5"
          />
        </div>

        {/* INGREDIENTS */}
        {currentCategory === "ingredients" && <Ingredients />}

        {/* MOODS */}
        {currentCategory === "moods" && <Moods />}

        {/* SYMPTOMS */}
        {currentCategory === "symptoms" && <Symptoms />}

        <CategorySwitcher
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
        <div className="flex mb-40 items-center justify-center">
          <button
            type="submit"
            className="mt-10 sm:mb-46 md:mb-60 center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default InputForm;
