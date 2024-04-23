import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInput } from "../../context/InputContext";

function OneInputPage() {
  const { inputId } = useParams();
  const { inputsData, fetchInput, loading, error } = useInput();

  useEffect(() => {
    if (inputId) {
      fetchInput(inputId);
    }
  }, [inputId, fetchInput]);

  // if (loading || !inputsData) return <p>Loading...</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!inputsData) return <p>No data found...</p>;

  return (
    <div>
      <h2>Input Details</h2>
      {/* <button onClick={deleteInput}>Delete Input</button>
      <button onClick={updateInput}>Update Input</button> */}
      <div>
        <p>
          <strong>Date:</strong>
          {new Date(inputsData.date).toLocaleDateString()}
        </p>
        <h3>Ingredients added</h3>
        {inputsData.ingredient && inputsData.ingredient.length > 0 ? (
          <ul>
            {inputsData.ingredient.map((item, index) => (
              <li key={index}>
                <h2>Name: {item.name}</h2>, Category: {item.category}
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

      <h1 style={{ color: "red" }}>
        Removed moods and symptoms because bug = need to add them
      </h1>
    </div>
  );
}

export default OneInputPage;
