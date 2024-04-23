import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInput } from "../../context/InputContext";

function InputsPage() {
  const { inputsData, fetchAllInputs } = useInput();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [fetchAllInputs]);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;
  if (!inputsData) return <h3>No inputs to see, please add some</h3>;

  return (
    <div>
      {inputsData.map((input) => {
        return (
          <div key={input._id}>
            <h2>
              {/* <Link to={`/inputs/${input.date}`}>{input.date}</Link> */}
              <Link to={`/inputs/${input._id}`}>{input.date}</Link>
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default InputsPage;
