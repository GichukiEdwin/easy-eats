"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const { data: session, status } = useSession();
  console.log(status);
  console.log(session?.data);

  return (
    <header className="flex items-center justify-between">
      <nav className="flex gap-8 text-gray-500 font-semibold items-center">
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
          <button
            onClick={() => signOut()}
            href={"/register"}
            className="bg-primary text-white rounded-full py-2 px-8"
          >
            Logout
          </button>
        )}

        {status !== "authenticated" && (
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
