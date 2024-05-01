import { Link } from "react-router-dom";
import { useIngredients } from "../../context/IngredientContext";

const IngredientsResults = () => {
  const { ingredientsListSearch } = useIngredients();

  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-lg font-bold mb-4">Search Results</h2>
      {ingredientsListSearch && ingredientsListSearch.length > 0 ? (
        <ul className="list-none p-0">
          {ingredientsListSearch.map((ingredient) => (
            <li
              key={ingredient._id}
              className="border p-3 border-gray-300 mb-2 rounded hover:bg-gray-100"
            >
              <Link
                to={`/ingredients/${ingredient._id}`}
                className="text-blue-500 hover:underline"
              >
                {ingredient.name}
              </Link>
              <div className="text-sm text-gray-600">{ingredient.category}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No ingredients found matching your search criteria.</p>
      )}
    </div>
  );
};

export default IngredientsResults;
