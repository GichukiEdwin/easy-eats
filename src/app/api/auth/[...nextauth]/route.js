import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "./../../../../libs/mongodb";
import { User } from "./../../models/User";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: { startegy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

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
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("User not found");
          }
          const passwordOk =
            user && bcrypt.compareSync(password, user.password);
          console.log(passwordOk);
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
  // debug: process.env.NODE_ENV === "development",
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
