import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./../../api/auth/[...nextauth]/route";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  console.log("name" in data);
  //   const email = session.user.email;

  if ("name" in data) {
    // update user name
    console.log({ email });
    await User.updateOne({ email }, { name: data.name });
  }

  return Response.json(true);
}
