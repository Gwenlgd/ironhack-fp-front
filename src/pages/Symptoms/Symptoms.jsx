import { useEffect } from "react";
import { useInput } from "../../context/InputContext";

const Symptoms = () => {
  const { symptoms, selectedSymptoms, fetchSymptoms, setSelectedSymptoms } =
    useInput();

  useEffect(() => {
    fetchSymptoms();
  }, [fetchSymptoms]);

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

  return (
    <fieldset>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {symptoms.map((symptom) => (
          <li key={symptom._id}>
            <input
              type="checkbox"
              className="hidden peer"
              checked={selectedSymptoms.includes(symptom._id)}
              onChange={() => handleSymptomChange(symptom._id)}
            />
            <label
              htmlFor={symptom._id}
              className="inline-flex flex-col items-center justify-center w-full h-24 p-3 text-center text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:text-gray-600 dark:peer-checked:text-blue-200 peer-checked:text-blue-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="block">
                <div className="w-full text-lg font-semibold">
                  {symptom.name}
                </div>
              </div>{" "}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default Symptoms;
