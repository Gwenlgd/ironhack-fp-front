import useAuth from "../context/useAuth";
import { useState } from "react";
import heikoApi from "../service/myApi";
import { useNavigate, Link } from "react-router-dom";

// http://localhost:5173/auth/signup

function SignupPage() {
  const { user } = useAuth();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const nav = useNavigate();

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [key]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // si avatar + dans backend

      // const fd = new FormData();
      // fd.append("name", formState.name);
      // fd.append("email", formState.email);
      // fd.append("password", formState.password);
      const response = await heikoApi.post("/auth/signup", formState);
      console.log(response);
      if (response.status === 201) {
        nav("/login");
      }
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
    <div className="max-w-lg mx-auto p-4 sm:p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
        Signup Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
        <p className="mt-4 sm:mt-6 text-center text-sm sm:text-base text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:text-indigo-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
