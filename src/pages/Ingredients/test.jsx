import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useIngredients } from "../../context/IngredientContext";
import { useInput } from "../../context/InputContext";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const IngredientsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const { fetchSearchResults } = useIngredients();
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

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const results = await fetchSearchResults(searchTerm);
      setSearchResults(results);
      navigate("/results", { state: { searchResults: results } }); // Navigate with state
    } catch (error) {
      console.error("Error searching ingredients:", error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleIngredientSelect = (ingredient, e) => {
    e.stopPropagation();
    addIngredient(ingredient);
  };

  const isIngredientSelected = (ingredient) =>
    selectedIngredients.some((item) => item._id === ingredient._id);

  return (
    <>
      <div className="mt-20 mb-2 w-full px-4">
        <h3 className="mb-6 text-dark-blue upper text-lg font-bold">
          What ingredient are you looking for?
        </h3>
        <div className="relative flex items-center mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ingredients..."
            className="block w-full p-4 text-green bg-white border-2 border-periwinkle text-gray-900 text-sm rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="p-4 bg-periwinkle text-white transition duration-150 ease-in-out rounded-r-lg"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default IngredientsPage;
