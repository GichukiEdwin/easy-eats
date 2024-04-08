import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./../../models/User";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "me@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        try {
          const conn = await mongoose.connect(process.env.MONGO_URL);
          console.log(`MongoDB Connected: ${conn.connection.host}`);
        } catch (err) {
          console.log("Connection failed !!" + err.message);
          process.exit(1);
        }

        const user = await User.findOne({ email });

        const passwordOk = user && bcrypt.compareSync(password, user.password);

        console.log({ password });

        if (passwordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       id: "credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "me@email.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         try {
//           const email = credentials?.email;
//           const password = credentials?.password;
//           console.log(email);
//           console.log(password);
//           await mongoose.connect(process.env.MONGO_URL);
//           const user = await User.findOne({ email: email });
//           if (!user) {
//             throw new Error("User not found");
//           }
//           const passwordOk =
//             user && bcrypt.compareSync(password, user.password);
//           console.log(passwordOk);
//           if (passwordOk) {
//             return user;
//           } else {
//             throw new Error("Invalid credentials");
//           }
//         } catch (e) {
//           throw new Error("Error during authentication: " + e.message);
//         } finally {
//           await mongoose.connection.close();
//         }
//       },
//     }),
//   ],
//   session: { startegy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === "development",
// };
