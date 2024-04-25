import React from "react";

const CategorySwitcher = ({ currentCategory, setCurrentCategory }) => {
  const handleSetCategory = (category) => {
    console.log(`Changing category to: ${category}`); // Debugging output
    setCurrentCategory(category);
  };

  return (
    <div className="fixed top-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="w-full">
        <div
          className="grid max-w-s grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600"
          role="group"
        >
          <button
            type="button"
            className={`px-5 py-1.5 text-s font-medium text-white bg-gray-200 dark:bg-gray-300 dark:text-gray-900 rounded-lg ${
              currentCategory === "ingredients"
                ? // here to change color when selected

                  "bg-gray-600 dark:bg-gray-700"
                : "hover:bg-gray-900 dark:hover:bg-gray-700"
            }`}
            // onClick={() => setCurrentCategory("ingredients")}
            onClick={() => handleSetCategory("ingredients")}
          >
            Ingredients
          </button>
          <button
            type="button"
            className={`px-5 py-1.5 text-s font-medium text-white bg-gray-200 dark:bg-gray-300 dark:text-gray-900 rounded-lg ${
              currentCategory === "moods"
                ? // here to change color when selected
                  "bg-gray-600 dark:bg-gray-700"
                : "hover:bg-gray-900 dark:hover:bg-gray-700"
            }`}
            // onClick={() => setCurrentCategory("moods")}
            onClick={() => handleSetCategory("moods")}
          >
            Moods
          </button>
          <button
            type="button"
            className={`px-5 py-1.5 text-s font-medium text-white bg-gray-200 dark:bg-gray-300 dark:text-gray-900 rounded-lg ${
              currentCategory === "symptoms"
                ? // here to change color when selected
                  "bg-gray-600 dark:bg-gray-700"
                : "hover:bg-gray-900 dark:hover:bg-gray-700"
            }`}
            // onClick={() => setCurrentCategory("symptoms")}
            onClick={() => handleSetCategory("symptoms")}
          >
            Symptoms
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySwitcher;
