import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";

function ProfilePage() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>Profile Page</h1>
          {<h3>Hello {user.name}</h3>}
          <p>
            <Link to="/inputs">All your inputs</Link>
          </p>
          <Link to="/add-input" className="button-link">
            Add Input
          </Link>{" "}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <h3>Not logged in yet?</h3>

          <Link to={"/signup"}>Signup</Link>

          <Link to={"/login"}>Login</Link>
        </>
      )}
    </>
  );
}

export default ProfilePage;
