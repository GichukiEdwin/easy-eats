import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from "../models/User";
import { UserInfo } from "../models/UserInfo";
import { authOptions } from "./../../api/auth/[...nextauth]/route";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
<<<<<<< HEAD
  const { _id, name, image, ...extraInfo } = data;

  let filter = {};
  let email;
=======
  const { _id, name, image, ...extraInfo } = data.data;

  let filter = {};
>>>>>>> 249f3991cb3a7b01293d49b8920c1b7bdc1b211b

  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
<<<<<<< HEAD
    console.log("Session data:", session);
    if (!session) {
      console.error("Session not found");
      return new Response(JSON.stringify({ error: "Session not found" }), {
        status: 401,
      });
    }

    email = session.user.email;

    if (!email) {
      console.error("Email not found in session");
      return new Response(
        JSON.stringify({ error: "Email not found in session" }),
        {
          status: 401,
        }
      );
    }
=======

    const email = session.user.email;
>>>>>>> 249f3991cb3a7b01293d49b8920c1b7bdc1b211b
    filter = { email };
  }

  // update user name

  console.log("Received data:", data);
  console.log("Session email:", email);
  console.log("Extra info:", extraInfo);
  console.log("Filter applied:", filter);

  // Update user name and image
<<<<<<< HEAD
  const user = await User.findOne(filter);
  const userUpdateResult = await User.updateOne(filter, { name, image });
  console.log("User Update Result:", userUpdateResult);
=======
  const userUpdateResult = await User.updateOne(
    filter,
    { email },
    { name, image }
  );
  //? console.log("User Update Result:", userUpdateResult);
>>>>>>> 249f3991cb3a7b01293d49b8920c1b7bdc1b211b

  // Update additional user info

  const userInfoUpdateResult = await UserInfo.findOneAndUpdate(
<<<<<<< HEAD
    { email: user.email },
=======
    filter,
    { email },
>>>>>>> 249f3991cb3a7b01293d49b8920c1b7bdc1b211b
    { ...extraInfo }, // Make sure extraInfo is passed correctly
    {
      upsert: true,
      new: true,
    } // upsert to create if not found, new to return the updated doc
  );
  //? console.log("UserInfo Update Result:", userInfoUpdateResult);

  return new Response(JSON.stringify(userInfoUpdateResult), { status: 200 });
  // return Response.json(true);
}

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  let filterUser = {};

  if (_id) {
    filterUser = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }

    filterUser = { email };
  }
  const user = await User.findOne(filterUser).lean();
  const userInfo = await UserInfo.findOne({ email: user.email }).lean();
  return Response.json({ ...user, ...userInfo });
}
