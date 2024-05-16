"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const session = useSession();
  // console.log(session);
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <header className="flex items-center justify-between">
      <nav className="flex gap-8 text-gray-500 font-semibold items-center mr-8">
        <Link
          className="uppercase text-primary font-semibold text-2xl"
          href="/"
        >
          Easy Eats
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
            <Link href={"/profile"} className="whitespace-nowrap">
              Hello, {userName}
            </Link>
            <button
              onClick={() => signOut()}
              href={"/register"}
              className="bg-primary border-0 text-white rounded-full py-2 px-8"
            >
              Logout
            </button>
          </>
        )}

        {status === "unauthenticated" && (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              href={"/register"}
              className="bg-primary text-white rounded-full py-2 px-8"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
