import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import heikoApi from "../service/myApi"; // Ensure the import path matches your file structure

function OneIngredientPage() {
  const { ingredientId } = useParams();
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [error, setError] = useState(null);

  // Later add reco ?
  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        // Assuming heikoApi has a method to get an ingredient
        const { data } = await heikoApi.get(`ingredients/${ingredientId}`);
        setIngredient(data);
        setLoading(false); // Set loading to false after setting the ingredient
      } catch (err) {
        setError(err.message);
        setLoading(false); // Set loading to false also in case of error
      }
    };

    fetchIngredient();
  }, [ingredientId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!ingredient) return <p>No ingredient found.</p>;

  return (
    <div>
      <h2>{ingredient.name}</h2>
      <p>
        <strong>Category:</strong> {ingredient.category}
      </p>
      {ingredient.benefits && ingredient.benefits.length > 0 && (
        <>
          <h4>Benefits</h4>
          <ul>
            {ingredient.benefits.map((benefit, index) => (
              <li key={index}>
                Name: {benefit.title}
                {benefit.description && (
                  <p>Description: {benefit.description}</p>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default OneIngredientPage;
