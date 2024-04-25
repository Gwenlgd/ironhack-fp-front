import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import CalendarComponent from "../Calendar/CalendarComponent";

function BottomNavbar() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);

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

  const goToProfile = () => {
    navigate("/profil"); // Ensure this matches your route setup
  };

  return (
    <nav className="bottom-navbar">
      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        {/* other buttons omitted for brevity */}
        <button
          onClick={goToProfile}
          className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          data-tooltip-target="tooltip-profile"
        >
          {/* Icon and label here */}
          <span className="sr-only">Profile</span>
        </button>
        {/* additional content omitted for brevity */}
      </div>
    </nav>
  );
}

export default BottomNavbar;
