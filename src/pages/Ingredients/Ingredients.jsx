import { useState, useEffect, useRef } from "react";
import { useInput } from "../../context/InputContext";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const Ingredients = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef, () => setIsDropdownVisible(false));

  const {
    ingredientsList,
    selectedIngredients,
    addIngredient,
    handleRemoveItem,
    fetchIngredients,
  } = useInput();

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const handleInputIngrChange = (e) => {
    setInputValue(e.target.value);
    setIsDropdownVisible(true);
  };

  // Get categories
  useEffect(() => {
    if (ingredientsList.length) {
      const categories = new Set(
        ingredientsList.map((ingredient) => ingredient.category)
      );
      setUniqueCategories(Array.from(categories)); // Correctly setting unique categories
    }
  }, [ingredientsList]);

  // Filtering the list when user type
  // ?? OK WORKING
  useEffect(() => {
    setFilteredIngredients(
      ingredientsList.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, ingredientsList]);

  const handleIngredientSelect = (ingredient, e) => {
    e.stopPropagation();
    addIngredient(ingredient);
  };

  // const closeDropdown = () => {
  //   setIsDropdownVisible(false);
  // };

  const isIngredientSelected = (ingredient) => {
    return selectedIngredients.some((item) => item._id === ingredient._id);
  };

  return (
    <>
      <div className="w-full">
        {/* <div className="ingredients-input"> */}
        {/* SELECTED INGREDIENTS CARDS */}
        <h3 className=" font-bold text-lg mb-4">Selected Ingredients:</h3>
        <div className="flex justify-center w-full">
          <div className="flex items-start overflow-y-auto w-full h-48 p-3 text-start text-gray-500 bg-periwinkle opacity-70 rounded-lg cursor-pointer overflow-hidden dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:peer-checked:text-blue-200 peer-checked:text-blue-600">
            <ul className="list-none p-0 flex flex-wrap gap-1">
              {selectedIngredients.map((ingredient, index) => (
                <li key={ingredient._id || index} className="mb-2">
                  <div className="inline-flex items-center bg-dark-blue text-dark-blue font-bold text-s font-medium px-2.5 py-0.5 m2 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                    <h2 className="text-floral-white font-bold">
                      {ingredient.name}
                    </h2>
                    <button
                      type="button"
                      className="ml-2 "
                      onClick={() =>
                        handleRemoveItem(ingredient._id, "ingredient")
                      }
                    >
                      <svg
                        className="w-3 h-3 fill-current font-bold text-floral-white dark:text-indigo-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEARCH */}
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          <h3 className="mt-10 font-bold text-lg mb-4">Add new ingredients:</h3>
          <label
            htmlFor="ingredient-search"
            className="mt-10 mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Ingredients
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              // type="text"
              type="search"
              id="ingredient-search"
              value={inputValue}
              placeholder="Search ingredient..."
              onChange={handleInputIngrChange}
              autoComplete="off"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {inputValue && isDropdownVisible && (
            <div
              className="absolute z-10 max-w-xs mx-auto sm:max-w-sm md:max-w-md bg-white rounded-lg shadow w-full mt-1 dark:bg-gray-700"
              ref={dropdownRef}
            >
              {/* ADD a space + a cross to close, keeping it? */}
              {/* <div className="flex justify-end p-2">
              <button
                onClick={closeDropdown}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div> */}
              <ul className="min-h-40 max-h-40 overflow-y-auto bg-whitee">
                {filteredIngredients.map((ingredient) => (
                  <li
                    key={ingredient._id}
                    onClick={(e) => handleIngredientSelect(ingredient, e)}
                    className={`px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer ${
                      isIngredientSelected(ingredient)
                        ? "bg-green opacity-50  text-floral-white dark:bg-blue-800"
                        : ""
                    }`}
                  >
                    {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CATEGORIES */}
        {/* <div className="mt-10">
          <h2 className="text-lg font-bold">Categories:</h2>
          <ul>
            {uniqueCategories.map((category, index) => (
              <li key={index} className="px-2 py-1">
                {category}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default Ingredients;
