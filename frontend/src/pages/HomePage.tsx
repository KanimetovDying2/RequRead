import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipeApi";
import type { Recipe } from "../types";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  if (!recipes.length) {
    return <Spinner />;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Recipe collection of RequRead
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="
              bg-white 
              rounded-2xl 
              overflow-hidden
              shadow-md
              hover:shadow-xl
              transition
              border border-purple-100
            "
          >
            <Link to={`/recipes/${recipe._id}`}>
              <img
                src={`http://localhost:5000/${recipe.image}`}
                className="
                  w-full
                  h-52
                  object-cover
                  hover:scale-105
                  transition
                "
              />
            </Link>

            <div className="p-5">
              <Link to={`/recipes/${recipe._id}`}>
                <h2
                  className="
                  text-xl 
                  font-bold 
                  text-gray-800
                  hover:text-purple-600
                  transition
                "
                >
                  {recipe.title}
                </h2>
              </Link>

              <Link
                to={`/users/${recipe.author._id}`}
                className="
                  inline-block
                  mt-3
                  text-sm
                  text-purple-600
                  hover:underline
                "
              >
                By {recipe.author.username}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
