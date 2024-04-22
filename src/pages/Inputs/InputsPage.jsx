import heikoApi from "../../service/myApi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function InputsPage() {
  const [inputs, setInputs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInputs();
  }, []);

  async function fetchInputs() {
    try {
      setLoading(true);
      const { data } = await heikoApi.get("/inputs");
      setInputs(data);
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

  if (!inputs) return <h3>No inputs to see, please add some</h3>;
  return (
    <div>
      {inputs.map((input) => {
        return (
          <div key={input._id}>
            <h2>
              {/* <Link to={`/inputs/${input.date}`}>{input.date}</Link> */}
              <Link to={`/inputs/${input._id}`}>{input.date}</Link>
            </h2>
          </div> // Added closing div tag
        ); // Added closing parenthesis
      })}
    </div>
  );
}

export default InputsPage;
