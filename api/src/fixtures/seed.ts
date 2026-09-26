import dotenv from "dotenv";
import bcrypt from "bcrypt";

import connectDB from "../config/db.js";

import User from "../models/User.js";
import Recipe from "../models/Recipe.js";
import Comment from "../models/Comment.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Recipe.deleteMany();
    await Comment.deleteMany();

    const password = await bcrypt.hash("123456", 10);

    const user1 = await User.create({
      email: "john@test.com",
      password,
      username: "John Doe",
      avatar: "uploads/usericon.jpg",
    });

    const user2 = await User.create({
      email: "anna@test.com",
      password,
      username: "Anna",
      avatar: "uploads/usericon.jpg",
    });

    const recipes = await Recipe.create([
      {
        title: "Pizza",
        description: "Dough and cheese recipe",
        image: "uploads/pizza.jpg",
        author: user1._id,
      },

      {
        title: "Burger",
        description: "Meat and bread recipe",
        image: "uploads/burger.jpg",
        author: user2._id,
      },

      {
        title: "Pasta",
        description: "Italian pasta recipe",
        image: "uploads/pasta.jpg",
        author: user1._id,
      },
    ]);

    await Comment.create([
      {
        text: "Very tasty recipe!",
        author: user2._id,
        recipe: recipes[0]._id,
      },

      {
        text: "I love this pizza!",
        author: user1._id,
        recipe: recipes[0]._id,
      },

      {
        text: "Great burger!",
        author: user1._id,
        recipe: recipes[1]._id,
      },
    ]);

    console.log("Fixtures created");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seed();
