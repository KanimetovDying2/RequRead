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
    <div className="p-5">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
        <textarea
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
