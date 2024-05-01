import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";

const AnalysisPage = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="max-w-lg mx-auto flex flex-col items-center h-screen">
            <div
              className=" bg-white rounded-lg shadow-not-selected p-6"
              style={{ height: "80vh", width: "100%" }}
            >
              <div className="mt-20 flex flex-col items-center">
                <h2 className="mt-16 text-center text-4xl font-semibold text-green">
                  Sorry, {user.name} 😢
                </h2>
                <h1 className="mt-10 text-center text-4xl font-bold text-periwinkle">
                  It's coming soon !
                </h1>
                <h2 className="mt-10 text-2xl text-center text-dark-blue">
                  The feature is going to be available very soon
                </h2>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-lg mx-auto flex flex-col items-center h-screen">
          <div
            className=" bg-white rounded-lg  shadow-custom p-6 "
            style={{ height: "80vh", width: "100%" }}
          >
            <div className="w-full flex flex-col items-center p-8">
              <h1 className="m-6 text-4xl font-bold text-periwinkle ">
                WELCOME
              </h1>
              <h2 className="mt-10 text-2xl text-center">
                Log In to Get Started
              </h2>
              <p className="mt-10 text-gray-500 text-center">
                Understand what your body is telling you and find the balance!
              </p>
              <Link
                to="/signup"
                className="w-full mt-10 text-center text-floral-white bg-green shadow-not-selected focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="w-full mt-10 text-center text-floral-white bg-green shadow-not-selected focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnalysisPage;
