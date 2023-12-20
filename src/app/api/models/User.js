import bcrypt from "bcrypt";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass?.length || pass.length < 5) {
          new Error("password must be at least 5 characters");
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.post("validate", function (User) {
  const rawPassword = User.password;
  const salt = bcrypt.genSaltSync(10);
  User.password = bcrypt.hashSync(rawPassword, salt);
});

export const User = models?.User || model("User", userSchema);
