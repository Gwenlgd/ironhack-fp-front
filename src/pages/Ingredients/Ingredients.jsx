import { useState, useEffect } from "react";
import { useInput } from "../../context/InputContext";

const Ingredients = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);

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
  };

  // Filtering the list when user type
  // ?? OK WORKING
  useEffect(() => {
    setFilteredIngredients(
      ingredientsList.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, ingredientsList]);

  const handleIngredientSelect = (ingredient) => {
    addIngredient(ingredient);
    setInputValue("");
  };

  return (
    <>
      <div className="ingredients-input">
        <label htmlFor="ingredient-search">Ingredients</label>
        <input
          type="text"
          id="ingredient-search"
          value={inputValue}
          onChange={handleInputIngrChange}
          autoComplete="off"
        />
        {inputValue && (
          <ul>
            {filteredIngredients.map((ingredient) => (
              <li
                key={ingredient._id}
                onClick={(e) => handleIngredientSelect(ingredient, e)}
              >
                {ingredient.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3>Selected Ingredients:</h3>
        <ul>
          {selectedIngredients.map((ingredient, index) => (
            <li key={ingredient._id || index}>
              {ingredient.name}

              <button
                onClick={() => handleRemoveItem(ingredient._id, "ingredient")}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Ingredients;
