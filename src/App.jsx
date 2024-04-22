import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import InputsPage from "./pages/Inputs/InputsPage";
import ProtectedRoute from "./components/routing/ProtectedRoute"; // Make sure this path is correct

import "./App.css";

/* Re routing */
import IsLoggedOut from "./components/routing/isLoggedOut";

/*Components*/
import Navbar from "./components/Navbar/Navbar";

import HomePage from "./pages/HomePage";
import OneInputPage from "./pages/Inputs/OneInputPage";

function App() {
  return (
    <>
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
