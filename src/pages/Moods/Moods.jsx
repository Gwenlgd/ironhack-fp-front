import { useEffect } from "react";
import { useInput } from "../../context/InputContext";

const Moods = () => {
  const { moods, selectedMoods, fetchMoods, setSelectedMoods } = useInput();

  useEffect(() => {
    fetchMoods();
  }, [fetchMoods]);

  const handleMoodChange = (moodId) => {
    const isSelected = selectedMoods.includes(moodId);
    setSelectedMoods((prev) =>
      isSelected ? prev.filter((id) => id !== moodId) : [...prev, moodId]
    );
  };

  return (
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
  );
};

export default Moods;
