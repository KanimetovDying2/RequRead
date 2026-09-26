import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../api/recipeApi";
import type { Recipe } from "../types";

const RecipePage = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (id) {
      getRecipeById(id).then(setRecipe);
    }
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <img src={`http://localhost:5000/${recipe.image}`} className="w-96" />

      <h1 className="text-3xl">{recipe.title}</h1>

      <p>{recipe.description}</p>

      <p>Author: {recipe.author.username}</p>
    </div>
  );
};

export default RecipePage;
