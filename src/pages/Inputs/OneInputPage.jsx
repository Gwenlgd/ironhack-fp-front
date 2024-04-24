import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useInput } from "../../context/InputContext";

function OneInputPage() {
  const { inputId } = useParams();
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);

  const {
    oneInput,
    fetchInput,
    loading,
    error,
    removeIngredientFromInput,
    deleteInput,
  } = useInput();

  useEffect(() => {
    if (inputId) {
      fetchInput(inputId);
    }
  }, [inputId, fetchInput]);

  // if (loading || !oneInput) return <p>Loading...</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!oneInput) return <p>No data found...</p>;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this input?")) {
      try {
        await deleteInput(inputId);
        setDeleted(true);
        setTimeout(() => {
          navigate("/inputs");
        }, 2000);
      } catch (error) {
        console.error("Error deleting input:", error);
      }
    }
  };

  if (deleted) {
    return <p>Input deleted successfully. Redirecting...</p>;
  }

  // by category ?
  return (
    <div>
      <h2>Input Details</h2>
      {/* <button onClick={deleteInput}>Delete Input</button>
      <button onClick={updateInput}>Update Input</button> */}
      <div>
        <p>
          <strong>Date:</strong>
          {new Date(oneInput.date).toLocaleDateString()}
        </p>
        <h3>Ingredients added</h3>
        {oneInput.ingredient && oneInput.ingredient.length > 0 ? (
          <ul>
            {oneInput.ingredient.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() =>
                    removeIngredientFromInput(oneInput._id, item._id)
                  }
                >
                  Remove not working?
                </button>

                <Link to={`/ingredients/${item._id}`}>
                  <h2>Name: {item.name}</h2>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No ingredients listed.</p>
        )}
      </div>

      <div>
        <strong>Moods:</strong>
        {oneInput.mood && oneInput.mood.length > 0 ? (
          <ul>
            {oneInput.mood.map((mood) => (
              <li key={mood._id}>{mood.name} </li>
            ))}
          </ul>
        ) : (
          <p>No moods</p>
        )}
      </div>

      <div>
        <strong>Symptoms:</strong>
        {oneInput.symptom.length > 0 ? (
          <ul>
            {oneInput.symptom.map((symptom) => (
              <li key={symptom._id}>{symptom.name} </li>
            ))}
          </ul>
        ) : (
          <p>No symptoms</p>
        )}
      </div>

      <button onClick={handleDelete}>Remove Input</button>
    </div>
  );
}

export default OneInputPage;
