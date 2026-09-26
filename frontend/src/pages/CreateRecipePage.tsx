import { useState } from "react";
import { createRecipe } from "../api/recipeApi";
import { useNavigate } from "react-router-dom";

const CreateRecipePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!title.trim() || !description.trim() || !image) {
      setError("All fields are required");
      return;
    }

    if (!image.type.startsWith("image/")) {
      setError("Only images are allowed");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", title.trim());
      data.append("description", description.trim());
      data.append("image", image);

      await createRecipe(data);

      navigate("/");
    } catch (error: any) {
      setError(error.response?.data?.message || "Create recipe error");
    }
  };

  return (
    <div
      className="
      flex
      justify-center
      px-5
      py-16
    "
    >
      <div
        className="
        w-full
        max-w-xl
        bg-white
        rounded-3xl
        shadow-xl
        p-8
        border
        border-purple-100
      "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-purple-700
          mb-8
          text-center
        "
        >
          Create recipe
        </h1>

        {error && (
          <p
            className="
            mb-5
            p-3
            rounded-xl
            bg-red-50
            text-red-500
            text-center
          "
          >
            {error}
          </p>
        )}

        <form
          onSubmit={submit}
          className="
            flex
            flex-col
            gap-5
          "
        >
          <input
            placeholder="Recipe title"
            onChange={(e) => setTitle(e.target.value)}
            className="
              border
              rounded-xl
              p-3
              outline-none
              focus:ring-2
              focus:ring-purple-400
            "
          />

          <textarea
            placeholder="Recipe description"
            onChange={(e) => setDescription(e.target.value)}
            className="
              border
              rounded-xl
              p-3
              min-h-40
              outline-none
              focus:ring-2
              focus:ring-purple-400
            "
          />

          <label
            className="
            cursor-pointer
            rounded-xl
            border-2
            border-dashed
            border-purple-200
            p-5
            text-center
            hover:bg-purple-50
            transition
          "
          >
            Choose image
            <input
              type="file"
              className="hidden"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </label>

          <button
            className="
              py-3
              rounded-xl
              bg-purple-600
              text-white
              hover:bg-purple-700
              transition
              shadow
            "
          >
            Create recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipePage;
