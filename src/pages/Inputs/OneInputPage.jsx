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
    {
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
    <div className="max-w-lg mx-auto flex flex-col items-center justify-center">
      <h2 className="mt-2 text-2xl font-bold text-periwinkle mb-10">
        Input Details
      </h2>
      {/* <button onClick={deleteInput}>Delete Input</button>
      <button onClick={updateInput}>Update Input</button> */}

      <div className=" w-full flex flex-col items-center justify-center">
        <h3>{new Date(oneInput.date).toLocaleDateString()}</h3>
        <h3 className="mt-2 text-2xl font-bold text-dark-blue mb-2">
          Ingredients added
        </h3>
        <div className="w-full flex items-start overflow-y-auto w-full h-40 p-3 text-start text-floral-white bg-cambridge-blue opacity-30 rounded-lg cursor-pointer overflow-hidden dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:peer-checked:text-blue-200 peer-checked:text-blue-600">
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
      </div>

      <div className=" w-full flex flex-col items-center justify-center">
        <h3 className="mt-10 text-2xl font-bold text-dark-blue mb-2">
          Moods Added:
        </h3>
        <div className="w-full flex items-start overflow-y-auto w-full h-40 p-3 text-start text-floral-white bg-cambridge-blue opacity-30 rounded-lg cursor-pointer overflow-hidden dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:peer-checked:text-blue-200 peer-checked:text-blue-600">
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
      </div>

      <div className=" w-full flex flex-col items-center justify-center">
        <h3 className="mt-10 text-2xl font-bold text-dark-blue mb-2">
          Symtpoms Added:
        </h3>
        <div className="w-full flex items-start overflow-y-auto w-full h-40 p-3 text-start text-floral-white bg-cambridge-blue opacity-30 rounded-lg cursor-pointer overflow-hidden dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:peer-checked:text-blue-200 peer-checked:text-blue-600">
          {oneInput.symptom.length > 0 ? (
            <ul>
              {oneInput.symptom.map((symptom) => (
                <li key={symptom._id}>{symptom.name} </li>
              ))}
            </ul>
          ) : (
            <p>No symptoms</p>
          )}
        </div>{" "}
      </div>

      <button
        onClick={handleDelete}
        className="text-center mt-10 mb-40 text-floral-white bg-cambridge-blue opacity-50 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Remove Input
      </button>
    </div>
  );
}

export default OneInputPage;
