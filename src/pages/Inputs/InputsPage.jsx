import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInput } from "../../context/InputContext";

function InputsPage() {
  const { inputsData, fetchAllInputs, deleteInput } = useInput();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletedId, setDeletedId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    async function fetchInputs() {
      try {
        setLoading(true);
        await fetchAllInputs();
        if (inputsData && inputsData.length > 0) {
          inputsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        setError(null);
      } catch (error) {
        console.log("Failed to fetch inputs", error);
        setError("Failed to fetch inputs");
      } finally {
        setLoading(false);
      }
    }
    fetchInputs();
  }, [fetchAllInputs, deletedId]);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;
  if (!inputsData) return <h3>No entries to see, please add some</h3>;

  const handleDelete = async (inputId) => {
    {
      try {
        await deleteInput(inputId);
        setDeletedId(inputId);
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
        }, 2000);
      } catch (error) {
        console.error("Failed to delete input", error);
        setError("Failed to delete input");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center justify-center">
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 flex justify-center items-center z-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center bg-whitee">
            <h4 className="text-periwinkle text-lg font-bold ">
              Entry deleted successfully!
            </h4>
            <button
              onClick={() => setShowConfirmation(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <h2 className="mt-20 text-3xl uppercase font-bold text-periwinkle mb-10">
        Your entries
      </h2>
      {inputsData
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((input) => (
          <div
            key={input._id}
            className="flex justify-center items-center w-full mt-6"
          >
            <div
              // className="inline-flex justify-between items-center w-full max-w-xl bg-green text-floral-white text-lg p-6 rounded text-center"
              className="inline-flex justify-between items-center max-w-xl bg-dark-blue opacity-90 shadow-selected text-floral-white text-lg p-6 rounded text-center"
              style={{ minWidth: "330px" }}
            >
              <h2 className="font-bold flex-grow">
                <Link to={`/inputs/${input._id}`}>
                  {new Date(input.date).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Link>
              </h2>
              <button onClick={() => handleDelete(input._id)} className="ml-4">
                <svg
                  className="w-4 h-4 fill-current text-indigo-800 dark:text-indigo-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default InputsPage;
