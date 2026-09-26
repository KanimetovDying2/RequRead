import api from "./axios";

export const getComments = async (recipeId: string) => {
  const response = await api.get(`/comments/recipe/${recipeId}`);

  return response.data;
};

export const createComment = async (recipeId: string, text: string) => {
  const response = await api.post(`/comments/recipe/${recipeId}`, {
    text,
  });

  return response.data;
};

export const deleteComment = async (id: string) => {
  const response = await api.delete(`/comments/${id}`);

  return response.data;
};
