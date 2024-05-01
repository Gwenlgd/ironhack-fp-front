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
      <div className="flex flex-col justify-center items-center h-screen">
        {isLoggedIn ? (
          <>
            {/* <CalendarComponent onChange={handleDateClick} value={value} /> */}
            <h1 className="text-7xl font-bold text-periwinkle">HELLO</h1>
            <h2 className="mb-12 text-5xl mb-4 text-dark-blue">{user.name}</h2>
            <p className="mt-10 mb-10 font-medium">
              HOW ARE YOU FEELING TODAY ?
            </p>
            <p>
              <Link
                to="/inputs"
                className="mt-10 text-floral-white font-bold bg-green opacity-50 shadow-not-selected rounded-full text-sm px-5 py-3 me-2 mb-2"
              >
                All your entries
              </Link>
            </p>
            <Link
              to="/add-input"
              className="mt-6 text-floral-white font-bold bg-green opacity-50 shadow-not-selected rounded-full text-sm px-5 py-2.5 me-2 mb-2"
            >
              Add a new entry
            </Link>{" "}
          </>
        ) : (
          <>
            <div
              className=" flex items-center justify-center bg-white rounded-lg shadow-lg"
              style={{ height: "60vh", width: "100%" }}
            >
              <div className="w-full flex flex-col items-center p-8">
                <h1 className="m-6 text-4xl font-bold text-periwinkle ">
                  WELCOME
                </h1>
                <h2 className="mt-4 text-2xl text-center">
                  You can explore the app
                </h2>
                <h3 className="mt-10 text-xl text-center">
                  You will need to sign in to add your food, symptoms or mood of
                  the day !
                </h3>
                <p className="mt-10 text-gray-500 text-center">
                  Understand what your body is telling you and find the balance!
                </p>{" "}
                <Link
                  to="/login"
                  className="w-full mt-6 text-center text-floral-white bg-green opacity-50 shadow-not-selected focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Login
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;
