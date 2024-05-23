import mongoose from "mongoose";
import { MenuItem } from "../models/MenuItems";

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();

  const menuItemDoc = await MenuItem.create(data);
  return Response.json(menuItemDoc);
}

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const { _id, ...data } = await req.json();

  await MenuItem.findByIdAndUpdate(_id, data);
  return Response.json(true);
}

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);
  return Response.json(await MenuItem.find());
}
