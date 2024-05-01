import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useIngredients } from "../../context/IngredientContext";
import { useInput } from "../../context/InputContext";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const IngredientsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [categoryIngredients, setCategoryIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const {
    fetchSearchResults,
    ingredientsListSearch,
    addIngredientSearch,
    loading,
    setLoading,
    error,
  } = useIngredients();

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

  // search by name, category or benefits
  useEffect(() => {
    if (searchTerm) {
      const results = ingredientsListSearch.filter((ingredient) => {
        const searchLower = searchTerm.toLowerCase();

        // Check if the search term is in the name or category
        const inName = ingredient.name.toLowerCase().includes(searchLower);
        const inCategory = ingredient.category
          .toLowerCase()
          .includes(searchLower);

        // Check if the search term is in any of the benefits' title or description
        const inBenefits = ingredient.benefits.some(
          (benefit) =>
            (benefit.title &&
              benefit.title.toLowerCase().includes(searchLower)) ||
            (benefit.description &&
              benefit.description.toLowerCase().includes(searchLower))
        );

        return inName || inCategory || inBenefits;
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, ingredientsListSearch]);

  useEffect(() => {
    setSearchResults(ingredientsListSearch);
  }, [ingredientsListSearch]);

  const handleSearch = (searchTerm) => {
    fetchSearchResults(searchTerm).then((results) => {
      setSearchResults(results);
      navigate("/results", { state: { searchResults: results } });
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  // const handleIngredientSelect = (ingredient, e) => {
  //   e.stopPropagation();
  //   addIngredientSearch(ingredient);
  // };

  // const isIngredientSelected = (ingredient) =>
  //   selectedIngredients.some((item) => item._id === ingredient._id);

  return (
    <>
      <div className="mt-20 mb-2 w-full px-4">
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ingredients..."
            className="block w-full p-4 ps-10 text-green bg-whitee border-2 border-periwinkle text-gray-900 text-sm rounded-l-lg focus:outline-none block w-full"
          />
          <button
            onClick={handleSearch}
            className="p-4 bg-periwinkle text-white transition duration-150 ease-in-out rounded-r-lg"
          >
            Search
          </button>
        </div>

        {searchTerm && (
          <div className="">
            <ul
              className="overflow-y-auto text-floral-white bg-green opacity-50 rounded-lg"
              style={{ maxHeight: "60vh" }}
            >
              {searchResults.map((ingredient) => (
                <li
                  key={ingredient._id}
                  onClick={() => addIngredient(ingredient)}
                >
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Category Tabs */}
        <h3 className="mb-6 text-dark-blue upper text-lg font-bold">
          By Category :
        </h3>
        <div
          className="grid grid-cols-3 md:grid-cols-3 gap-x-6 gap-y-6 w-full lg:w-1/2 mx-auto"
          style={{ height: "70px" }}
        >
          {uniqueCategories.map((category, index) => (
            <button
              key={index}
              className={`inline-flex flex-col items-center justify-center w-1/4 h-20 text-center text-dark-blue font-semibold bg-periwinkle rounded-lg cursor-pointer shadow-not-selected  ${
                selectedCategory === category
                  ? "bg-green text-floral-white"
                  : "bg-periwinkle text-dark-blue hover:text-gray-900 hover:bg-gray-200"
              }`}
              style={{ width: "100px" }}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Ingredients List */}
        {/* {selectedCategory && !searchTerm && (
          <div className="mt-10">
            <ul
              className="overflow-y-auto text-floral-white bg-green opacity-50 rounded-lg"
              style={{ maxHeight: "60vh" }}
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
        )} */}
      </div>
    </>
  );
};

export default IngredientsPage;
