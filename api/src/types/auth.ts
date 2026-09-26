import { Request } from "express";

export interface AuthUser {
  _id: string;
  email: string;
  username: string;
  avatar?: string | null;
  googleId?: string | null;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}