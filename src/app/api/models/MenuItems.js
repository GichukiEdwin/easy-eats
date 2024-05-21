import { Schema, model, models } from "mongoose";

const MenuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    basePrice: { type: Number },
  },
  { timestamps: true }
);

export const MenuItem = models?.Menutem || model("MenuItem", MenuItemSchema);
