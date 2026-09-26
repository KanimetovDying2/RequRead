import { Request, Response } from "express";
import Recipe from "../models/Recipe.js";

interface AuthRequest extends Request {
  user?: any;
}

export const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find().populate("author", "username avatar");

    return res.json(recipes);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "author",
      "username avatar",
    );

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    return res.json(recipe);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const createRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, image } = req.body;

    if (!title?.trim() || !description?.trim() || !image?.trim()) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const recipe = await Recipe.create({
      title,
      description,
      image,
      author: req.user._id,
    });

    return res.status(201).json(recipe);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

