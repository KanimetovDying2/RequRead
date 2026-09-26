export interface User {
  _id: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  image: string;
  author: User;
}

export interface Comment {
  _id: string;
  text: string;
  author: User;
  recipe: string;
}
