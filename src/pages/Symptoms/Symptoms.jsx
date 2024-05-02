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

  const renderEmoji = (icon) => {
    return String.fromCodePoint(parseInt(icon, 16));
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
                    className="inline-flex flex-col items-center justify-center w-full h-40 p-3 text-center text-dark-blue bg-periwinkle rounded-lg cursor-pointer shadow-not-selected peer-checked:shadow-selected-box peer-checked:font-bold  peer-checked:text-floral-white peer-checked:bg-dark-blue peer-checked:opacity-80"
                  >
                    <div className="block">
                      <h1 className="w-full text-5xl mb-4">
                        {renderEmoji(symptom.icon)}
                      </h1>
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
