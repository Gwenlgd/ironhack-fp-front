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
  );
};

export default Symptoms;
