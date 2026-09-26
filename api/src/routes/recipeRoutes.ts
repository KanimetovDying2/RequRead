import express from "express";

import {
  getRecipes,
  getRecipeById,
  createRecipe,
} from "../controllers/recipeController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRecipes);

router.get("/:id", getRecipeById);

router.post("/", authMiddleware, createRecipe);

export default router;
