import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import "./App.css";

/* Re routing */
import IsLoggedOut from "./components/routing/isLoggedOut";

import useAuth from "./context/useAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />

        <Route element={<IsLoggedOut />}>
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
