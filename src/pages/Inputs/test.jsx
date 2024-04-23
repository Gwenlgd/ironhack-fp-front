import useAuth from "../../context/useAuth";
import heikoApi from "../../service/myApi";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function OneInputPage() {
  const [inputData, setInputData] = useState(null);
  const { isLoggedIn } = useAuth();
  const { inputId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  async function deleteInput() {
    try {
      await heikoApi.delete(`/inputs/${inputId}`);
      navigate("/inputs");
    } catch (error) {
      console.error("Failed to delete input", error);
    }
  }

  async function updateInput(changes) {
    const payload = {
      date: inputData.date,
      ingredients:
        changes.ingredients || inputData.ingredient.map((ing) => ing._id),
      moods: changes.moods || inputData.mood.map((mood) => mood._id),
      symptoms:
        changes.symptoms || inputData.symptom.map((symptom) => symptom._id),
    };

    try {
      const response = await heikoApi.post(`/inputs/upsert`, payload);
      setInputData(response.data);
      console.log("Input updated successfully");
    } catch (error) {
      console.error("Failed to update input", error);
    }
  }

  async function deleteIngredient(ingredientId) {
    try {
      await heikoApi.delete(`/inputs/${inputId}/ingredient/${ingredientId}`);
      fetchInput();
    } catch (error) {
      console.error("Failed to delete ingredient", error);
    }
  }

  async function deleteMood(moodId) {
    try {
      await heikoApi.delete(`/inputs/${inputId}/mood/${moodId}`);
      fetchInput();
    } catch (error) {
      console.error("Failed to delete mood", error);
    }
  }

  async function deleteSymptom(symptomId) {
    try {
      await heikoApi.delete(`/inputs/${inputId}/symptom/${symptomId}`);
      fetchInput();
    } catch (error) {
      console.error("Failed to delete symptom", error);
    }
  }

  if (loading || !inputData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Input Details</h2>
      <button onClick={deleteInput}>Delete Input</button>
      <button onClick={updateInput}>Update Input</button>
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
                <li key={ing._id}>
                  {ing.name}{" "}
                  <button onClick={() => deleteIngredient(ing._id)}>
                    Delete
                  </button>
                </li>
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
                <li key={mood._id}>
                  {mood.name}{" "}
                  <button onClick={() => deleteMood(mood._id)}>Delete</button>
                  <button
                    onClick={() =>
                      updateInput({
                        moods: [
                          ...inputData.mood.map((mood) => mood._id),
                          existingMoodId,
                        ],
                      })
                    }
                  >
                    Add Existing Mood
                  </button>
                </li>
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
                <li key={symptom._id}>
                  {symptom.name}{" "}
                  <button onClick={() => deleteSymptom(symptom._id)}>
                    Delete
                  </button>
                </li>
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
