import { Routes, Route } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import AuthContextWrapper from "./context/AuthContextWrapper";

/* Signup + Login pages */
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

/* Re routing */

import IsLoggedOut from "./components/routing/isLoggedOut";

/* Pages for inputs */
import { InputProvider } from "./context/InputProvider";
import InputsPage from "./pages/Inputs/InputsPage";
import ProtectedRoute from "./components/routing/ProtectedRoute"; // Make sure this path is correct
import OneInputPage from "./pages/Inputs/OneInputPage";
import UpdateOneInput from "./pages/Inputs/UpdateOneInput";
import InputForm from "./pages/Inputs/InputForm";

/*Components*/
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <AuthContextWrapper>
        <InputProvider>
          <Navbar />
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route element={<IsLoggedOut />}>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/inputs" element={<InputsPage />} />
                <Route path="/add-input" element={<InputForm />} />
                <Route path="/inputs/:inputId" element={<OneInputPage />} />
                <Route
                  path="/inputs/update/:inputId"
                  element={<UpdateOneInput />}
                />
              </Route>
            </Routes>
          </ErrorBoundary>
        </InputProvider>
      </AuthContextWrapper>
    </>
  );
}

export default App;
