import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipesByUser, deleteRecipe } from "../api/recipeApi";
import { useAuthStore } from "../store/authStore";
import type { Recipe } from "../types";
import Spinner from "../components/Spinner";

const UserRecipesPage = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (id) {
      setLoading(true);
      getRecipesByUser(id)
        .then((data) => {
          setRecipes(data);
        })
        .finally(() => {
          setLoading(false); 
        });
    }
  }, [id]);

  const removeRecipe = async (recipeId: string) => {
    await deleteRecipe(recipeId);
    setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
  };

  const isOwner = user?._id === id;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">User recipes</h1>

        {isOwner && (
          <Link
            to="/create-recipe"
            className="px-5 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition shadow"
          >
            Create new recipe
          </Link>
        )}
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          No recipes found here yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-purple-100 p-4"
            >
              <Link to={`/recipes/${recipe._id}`}>
                <img
                  src={`http://localhost:5000/${recipe.image}`}
                  className="w-full h-48 rounded-xl object-cover hover:scale-105 transition"
                />
                <h2 className="mt-4 text-xl font-bold hover:text-purple-600 transition">
                  {recipe.title}
                </h2>
              </Link>

              {isOwner && (
                <button
                  onClick={() => removeRecipe(recipe._id)}
                  className="mt-4 px-4 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRecipesPage;
