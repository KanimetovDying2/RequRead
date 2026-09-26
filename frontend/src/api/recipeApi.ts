import api from "./axios";

export const getRecipes = async () => {
  const response = await api.get("/recipes");
  return response.data;
};

export const getRecipeById = async (id: string) => {
  const response = await api.get(`/recipes/${id}`);
  return response.data;
};

export const getRecipesByUser = async (id: string) => {
  const response = await api.get(`/recipes/user/${id}`);
  return response.data;
};

export const createRecipe = async (formData: FormData) => {
  const response = await api.post("/recipes", formData);
  return response.data;
};

export const deleteRecipe = async (id: string) => {
  const response = await api.delete(`/recipes/${id}`);
  return response.data;
};
