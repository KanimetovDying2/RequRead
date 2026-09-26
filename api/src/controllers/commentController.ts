import { Request, Response } from "express";
import Comment from "../models/Comment.js";
import Recipe from "../models/Recipe.js";

interface AuthRequest extends Request {
  user?: any;
}

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({
      recipe: req.params.recipeId as string,
    }).populate("author", "username avatar");

    return res.json(comments);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    const comment = await Comment.create({
      text,
      author: req.user._id,
      recipe: req.params.recipeId as string,
    });

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id as string);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const recipe = await Recipe.findById(comment.recipe);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    const isCommentAuthor =
      comment.author.toString() === req.user._id.toString();

    const isRecipeOwner = recipe.author.toString() === req.user._id.toString();

    if (!isCommentAuthor && !isRecipeOwner) {
      return res.status(403).json({
        message: "You cannot delete this comment",
      });
    }

    await comment.deleteOne();

    return res.json({
      message: "Comment deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
