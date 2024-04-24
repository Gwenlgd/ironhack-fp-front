import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import React, { useState } from "react";
import CalendarComponent from "../components/Calendar/CalendarComponent";
import { format } from "date-fns";

function HomePage() {
  const { isLoggedIn, user } = useAuth();
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
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
          <CalendarComponent onChange={handleDateClick} value={value} />
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
