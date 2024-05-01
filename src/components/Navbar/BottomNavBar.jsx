import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Context
import useAuth from "../../context/useAuth";

// Components
import CalendarComponent from "../Calendar/CalendarComponent";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

function BottomNavbar() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useOutsideAlerter(calendarRef, () => setShowCalendar(false));

  const goToHome = () => {
    navigate("/");
  };

  const handleNewEntryClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setShowCalendar(true);
    }
  };

  const handleDatePicked = () => {
    setShowCalendar(false); // Hide the calendar
  };

  const goToIngredients = () => {
    navigate("/ingredientspage"); // Ensure this matches your route setup
  };
  const goToProfile = () => {
    navigate("/profil"); // Ensure this matches your route setup
  };

  return (
    <nav className="bottom-navbar">
      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-whitee shadow-navbar rounded bottom-0 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        {/* {location.pathname === "/add-input" && (
          <CategorySwitcher
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />
        )} */}
        {/* HOME BUTTON */}

        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <button
            onClick={goToHome}
            data-tooltip-target="tooltip-home"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 mb-1 text-periwinkle dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span className="text-s text-center text-periwinkle font-semibold dark:text-gray-300">
              Home
            </span>
          </button>

          {/* WALLET BUTTON change to ? ingredients page ? */}

          <button
            onClick={goToIngredients}
            data-tooltip-target="tooltip-wallet"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-6 h-6 text-periwinkle dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="text-s text-center text-periwinkle font-semibold dark:text-gray-300">
              Food
            </span>
          </button>
          <div
            id="tooltip-wallet"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Wallet
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>

          {/* NEW ENTRY = add calendar when click? */}

          <div className="flex items-center justify-center">
            <button
              onClick={handleNewEntryClick}
              data-tooltip-target="tooltip-new"
              type="button"
              className="button-navbott inline-flex items-center justify-center w-20 h-20 shadow-button-two text-white bg-periwinkle shadow-lg rounded-full -mt-5"
            >
              <svg
                className="w-6 h-6 text-floral-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
              <span className="sr-only">New entry</span>
            </button>
          </div>
          {showCalendar && (
            <div
              ref={calendarRef}
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-lg shadow-lg p-4"
            >
              <CalendarComponent onDatePicked={handleDatePicked} />
            </div>
          )}
          {/* <li>
					<Link to={"/dashboard"}>Dashboard</Link>
				</li> */}

          {/* SETTINGS BUTTON change to ?  */}

          <button
            data-tooltip-target="tooltip-settings"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 mb-1 text-periwinkle dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M1 5h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 1 0 0-2H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2Zm18 4h-1.424a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2h10.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Zm0 6H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 0 0 0 2h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Z" />
            </svg>
            <span className="text-s text-center text-periwinkle font-semibold dark:text-gray-300">
              Settings
            </span>
          </button>
          <div
            id="tooltip-settings"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Settings
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>

          {/* PROFILE BUTTON change to ? */}

          <button
            onClick={goToProfile}
            data-tooltip-target="tooltip-profile"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 mb-1 text-periwinkle dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <span className="text-s text-center text-periwinkle font-semibold dark:text-gray-300">
              Profile
            </span>
          </button>

          <div
            id="tooltip-profile"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Profile
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default BottomNavbar;
