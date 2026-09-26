import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipeApi";
import type { Recipe } from "../types";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  return (
    <div className="p-5 grid grid-cols-3 gap-5">
      {recipes.map((recipe) => (
        <div key={recipe._id} className="border p-4">
          <img
            src={`http://localhost:5000/${recipe.image}`}
            className="w-full h-40 object-cover"
          />

          <Link to={`/recipes/${recipe._id}`}>
            <h2 className="text-xl">{recipe.title}</h2>
          </Link>

          <Link to={`/users/${recipe.author._id}`}>
            {recipe.author.username}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
