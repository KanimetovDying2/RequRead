import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipesByUser, deleteRecipe } from "../api/recipeApi";
import { useAuthStore } from "../store/authStore";
import type { Recipe } from "../types";

const UserRecipesPage = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (id) {
      getRecipesByUser(id).then(setRecipes);
    }
  }, [id]);

  const removeRecipe = async (recipeId: string) => {
    await deleteRecipe(recipeId);
    setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
  };

  const isOwner = user?._id === id;

  return (
    <div className="p-5">
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl">User recipes</h1>

        {isOwner && (
          <Link to="/create-recipe" className="border p-2">
            Create new recipe
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-5">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="border p-3">
            <Link to={`/recipes/${recipe._id}`}>
              <img
                src={`http://localhost:5000/${recipe.image}`}
                className="h-40 w-full object-cover"
              />
              <h2>{recipe.title}</h2>
            </Link>
            {isOwner && (
              <button onClick={() => removeRecipe(recipe._id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRecipesPage;
