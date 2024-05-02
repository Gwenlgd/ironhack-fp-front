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

  const renderEmoji = (icon) => {
    return String.fromCodePoint(parseInt(icon, 16));
  };

  return (
    <fieldset>
      <ul className="grid grid-cols-2 md:grid-cols-3 mt-14 gap-x-6 gap-y-6 w-full lg:w-1/2 mx-auto">
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
              className="inline-flex flex-col items-center justify-center w-full h-40 p-3 text-center text-dark-blue bg-periwinkle rounded-lg cursor-pointer shadow-not-selected peer-checked:shadow-selected-box peer-checked:font-bold  peer-checked:text-floral-white peer-checked:bg-dark-blue peer-checked:opacity-80"
            >
              <div className="block">
                {/* <div className="w-full text-lg ">{mood.name}</div> */}
                <h1 className="w-full text-5xl mb-4 ">
                  {renderEmoji(mood.icon)}
                </h1>
                <div className="w-full text-lg peer-checked:font-bold ">
                  {mood.name}
                </div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default Moods;
