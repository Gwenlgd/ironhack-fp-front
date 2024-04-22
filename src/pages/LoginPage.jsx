import { useState } from "react";
import heikoApi from "../service/myApi";
import { Link } from "react-router-dom";
import useAuth from "./../context/useAuth";

function LoginPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { storeToken, authenticateUser } = useAuth();

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [key]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await heikoApi.post("/auth/login", formState);
      console.log(response);
      const token = response.data.authToken;
      storeToken(token);
      await authenticateUser();
    } catch (error) {
      console.log(error.message);
      setError(error.response?.data?.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }

  const { name, email, password } = formState;
  return (
    <div>
      <h2>Login form</h2>

      <p style={{ color: "red" }}>{error}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button>Submit</button>
        <p>
          Need an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
