import { Routes, Route } from "react-router-dom";
// import "./App.css";
import ErrorBoundary from "./components/Error/ErrorBoundary";

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
import OneIngredientPage from "./pages/OneIngredientPage";
import CalendarComponent from "./components/Calendar/CalendarComponent";
import BottomNavbar from "./components/Navbar/BottomNavBar";
import ProfilePage from "./pages/Profile/ProfilePage";
import Ingredients from "./pages/Ingredients/Ingredients";
import Moods from "./pages/Moods/Moods";
import Symptoms from "./pages/Symptoms/Symptoms";
import LayoutContainer from "./components/Layout/LayoutContainer";

function App() {
  return (
    <>
      <ErrorBoundary>
        <InputProvider>
          <Navbar />
          <BottomNavbar />
          <LayoutContainer>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/profil" element={<ProfilePage />} />
              <Route path="/calendar" element={<CalendarComponent />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/moods" element={<Moods />} />
              <Route path="/symptoms" element={<Symptoms />} />

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
              <Route
                path="/ingredients/:ingredientId"
                element={<OneIngredientPage />}
              />
            </Routes>
          </LayoutContainer>
        </InputProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
