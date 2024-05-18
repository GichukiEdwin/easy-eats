import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from "../models/User";
import { authOptions } from "./../../api/auth/[...nextauth]/route";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOptions);

  const email = session.user.email;

  const update = {};

  if ("name" in data) {
    update.name = data.name;
  }

  if ("image" in data) {
    update.image = data.image;
  }

  if (Object.keys(update).length > 0) {
    // update user name

    await User.updateOne({ email }, update);
  }

  return Response.json(true);
}
