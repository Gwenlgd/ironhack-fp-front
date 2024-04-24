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
  if (!inputsData) return <h3>No inputs to see, please add some</h3>;

  const handleDelete = async (inputId) => {
    if (window.confirm("Are you sure you want to delete this input?")) {
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
    <div>
      {showConfirmation && <h4>Input deleted successfully!</h4>}
      {inputsData.map((input) => (
        <div key={input._id}>
          <h2>
            <Link to={`/inputs/${input._id}`}>{input.date}</Link>
          </h2>
          <button onClick={() => handleDelete(input._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default InputsPage;
