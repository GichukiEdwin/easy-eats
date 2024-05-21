import mongoose from "mongoose";
import { MenuItem } from "../models/MenuItems";

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();

  const menuItemDoc = await MenuItem.create(data);
  return Response.json(menuItemDoc);
}
