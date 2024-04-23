import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";

function HomePage() {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <>
          <li>{<h3>Hello {user.name}</h3>}</li>
          <p>
            <Link to="/inputs">All your inputs</Link>
          </p>
          <Link to="/add-input" className="button-link">
            Add Input
          </Link>{" "}
          {/* Button styled as Link */}
        </>
      ) : (
        <>
          <h3>Please sign up or log in</h3>
          <li>
            <Link to={"/signup"}>Signup</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </>
      )}
    </>
  );
}

export default HomePage;
