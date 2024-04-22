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
    <div>
      <h2>Signup form</h2>

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
          <label htmlFor="name">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button>Submit</button>
        <p className="bg-myColor">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
