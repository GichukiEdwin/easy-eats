import bcrypt from "bcrypt";
import mongoose from "mongoose";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../../models/User";

export const authOptions = {
  // secret: process.env.SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "me@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;
          await mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({ email: email });
          if (!user) {
            throw new Error("User not found");
          }
          const passwordOk = bcrypt.compareSync(password, user.password);
          if (passwordOk) {
            return user;
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (e) {
          throw new Error("Error during authentication: " + e.message);
        } finally {
          await mongoose.connection.close();
        }
      },
    }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
