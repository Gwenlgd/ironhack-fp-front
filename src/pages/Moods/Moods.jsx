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
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 w-full lg:w-1/2 mx-auto">
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
              className="inline-flex flex-col items-center justify-center w-full h-40 p-3 text-center text-floral-white bg-periwinkle opacity-60 rounded-lg cursor-pointer shadow-not-selected peer-checked:shadow-selected-box peer-checked:font-bold peer-checked:bg-green dark:hover:text-gray-300 dark:border-gray-700  hover:text-gray-600 dark:peer-checked:text-blue-200  hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="block">
                <div className="w-full text-lg ">{mood.name}</div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default Moods;
