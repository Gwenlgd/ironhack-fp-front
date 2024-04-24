import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useInput } from "../../context/InputContext";

function OneInputPage() {
  const { inputId } = useParams();
  const { oneInput, fetchInput, loading, error, removeIngredientFromInput } =
    useInput();

  useEffect(() => {
    if (inputId) {
      fetchInput(inputId);
    }
  }, [inputId, fetchInput]);

  // if (loading || !oneInput) return <p>Loading...</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!oneInput) return <p>No data found...</p>;

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
                  Remove
                </button>
                <h2>Name: {item.name}</h2>
                <Link to={`/ingredients/${item._id}`}>{item.name}</Link>
                Category: {item.category}
                {item.benefits && item.benefits.length > 0 && (
                  <>
                    <h4>Benefits</h4>
                    <ul>
                      {item.benefits.map((benefit) => (
                        <li key={benefit._id}>
                          {" "}
                          {/* Assuming each benefit has a unique _id */}
                          Name: {benefit.title}
                          {benefit.description && (
                            <p>Description: {benefit.description}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
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

      <h1 style={{ color: "red" }}>
        Removed moods and symptoms because bug = need to add them
      </h1>
    </div>
  );
}

export default OneInputPage;
