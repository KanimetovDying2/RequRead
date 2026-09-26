import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecipePage from "./pages/RecipePage";
import UserRecipesPage from "./pages/UserRecipesPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/users/:id" element={<UserRecipesPage />} />
        <Route path="/create-recipe" element={<CreateRecipePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
