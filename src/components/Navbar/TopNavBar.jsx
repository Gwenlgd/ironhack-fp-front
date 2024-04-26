import { useNavigate } from "react-router-dom";

function TopNavbar() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This navigates back to the previous page
  };

  return (
    <nav className="top-navbar-mobile">
      <div className="fixed z-50 top-0 w-full bg-whitee h-12 flex items-center px-4 shadow-md  rounded">
        <button
          onClick={goBack}
          className="text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="sr-only">Back</span>
        </button>
      </div>
    </nav>
  );
}

export default TopNavbar;
