import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from "../models/User";
import { UserInfo } from "../models/UserInfo";
import { authOptions } from "./../../api/auth/[...nextauth]/route";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const { name, image, ...extraInfo } = data.data;
  const session = await getServerSession(authOptions);

  const email = session.user.email;

  // update user name

  console.log("Received data:", data);
  console.log("Session email:", email);
  console.log("Extra info:", extraInfo);

  // Update user name and image
  const userUpdateResult = await User.updateOne({ email }, { name, image });
  console.log("User Update Result:", userUpdateResult);

  // Update additional user info
  const userInfoUpdateResult = await UserInfo.findOneAndUpdate(
    { email },
    { ...extraInfo }, // Make sure extraInfo is passed correctly
    {
      upsert: true,
      new: true,
    } // upsert to create if not found, new to return the updated doc
  );
  console.log("UserInfo Update Result:", userInfoUpdateResult);

  return new Response(JSON.stringify(userInfoUpdateResult), { status: 200 });
  // return Response.json(true);
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
