import { useEffect } from "react";
import { useInput } from "../../context/InputContext";

const Symptoms = () => {
  const { symptoms, selectedSymptoms, fetchSymptoms, setSelectedSymptoms } =
    useInput();

  useEffect(() => {
    fetchSymptoms();
  }, [fetchSymptoms]);

  const symptomsByCategory = symptoms.reduce((acc, symptom) => {
    if (!acc[symptom.category]) {
      acc[symptom.category] = [];
    }
    acc[symptom.category].push(symptom);
    return acc;
  }, {});

  const handleSymptomChange = (symptomId) => {
    const isSelected = selectedSymptoms.includes(symptomId);
    setSelectedSymptoms((prev) =>
      isSelected ? prev.filter((id) => id !== symptomId) : [...prev, symptomId]
    );
  };

  return (
    <fieldset>
      {Object.entries(symptomsByCategory).map(
        ([category, symptomsInCategory]) => (
          <div key={category}>
            <h3 className=" font-bold uppercase text-lg mb-4 mt-4 text-center">
              {category}
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
              {symptomsInCategory.map((symptom) => (
                <li key={symptom._id}>
                  <input
                    type="checkbox"
                    id={symptom._id}
                    className="hidden peer"
                    checked={selectedSymptoms.includes(symptom._id)}
                    onChange={() => handleSymptomChange(symptom._id)}
                  />
                  <label
                    htmlFor={symptom._id}
                    className="inline-flex flex-col items-center justify-center w-full h-40 p-3 text-center text-floral-white bg-periwinkle opacity-60 rounded-lg cursor-pointer shadow-not-selected peer-checked:shadow-selected-box peer-checked:font-bold peer-checked:bg-green dark:hover:text-gray-300 dark:border-gray-700  hover:text-gray-600 dark:peer-checked:text-blue-200  hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="block">
                      <div className="w-full text-lg">{symptom.name}</div>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </fieldset>
  );
};

export default Symptoms;
