import React from "react";
// Need to change color, not seeing well
const CategorySwitcher = ({ currentCategory, setCurrentCategory }) => {
  const handleSetCategory = (category) => {
    console.log(`Changing category to: ${category}`); // Debugging output
    setCurrentCategory(category);
  };

  return (
    <div className="fixed top-12 z-50 bg-whitee w-full -translate-x-1/2 bg-gray-50 border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="w-full">
        <ul className="flex justify-center rounded-lg gap-1 p-1 mx-auto my-2 dark:bg-gray-600">
          <li className="me-2">
            <button
              type="button"
              className={`inline-block px-4 py-3 rounded-lg text-white shadow-not-selected ${
                currentCategory === "ingredients"
                  ? "text-floral-white font-bold bg-green opacity-50 shadow-selected"
                  : "bg-periwinkle opacity-70 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              }`}
              onClick={() => handleSetCategory("ingredients")}
            >
              Ingredients
            </button>
          </li>
          <li className="me-2">
            <button
              type="button"
              className={`inline-block px-4 py-3 rounded-lg text-white shadow-not-selected ${
                currentCategory === "moods"
                  ? "text-floral-white font-bold bg-green opacity-50 shadow-selected"
                  : "bg-periwinkle opacity-70 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              }`}
              onClick={() => handleSetCategory("moods")}
            >
              Moods
            </button>
          </li>
          <li className="me-2">
            <button
              type="button"
              className={`inline-block px-4 py-3 rounded-lg text-white shadow-not-selected ${
                currentCategory === "symptoms"
                  ? "text-floral-white font-bold  bg-green opacity-50 shadow-selected"
                  : "bg-periwinkle opacity-70 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              }`}
              onClick={() => handleSetCategory("symptoms")}
            >
              Symptoms
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategorySwitcher;
