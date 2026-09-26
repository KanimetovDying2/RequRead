import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../api/recipeApi";
import { getComments, createComment, deleteComment } from "../api/commentApi";
import { useAuthStore } from "../store/authStore";
import type { Recipe, Comment } from "../types";

const RecipePage = () => {
  const { id } = useParams();
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

  const removeComment = async (id: string) => {
    await deleteComment(id);
    setComments(comments.filter((c) => c._id !== id));
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <img src={`http://localhost:5000/${recipe.image}`} className="w-96" />
      <h1 className="text-3xl">{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>Author: {recipe.author.username}</p>
      <hr className="my-5" />
      <h2 className="text-xl">Comments</h2>

      {user && (
        <div>
          <textarea
            className="border"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={addComment} className="border p-2">
            Add comment
          </button>
        </div>
      )}

      {comments.map((comment) => (
        <div key={comment._id} className="border p-2 my-2">
          <p>{comment.author.username}</p>
          <p>{comment.text}</p>
          {user &&
            (user._id === comment.author._id ||
              user._id === recipe.author._id) && (
              <button onClick={() => removeComment(comment._id)}>Delete</button>
            )}
        </div>
      ))}
    </div>
  );
};

export default RecipePage;
