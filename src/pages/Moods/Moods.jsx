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
      <legend className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Moods
      </legend>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {moods.map((mood) => (
          <li key={mood._id}>
            <input
              type="checkbox"
              id={mood._id}
              className="hidden peer"
              checked={selectedMoods.includes(mood._id)}
              onChange={() => handleMoodChange(mood._id)}
            />
            <label
              htmlFor={mood._id}
              className="inline-flex flex-col items-center justify-center w-full h-24 p-3 text-center text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:text-gray-600 dark:peer-checked:text-blue-200 peer-checked:text-blue-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="block">
                <div className="w-full text-lg font-semibold">{mood.name}</div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default Moods;
