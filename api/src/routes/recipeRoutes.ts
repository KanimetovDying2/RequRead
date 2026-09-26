import express from "express";

import {
  getRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRecipes);

router.get("/:id", getRecipeById);

router.post("/", authMiddleware, upload.single("image"), createRecipe);

router.delete("/:id", authMiddleware, deleteRecipe);

export default router;
