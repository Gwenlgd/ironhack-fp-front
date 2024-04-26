import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import React, { useState } from "react";
import CalendarComponent from "../components/Calendar/CalendarComponent";
import { format } from "date-fns";

function HomePage() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());

  const handleDateClick = (value) => {
    const localDate = new Date(value);

    const selectedDate = localDate.toISOString().split("T")[0];
    navigate(`/add-input?date=${selectedDate}`);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          {/* <CalendarComponent onChange={handleDateClick} value={value} /> */}
          {<h1>Hello</h1>}
          {<h2>{user.name}</h2>}
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
          <h3>Home Please sign up or log in</h3>
          <p>
            Need to change and be able to see something here even if not logged
            in
          </p>
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
