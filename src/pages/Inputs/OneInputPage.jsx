import useAuth from "../../context/useAuth";
import heikoApi from "../../service/myApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function OneInputPage() {
  const [inputData, setInputData] = useState(null);
  const { isLoggedIn } = useAuth();
  const { inputId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputId) {
      fetchInput();
    }
  }, [inputId]);

  async function fetchInput() {
    setLoading(true);
    try {
      const { data } = await heikoApi.get(`/inputs/${inputId}`);
      setInputData(data);
    } catch (error) {
      console.error("Failed to fetch input", error);
    }
    setLoading(false);
  }

  if (loading || !inputData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Input Details</h2>
      <div>
        <p>
          <strong>User:</strong> {inputData.user.name}
        </p>
        <p>
          <strong>Date:</strong> {new Date(inputData.date).toLocaleDateString()}
        </p>
        <div>
          <strong>Ingredients:</strong>
          {inputData.ingredient.length > 0 ? (
            <ul>
              {inputData.ingredient.map((ing) => (
                <li key={ing._id}>{ing.name}</li>
              ))}
            </ul>
          ) : (
            <p>No ingredients</p>
          )}
        </div>

        <div>
          <strong>Moods:</strong>
          {inputData.mood.length > 0 ? (
            <ul>
              {inputData.mood.map((mood) => (
                <li key={mood._id}>{mood.name}</li>
              ))}
            </ul>
          ) : (
            <p>No moods</p>
          )}
        </div>

        <div>
          <strong>Symptoms:</strong>
          {inputData.symptom.length > 0 ? (
            <ul>
              {inputData.symptom.map((symptom) => (
                <li key={symptom._id}>{symptom.name}</li>
              ))}
            </ul>
          ) : (
            <p>No symptoms</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OneInputPage;
