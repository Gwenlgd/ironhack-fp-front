import { useState } from "react";
import heikoApi from "../service/myApi";
import { Link } from "react-router-dom";
import useAuth from "./../context/useAuth";

function LoginPage() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { storeToken, authenticateUser } = useAuth();

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await heikoApi.post("/auth/login", formState);
      const token = response.data.authToken;
      storeToken(token);
      await authenticateUser();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Login failed.");
      setTimeout(() => setError(""), 2000);
    }
  }

  const { email, password } = formState;
  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg items-center ">
      <h2 className="text-2xl font-bold text-center">Login Form</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Submit
        </button>
        <p className="mt-6 text-center text-sm text-gray-600">
          Need an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:text-indigo-600">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
