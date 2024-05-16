import { authOptions } from "app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function PUT() {
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  //   console.log({ session, data });

  if ("name" in data) {
  }

  return Response.json(true);
}
