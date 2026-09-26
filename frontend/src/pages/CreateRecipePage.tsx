import { useState } from "react";
import { createRecipe } from "../api/recipeApi";

const CreateRecipePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", title);
    data.append("description", description);

    if (image) {
      data.append("image", image);
    }

    await createRecipe(data);

    alert("created");
  };

  return (
    <form onSubmit={submit} className="p-5 flex flex-col gap-3">
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
  );
};

export default CreateRecipePage;
