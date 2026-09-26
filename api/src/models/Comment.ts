import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
