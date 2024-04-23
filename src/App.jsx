import { Routes, Route } from "react-router-dom";
import "./App.css";

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

/*Components*/
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <InputProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<IsLoggedOut />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/inputs" element={<InputsPage />} />
            <Route path="/inputs/:inputId" element={<OneInputPage />} />
            <Route
              path="/inputs/update/:inputId"
              element={<UpdateOneInput />}
            />
          </Route>
        </Routes>
      </InputProvider>
    </>
  );
}

export default App;
