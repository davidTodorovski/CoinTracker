import { Routes, Route, Navigate } from "react-router-dom";
import SignInSignUp from "./pages/SignIn-SignUp/SignInSignUp";
import { useUser } from "./context/UserContext/UserContext";
import WelcomeWizard from "./pages/WelcomeWizard/WelcomeWizard";
import NavBar from "./components/NavBar";
import Overview from "./pages/MainPages/Overview";
import BottomNavBar from "./components/BottomNavBar";
import Statistics from "./pages/MainPages/Statistics";
import Categories from "./pages/MainPages/Categories";
import AddEntryModal from "./components/AddEntryModal";
import { useBudgetContext } from "./context/BudgedContext/BudgetContext";

function App() {
  const { user, userAvatar } = useUser();
  const { entryButtonClicked, entryToUpdate } = useBudgetContext();

  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            !user ? <SignInSignUp /> : <Navigate replace to="/overview" />
          }
        />
        <Route
          path="sign-up"
          element={
            !user ? <SignInSignUp /> : <Navigate replace to="/overview" />
          }
        />
        <Route
          path="/overview"
          element={user ? <Overview /> : <Navigate replace to="/" />}
        />
        <Route
          path="/categories"
          element={user ? <Categories /> : <Navigate replace to="/" />}
        />
        <Route
          path="/statistics"
          element={user ? <Statistics /> : <Navigate replace to="/" />}
        />
        <Route
          path="/welcome"
          element={
            userAvatar && !user ? (
              <WelcomeWizard />
            ) : (
              <Navigate replace to="/sign-up" />
            )
          }
        />
      </Routes>
      {entryToUpdate || entryButtonClicked ? <AddEntryModal /> : null}
      <BottomNavBar />
    </div>
  );
}

export default App;
