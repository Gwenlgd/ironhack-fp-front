import { useState, useEffect, useRef } from "react";
import { useInput } from "../../context/InputContext";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const IngredientsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [categoryIngredients, setCategoryIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const {
    ingredientsList,
    selectedIngredients,
    addIngredient,
    fetchIngredients,
  } = useInput();

  useOutsideAlerter(dropdownRef, () => setSelectedCategory(null));

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  useEffect(() => {
    const categories = new Set(
      ingredientsList.map((ingredient) => ingredient.category)
    );
    setUniqueCategories(Array.from(categories));
  }, [ingredientsList]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = ingredientsList.filter(
        (ingredient) => ingredient.category === selectedCategory
      );
      setCategoryIngredients(filtered);
    }
  }, [selectedCategory, ingredientsList]);

  useEffect(() => {
    if (searchTerm) {
      const results = ingredientsList.filter((ingredient) => {
        // Check each benefit and ensure it is a string before calling toLowerCase()
        return Object.values(ingredient.benefits).some(
          (benefit) =>
            typeof benefit === "string" &&
            benefit.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, ingredientsList]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchTerm(""); // Clear search when selecting a category
  };

  const handleIngredientSelect = (ingredient, e) => {
    e.stopPropagation();
    addIngredient(ingredient);
  };

  const isIngredientSelected = (ingredient) =>
    selectedIngredients.some((item) => item._id === ingredient._id);

  return (
    <>
      <div className="mt-20 mb-2 w-full">
        <h3 className="mb-6 text-dark-blue upper text-lg font-bold">
          What ingredient are you looking for ?
        </h3>
        {/* <div className="relative">
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
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by benefits..."
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {searchTerm && (
            <ul className="mt-2">
              {searchResults.map((ingredient) => (
                <li
                  key={ingredient.id}
                  onClick={(e) => handleIngredientSelect(ingredient, e)}
                  className={`px-2 py-2 hover:bg-gray-100 cursor-pointer ${
                    isIngredientSelected(ingredient) ? "bg-blue-100" : ""
                  }`}
                >
                  {ingredient.name}
                </li>
              ))}
            </ul>
          )}
        </div> */}

        {/* Category Tabs */}
        <div
          className=" flex overflow-x-auto no-scrollbar p-1 mx-auto my-10 rounded-lg gap-4"
          style={{ height: "70px" }}
        >
          {uniqueCategories.map((category, index) => (
            <button
              key={index}
              className={` min-w-min px-4 py-1 rounded-lg text-sm whitespace-nowrap  ${
                selectedCategory === category
                  ? "bg-cambridge-blue opacity-60 text-floral-white"
                  : "bg-periwinkle opacity-70 text-dark-blue hover:text-gray-900 hover:bg-gray-200"
              }`}
              style={{ width: "200px" }}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Ingredients List */}
        {selectedCategory && !searchTerm && (
          <div className="mt-10">
            <ul
              className="overflow-y-auto text-floral-white bg-cambridge-blue opacity-50 rounded-lg"
              style={{ maxHeight: "60vh" }}
            >
              {categoryIngredients.map((ingredient) => (
                <li
                  key={ingredient.id}
                  onClick={(e) => handleIngredientSelect(ingredient, e)}
                  className={`px-2 py-2 hover:bg-gray-100 cursor-pointer ${
                    isIngredientSelected(ingredient)
                      ? "bg-cambridge-blue opacity-90"
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
    </>
  );
};

export default IngredientsPage;
