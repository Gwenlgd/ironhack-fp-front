import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import heikoApi from "../service/myApi"; // Ensure the import path matches your file structure
import useAuth from "../context/useAuth";

function OneIngredientPage() {
  const { isLoggedIn, user, logout } = useAuth();

  const { ingredientId } = useParams();
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [error, setError] = useState(null);

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
    <div className="max-w-lg mx-auto flex flex-col items-center h-screen">
      <div
        className=" bg-white rounded-lg shadow-not-selected p-6"
        style={{ height: "80vh", width: "100%" }}
      >
        <div className="mt-20 flex flex-col items-center">
          <h2 className="mt-16 text-center text-3xl font-semibold text-green">
            Oh so sorry, {user.name} 😢
          </h2>

          <h2 className="mt-6 text-2xl text-center text-dark-blue">
            {ingredient.name}
          </h2>
          <p className="mt-2 text-lg uppercase text-center text-dark-blue">
            {ingredient.category}
          </p>
          {ingredient.benefits && ingredient.benefits.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg uppercase text-center font-medium text-gray-700">
                Benefits:
              </h4>
              {/* <ul>
                {ingredient.benefits.map((benefit, index) => (
                  <li key={index} className="mt-2">
                    <strong>Name:</strong> {benefit.title}
                    {benefit.description && (
                      <p className="text-sm text-dark-blue">
                        Description: {benefit.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul> */}
              <h1 className="mt-10 text-center text-3xl font-bold text-periwinkle">
                Benefits are coming soon !
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OneIngredientPage;
