import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: "string" },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    image: { type: String },
    city: { type: String },
    phone: { type: String },
    streetAddress: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", userSchema);
