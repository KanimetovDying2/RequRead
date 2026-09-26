import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById, deleteRecipe } from "../api/recipeApi";
import { getComments, createComment, deleteComment } from "../api/commentApi";
import { useAuthStore } from "../store/authStore";
import type { Recipe, Comment } from "../types";

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!id) return;
    getRecipeById(id).then(setRecipe);
    getComments(id).then(setComments);
  }, [id]);

  const addComment = async () => {
    try {
      if (!id || !text.trim()) return;

      if (text.trim().length < 2) {
        return;
      }

      const comment = await createComment(id, text.trim());

      setComments([...comments, comment]);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  const removeComment = async (commentId: string) => {
    await deleteComment(commentId);
    setComments(comments.filter((c) => c._id !== commentId));
  };

  const removeRecipe = async () => {
    if (!id) return;
    try {
      await deleteRecipe(id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!recipe) {
    return <Spinner/>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-hidden p-6 mb-8">
        <img
          src={`http://localhost:5000/${recipe.image}`}
          alt={recipe.title}
          className="w-full h-80 object-cover rounded-xl mb-6 shadow"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {recipe.title}
        </h1>
        <p className="text-gray-600 mb-4 whitespace-pre-line">
          {recipe.description}
        </p>
        <p className="text-sm text-purple-600 font-medium mb-6">
          Author: {recipe.author.username}
        </p>

        {user && user._id === recipe.author._id && (
          <button
            onClick={removeRecipe}
            className="px-4 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition shadow-sm font-medium"
          >
            Delete Recipe
          </button>
        )}
      </div>

      <hr className="my-6 border-purple-100" />

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>

      {user && (
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-4 mb-6 flex flex-col gap-3">
          <textarea
            className="border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-400 min-h-24 resize-none"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              onClick={addComment}
              className="px-5 py-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition shadow"
            >
              Add comment
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white rounded-2xl shadow-sm border border-purple-100 p-4 flex justify-between items-start"
          >
            <div>
              <p className="font-semibold text-purple-700 text-sm mb-1">
                {comment.author.username}
              </p>
              <p className="text-gray-700">{comment.text}</p>
            </div>
            {user &&
              (user._id === comment.author._id ||
                user._id === recipe.author._id) && (
                <button
                  onClick={() => removeComment(comment._id)}
                  className="text-sm px-3 py-1 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                >
                  Delete
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
