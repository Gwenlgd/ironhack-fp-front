import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import heikoApi from "../../service/myApi";
import { useInput } from "../../context/InputContext";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const IngredientsPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [categoryIngredients, setCategoryIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [ingredientsListSearch, setIngredientsListSearch] = useState([]);
  // const [selectedIngredients, setSelectedIngredients] = useState([]);

  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef, () => setIsDropdownVisible(false));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const {
    ingredientsList,
    selectedIngredients,
    addIngredient,
    fetchIngredients,
  } = useInput();

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
    setFilteredIngredients(
      ingredientsList.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, ingredientsList]);

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

  const handleInputIngrChange = (e) => {
    setInputValue(e.target.value);
    setIsDropdownVisible(true);
  };

  const fetchSearchResults = useCallback(async (searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await heikoApi.get(
        `/ingredients?search=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Data fetched:", data);
      setIngredientsListSearch(data);
    } catch (err) {
      console.error("Fetching error: ", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = () => {
    fetchSearchResults(searchTerm)
      .then((results) => {
        setSearchResults(results);
        setLoading(false);
        navigate("/results", { state: { searchResults: results } });
      })
      .catch((error) => {
        console.error("Search failed:", error);
        setLoading(false);
      });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
    setSearchTerm("");
  };

  const handleIngredientSelect = (ingredient, e) => {
    e.stopPropagation();
    addIngredient(ingredient);
  };

  const handleIngredientSelectSearch = (ingredient, e) => {
    e.stopPropagation();
    addIngredient(ingredient);
    setInputValue("");
    setIsDropdownVisible(false);
  };

  const isIngredientSelected = (ingredient) =>
    selectedIngredients.some((item) => item._id === ingredient._id);

  return (
    <>
      <div className="mt-20 mb-2 w-full">
        <h3 className="mb-6 text-dark-blue upper text-lg font-bold">
          What ingredient are you looking for ?
        </h3>
        <div className="relative flex items-center mb-6">
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
            value={inputValue}
            onChange={handleInputIngrChange}
            onFocus={() => setIsDropdownVisible(true)}
            placeholder="Search by benefits..."
            className="block w-full p-4 ps-10 text-sm text-gray-900 border-2 border-periwinkle rounded-l-lg bg-gray-50"
          />
          <button
            onClick={handleSearch}
            className="p-4 bg-periwinkle text-white transition duration-150 ease-in-out rounded-r-lg"
          >
            Search
          </button>
          {inputValue && isDropdownVisible && (
            <div
              className="absolute z-10 mt-16 max-w-xs mx-auto sm:max-w-sm md:max-w-md bg-white rounded-lg shadow w-full mt-1 dark:bg-gray-700"
              ref={dropdownRef}
            >
              <ul
                className=" absolute min-h-60 max-h-60 w-full overflow-y-auto bg-periwinkle"
                style={{ width: "350px" }}
              >
                {filteredIngredients.map((ingredient) => (
                  <li
                    key={ingredient._id}
                    onClick={(e) => handleIngredientSelectSearch(ingredient, e)}
                    className={`px-2 py-2 font-semibold cursor-pointer ${
                      isIngredientSelected(ingredient)
                        ? "bg-green opacity-50  text-floral-white dark:bg-blue-800"
                        : ""
                    }`}
                  >
                    <Link to={`/ingredients/${ingredient._id}`}>
                      <h2 className="font-semibold">{ingredient.name}</h2>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div
          className=" flex overflow-x-auto no-scrollbar p-1 mx-auto mt-10 rounded-lg gap-4"
          style={{ height: "100px" }}
        >
          {uniqueCategories.map((category, index) => (
            <button
              key={index}
              className={` min-w-min px-4 py-1 rounded-lg text-xl font-semibold whitespace-nowrap  ${
                selectedCategory === category
                  ? "bg-green opacity-70 text-floral-white"
                  : "bg-periwinkle opacity-40 text-dark-blue hover:text-gray-900 hover:bg-gray-200"
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
          <div className="">
            <ul
              className="overflow-y-auto text-floral-white bg-green opacity-70 text-lg font-semibold rounded-lg"
              style={{ maxHeight: "70vh" }}
            >
              {categoryIngredients.map((ingredient) => (
                <li
                  key={ingredient.id}
                  onClick={(e) => handleIngredientSelect(ingredient, e)}
                  className={`px-2 py-2 hover:bg-gray-100 cursor-pointer ${
                    isIngredientSelected(ingredient)
                      ? "bg-green opacity-90"
                      : ""
                  }`}
                >
                  <Link to={`/ingredients/${ingredient._id}`}>
                    <h2>{ingredient.name}</h2>
                  </Link>
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

//

// {searchTerm && (
//   <div className="">
//     <ul
//       className="overflow-y-auto text-floral-white bg-green opacity-50 rounded-lg"
//       style={{ maxHeight: "60vh" }}
//     >
//       {searchResults.map((ingredient) => (
//         <li
//           key={ingredient._id}
//           onClick={() => addIngredient(ingredient)}
//         >
//           {ingredient.name}
//         </li>
//       ))}
//     </ul>
//   </div>
// )}
