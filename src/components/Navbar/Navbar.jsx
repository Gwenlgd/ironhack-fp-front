import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";

function Navbar() {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <h3>Hello {user.name}</h3>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </>
        )}
        {/* <li>
					<Link to={"/dashboard"}>Dashboard</Link>
				</li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
