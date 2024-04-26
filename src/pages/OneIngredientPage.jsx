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
    <div className="p-8 font-sans">
      <h2 className="mb-12 text-center text-2xl mb-4 text-dark-blue">
        Page coming soon
      </h2>
      {/* <h2 className="text-xl font-semibold text-gray-800">{ingredient.name}</h2> */}
      {/* <p className="mt-1">
        <strong>Category:</strong> {ingredient.category}
      </p>
      {ingredient.benefits && ingredient.benefits.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-medium text-gray-700">Benefits</h4> */}
      {/* <ul>
            {ingredient.benefits.map((benefit, index) => (
              <li key={index} className="mt-2">
                <strong>Name:</strong> {benefit.title}
                {benefit.description && (
                  <p className="text-sm text-dark-blue">
                    Description: {benefit.title}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <h4>Benefits</h4>
          <ul>
            {ingredient.benefits.map((benefit) => (
              <li key={benefit._id}>
                Name: {benefit.title}
                {benefit.description && (
                  <p>Description: {benefit.description}</p>
                )}
              </li>
            ))}
          </ul> */}
      {/* </div> */}
      {/* )} */}
    </div>
  );
}

export default OneIngredientPage;
