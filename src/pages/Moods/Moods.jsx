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
              className="inline-flex flex-col items-center justify-center w-full h-40 p-3 text-center text-floral-white bg-periwinkle opacity-60 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-cambridge-blue hover:text-gray-600 dark:peer-checked:text-blue-200 peer-checked:font-bold hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
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
