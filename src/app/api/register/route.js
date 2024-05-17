import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { User } from "../models/User";

export async function POST(req) {
  const body = await req.json();
  await mongoose.connect(process.env.MONGO_URL);

  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error("password must be at least 5 characters");
  }

  const rawPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(rawPassword, salt);

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
