import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useInput from "../../context/useInputContext"; // Import the useInput hook to access the context

function InputsPage() {
  const { inputData, fetchInput } = useInput(); // Destructure the necessary values from the context
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInputs(); // Use the fetchInputs function to retrieve inputs when the component mounts
  }, []);

  async function fetchInputs() {
    try {
      setLoading(true);
      // Assuming this fetches all inputs, but you might need to adjust it according to your API
      await fetchInput(); // Call the fetchInput function from the context
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;

  if (!inputData) return <h3>No inputs to see, please add some</h3>;

  // Assuming inputData is an array of inputs
  return (
    <div>
      {inputData.map((input) => {
        return (
          <div key={input._id}>
            <h2>
              <Link to={`/inputs/${input._id}`}>{input.date}</Link>
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default InputsPage;
