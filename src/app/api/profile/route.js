import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from "../models/User";
import { authOptions } from "./../../api/auth/[...nextauth]/route";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOptions);

  const email = session.user.email;

  // update user name

  await User.updateOne({ email }, data);

  return Response.json(true);
}

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  return Response.json(await User.findOne({ email }));
}
