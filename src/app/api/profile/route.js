import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from "../models/User";
import { UserInfo } from "../models/UserInfo";
import { authOptions } from "./../../api/auth/[...nextauth]/route";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const { name, image, ...extraInfo } = data;
  const session = await getServerSession(authOptions);

  const email = session.user.email;

  // update user name

  await User.updateOne({ email }, { name, image });

  await UserInfo.findOneAndUpdate({ email }, extraInfo, { upsert: true });

  return Response.json(true);
}

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return Response.json({});
  }

  const user = await User.findOne({ email }).lean();
  const userInfo = await UserInfo.findOne({ email }).lean();
  return Response.json({ ...user, ...userInfo });
}
