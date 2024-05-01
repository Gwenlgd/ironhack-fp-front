import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";

function ProfilePage() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="max-w-lg mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
            <div
              className=" bg-white rounded-lg shadow-lg p-6"
              style={{ height: "66vh", width: "100%" }}
            >
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  {/* <svg
                    className="absolute w-46 h-46 text-dark-bl -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg> */}
                </div>
                <h1 className="mt-4 text-4xl font-bold text-periwinkle ">
                  WELCOME
                </h1>
                <h2 className="mt-2 text-2xl">{user.name}</h2>
                <p className="mt-2 text-gray-500">{user.email}</p>
              </div>

              <div className=" flex flex-col mt-6">
                <Link
                  to="/inputs"
                  className="mt-10 text-center text-floral-white bg-green opacity-50 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  View Your Inputs
                </Link>
                <Link
                  to="/add-input"
                  className="text-center text-floral-white bg-green opacity-50 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Add New Input
                </Link>
                <Link
                  to="/settings"
                  className="text-center text-floral-white bg-green opacity-50 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="text-center text-floral-white bg-green opacity-50 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className=" flex items-center mt-8 justify-center bg-white rounded-lg shadow-lg"
            style={{ height: "60vh", width: "100%" }}
          >
            <div className="w-full flex flex-col items-center p-8">
              <h3>Not logged in yet?</h3>
              <Link
                to="/signup"
                className="w-full mt-6 text-center text-floral-white bg-green opacity-50 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="w-full mt-6 text-center text-floral-white bg-green opacity-50 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Login
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProfilePage;
