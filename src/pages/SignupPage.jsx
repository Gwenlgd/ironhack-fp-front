import useAuth from "../context/useAuth";
import { useState } from "react";
import heikoApi from "../service/myApi";
import { useNavigate, Link } from "react-router-dom";

function SignupPage() {
  const { user } = useAuth();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const { name, password, email } = formState;

  return (
    <div>
      <h2>Signup form</h2>

      <form action="">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="Name" value={name} />
        </div>
        <div>
          <label htmlFor="name">Email:</label>
          <input type="email" id="email" placeholder="Email" value={email} />
        </div>
        <div>
          <label htmlFor="name">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SignupPage;
